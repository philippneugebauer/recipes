class RecipeImport < ApplicationRecord
  has_one_attached :file

  validates :name, :file, presence: true

  # RecipeImport.new().execute_import()
  def execute_import(file = "recipes-en.json", recipe_import_id = 1)
    content = File.read(file)

    recipe_import = RecipeImport.find(recipe_import_id)

    result = []

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
      result = Recipe.insert_all!(records)

      recipe_import.update!(status: "Successful")
    rescue => e
      recipe_import.update!(status: e.inspect)
    end
  end

  def download_images
    #TODO: another job that selects all recipes without image attachment => no problems with errors in run
    recipes_without_images = Recipe.left_joins(:image_attachment).where(active_storage_attachments: { id: nil })
    recipes_without_images.each do |recipe|
      download_image(recipe, image_save_path)
    end
  end

  private

  def download_image(recipe, image_path)
    file_path = "images/#{recipe.id}_#{file_name}"

    system("wget -O #{file_path} #{recipe.image_url}")

    recipe.image.attach(io: File.open(file_path), filename: file_name)
  end
end
