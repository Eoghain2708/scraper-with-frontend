class Product
  attr_accessor :name, :price, :url, :merchant, :review, :extras, :image_url

  def initialize(attrs = {})
    # Necessary 
    @name = attrs[:name]
    @price = attrs[:price]
    @url = attrs[:url]
    @merchant = attrs[:merchant]
    @review = attrs[:review] || nil
    # Scraper specific additions
    @extras = attrs[:extras] || {}
    @image_url = attrs[:image_url] || nil
    puts attrs.inspect
  end


  def as_json(*)


    {
    name: @name,
    price: @price,
    url: @url,
    merchant: @merchant,
    review: @review,
    extras: extras,
    image_url: @image_url
    }
  end

  def to_s
    extra_lines = extras.map do |key, value|
    "#{key}: #{value}"
    end.join("\n")
  <<~TEXT
  -----------------------------------
  #{name}
  £#{price} (including VAT)
  ⭐ Average Rating: #{review[:rating]} out of #{review[:count]} ratings
  #{merchant}
  #{url}
  
  EXTRA INFORMATION
  #{extra_lines}
  TEXT
  end
end