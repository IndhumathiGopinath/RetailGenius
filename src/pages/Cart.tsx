import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

function Cart() {
  const { items, loading } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
<div>
  {items.map((item) => (
    <div key={item.id} className="flex justify-between items-center py-4 border-b">
      <div>
        <h2 className="text-lg font-semibold">{item.product.name}</h2>
        <p className="text-gray-500">Quantity: {item.quantity}</p>
        <p className="text-gray-700">${item.product.price.toFixed(2)}</p>
      </div>
      <div>
        <button className="text-red-500" onClick={() => removeFromCart(item.product_id)}>
          Remove
        </button>
      </div>
    </div>
  ))}
</div>
      )}
    </div>
  );
}

export default Cart;