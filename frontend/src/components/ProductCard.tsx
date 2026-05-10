import type { Product } from "../types/product";

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {

   
    
    return (
    <div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
        <div className="flex flex-row items-center justify-evenly">
        {product.image_url &&
        <img className="w-50 h-40" src={product.image_url} />
        }   
        <div className="flex flex-col">
          <p className="text-sm text-gray-500 mb-2">
            From: <span className="font-medium">{product.merchant}</span>
          </p>

      
          <p className="text-green-600 font-semibold mb-2">
            £{product.price}
          </p>
        </div>
          {product.review && Object.keys(product.review).length > 0 &&
          <p className="text-sm text-yellow-600 mb-2">
             {product.review.rating} ({product.review.count})
          </p>
          }
          </div>
         
          {product.extras && Object.keys(product.extras).length > 0 && (
            <div className="mt-2 border-t pt-2 space-y-1">
                <h3>Extra information</h3>
              {Object.entries(product.extras).map(([key, value]) => (
                <p key={key} className="text-xs text-gray-500">
                  {key}: {String(value)}
                </p>
              ))}
            </div>
          )}
    </div>
    )
}