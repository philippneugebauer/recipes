class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes or /recipes.json
  def index
    if params[:filter_by_ingredients]
      @recipes = Recipe.contains_ingredients(prepare_ingredient_filter)
    else
      @recipes = Recipe.all
    end
  end

  def propose
    recipe_count = Recipe.contains_ingredients(prepare_ingredient_filter).count
    @recipe = Recipe.find(rand(0..recipe_count)).includes(:category)

    render "show"
  end

  # GET /recipes/1 or /recipes/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def prepare_ingredient_filter
      params[:filter_by_ingredients].split(",").map {|i| i.strip().downcase().singularize() }
    end

end
