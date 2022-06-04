Rails.application.routes.draw do
  resources :categories
  resources :recipes
  root "recipes#index"

end
