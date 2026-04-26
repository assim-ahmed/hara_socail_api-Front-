import axiosInstance from './axios';

const profileService = {
  // جلب ملف شخصي
  getProfile: (identifier) => {
    return axiosInstance.get(`/api/users.php?profile=${identifier}`);
  },

  // تحديث الملف الشخصي
  updateProfile: (data) => {
    return axiosInstance.put('/api/auth.php?action=update', data);
  },

  // رفع صورة الملف الشخصي
  uploadAvatar: (formData) => {
    return axiosInstance.post('/api/users.php?action=upload-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  // جلب منشورات المستخدم (أضف هذه الدالة)
  getUserPosts: (userId, page = 1) => {
    return axiosInstance.get(`/api/posts.php?user_id=${userId}&page=${page}`);
  },

  // إحصائيات المستخدم
  getUserStats: (userId) => {
    return axiosInstance.get(`/api/users.php?stats=${userId}`);
  },
};

export default profileService;