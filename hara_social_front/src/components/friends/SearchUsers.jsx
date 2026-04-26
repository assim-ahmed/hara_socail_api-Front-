import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useFriendStore from '../../store/friendStore';
import FriendCard from './FriendCard';

const SearchUsers = () => {
  const navigate = useNavigate();
  const { searchResults , searchUsers, isLoading = false } = useFriendStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query) {
        searchUsers(query);
      } else {
        // إذا كان query فارغ، امسح النتائج
        if (searchResults.length > 0) {
          useFriendStore.getState().clearSearchResults?.();
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, searchUsers]);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-800 mb-4">البحث عن أصدقاء جدد</h3>
      
      <div className="relative mb-4">
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث باسم المستخدم أو البريد الإلكتروني..."
          className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="space-y-3">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user.id} onClick={() => handleUserClick(user.id)}>
              <FriendCard user={user} type="search" />
            </div>
          ))
        ) : (
          !isLoading && query && <p className="text-center text-gray-500 py-8">لا توجد نتائج</p>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;