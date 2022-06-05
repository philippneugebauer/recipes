class NonMandatoryCategories < ActiveRecord::Migration[7.0]
  def change
    change_column_null(:recipes, :category_id, true)
  end
end
