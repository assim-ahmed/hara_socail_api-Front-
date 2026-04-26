import { create } from 'zustand';
import postService from '../services/api/postService';

const usePostStore = create((set, get) => ({
  // State
  posts: [],
  currentPage: 1,
  hasMore: true,
  isLoading: false,
  isCreating: false,
  error: null,

  // جلب الـ Feed
  fetchFeed: async (page = 1, refresh = false) => {
    if (get().isLoading) return;
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await postService.getFeed(page);
      
      if (response.data.success) {
        const newPosts = response.data.data.posts;
        const pagination = response.data.data.pagination;
        
        set({
          posts: refresh ? newPosts : [...get().posts, ...newPosts],
          currentPage: page,
          hasMore: page < pagination.total_pages,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'فشل جلب المنشورات',
        isLoading: false 
      });
    }
  },

  // إنشاء منشور جديد
  createPost: async (content) => {
    set({ isCreating: true, error: null });
    
    try {
      const response = await postService.createPost(content);
      
      if (response.data.success) {
        // أضف المنشور الجديد في بداية القائمة
        set({ 
          posts: [response.data.data.post, ...get().posts],
          isCreating: false 
        });
        return { success: true, post: response.data.data.post };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'فشل نشر المنشور';
      set({ error: message, isCreating: false });
      return { success: false, error: message };
    }
  },

  // إعجاب أو إزالة إعجاب
  toggleLike: async (postId) => {
    try {
      const response = await postService.likePost(postId);
      
      if (response.data.success) {
        const action = response.data.data.action;
        
        // تحديث المنشور في القائمة
        set({
          posts: get().posts.map(post => 
            post.id === postId
              ? {
                  ...post,
                  user_liked: action === 'liked' ? 1 : 0,
                  likes_count: action === 'liked' 
                    ? parseInt(post.likes_count) + 1 
                    : parseInt(post.likes_count) - 1
                }
              : post
          )
        });
        return { success: true, action };
      }
    } catch (error) {
      console.error('Like error:', error);
      return { success: false };
    }
  },

  // حذف منشور
  deletePost: async (postId) => {
    try {
      const response = await postService.deletePost(postId);
      
      if (response.data.success) {
        set({
          posts: get().posts.filter(post => post.id !== postId)
        });
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  // مسح الأخطاء
  clearError: () => set({ error: null }),
}));

export default usePostStore;