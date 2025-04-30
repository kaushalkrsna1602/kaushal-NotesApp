import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'; // Using Heroicons for icons

const Topbar = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <motion.header
      className="flex justify-between items-center py-3 px-4 bg-white dark:bg-zinc-900 shadow-sm border-b border-gray-200 dark:border-zinc-800" // Adjusted padding, added subtle border
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400"> {/* Added a touch of branding color */}
        My Notes
      </div>

      <div className="flex gap-3 items-center"> {/* Reduced gap slightly */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" // More refined button style
          style={{ backgroundColor: darkMode ? '#374151' : '#e5e7eb', color: darkMode ? '#f3f4f6' : '#374151' }} // Dynamic background and text color
        >
          {darkMode ? <SunIcon className="w-5 h-5 mr-2" /> : <MoonIcon className="w-5 h-5 mr-2" />} {/* Using icons */}
          {darkMode ? 'Light' : 'Dark'} Mode
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-colors duration-200" // More refined button style
        >
          Logout
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Topbar;