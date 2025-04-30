import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NoteCard from '../components/NoteCard';
import { BASE_URL } from '../context/constants';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(BASE_URL + '/note', {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(BASE_URL + `/note/${editingId}`, form, {
          withCredentials: true,
        });
      } else {
        await axios.post(BASE_URL + '/note', form, {
          withCredentials: true,
        });
      }
      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = note => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(BASE_URL + `/note/${id}`, {
        withCredentials: true,
      });
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <motion.main
          className="flex-1 overflow-y-auto p-8 md:p-10 lg:p-12 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {editingId ? 'Edit Note' : 'Create New Note'}
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              placeholder="Content"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              rows="4"
            />
            <motion.button
              type="submit"
              className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {editingId ? 'Update Note' : 'Add Note'}
            </motion.button>
          </motion.form>

          <motion.h2
            className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-white mb-4"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Notes
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" // Increased gap for better spacing
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {notes.map(note => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <NoteCard
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;