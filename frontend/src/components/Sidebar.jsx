import { motion } from 'framer-motion';
import { BookOpenIcon } from '@heroicons/react/24/outline'; // Example icon

const Sidebar = () => {
  return (
    <motion.aside
      className="w-64 bg-white dark:bg-gray-800 hidden md:flex flex-col shadow-md" // Changed to flex column for better content flow
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }} // Slightly faster animation
    >
      <motion.div
        className="flex items-center justify-center h-16 p-4 text-lg font-semibold text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700" // Centered, added border, and a touch of branding color
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <BookOpenIcon className="w-6 h-6 mr-2" /> {/* Example icon */}
        My Notes
      </motion.div>
      <motion.nav
        className="p-4 mt-2 space-y-3" // Adjusted padding and spacing
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.a
          href="/dashboard"
          className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 dark:hover:text-blue-400 transition duration-150 ease-in-out" // Added padding, rounded corners, hover background, and smoother transition
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BookOpenIcon className="w-5 h-5 mr-2" /> {/* Using the same icon */}
          All Notes
        </motion.a>
        {/* More nav items can be added here in a similar structure */}
        {/* Example:
        <motion.a
          href="/protected"
          className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-500 dark:hover:text-green-400 transition duration-150 ease-in-out"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LockClosedIcon className="w-5 h-5 mr-2" />
          Protected Notes
        </motion.a>
        */}
      </motion.nav>
      {/* You could add a user profile section or other elements at the bottom */}
    </motion.aside>
  );
};

export default Sidebar;