require_relative '../../models/product'
require_relative 'base_scraper'
require_relative '../../models/product'
require 'json'

class BNQScraper < BaseScraper
  def search(query)
    url = "https://suggest.dxpapi.com/api/v2/suggest/?account_id=5374&auth_key="\
    "&_br_uid_2=uid%3D2734276790082%3Av%3D13.0%3Ats%3D1778257789840%3Ahc%3D3"\
    "&catalog_views=diy_com&q=#{URI.encode_www_form_component(query)}&ref_url=https%3A%2F%2F"\
    "www.diy.com&request_id=&request_type=suggest&url=https%3A%2F%2Fwww.diy.com%2Fsearch%3Fterm%3D#{URI.encode_www_form_component(query)}"
    
    response = HTTParty.get(url, { 
    headers: {
    "User-Agent" => "Mozilla/5.0",
    "Accept" => "application/json",
    "Referer" => "https://www.diy.com/"
     }})

    data = JSON.parse(response.body)
    products = data.dig("suggestionGroups", 0, "searchSuggestions") || []

    return products.map do |item|
      Product.new({
        name: item['title'],
        merchant: 'B and Q',
        url: item['url'],
        price: item['sale_price'].to_f,
        review: {"n/a": "n/a"},
        extras: {"n/a": "n/a"}
      })
    end
  rescue => e
    puts "Cannot find data using this page due to error #{e}"
    []
  end
end