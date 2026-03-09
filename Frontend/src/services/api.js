import axios from 'axios';

// Ek custom instance banao
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Aapka backend URL
});

// --- Request Interceptor ---
// Yeh function har request jaane se pehle check karega
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Response Interceptor ---
// Agar token expire ho gaya ya 401 error aaya, toh user ko logout kar do
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login'; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;