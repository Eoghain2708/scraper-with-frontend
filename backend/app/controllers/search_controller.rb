class SearchController < ApplicationController
  def index
  products =
    if params[:q].present?
      ScraperRunner.search(params[:q])
    else
      []
    end
  

  render json: products.map(&:as_json)
  end 
end
