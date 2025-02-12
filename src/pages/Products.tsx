import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';

function Products() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h2>
                </Link>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => addToCart(product.id, 1)}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {product.stock_quantity === 0 && (
                  <p className="text-red-500 text-sm mt-2">Out of stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;