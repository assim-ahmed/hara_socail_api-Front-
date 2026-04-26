// stores/chatStore.js
import { create } from 'zustand';
import websocketService from '../services/websocket/chatSocket';
import messageService from '../services/api/messageService'

const useChatStore = create((set, get) => ({
    // State
    messages: [],
    oldMessages : [],
    onlineUsers: [],
    typingUsers: {},
    conversations: [],
    // Actions
    connect: (userId) => {
        websocketService.connect(userId);

        websocketService.on('new_message', (data)=>{
            get().addMessage(data);
        });

        websocketService.on('user_typing', (data) => {
            get().setTypingStatus(data.user_id, data.is_typing);
        });

        websocketService.on('online_users', (data) => {

            if (data.users.some((u) => !u)) {
                data.users.splice(data.users.findIndex((u) => !u), 1);
            }
            set({ onlineUsers: data.users });

        });
    },

    addMessage: (message) => {
        set((state) => ({
            messages: [...state.messages, message]
        }));
    },

    setTypingStatus: (userId, isTyping) => {
        set((state) => ({
            typingUsers: {
                ...state.typingUsers,
                [userId]: isTyping
            }
        }));
    },

    sendMessage(senderId, receiverId, message) {
        websocketService.sendMessage(senderId, receiverId, message);

    },

    sendTyping: (senderId, receiverId, isTyping) => {
        websocketService.sendTyping(senderId, receiverId, isTyping);
    },

    updateStatus: (isOnline) => {
        websocketService.updateStatus(isOnline);
    },

    getOldMessages: async (user1, user2) => {
        try {
            const response = await messageService.getOldMessages(user1, user2);
            if (response.data.success) {
                // ✅ تخزين الرسائل بشكل منفصل عشان ما تتعارض مع الجديدة
                set({ oldMessages: response.data.data.messages });
            }
        } catch (error) {
            console.error("Error loading old messages:", error);
        }
    },

    getAllConversations: async (userId) => {
        try {
            const response = await messageService.getAllConversations(userId);
            if (response.data.success) {
                set({ conversations: response.data.data.conversations });
                return response.data.data.conversations;
            }
        } catch (error) {
            console.error("Error loading conversations:", error);
            return [];
        }
    },

    disconnect: () => {
        websocketService.disconnect();
        set({
            messages: [],
            onlineUsers: [],
            typingUsers: {}
        });
    },

    clearMessages: () => {
        set({ messages: [] });
    }
}));

export default useChatStore;