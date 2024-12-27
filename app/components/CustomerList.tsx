import { useState, useRef } from 'react'
import Image from 'next/image'
import CameraCapture from './CameraCapture'

export default function CustomerList({ customers, addCustomer }) {
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [customerAvatar, setCustomerAvatar] = useState('/default-avatar.png')
  const fileInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCustomerName.trim()) {
      addCustomer({
        name: newCustomerName.trim(),
        phone: newCustomerPhone.trim(),
        dateAdded: new Date().toISOString(),
        avatar: customerAvatar
      })
      setNewCustomerName('')
      setNewCustomerPhone('')
      setCustomerAvatar('/default-avatar.png')
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomerAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = (imageSrc) => {
    setCustomerAvatar(imageSrc)
    setShowCamera(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name (required)</label>
          <input
            id="name"
            type="text"
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
            placeholder="Customer name"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone Number (optional)</label>
          <input
            id="phone"
            type="tel"
            value={newCustomerPhone}
            onChange={(e) => setNewCustomerPhone(e.target.value)}
            placeholder="Phone number"
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Customer Avatar</label>
          <div className="flex items-center space-x-4">
            <Image 
              src={customerAvatar} 
              alt="Customer Avatar" 
              width={100} 
              height={100} 
              className="rounded-full"
            />
            <button 
              type="button" 
              onClick={() => setShowCamera(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Take Photo
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Upload Photo
            </button>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
          Add Customer
        </button>
      </form>
      {showCamera && (
        <CameraCapture onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {customers.map(customer => (
          <div key={customer.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full h-48 relative">
              <Image 
                src={customer.avatar || '/default-avatar.png'} 
                alt={`${customer.name}'s avatar`} 
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{customer.name}</h3>
              <p className="text-gray-700 font-bold mb-2">
                {customer.phone || 'No phone number provided'}
              </p>
              <p className="text-sm text-gray-500">
                Added: {new Date(customer.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

