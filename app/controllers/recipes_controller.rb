class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show ]

  # GET /recipes or /recipes.json
  def index
    recipes = handle_ingredient_filter()
    @recipes = recipes.includes(:category).limit(50)
  end

  def propose
    recipes = handle_ingredient_filter().count
    if recipes > 0
      draw = rand(0..recipes - 1)
      @recipe = handle_ingredient_filter()[draw]
      render "show"
    else
      render json: {message: "No recipes found!"}, status: :not_found
    end
  end

  # GET /recipes/1 or /recipes/1.json
  def show
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def handle_ingredient_filter
      if params[:filter_by_ingredients]
        Recipe.contains_ingredients(prepare_ingredient_filter())
      else
        Recipe.all
      end
    end

    def prepare_ingredient_filter
      params[:filter_by_ingredients].split(",").map {|i| i.strip().downcase().singularize() }
    end

end
