import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const navigate = useNavigate()
  const { login, error, setError } = useAuth()

  const validateForm = () => {
    const errors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
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
        await login(formData.email, formData.password)
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
          <h2 className="text-2xl font-light text-slate-800">Sign in to your account</h2>
          <p className="mt-2 text-sm text-slate-600">Or create a new account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                formErrors.email ? 'border-red-300' : 'border-slate-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                formErrors.password ? 'border-red-300' : 'border-slate-300'
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
            />
            {formErrors.password && (
              <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-slate-600 hover:text-slate-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Sign in
            </button>
            
            <div className="text-center">
              <Link to="/register" className="text-sm text-slate-600 hover:text-slate-500">
                Don't have an account? Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login 