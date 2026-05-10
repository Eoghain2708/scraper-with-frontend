import type { Product } from "../types/product";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/getProducts";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";

export default function SearchPage() {
    const [products, setProducts] = useState<Product[] | null>([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<"none"|"price_asc"|"price_desc">("none");

    const sortedProducts = [...(products ?? [])].sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        
        case "price_desc":
          return b.price - a.price;

        default:
          return 0;
      }
    })

    useEffect(() => {
    const q = searchParams.get("q") || ""

  async function loadProducts() {
    try {
      setLoading(true)
      const data = await getProducts(q)
      setProducts(data)
    } catch (e) {
      console.log("Error fetching products:", e)
    } finally {
      setLoading(false)
    }
  }

  loadProducts()
}, [searchParams])
   

    if (loading) {
        return <p className="mt-50 text-xl">Loading...</p>
    }

    if (!products || products.length < 1) {
        return (
            <>
            <SearchBar />
            </>
    )
    }

    return (
  <div className="max-w-4xl mx-auto px-4 py-8">

    <h1 className="text-3xl font-bold mb-6 text-gray-900">
      Search products
    </h1>

    
      
    <div className="mb-8">
      <SearchBar />
    </div>

    <div className="py-5">
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as never)}>
      <option value="none">Sort</option>
      <option value="price_asc">Low to High</option>
      <option value="price_desc">High to low</option>
    </select>
   </div>
    <div className="space-y-4">
      {sortedProducts.map((p) => (
        <Link
          key={p.url}
          to={p.url}
          className="block border border-gray-200 rounded-xl p-4 hover:shadow-lg bg-gray-300 transition"
        >
          <ProductCard product={p} />
        </Link>
      ))}
    </div>
  </div>
)
}