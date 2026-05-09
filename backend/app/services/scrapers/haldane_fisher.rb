require 'httparty'
require 'json'
require_relative '../../models/product'
require_relative 'base_scraper'

class HaldaneFisher < BaseScraper
  URL = "https://eucs34v2.ksearchnet.com/cs/v2/search".freeze

  def search(term)
    response = HTTParty.post(
      URL,
      headers: {
        "Content-Type" => "application/json",
        "User-Agent" => "Mozilla/5.0"
      },
      body: get_payload(term).to_json
    )

    data = JSON.parse(response.body)

    records = data.dig("queryResults", 0, "records") || []

    return records.map do |item|
      Product.new({
        name: item["name"],
        price: item["price"].to_f,
        url: item["url"],
        merchant: "Haldane Fisher",
        review: {
          rating: item["rating"], count: "N/A"
        },
        extras: {
          in_stock: item["inStock"]
        }
      }
      )
    end
  rescue => e
    puts "Cannot find data on this page due to error #{e}"
    []
  end

  private

  def get_payload(term)
    {
    "context": {
        "apiKeys": [
            "klevu-173892785843517730"
        ]
    },
    "recordQueries": [
        {
            "id": "productList",
            "typeOfRequest": "SEARCH",
            "settings": {
                "query": {
                    "term": "cement"
                },
                "typeOfRecords": [
                    "KLEVU_PRODUCT"
                ],
                "limit": 5,
                "fallbackQueryId": "productListFallback",
                "groupCondition": {
                    "groupOperator": "ANY_OF",
                    "conditions": [
                        {
                            "key": "visibility",
                            "valueOperator": "INCLUDE",
                            "values": [
                                "catalog-search",
                                "search"
                            ]
                        }
                    ]
                }
            },
            "filters": {
                "filtersToReturn": {
                    "enabled": true,
                    "rangeFilterSettings": [
                        {
                            "key": "klevu_price",
                            "minMax": "true"
                        }
                    ]
                }
            }
        },
    ]
}
  end
  
end