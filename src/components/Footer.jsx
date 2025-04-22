import React from 'react'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">
            Med<span className="text-blue-400">Equip</span>
          </h2>
          <p className="text-sm">© {new Date().getFullYear()} MedEquip. All Rights Reserved.</p>
        </div>

        {/* Social Media */}
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-blue-400 transition"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition"
            aria-label="Twitter"
          >
            <Twitter size={24} />
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
