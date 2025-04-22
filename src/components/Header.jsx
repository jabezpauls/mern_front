import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Med<span className="text-yellow-300">Equip</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dash"
                  className="hover:text-yellow-300 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add"
                  className="hover:text-yellow-300 transition"
                >
                  Add Product
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md transition"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-md transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="hover:text-yellow-300 transition"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dash"
                  className="hover:text-yellow-300 transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/add"
                  className="hover:text-yellow-300 transition"
                >
                  Add Product
                </Link>
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md transition w-fit"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md transition text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 rounded-md transition text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
