'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Search from '../components/Search'
import OrderTable from '../components/OrderTable'

export default function SearchOrders() {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [todayOrderCount, setTodayOrderCount] = useState(0)

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(storedOrders)

    const today = new Date().toDateString()
    const todayOrders = storedOrders.filter(order => 
      new Date(order.date).toDateString() === today
    )
    setTodayOrderCount(todayOrders.length)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const results = orders.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchTerm, orders])

  const updateOrderStatus = (orderId, status) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))

    if (searchTerm) {
      setSearchResults(updatedOrders.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Search Orders</h1>
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Home
      </Link>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Today's Orders: {todayOrderCount}</h2>
      </div>
      <Search setSearchTerm={setSearchTerm} />
      {searchTerm && (
        <OrderTable 
          orders={searchResults}
          updateOrderStatus={updateOrderStatus}
        />
      )}
    </div>
  )
}

