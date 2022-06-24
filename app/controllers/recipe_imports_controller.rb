class RecipeImportsController < ApplicationController

  # GET /recipe_imports or /recipe_imports.json
  def index
    @recipe_imports = RecipeImport.order(created_at: :desc)
  end

  # GET /recipe_imports/new
  def new
    @recipe_import = RecipeImport.new
  end

  # POST /recipe_imports or /recipe_imports.json
  def create
    @recipe_import = RecipeImport.new(recipe_import_params)

    respond_to do |format|
      if @recipe_import.save
        RecipeImportJob.perform_async(@recipe_import)
        format.json { render json: :ok, status: :created }
      else
        format.json { render json: @recipe_import.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def recipe_import_params
      params.permit(:name, :file)
    end
end
