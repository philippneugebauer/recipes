require "test_helper"

class RecipeImportTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess::FixtureFile

  test "import" do
    RecipeImport.new(name: "1", file: fixture_file_upload("recipes-en.json")).save!

    assert RecipeImport.count == 1

    RecipeImport.new().execute_import("recipes-en.json", RecipeImport.first.id)

    assert RecipeImport.count == 1
    assert RecipeImport.find(RecipeImport.first.id).status == "Successful"
    assert Recipe.count == 10013
    assert Category.count == 982
  end
end
