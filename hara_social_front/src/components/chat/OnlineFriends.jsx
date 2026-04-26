// components/chat/OnlineFriends.jsx
import React from 'react';
import useAuthStore from '../../store/authStore';
import useChatStore from '../../store/chatStore';
import { UserCircleIcon, UsersIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const OnlineFriends = ({ onSelectFriend }) => {  // ✅ استقبال prop الـ onSelectFriend
  const { user } = useAuthStore();
  const { onlineUsers } = useChatStore();
  const otherOnlineUsers = onlineUsers.filter(u => u.id !== user?.id);

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-t-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-white text-lg">المتصلين</h3>
          </div>
          <div className="bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-green-100 font-medium">
              {otherOnlineUsers.length} متصل
            </span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {otherOnlineUsers.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCircleIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">لا يوجد متصلين</p>
            <p className="text-sm text-gray-400 mt-1">أضف أصدقاء لبدء المحادثة</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {otherOnlineUsers.map((friend) => (
              <div
                key={friend.id}
                onClick={() => onSelectFriend(friend)}  // ✅ استدعاء الدالة الممررة
                className="group flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 cursor-pointer transition-all duration-200"
              >
                <div className="relative flex-shrink-0">
                  {friend.profile_pic ? (
                    <img
                      src={`http://localhost:2000/${friend.profile_pic}`}
                      alt={friend.username}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-md"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md">
                      {friend.full_name?.charAt(0) || friend.username?.charAt(0)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate group-hover:text-green-600 transition-colors text-sm">
                    {friend.full_name || friend.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">@{friend.username}</p>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-1.5 rounded-full shadow-md">
                    <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineFriends;