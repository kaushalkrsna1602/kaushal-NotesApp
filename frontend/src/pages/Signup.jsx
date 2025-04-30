import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../context/constants';

const Signup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        BASE_URL + '/auth/signup',
        formData,
        { withCredentials: true }
      );
      setUser({ id: res.data.userId });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: 'spring', damping: 12, stiffness: 100 }}
      >
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center text-blue-600 dark:text-blue-400" // Same color as Login
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-500 mb-3 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500" // Same focus color
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500" // Same focus color
            required
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Choose a strong password"
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500" // Same focus color
              required
              whileFocus={{ scale: 1.02 }}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              {passwordVisible ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800" // Same button color
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign Up
        </motion.button>

        <motion.p
          className="mt-6 text-sm text-center text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Log In</a> {/* Same link color */}
        </motion.p>
      </motion.form>
    </div>
  );
};

export default Signup;