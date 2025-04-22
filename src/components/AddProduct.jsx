import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

const AddProduct = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  })

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to add products')
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      await axios.post(`${API_BASE_URL}/products`, product, config)
      navigate('/dash')
    } catch (error) {
      console.error('Error adding product:', error)
      setError(error.response?.data?.message || 'Error adding product. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-slate-800">Add New Product</h2>
          <p className="mt-2 text-sm text-slate-600">Enter the product details below</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          {['name', 'category', 'price', 'quantity'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                name={field}
                value={product[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
                required
              />
            </div>
          ))}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
