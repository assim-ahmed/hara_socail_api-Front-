import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import FriendsList from '../../components/friends/FriendsList';
import FriendRequests from '../../components/friends/FriendRequests';
import SearchUsers from '../../components/friends/SearchUsers';
import { UserGroupIcon, UserPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Friends = () => {
  const [activeTab, setActiveTab] = useState('friends');

  const tabs = [
    { id: 'friends', label: 'الطلبات', icon: UserPlusIcon },
    { id: 'search', label: 'بحث', icon: MagnifyingGlassIcon },
  ];

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">الأصدقاء</h1>
          <p className="text-gray-500">تواصل مع أصدقائك وأضف آخرين</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 border border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="animate-fadeIn">
          {activeTab === 'friends' && <FriendsList />}
          {activeTab === 'requests' && <FriendRequests />}
          {activeTab === 'search' && <SearchUsers />}
        </div>
      </div>
    </MainLayout>
  );
};

export default Friends;