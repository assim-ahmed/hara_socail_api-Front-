import React, { useState } from 'react';
import { PencilIcon, UserPlusIcon, UserMinusIcon, CheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import useFriendStore from '../../store/friendStore';
import useChatStore from '../../store/chatStore';
import EditProfileModal from './EditProfileModal';

const ProfileHeader = ({ profile, stats, isOwnProfile }) => {
  const { user } = useAuthStore();
  const { sendRequest, removeFriend, friends } = useFriendStore();
  const { sendMessage } = useChatStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // التحقق من وجود المستخدم في قائمة الأصدقاء
  const isFriend = friends.some(f => f.id === profile?.id);
  const hasPendingRequest = false;

  const handleSendRequest = async () => {
    setIsLoading(true);
    const result = await sendRequest(profile.id);
    if (result.success) {
      toast.success(`تم إرسال طلب صداقة إلى ${profile.full_name}`);
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  const handleRemoveFriend = async () => {
    if (window.confirm(`هل تريد إزالة ${profile.full_name} من أصدقائك؟`)) {
      setIsLoading(true);
      const result = await removeFriend(profile.id);
      if (result.success) {
        toast.success(`تم إزالة ${profile.full_name} من أصدقائك`);
      } else {
        toast.error(result.error);
      }
      setIsLoading(false);
    }
  };

  // ✅ دالة إرسال رسالة ترحيب
  const handleSendWelcomeMessage = () => {
    const welcomeMessage = `أهلاً بك يا ${profile.full_name || profile.username} 👋`;
    sendMessage(user?.id, profile.id, welcomeMessage);
    toast.success(`تم إرسال رسالة ترحيب إلى ${profile.full_name}`);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Image - ✅ مع التدرج اللوني إذا لم توجد صورة */}
        <div className="h-32 relative">
          {profile?.cover ? (
            <img 
              src={`http://localhost:2000/${profile.cover}`} 
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          )}
        </div>
        
        {/* Avatar & Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
              {profile?.profile_pic ? (
                <img 
                  src={`http://localhost:2000/${profile.profile_pic}`} 
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{profile?.full_name?.charAt(0) || profile?.username?.charAt(0)}</span>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{profile?.full_name}</h2>
              <p className="text-gray-500">@{profile?.username}</p>
              {profile?.bio && <p className="mt-2 text-gray-600">{profile.bio}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isOwnProfile ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                >
                  <PencilIcon className="w-5 h-5" />
                  <span>تعديل</span>
                </button>
              ) : isFriend ? (
                <>
                  <button
                    onClick={handleSendWelcomeMessage}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span>تواصل</span>
                  </button>
                  <button
                    onClick={handleRemoveFriend}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition disabled:opacity-50"
                  >
                    <UserMinusIcon className="w-5 h-5" />
                    <span>إزالة صديق</span>
                  </button>
                </>
              ) : hasPendingRequest ? (
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-xl cursor-not-allowed"
                >
                  <CheckIcon className="w-5 h-5" />
                  <span>طلب معلق</span>
                </button>
              ) : (
                <button
                  onClick={handleSendRequest}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
                >
                  <UserPlusIcon className="w-5 h-5" />
                  <span>إضافة صديق</span>
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{stats?.posts_count || 0}</p>
              <p className="text-sm text-gray-500">منشور</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{stats?.friends_count || 0}</p>
              <p className="text-sm text-gray-500">صديق</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-800">{stats?.likes_received || 0}</p>
              <p className="text-sm text-gray-500">إعجاب</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
      />
    </>
  );
};

export default ProfileHeader;