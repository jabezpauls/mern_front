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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-teal-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg transition transform hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          ✏️ Edit Product
        </h2>

        {['name', 'category', 'price', 'quantity', 'status'].map((field) => (
          <div key={field} className="mb-5">
            <label className="block text-gray-700 font-medium mb-2 capitalize">
              {field}
            </label>
            <input
              type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
              name={field}
              value={product[field]}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 transition-all outline-none bg-gray-100"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-lg"
        >
          ✅ Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProduct
