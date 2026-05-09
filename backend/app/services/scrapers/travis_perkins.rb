require_relative 'base_scraper'
require_relative '../../models/product'
require 'json'

# Scraper for Travis Perkins
class TravisPerkins < BaseScraper
  ENDPOINT = 'https://www.travisperkins.co.uk/graphql'.freeze

  def search(term)
    body = {
      operationName: 'searchProducts',
      variables: {
        brandId: 'tp',
        input: {
          salesChannel: 'ECOMMERCE',
          categoryId: nil,
          excludeFacets: [],
          facets: [],
          first: 5,
          after: nil,
          term: term
        }
      },
      query: GRAPHQL_QUERY
    }

    response = HTTParty.post(
      ENDPOINT,
      headers: headers,
      body: body.to_json
    )

    return parse_products(response.body)
    
  rescue => e
    puts "TP error: #{e}"
    []
  end

  private

  def headers
    {
      'Content-Type' => 'application/json',
      'User-Agent' => 'Mozilla/5.0',
      'Accept' => '*/*'
    }
  end

  def parse_products(body)
    json = JSON.parse(body)
    edges =
      json.dig(
        'data',
        'tpplcBrand',
        'searchProducts',
        'edges'
      ) || []
    
    edges.map do |edge|
      product = edge['product']

      Product.new(
        {
        name: product["name"],
        price: extract_price(product),
        url: product_url(product),
        merchant: "Travis Perkins",
        review: extract_reviews(product),
        extras: [extract_extras(product)]
      }
      )

    end
  end

  def extract_price(product)
    price = product.dig('price', 'price') || {}
    price.dig("retailPrice", "valueIncVat").to_f
  end

  def extract_extras(product) 
    specs = product['technicalSpecifications'] || []
    
    specs.each_with_object({}) do |spec, hash|
      key = spec['name']&.strip
      value = spec['value']

      next if key.nil? || value.nil?

      hash[key] = value
    end
  end

  def format_price(price)
    return "N/A" if price.nil?

    "£#{'%.2f' % price}"
  end

  def extract_reviews(product)
    review = product.dig("review") || {}
    {
      rating: review['averageRating'].to_f,
      count: review['numberOfReviews'].to_i
    }
  end


  def product_url(product)
    "https://www.travisperkins.co.uk/product/#{product['sku']}"
  end


  GRAPHQL_QUERY = <<~GRAPHQL
  query searchProducts($brandId: ID!, $input: TpplcProductSearchInput!) {
    tpplcBrand(brandId: $brandId) {
      searchProducts(input: $input) {
        edges {
          product {
            sku
            name
            review {
              averageRating
              numberOfReviews
            }
            technicalSpecifications {
              name
              value
            }
            price {
              price {
                ... on TpplcBuyPrice {
                  retailPrice {
                    valueIncVat
                    valueExVat
                  }
                  tradePrice {
                    valueIncVat
                    valueExVat
                  }
                }
              }
              priceUom {
                name
              }
            }
          }
        }
      }
    }
  }
  GRAPHQL
end