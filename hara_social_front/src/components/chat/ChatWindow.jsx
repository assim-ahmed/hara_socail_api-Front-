// components/chat/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PaperAirplaneIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import useChatStore from '../../store/chatStore';
import useAuthStore from '../../store/authStore';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import EmojiPicker from 'emoji-picker-react';

const ChatWindow = ({ friend, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useAuthStore();
  const { sendMessage, sendTyping, messages: storeMessages, oldMessages, typingUsers, getOldMessages } = useChatStore();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const emojiButtonRef = useRef(null);

  useEffect(() => {
    if (user?.id && friend?.id) {
      getOldMessages(user.id, friend.id);
    }
  }, [user?.id, friend?.id, getOldMessages]);

  useEffect(() => {
    const newMessages = storeMessages.filter(
      msg => (msg.sender_id === user?.id && msg.receiver_id === friend.id) ||
             (msg.sender_id === friend.id && msg.receiver_id === user?.id)
    );
    
    const allMessages = [...(oldMessages || []), ...newMessages];
    const uniqueMessages = allMessages.filter((msg, index, self) => 
      index === self.findIndex(m => m.id === msg.id)
    );
    uniqueMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    
    setMessages(uniqueMessages);
  }, [storeMessages, oldMessages, user?.id, friend.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(user?.id, friend.id, message);
    setMessage('');
  };

  const handleTyping = () => {
    sendTyping(user?.id, friend.id, true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(user?.id, friend.id, false);
    }, 1000);
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(prevMessage => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const isFriendTyping = typingUsers[friend.id] === true;

  return (
    <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              {friend.profile_pic ? (
                <img
                  src={`http://localhost:2000/${friend.profile_pic}`}
                  alt={friend.username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg border-2 border-white">
                  {friend.full_name?.charAt(0) || friend.username?.charAt(0)}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div className="text-white">
              <p className="font-semibold text-base">
                {friend.full_name || friend.username}
              </p>
              <p className="text-xs text-white/80">@{friend.username}</p>
            </div>
          </div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon className="w-10 h-10 text-blue-500" />
            </div>
            <p className="text-gray-400 font-medium">ابدأ المحادثة الآن</p>
            <p className="text-sm text-gray-300 mt-1">أرسل أول رسالة لـ {friend.full_name || friend.username}</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isOwn = msg.sender_id === user?.id;
              return (
                <div
                  key={msg.id || index}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-slideIn`}
                >
                  {!isOwn && (
                    <div className="flex-shrink-0 mr-2">
                      {friend.profile_pic ? (
                        <img
                          src={`http://localhost:2000/${friend.profile_pic}`}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {friend.full_name?.charAt(0) || friend.username?.charAt(0)}
                        </div>
                      )}
                    </div>
                  )}
                  <div className={`max-w-[70%] ${isOwn ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        isOwn
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {isOwn && (
                    <div className="flex-shrink-0 ml-2">
                      {user?.profile_pic ? (
                        <img
                          src={`http://localhost:2000/${user.profile_pic}`}
                          alt="avatar"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                          {user?.full_name?.charAt(0) || user?.username?.charAt(0)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {isFriendTyping && (
              <div className="flex justify-start animate-slideIn">
                <div className="flex-shrink-0 mr-2">
                  {friend.profile_pic ? (
                    <img
                      src={`http://localhost:2000/${friend.profile_pic}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {friend.full_name?.charAt(0) || friend.username?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-none p-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">يكتب...</p>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl relative">
        <div className="flex gap-2 items-end">
          <div className="relative" ref={emojiButtonRef}>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50 flex-shrink-0"
            >
              <FaceSmileIcon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 right-0 z-50">
                <div className="scale-90 md:scale-100 origin-bottom-right">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width="100%"
                    height="350px"
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              onKeyUp={handleTyping}
              placeholder="اكتب رسالة..."
              rows="1"
              className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-none text-sm"
              style={{ maxHeight: '100px' }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 md:p-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex-shrink-0"
          >
            <PaperAirplaneIcon className="w-5 h-5 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;