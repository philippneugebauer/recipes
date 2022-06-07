class Recipe < ApplicationRecord
  validates :title, :ingredients, presence: true
  validates :cook_time, :prep_time, numericality: { only_integer: true }
  validates :ratings, numericality: true
  validate :valid_image_url

  belongs_to :category, optional: true

  #TODO: https://stackoverflow.com/questions/22667401/postgres-json-data-type-rails-query
  # http://www.binarywebpark.com/query-json-data-rails-postgresql/
  # https://blog.saeloun.com/2022/01/04/postgresql-data-types-in-rails.html
  # JSONB > ARRAY because like querying

  #TODO: visualization with cards? https://getbootstrap.com/docs/5.2/components/card/#horizontal
  # TODO: db schema diagram https://stackoverflow.com/questions/3223770/tools-to-generate-database-tables-diagram-with-postgresql

  # Recipe.contains_ingredients(["flour", "cornmeal"])
  scope :contains_ingredients, -> (ingredient_list) {
    query_parameter = ingredient_list.map {|i| "%#{i.downcase}%"}
    query_text = Array.new(ingredient_list.size, "ingredients::text ilike ?").join(" AND ")
    where(query_text, *query_parameter)
  }

  def valid_image_url
    errors.add(:image_url, "must be a valid url") unless (URI.parse image_url rescue nil)
  end
end
