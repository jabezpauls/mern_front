import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.h1 
            className="text-4xl font-light text-slate-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to <span className="text-slate-600">MedEquip</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Streamline your medical equipment management with our intuitive inventory system.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/dash">
              <button className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-slate-700 border border-slate-600 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                View Dashboard
              </button>
            </Link>

            <Link to="/add">
              <button className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                Add New Product
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Inventory Management</h3>
            <p className="text-slate-600">Efficiently track and manage your medical equipment inventory.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Real-time Updates</h3>
            <p className="text-slate-600">Stay informed with instant updates on your inventory status.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Easy to Use</h3>
            <p className="text-slate-600">Simple and intuitive interface for seamless operation.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
