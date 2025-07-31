'use client';

import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20">
          <p className="text-white/80 text-center text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-white/60">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-blue-600/20 text-white rounded-md hover:bg-blue-600/30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-blue-600/20 text-white rounded-md hover:bg-blue-600/30 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <p className="text-xl font-bold text-white">Total: ${total.toFixed(2)}</p>
            <button className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
