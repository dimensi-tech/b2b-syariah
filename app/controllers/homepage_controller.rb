class HomepageController < ApplicationController
  def index
    @products = Product.all
  end
end
