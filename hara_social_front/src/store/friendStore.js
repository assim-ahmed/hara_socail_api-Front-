import { create } from 'zustand';
import friendService from '../services/api/friendService';

const useFriendStore = create((set, get) => ({
  // State
  suggestions: [],
  friends: [],
  requests: [],
  searchResults: [],
  isLoading: false,
  error: null,

  // جلب الأصدقاء
  fetchFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await friendService.getFriends();
      if (response.data.success) {
        set({ friends: response.data.data.friends, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'فشل جلب الأصدقاء', isLoading: false });
    }
  },

  // جلب طلبات الصداقة
  fetchRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await friendService.getFriendRequests();
      if (response.data.success) {
        set({ requests: response.data.data.requests, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'فشل جلب الطلبات', isLoading: false });
    }
  },

  fetchSuggestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await friendService.getSuggestions();
      if (res.data.success) {
        set({ suggestions: res.data.data.suggestions, isLoading: false });
      } else {
        set({ error: res.data.message, isLoading: false });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'فشل جلب الاقتراحات', isLoading: false });
    }
  },

  // إرسال طلب صداقة
  sendRequest: async (friendId) => {
    try {
      const response = await friendService.sendFriendRequest(friendId);
      if (response.data.success) {
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  // قبول طلب صداقة
  acceptRequest: async (requestId, friendId) => {
    try {
      const response = await friendService.acceptFriendRequest(requestId);
      if (response.data.success) {
        // إزالة الطلب من القائمة
        set({ requests: get().requests.filter(r => r.request_id !== requestId) });
        // إعادة جلب الأصدقاء
        await get().fetchFriends();
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  // رفض طلب صداقة
  rejectRequest: async (requestId) => {
    try {
      const response = await friendService.rejectFriendRequest(requestId);
      if (response.data.success) {
        set({ requests: get().requests.filter(r => r.request_id !== requestId) });
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  // إزالة صديق
  removeFriend: async (friendId) => {
    try {
      const response = await friendService.removeFriend(friendId);
      if (response.data.success) {
        set({ friends: get().friends.filter(f => f.id !== friendId) });
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  },

  // البحث عن مستخدمين
  searchUsers: async (query) => {
        if (!query.trim()) {
            set({ searchResults: [] });  // ✅ مصفوفة فارغة
            return;
        }
        set({ isLoading: true });
        try {
            const response = await friendService.searchUsers(query);
            if (response.data.success) {
                const users = response.data.data?.users || [];
                console.log(response.data);
                
                set({ searchResults: users, isLoading: false });
            }
        } catch (error) {
            set({ searchResults: [], error: error.response?.data?.message, isLoading: false });  // ✅ مصفوفة فارغة
        }
    },

  clearError: () => set({ error: null }),
}));

export default useFriendStore;