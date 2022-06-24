class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes or /recipes.json
  def index
    if params[:filter_by_ingredients]
      @recipes = Recipe.contains_ingredients(prepare_ingredient_filter)
    else
      @recipes = Recipe.all
    end
    @recipes = @recipes.includes(:category).limit(50)
  end

  def propose
    if params[:filter_by_ingredients]
      recipes = Recipe.contains_ingredients(prepare_ingredient_filter)
    else
      recipes = Recipe.all
    end
    @recipe = recipes[rand(0..recipes.size - 1)]

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
