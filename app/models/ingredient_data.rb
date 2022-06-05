class IngredientData < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient

  validates :recipe, :ingredient, :volume, presence: true
end
