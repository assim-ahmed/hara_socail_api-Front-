import axiosInstance from './axios';

const friendService = {

  // جلب طلبات الصداقة الواردة
  getFriendRequests: () => {
    return axiosInstance.get('/api/friends.php?requests=true');
  },


  // إرسال طلب صداقة
  sendFriendRequest: (friendId) => {
    return axiosInstance.post('/api/friends.php?action=send', { friend_id: friendId });
  },

  // قبول طلب صداقة
  acceptFriendRequest: (requestId) => {
    return axiosInstance.post('/api/friends.php?action=accept', { request_id: requestId });
  },

  // رفض طلب صداقة
  rejectFriendRequest: (requestId) => {
    return axiosInstance.post('/api/friends.php?action=reject', { request_id: requestId });
  },

  // إزالة صديق
  removeFriend: (friendId) => {
    return axiosInstance.delete(`/api/friends.php?friend_id=${friendId}`);
  },

  // البحث عن مستخدمين
  searchUsers: (query) => {
    return axiosInstance.get(`/api/friends.php?q=${query}`);
  },
};

export default friendService;