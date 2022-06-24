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
  get '/*path' => 'react#index'
end
