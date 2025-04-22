import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-700 to-purple-900 text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Hero Section */}
      <motion.div 
        className="text-center z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 animate-pulse">
          Welcome to <span className="text-yellow-400">MedEquip</span>
        </h1>
        <p className="text-lg opacity-90">
          The ultimate solution for managing medical equipment efficiently.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-6 justify-center">
          <Link to="/dashboard">
            <motion.button 
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Go to Dashboard
            </motion.button>
          </Link>

          <Link to="/add">
            <motion.button 
              className="bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded-lg font-bold shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add New Product
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Animated Equipment Showcase */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <img 
          src="https://source.unsplash.com/1000x400/?hospital,medical" 
          alt="Medical Equipment" 
          className="rounded-xl shadow-xl"
        />
      </motion.div>
    </div>
  );
};

export default Home;
