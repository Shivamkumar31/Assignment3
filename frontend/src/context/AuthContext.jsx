// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock user data for simplicity
const MOCK_USER = {
  id: 1,
  username: 'JaneDoe',
  email: 'jane.doe@example.com',
  name: 'Jane Doe',
  // Note: we fetch full details in the Profile page
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    // Mock authentication: In a real app, you'd call an API here.
    if (email === MOCK_USER.email && password === 'password') {
      localStorage.setItem('user', JSON.stringify(MOCK_USER));
      setUser(MOCK_USER);
      navigate('/dashboard');
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (username, email, password) => {
    // Mock registration: In a real app, you'd call an API here.
    // For this mock, we just log in the mock user after "signup"
    localStorage.setItem('user', JSON.stringify(MOCK_USER));
    setUser(MOCK_USER);
    navigate('/dashboard');
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};