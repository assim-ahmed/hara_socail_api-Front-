import { create } from 'zustand';
import profileService from '../services/api/profileService';

const useProfileStore = create((set, get) => ({
  // State
  profile: null,
  userPosts: [],
  stats: { posts_count: 0, friends_count: 0, likes_received: 0 },
  isLoadingProfile: false,
  isLoadingPosts: false,
  hasMorePosts: true,
  currentPage: 1,
  error: null,

  // جلب الملف الشخصي
  fetchProfile: async (identifier) => {
    set({ isLoadingProfile: true, error: null });
    try {
      const response = await profileService.getProfile(identifier);
      if (response.data.success) {
        set({ profile: response.data.data.user, isLoadingProfile: false });
        await get().fetchStats(response.data.data.user.id);
        return { success: true };
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'فشل جلب الملف الشخصي', isLoadingProfile: false });
      return { success: false };
    }
  },

  // جلب منشورات المستخدم
  fetchUserPosts: async (userId, page = 1, refresh = false) => {
    if (get().isLoadingPosts) return;
    set({ isLoadingPosts: true });
    try {
      const response = await profileService.getUserPosts(userId, page);
      if (response.data.success) {
        const newPosts = response.data.data.posts;
        set({
          userPosts: refresh ? newPosts : [...get().userPosts, ...newPosts],
          isLoadingPosts: false,
          hasMorePosts: newPosts.length === 10, // افترض 10 منشورات في كل صفحة
          currentPage: page,
        });
      } else {
        set({ isLoadingPosts: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message, isLoadingPosts: false });
    }
  },

  // جلب إحصائيات المستخدم
  fetchStats: async (userId) => {
    try {
      const response = await profileService.getUserStats(userId);
      if (response.data.success) {
        set({ stats: response.data.data });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  // تحديث الملف الشخصي
  updateProfile: async (data) => {
    set({ isLoadingProfile: true, error: null });
    try {
      const response = await profileService.updateProfile(data);
      if (response.data.success) {
        set({ profile: { ...get().profile, ...data }, isLoadingProfile: false });
        return { success: true };
      }
    } catch (error) {
      set({ error: error.response?.data?.message, isLoadingProfile: false });
      return { success: false };
    }
  },

  clearError: () => set({ error: null }),
  resetPosts: () => set({ userPosts: [], hasMorePosts: true, currentPage: 1 }),
}));

export default useProfileStore;