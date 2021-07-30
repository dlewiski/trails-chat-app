Rails.application.routes.draw do
  namespace :api do
    resources :message_reactions
    resources :messages
    resources :chatrooms
    resources :users
    resources :sessions
  end

  root 'pages#index'

  get '*path' => redirect('/')

  # get '*path', to: 'pages#index', via: :all

  mount ActionCable.server => '/cable'
end
