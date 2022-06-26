class Recipe < ApplicationRecord
  validates :title, :ingredients, presence: true
  validates :cook_time, :prep_time, numericality: { only_integer: true }
  validates :ratings, numericality: true

  has_one_attached :image

  belongs_to :category, optional: true

  # Recipe.contains_ingredients(["flour", "cornmeal"])
  scope :contains_ingredients, -> (ingredient_list) {
    query_parameter = ingredient_list.map {|i| "%#{i.downcase}%"}
    query_text = Array.new(ingredient_list.size, "ingredients::text ilike ?").join(" AND ")
    where(query_text, *query_parameter)
  }

  def thumbnail
    image.variant(resize_to_fill: [200, 200])
  end

  def full_image
    image.variant(resize_to_fill: [1000, 800])
  end
end
