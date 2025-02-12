import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  category: {
    name: string;
  };
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
const { addToCart } = useCartStore((state) => ({
  addToCart: state.addToCart,
  user: state.user // Assuming user state is available in the cart store
}));

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:category_id (
            name
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.stock_quantity) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, quantity);
      toast.success('Added to cart!');
      navigate('/cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Category: {product.category.name}
            </p>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <div className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Quantity:</span>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 rounded-full hover:bg-gray-100"
                disabled={quantity >= product.stock_quantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {product.stock_quantity} items in stock
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
            <button
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
              aria-label="Add to wishlist"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {product.stock_quantity === 0 && (
            <p className="text-red-500">Out of stock</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;