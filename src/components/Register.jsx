import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()
  const { register, error, setError } = useAuth()

  const validateForm = () => {
    const errors = {}
    if (!formData.name) {
      errors.name = 'Name is required'
    }
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    if (!formData.phone) {
      errors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits'
    }
    if (!formData.location) {
      errors.location = 'Location is required'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    if (validateForm()) {
      try {
        await register(formData)
        navigate('/dash')
      } catch (err) {
        // Error is handled by the auth context
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-slate-800">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">Join MedEquip to manage your inventory</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          {['name', 'email', 'password', 'phone', 'location'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors[field] ? 'border-red-300' : 'border-slate-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
              />
              {formErrors[field] && (
                <p className="mt-1 text-sm text-red-600">{formErrors[field]}</p>
              )}
            </div>
          ))}

          <div className="mt-6 space-y-3">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Register
            </button>
            
            <div className="text-center">
              <Link to="/login" className="text-sm text-slate-600 hover:text-slate-500">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register 