import axiosInstance from './axios';

const postService = {
  // جلب منشورات الأصدقاء (Feed)
  getFeed: (page = 1, limit = 10) => {
    return axiosInstance.get(`/api/posts.php?feed=true&page=${page}&limit=${limit}`);
  },

  // إنشاء منشور جديد
  createPost: (content) => {
    return axiosInstance.post('/api/posts.php', { content });
  },

  // إعجاب أو إزالة إعجاب
  likePost: (postId) => {
    return axiosInstance.post('/api/posts.php?like=true', { post_id: postId });
  },

  // حذف منشور
  deletePost: (postId) => {
    return axiosInstance.delete(`/api/posts.php?id=${postId}`);
  },

  // جلب منشورات مستخدم معين
  getUserPosts: (userId, page = 1) => {
    return axiosInstance.get(`/api/posts.php?user_id=${userId}&page=${page}`);
  },
};

export default postService;