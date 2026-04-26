import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import EmojiPicker from 'emoji-picker-react';

const PostForm = () => {
  const { user } = useAuthStore();
  const { createPost, isCreating } = usePostStore();
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef(null);
  const textareaRef = useRef(null);

  // إغلاق الـ Emoji Picker عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiButtonRef.current && !emojiButtonRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('الرجاء كتابة محتوى المنشور');
      return;
    }

    const result = await createPost(content);
    
    if (result.success) {
      setContent('');
      toast.success('تم نشر المنشور بنجاح! 🎉');
    } else {
      toast.error(result.error || 'فشل نشر المنشور');
    }
  };

  const onEmojiClick = (emojiObject) => {
    setContent(prevContent => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
    // إعادة التركيز على حقل النص بعد إضافة الإيموجي
    textareaRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {user?.full_name?.charAt(0) || user?.username?.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{user?.full_name || user?.username}</p>
          <p className="text-xs text-gray-400">@{user?.username}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ماذا يحدث في حارتك اليوم؟ ✨"
          className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none text-base"
          rows="3"
        />

        {/* Actions */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="relative" ref={emojiButtonRef}>
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaceSmileIcon className="w-5 h-5" />
            </button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 z-50">
                <div className="scale-90 md:scale-100 origin-bottom-left">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    width="100%"
                    height="400px"
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
          >
            {isCreating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>نشر...</span>
              </div>
            ) : (
              'نشر'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;