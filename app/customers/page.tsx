'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomerList from '../components/CustomerList'

export default function Customers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
    setCustomers(storedCustomers)
  }, [])

  const addCustomer = (customerData) => {
    const newCustomer = { 
      id: Date.now(), 
      ...customerData
    }
    const updatedCustomers = [...customers, newCustomer]
    setCustomers(updatedCustomers)
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Customers</h1>
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Home
      </Link>
      <CustomerList 
        customers={customers} 
        addCustomer={addCustomer}
      />
    </div>
  )
}

