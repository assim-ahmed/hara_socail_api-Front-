import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/api/authService';
import websocketService from '../services/websocket/chatSocket'


const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email_or_username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ email_or_username, password });

          if (response.data.success) {
            const { user, token } = response.data.data;
             
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            return { success: true };
          } else {
            set({ error: response.data.message, isLoading: false });
            return { success: false, error: response.data.message };
          }
        } catch (error) {
          const message = error.response?.data?.message || 'حدث خطأ في الاتصال';
          set({ error: message, isLoading: false });
          return { success: false, error: message };
        }
      },

      register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      // formData يمكن أن يكون FormData (مع صورة) أو كائن عادي
      const response = await authService.register(formData);

      if (response.data.success) {
        const { user, token } = response.data.data;
        // حفظ التوكن في localStorage
        localStorage.setItem('token', token);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return { success: true };
      } else {
        set({ error: response.data.message, isLoading: false });
        return { success: false, error: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'حدث خطأ في التسجيل';
      set({ error: message, isLoading: false });
      return { success: false, error: message };
    }
      },

      logout: async () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        websocketService.disconnect();
      },

      setToken: (token) => {
        set({ token });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);

export default useAuthStore;