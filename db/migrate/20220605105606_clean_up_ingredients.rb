class CleanUpIngredients < ActiveRecord::Migration[7.0]
  def change
    drop_table :ingredient_data
    drop_table :ingredients
    add_column :recipes, :ingredients, :jsonb, default: {}
  end
end
