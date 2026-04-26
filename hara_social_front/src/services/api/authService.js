import axiosInstance from './axios';

const authService = {
  // تسجيل الدخول
  login: async (credentials) => {
    return axiosInstance.post('/api/auth.php?action=login', credentials);
  },

  // تسجيل مستخدم جديد

 register: async (formData) => {
    // إرسال FormData مباشرةً - axios سيحدد الـ Content-Type تلقائياً
    return await axiosInstance.post('/api/auth.php?action=register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // جلب بيانات المستخدم الحالي
  getMe: async () => {
    return axiosInstance.get('/api/auth.php?action=me');
  },

  // تحديث الملف الشخصي
  updateProfile: async (profileData) => {
    return axiosInstance.put('/api/auth.php?action=update', profileData);
  },

  // تجديد التوكن
  refreshToken: async (token) => {
    return axiosInstance.post('/api/auth.php?action=refresh', {token});
  },

  // تسجيل الخروج
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

export default authService;