require "application_system_test_case"

class RecipesTest < ApplicationSystemTestCase
  setup do
    @recipe = recipes(:one)
  end

  test "visiting the index" do
    visit "/"
    assert_selector "h1", text: "Recipes"
    assert page.has_content?(@recipe.title)
  end

  test "filtering for bacon" do
    visit "/"
    assert_selector "h1", text: "Recipes"
    assert page.has_content?(@recipe.title)

    fill_in "filter_by_ingredients", with: "bacon"
    click_on "Filter"

    assert !page.has_content?(@recipe.title)
  end

end
