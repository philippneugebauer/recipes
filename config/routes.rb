Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :recipes, only: [:index, :show]
      get '/propose_recipe', to: 'recipes#propose'
    end
  end
  resources :recipe_imports, only: [:new, :index, :create]
  #TODO: probably because root
  root "react#index"
  get '/*path' => 'react#index'
end
