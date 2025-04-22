import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", { name, email, phone, location })
      .then((result) => setStatus(result.data))
      .catch((err) => setStatus(err.message));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6">
      {/* Animated Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30"
      >
        {/* Heading with Animation */}
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-2xl font-bold text-white mb-6 text-center"
        >
          Registration Form
        </motion.h3>

        {/* Input Fields */}
        {[
          { label: "Name", value: name, setter: setName, type: "text" },
          { label: "Email", value: email, setter: setEmail, type: "email" },
          { label: "Phone", value: phone, setter: setPhone, type: "tel" },
          { label: "Location", value: location, setter: setLocation, type: "text" },
        ].map(({ label, value, setter, type }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="mb-4"
          >
            <label className="block text-white font-medium mb-2">{label}</label>
            <input
              type={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full px-4 py-2 border border-white/40 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
              placeholder={`Enter your ${label.toLowerCase()}`}
              required
            />
          </motion.div>
        ))}

        {/* Submit Button with Hover Animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Sign Up
          </button>
        </motion.div>

        {/* Status Message with Bounce Animation */}
        {status && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-4 text-center text-white font-semibold"
          >
            {status}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}

export default RegisterForm;
