import axios from 'axios';

const baseURL = 
  process.env.NODE_ENV === 'production'
    ? 'https://school-api-backend.onrender.com/api'  // production
    : 'http://localhost:5003/api';                   // development

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
