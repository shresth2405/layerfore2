'use client';

export default function OrdersPage() {
  // Mock orders data - in a real app, this would come from an API
  const orders = [
    {
      id: '1',
      date: '2025-07-30',
      status: 'Processing',
      total: 299.99,
      items: [
        { name: 'Custom Part A', quantity: 2, price: 149.99 }
      ]
    },
    // Add more mock orders as needed
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="border-t border-b py-4 my-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">${order.total.toFixed(2)}</p>
              </div>

              <div className="mt-4 flex gap-4">
                <button className="text-blue-600 hover:text-blue-700">
                  Track Order
                </button>
                <button className="text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
