export default function OrderList({ orders, updateOrderStatus }) {
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="border p-4 rounded">
          <h3 className="font-bold">{order.customerName}</h3>
          <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
          <p>
            Status: 
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="ml-2 border p-1"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
            </select>
          </p>
          <h4 className="font-semibold mt-2">Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

