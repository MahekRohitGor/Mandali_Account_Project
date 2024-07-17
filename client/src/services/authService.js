import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const getPortfolio = async () => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/portfolio', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio: ' + response.statusText);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch portfolio:', error.message);
    }
  };

  export const logout = () => {
    localStorage.removeItem('token');
  };