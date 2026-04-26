import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../../components/layout/MainLayout';
import ProfileHeader from '../../components/profile/ProfileHeader';
import PostCard from '../../components/posts/PostCard';
import useProfileStore from '../../store/profileStore';
import useAuthStore from '../../store/authStore';
import useFriendStore from '../../store/friendStore';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();
  const { 
    profile, 
    userPosts, 
    stats, 
    fetchProfile, 
    fetchUserPosts, 
    isLoadingProfile, 
    isLoadingPosts,
    hasMorePosts,
    currentPage,
    resetPosts
  } = useProfileStore();
  const { friends, fetchFriends } = useFriendStore();
  const { ref, inView } = useInView();

  const isOwnProfile = currentUser?.id === profile?.id || (!userId && true);

  // جلب البيانات عند تغيير userId
  useEffect(() => {
    const identifier = userId || currentUser?.id;
    if (identifier) {
      resetPosts(); // إعادة تعيين المنشورات عند تغيير المستخدم
      fetchProfile(identifier);
      fetchUserPosts(identifier, 1, true);
    }
    fetchFriends();
  }, [userId, currentUser?.id]);

  // التحميل اللانهائي (infinite scroll)
  useEffect(() => {
    if (inView && !isLoadingPosts && hasMorePosts && profile?.id) {
      fetchUserPosts(profile.id, currentPage + 1);
    }
  }, [inView, isLoadingPosts, hasMorePosts, profile?.id, currentPage]);

  // شاشة التحميل (بيانات الملف الشخصي فقط)
  if (!profile && isLoadingProfile) {
    return (
      <MainLayout>
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (!profile && !isLoadingProfile) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="text-gray-500">المستخدم غير موجود</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <ProfileHeader 
          profile={profile} 
          stats={stats} 
          isOwnProfile={isOwnProfile}
        />

        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-gray-800 px-1">المنشورات</h3>
          
          {userPosts.length === 0 && !isLoadingPosts ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
              <p className="text-gray-500">لا توجد منشورات بعد</p>
            </div>
          ) : (
            userPosts.map(post => <PostCard key={post.id} post={post} />)
          )}

          {/* مؤشر التحميل الخاص بالمنشورات */}
          {isLoadingPosts && (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* عنصر المراقبة للـ infinite scroll */}
          {hasMorePosts && !isLoadingPosts && <div ref={ref} className="h-10" />}

          {!hasMorePosts && userPosts.length > 0 && (
            <div className="text-center py-4 text-gray-400 text-sm">
              ✨ لقد وصلت إلى النهاية ✨
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;