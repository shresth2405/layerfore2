'use client';

import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function RazorpayLoader() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return null;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      // Transform cart for backend (only product ID and quantity)
      const orderItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        `${BACKEND_URL}/order/placeOrder`,
        {
          items: orderItems,
          address: "Sarai Khalsa", // Replace or collect from user input if needed
          totalAmount: total,
        },
        { withCredentials: true }
      );

      const { razorpayKeyId, razorpayOrder, order } = response.data.data;

      const options = {
        key: razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "LayerForge",
        description: `Order ID: ${order._id}`,
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            // Call backend to verify payment
            const verifyRes = await axios.post(
              `${BACKEND_URL}/order/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            alert("✅ Payment successful & verified!");
            console.log("🔒 Verified Order:", verifyRes.data.data);
            clearCart(); // Optional: clear cart after success
          } catch (err) {
            console.error("❌ Payment verification failed:", err);
            alert("Payment succeeded but verification failed. Contact support.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RazorpayLoader />
      <h1 className="text-4xl font-bold mb-8 text-white">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20">
          <p className="text-white/80 text-center text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
              >
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-white/60">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 bg-blue-600/20 text-white rounded-md hover:bg-blue-600/30 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 bg-blue-600/20 text-white rounded-md hover:bg-blue-600/30 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
            <p className="text-xl font-bold text-white">
              Total: ₹{total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
