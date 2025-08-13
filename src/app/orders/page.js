'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/customer/orderHistory`, {
          withCredentials: true,
        });
        const history = res.data?.data?.orderHistory;
        setOrders(Array.isArray(history) ? history : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-white/20 bg-white/5 backdrop-blur-md text-white rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
                  <p className="text-gray-400">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400">Address: {order.address}</p>
                  <p className="text-gray-400">Payment: {order.paymentStatus || 'Pending'}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Item List */}
              <div className="border-t border-b py-4 my-4 border-white/10 space-y-4">
                {order.items.map((item, idx) => (
                  <div
                    key={`item-${order._id}-${idx}`}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">₹{item.subtotal}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center font-semibold">
                <p>Total Items</p>
                <p>{order.totalItems}</p>
              </div>

              <div className="flex justify-between items-center font-semibold mt-2">
                <p>Total Amount</p>
                <p>₹{order.totalAmount}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                {order.invoice && (
                  <a
                    href={order.invoice}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    Download Invoice
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
