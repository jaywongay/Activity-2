// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (email, username, password) =>
    api.post('/auth/register', { email, username, password }),
  
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword }),
};

// Notes API
export const notesAPI = {
  getAll: () => api.get('/notes'),
  
  create: (title, content, color = 'default') => 
    api.post('/notes', { title, content, color }),
  
  update: (id, title, content, color = 'default') => 
    api.put(`/notes/${id}`, { title, content, color }),
  
  delete: (id) => api.delete(`/notes/${id}`),
};

export default api;