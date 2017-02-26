Rails.application.routes.draw do
  devise_for :users, controllers: {
    :omniauth_callbacks => "omniauth_callbacks"
  }
  root to: "dashboard#index"
  resources :dashboard, only: [:index]
  resources :formats, only: [:index]
end
