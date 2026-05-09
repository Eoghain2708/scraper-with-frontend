import type { Product } from "../types/product";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/getProducts";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
    const [products, setProducts] = useState<Product[] | null>([]);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
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
        return <p>Loading...</p>
    }

    if (!products || products.length < 1) {
        return (
            <>
            <h2>No products found</h2>
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

   
    <div className="space-y-4">
      {products.map((p) => (
        <Link
          key={p.url}
          to={p.url}
          className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-white"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {p.name}
          </h3>

        
          <p className="text-sm text-gray-500 mb-2">
            From: <span className="font-medium">{p.merchant}</span>
          </p>

      
          <p className="text-green-600 font-semibold mb-2">
            £{p.price}
          </p>

          
          <p className="text-sm text-yellow-600 mb-2">
            ⭐ {p.review.rating} ({p.review.count} reviews)
          </p>

         
          {p.extras && Object.keys(p.extras).length > 0 && (
            <div className="mt-2 border-t pt-2 space-y-1">
              {Object.entries(p.extras).map(([key, value]) => (
                <p key={key} className="text-xs text-gray-500">
                  {key}: {String(value)}
                </p>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  </div>
)
}