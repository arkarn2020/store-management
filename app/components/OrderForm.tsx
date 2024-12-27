import { useState } from 'react'

export default function OrderForm({ customers, selectedCustomer, addOrder }) {
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }])
  const [status, setStatus] = useState('unpaid')

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    if (field === 'quantity') {
      newItems[index][field] = value === '' ? '' : Math.max(1, parseInt(value) || 0)
    } else if (field === 'price') {
      newItems[index][field] = value === '' ? '' : Math.max(0, parseFloat(value) || 0)
    } else {
      newItems[index][field] = value
    }
    setItems(newItems)
  }

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }])
  }

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedCustomer && items.length > 0) {
      const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0)
      addOrder({
        customerName: selectedCustomer.name,
        items,
        total,
        status,
        date: new Date().toISOString()
      })
      setItems([{ name: '', quantity: 1, price: 0 }])
      setStatus('unpaid')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Customer:</label>
        <input
          type="text"
          value={selectedCustomer ? selectedCustomer.name : ''}
          readOnly
          className="border p-2 w-full"
        />
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex space-x-2">
          <input
            type="text"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            placeholder="Item name"
            className="border p-2 flex-grow"
          />
          <input
            type="number"
            value={item.quantity.toString()}
            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
            min="1"
            className="border p-2 w-20"
          />
          <input
            type="number"
            value={item.price.toString()}
            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
            min="0"
            step="0.01"
            className="border p-2 w-24"
          />
          <button type="button" onClick={() => removeItem(index)} className="bg-red-500 text-white px-2 py-1 rounded">
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Item
      </button>
      <div>
        <label className="block mb-2">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Order
      </button>
    </form>
  )
}

