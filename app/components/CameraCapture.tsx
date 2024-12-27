'use client'

import { useRef, useEffect, useState } from 'react'

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let stream = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        setError('Failed to access camera. Please ensure you have given permission.')
        console.error('Error accessing the camera:', err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.drawImage(videoRef.current, 0, 0, 300, 150)
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
      onCapture(imageDataUrl)
    }
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded">
          <p className="text-red-500">{error}</p>
          <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <video ref={videoRef} autoPlay className="mb-4" />
        <canvas ref={canvasRef} width={300} height={150} className="hidden" />
        <div className="flex justify-between">
          <button onClick={capturePhoto} className="bg-green-500 text-white px-4 py-2 rounded">
            Capture
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

