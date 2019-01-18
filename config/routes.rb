Rails.application.routes.draw do
  resources :oscillators do
    collection do
      post 'tune'
    end
  end

  root 'oscillators#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
