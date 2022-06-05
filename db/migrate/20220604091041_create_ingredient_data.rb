class CreateIngredientData < ActiveRecord::Migration[7.0]
  def change
    create_table :ingredient_data do |t|
      t.string :volume
      t.references :recipe, null: false, foreign_key: true
      t.references :ingredient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
