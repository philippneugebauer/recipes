Rails.application.routes.draw do
  resources :recipe_imports, only: [:new, :index, :create]
  get '/propose_recipe', to: 'recipes#propose'
  resources :recipes, only: [:index, :show] do
  end
  root "recipes#index"
end
