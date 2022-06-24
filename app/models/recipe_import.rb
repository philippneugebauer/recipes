class RecipeImport < ApplicationRecord
  has_one_attached :file

  validates :name, :file, presence: true

  # RecipeImport.new().execute_import()
  def execute_import(file = "recipes-en.json", recipe_import_id = 1)
    #TODO: lazy/stream loading?
    # https://thoughtbot.com/blog/io-in-ruby
    # https://www.thegnar.com/blog/ruby-io-buffer
    # https://iostreams.rocketjob.io/tutorial
    content = File.read(file)

    #TODO: json validation? https://github.com/voxpupuli/json-schema
    #TODO: Ingredients als Text?
      # => textfunktionalität von Postgres checken => Textsuche
      # => performance

    recipe_import = RecipeImport.find(recipe_import_id)

    ActiveRecord::Base.transaction do
      records = JSON.parse(content).map { |r|
        if r["category"].blank?
          category_id = nil
        else
          category_id = Category.find_or_create_by!(name: r["category"]).id
        end
        {title: r["title"], cook_time: r["cook_time"], prep_time: r["prep_time"], ratings: r["ratings"], author: r["author"], image_url: r["image"], category_id: category_id, ingredients: r["ingredients"]}
      }.filter { |r| r[:title] && r[:ingredients].any? }

      # https://www.bigbinary.com/blog/bulk-insert-support-in-rails-6
      # unfortunately does not enfore active record validations
      Recipe.insert_all!(records)

      recipe_import.update!(status: "Successfull")
    rescue => e
      recipe_import.update!(status: e.inspect)
    end
  end
end
