'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import OrderForm from '../components/OrderForm'
import OrderList from '../components/OrderList'

export default function Orders() {
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setCustomers(storedCustomers)
    setOrders(storedOrders)
  }, [])

  const addOrder = (order) => {
    const newOrder = { ...order, id: Date.now() }
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">New Order</h2>
          <OrderForm 
            customers={customers} 
            selectedCustomer={selectedCustomer}
            addOrder={addOrder}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customer Selection</h2>
          <select 
            onChange={(e) => setSelectedCustomer(customers.find(c => c.id === parseInt(e.target.value)))}
            className="border p-2 w-full"
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
        <OrderList 
          orders={orders}
          updateOrderStatus={updateOrderStatus}
        />
      </div>
    </div>
  )
}

