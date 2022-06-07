Rails.application.routes.draw do
  resources :recipe_imports, only: [:new, :index, :create]
  resources :recipes, only: [:index, :show]
  root "recipes#index"
end
