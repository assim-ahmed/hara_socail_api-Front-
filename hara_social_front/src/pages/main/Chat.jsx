// pages/Chat.jsx
import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ConversationsList from '../../components/chat/ConversationsList';
import ChatWindow from '../../components/chat/ChatWindow';
import OnlineFriends from '../../components/chat/OnlineFriends';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const Chat = () => {
    const [selectedFriend, setSelectedFriend] = useState(null);
    
    // ✅ دالة لفتح الشات مع صديق معين
    const handleOpenChat = (friend) => {
        setSelectedFriend(friend);
    };
    
    return (
        <MainLayout>
            <div className="bg-gray-100 min-h-screen py-4">
                <div className="container mx-auto px-4">
                    {/* 3 أعمدة: المحادثات | الشات | المتصلين */}
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4">
                        
                        {/* العمود 1: قائمة المحادثات */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <ConversationsList onSelectConversation={handleOpenChat} />
                        </div>
                        
                        {/* العمود 2: نافذة الشات */}
                        <div className="md:col-span-4 lg:col-span-6">
                            {selectedFriend ? (
                                <ChatWindow 
                                    friend={selectedFriend} 
                                    onClose={() => setSelectedFriend(null)} 
                                />
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                                        <ChatBubbleLeftRightIcon className="w-12 h-12 text-blue-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">مرحباً بك في المحادثات</h3>
                                    <p className="text-gray-400">اختر محادثة من القائمة أو اضغط على شخص متصل لبدء المراسلة</p>
                                </div>
                            )}
                        </div>
                        
                        {/* العمود 3: قائمة الأصدقاء المتصلين */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <OnlineFriends onSelectFriend={handleOpenChat} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Chat;