import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-md shadow-md p-5 group transition-all duration-200 hover:shadow-lg relative cursor-pointer ${
        isExpanded ? 'h-auto' : 'h-48 overflow-hidden' // Set initial and expanded heights
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, type: 'spring', damping: 12, stiffness: 100 }}
      onClick={toggleExpand} // Add onClick to toggle expansion
    >
      <motion.h3
        className="text-lg font-semibold text-gray-800 dark:text-white mb-2 truncate"
        layout
      >
        {note.title}
      </motion.h3>

      <motion.p
        className={`text-gray-600 dark:text-gray-300 text-sm break-words ${isExpanded ? '' : 'line-clamp-6'}`} // Apply line-clamp when not expanded
        layout
      >
        {note.content}
      </motion.p>

      <motion.div
        className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()} 
      >
        <motion.button
          onClick={() => onEdit(note)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiEdit size={16} />
          <span className="sr-only">Edit</span>
        </motion.button>

        <motion.button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiTrash2 size={16} />
          <span className="sr-only">Delete</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default NoteCard;