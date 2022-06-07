require "application_system_test_case"

class RecipeImportsTest < ApplicationSystemTestCase
  setup do
    @recipe_import = recipe_imports(:one)
  end

  test "visiting the index" do
    visit recipe_imports_url
    assert_selector "h1", text: "Recipe imports"
  end

  test "should create recipe import" do
    visit recipe_imports_url
    click_on "New recipe import"

    fill_in "Name", with: @recipe_import.name
    click_on "Create Recipe import"

    assert_text "Recipe import was successfully created"
    click_on "Back"
  end
end
