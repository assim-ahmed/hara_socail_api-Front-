import React, { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import MainLayout from '../../components/layout/MainLayout';
import PostForm from '../../components/posts/PostForm';
import PostCard from '../../components/posts/PostCard';
import usePostStore from '../../store/postStore';
import toast from 'react-hot-toast';

const Feed = () => {
  const { posts, fetchFeed, isLoading, hasMore, error } = usePostStore();
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  // Load initial feed
  useEffect(() => {
    fetchFeed(1, true);
  }, []);

  // Load more when scrolling
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage(prev => prev + 1);
      fetchFeed(page + 1);
    }
  }, [inView, hasMore, isLoading]);

  // Show error if any
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-gray-600 rounded-2xl p-6 mb-6 text-white">
          <h1 className="text-2xl font-bold mb-2">مرحباً بك في HARA SOCIAL</h1>
          <p className="text-blue-100">شارك أفكارك وتواصل مع أصدقائك</p>
        </div>

        {/* Create Post Form */}
        <PostForm />

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 && !isLoading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">لا توجد منشورات بعد</p>
              <p className="text-gray-400 text-sm">كن أول من يشارك شيئاً!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Intersection Observer Trigger */}
          {hasMore && <div ref={ref} className="h-10" />}

          {/* End of feed */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              ✨ لقد وصلت إلى النهاية ✨
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Feed;