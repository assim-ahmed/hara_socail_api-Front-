// services/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ أضف interceptor لإضافة التوكن تلقائياً
axiosInstance.interceptors.request.use(
  (config) => {
    // جلب التوكن من localStorage
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        const token = parsed?.state?.token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn('⚠️ No token found');
        }
      }
    } catch (error) {
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;