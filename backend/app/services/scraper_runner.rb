require_relative 'scrapers/bnq_scraper'
require_relative 'scrapers/haldane_fisher'
require_relative 'scrapers/travis_perkins'

class ScraperRunner
  SCRAPERS = [
    BNQScraper.new,
    HaldaneFisher.new,
    TravisPerkins.new
  ]

  def self.search(term)
    SCRAPERS.flat_map do |scraper|
      scraper.search(term)
    rescue => e
      puts e
      []
    end
  end

end