import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { UserPlusIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import useFriendStore from '../../store/friendStore';

const MainLayout = ({ children }) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sendingId, setSendingId] = useState(null);
  
  const { suggestions, fetchSuggestions, sendRequest, isLoading } = useFriendStore();

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSendRequest = async (userId) => {
    setSendingId(userId);
    await sendRequest(userId);
    setSendingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar - Left */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="animate-fadeIn">
                {children}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;