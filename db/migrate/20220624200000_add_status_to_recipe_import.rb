class AddStatusToRecipeImport < ActiveRecord::Migration[7.0]
  def change
    add_column :recipe_imports, :status, :text
  end
end
