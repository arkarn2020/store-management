import { useState } from 'react'

export default function OrderTable({ orders, updateOrderStatus }) {
  const [expandedOrder, setExpandedOrder] = useState(null)

  if (orders.length === 0) {
    return <p className="text-center mt-4">No orders found for this customer.</p>
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div 
            className="p-4 cursor-pointer flex justify-between items-center"
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
          >
            <div>
              <p className="font-semibold">{order.customerName}</p>
              <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">${order.total.toFixed(2)}</p>
              <p className={`text-sm ${order.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                {order.status}
              </p>
            </div>
          </div>
          {expandedOrder === order.id && (
            <div className="p-4 border-t">
              <h4 className="font-semibold mb-2">Order Details:</h4>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

