import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from './constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const verifyUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/auth/verify', {
        withCredentials: true,
      });
      setUser({ id: res.data.userId });
    } catch (err) {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    await axios.get(BASE_URL + '/auth/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
