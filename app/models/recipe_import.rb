class RecipeImport < ApplicationRecord
  has_one_attached :file

  validates :name, presence: true

  # RecipeImport.new().execute_import()
  def execute_import(file = "recipes-en.json")
    #TODO: lazy/stream loading?
    # https://thoughtbot.com/blog/io-in-ruby
    # https://www.thegnar.com/blog/ruby-io-buffer
    # https://iostreams.rocketjob.io/tutorial
    content = File.read(file)

    # http://www.databasesoup.com/2015/01/tag-all-things-part-2.html
    # https://www.netguru.com/blog/postgres-arrays-vs-json-datatypes-in-rails-5
    # https://edgeguides.rubyonrails.org/active_record_postgresql.html#array
    #TODO: catch JSON::ParserError and save into recipe import entity?
    #TODO: complete transaction?
    records = JSON.parse(content).map { |r|
      {title: r["title"], cook_time: r["cook_time"], prep_time: r["prep_time"], ratings: r["ratings"], author: r["author"], image_url: r["image"], category_id: Category.find_or_create_by(name: r["category"]).id, ingredients: r["ingredients"]}
    }.filter { |r| r[:title] && r[:ingredients].any? }

    # https://www.bigbinary.com/blog/bulk-insert-support-in-rails-6
    Recipe.insert_all(records)
  end
end
