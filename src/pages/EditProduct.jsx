import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    status: '',
  })

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_BASE_URL}/products/${id}`, product)
      navigate('/')
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-900">Edit Product</h2>
          <p className="mt-2 text-sm text-gray-600">Update the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6">
          {['name', 'category', 'price', 'quantity', 'status'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
                name={field}
                value={product[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
          ))}

          <div className="mt-6 space-y-3">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
