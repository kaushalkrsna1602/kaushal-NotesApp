import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="text-center p-8 bg-white dark:bg-gray-800 shadow-xl rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
