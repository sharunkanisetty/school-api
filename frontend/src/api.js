// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://school-api-backend.onrender.com', // Prefix is correct here
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
