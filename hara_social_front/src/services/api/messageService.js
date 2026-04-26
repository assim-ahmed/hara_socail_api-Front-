// services/api/messageService.js
import axiosInstance from './axios';

const messageService = {


getAllConversations: (userId) => axiosInstance.post(`/api/messages.php?action=get_all_conversations`, { user_id: userId }),

  getOldMessages : (user1,user2)=> axiosInstance.post(`/api/messages.php?action=get_messages`,{user1,user2}),
  
};

export default messageService;