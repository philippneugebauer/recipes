Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
      resources :recipe_imports, only: [:index, :create]
      get '/propose_recipe', to: 'recipes#propose'
    end
  end
  # react
  root "react#index"
  get '/recipes' => 'react#index'
  get '/recipes/:id' => 'react#index'
  get '/recipe_imports' => 'react#index'
  get '/recipe_imports/new' => 'react#index'
  get '/propose_recipe' => 'react#index'
end
