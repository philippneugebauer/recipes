require "test_helper"

class RecipeImportsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe_import = recipe_imports(:one)
  end

  test "should get index" do
    get recipe_imports_url
    assert_response :success
  end

  test "should get new" do
    get new_recipe_import_url
    assert_response :success
  end

  test "should create recipe_import" do
    assert_difference("RecipeImport.count") do
      post recipe_imports_url, params: { recipe_import: { name: @recipe_import.name } }
    end

    assert_redirected_to recipe_import_url(RecipeImport.last)
  end
end
