class Ingredient < ApplicationRecord
  has_many :ingredient_data, dependent: :delete_all

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
end
