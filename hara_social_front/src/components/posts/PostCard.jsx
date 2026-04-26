import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon, 
  EllipsisHorizontalIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const PostCard = ({ post }) => {
  const { user } = useAuthStore();
  const { toggleLike, deletePost } = usePostStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60); // minutes
    
    if (diff < 1) return 'الآن';
    if (diff < 60) return `منذ ${diff} دقيقة`;
    if (diff < 1440) return `منذ ${Math.floor(diff / 60)} ساعة`;
    return date.toLocaleDateString('ar-EG');
  };

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    await toggleLike(post.id);
    setIsLiking(false);
  };

  const handleDelete = async () => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
      const result = await deletePost(post.id);
      if (result.success) {
        toast.success('تم حذف المنشور');
      } else {
        toast.error(result.error);
      }
    }
    setShowMenu(false);
  };

  const isOwner = user?.id === post.user_id;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user_id}`}>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {post.full_name?.charAt(0) || post.username?.charAt(0)}
            </div>
          </Link>
          <div>
            <Link to={`/profile/${post.user_id}`}>
              <p className="font-semibold text-gray-800 hover:text-blue-600 transition">
                {post.full_name || post.username}
              </p>
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>@{post.username}</span>
              <span>•</span>
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Menu Button */}
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
            >
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute left-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-right text-red-600 hover:bg-red-50 rounded-xl transition"
                  >
                    حذف
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around pt-3 border-t border-gray-100">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition group"
        >
          {post.user_liked ? (
            <HeartIconSolid className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition" />
          )}
          <span className={`text-sm ${post.user_liked ? 'text-red-500' : 'text-gray-500'}`}>
            {post.likes_count || 0}
          </span>
        </button>

      </div>
    </div>
  );
};

export default PostCard;