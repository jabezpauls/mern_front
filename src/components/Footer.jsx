import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-slate-100 mb-4">MedEquip</h3>
            <p className="text-slate-400 text-sm">
              Streamlining medical equipment management for healthcare professionals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-slate-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-slate-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dash" className="text-slate-400 hover:text-slate-200 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-slate-400 hover:text-slate-200 text-sm">
                  Add Product
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-slate-100 mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Email: support@medequip.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Medical Center Dr</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-700 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MedEquip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
