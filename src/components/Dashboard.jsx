import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`);
        fetchProducts(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">📋 Product List</h1>
        <Link
          to="/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          ➕ Add Product
        </Link>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-6 font-medium text-left">Name</th>
              <th className="py-3 px-6 font-medium text-left">Category</th>
              <th className="py-3 px-6 font-medium text-left">Price</th>
              <th className="py-3 px-6 font-medium text-left">Quantity</th>
              <th className="py-3 px-6 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">{product.category}</td>
                <td className="py-3 px-6">${product.price}</td>
                <td className="py-3 px-6">{product.quantity}</td>
                <td className="py-3 px-6 flex justify-center gap-4">
                  {/* Edit Button */}
                  <Link
                    to={`/edit/${product._id}`}
                    className="text-blue-500 hover:text-blue-600 transition"
                  >
                    ✏️ Edit
                  </Link>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
