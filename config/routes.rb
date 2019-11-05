Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'products/index'
      get 'product/:id', to: 'products#show'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
