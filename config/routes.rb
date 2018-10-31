Rails.application.routes.draw do

  devise_for :users
  # get 'messages' => 'messages#index'
  root 'groups#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.
    resources :users, only: [:index, :edit, :update]
    resources :groups do
      resources :messages, only: [:index, :create]

    end
  end
