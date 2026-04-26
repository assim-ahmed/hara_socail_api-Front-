// components/chat/ConversationsList.jsx
import React, { useEffect } from 'react';
import useChatStore from '../../store/chatStore';
import useAuthStore from '../../store/authStore';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const ConversationsList = ({ onSelectConversation }) => {
    const { user } = useAuthStore();
    const { conversations, getAllConversations, onlineUsers } = useChatStore();
    
    useEffect(() => {
        if (user?.id) {
            getAllConversations(user.id);
        }
    }, [user?.id]);
    
    return (
        <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-4">
                <h3 className="font-bold text-lg text-white">المحادثات</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>لا توجد محادثات بعد</p>
                        <p className="text-sm mt-1">ابدأ محادثة جديدة مع أصدقائك</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {conversations.map((conv) => {
                            const otherUser = conv.other_user;
                            const isOnline = onlineUsers.some(u => u.id === otherUser?.id);
                            
                            return (
                                <div
                                    key={conv.conversation_id}
                                    onClick={() => onSelectConversation(otherUser)}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                                >
                                    <div className="relative flex-shrink-0">
                                        {otherUser?.profile_pic ? (
                                            <img
                                                src={`http://localhost:2000/${otherUser.profile_pic}`}
                                                alt={otherUser.username}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                {otherUser?.full_name?.charAt(0) || otherUser?.username?.charAt(0)}
                                            </div>
                                        )}
                                        {isOnline && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-gray-800 truncate text-sm">
                                                {otherUser?.full_name || otherUser?.username}
                                            </p>
                                            {conv.last_message_time && (
                                                <span className="text-xs text-gray-400 flex-shrink-0 mr-1">
                                                    {new Date(conv.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">
                                            {conv.last_message || "ابدأ المحادثة الآن"}
                                        </p>
                                    </div>
                                    
                                    {conv.unread_count > 0 && (
                                        <div className="bg-blue-500 text-white text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center flex-shrink-0">
                                            {conv.unread_count}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationsList;