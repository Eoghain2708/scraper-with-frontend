require "httparty"
require "nokogiri"

# Base scraper which every other one will inherit from
class BaseScraper
  def search(query)
    raise 'Must implement the search method'
  end

  def clean_price(price)
    price.gsub(/[^\d\.]/, '').to_f
  end
end