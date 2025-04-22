import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch user profile
  const fetchUserProfile = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, config)
      setUser(data)
      setLoading(false)
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
      setLoading(false)
      setError(error.response?.data?.message || 'An error occurred')
    }
  }

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${API_BASE_URL}/api/users/register`, userData)
      localStorage.setItem('token', data.token)
      setUser(data)
      setError(null)
      return data
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password
      })
      localStorage.setItem('token', data.token)
      setUser(data)
      setError(null)
      return data
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 