'use client'

import Link from 'next/link'
import { ClipboardList, Users, Search } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">General Store Management</h1>
      <div className="w-full max-w-md space-y-4">
        <Link 
          href="/orders" 
          className="flex items-center justify-between w-full bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <span className="text-lg font-semibold">New Order</span>
          <ClipboardList size={24} />
        </Link>
        <Link 
          href="/customers" 
          className="flex items-center justify-between w-full bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          <span className="text-lg font-semibold">Customers</span>
          <Users size={24} />
        </Link>
        <Link 
          href="/search-orders" 
          className="flex items-center justify-between w-full bg-purple-500 text-white px-6 py-4 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <span className="text-lg font-semibold">Search Orders</span>
          <Search size={24} />
        </Link>
      </div>
    </div>
  )
}

