import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { 
  UserIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  BellIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { user } = useAuthStore();

  const quickLinks = [
    { name: 'الملف الشخصي', path: '/profile', icon: UserIcon, color: 'text-blue-500' },
    { name: 'الأصدقاء', path: '/friends', icon: UserGroupIcon, color: 'text-green-500' },
    { name: 'المحادثات', path: '/chat', icon: ChatBubbleLeftRightIcon, color: 'text-purple-500' },
  ];

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-20">
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
 <img src={`http://localhost:2000/${user?.profile_pic}`} alt="" className='rounded-full size-full ' />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{user?.full_name || user?.username}</h3>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-700">الروابط السريعة</h3>
          </div>
          <div className="p-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <Icon className={`w-5 h-5 ${link.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-gray-700 group-hover:text-gray-900">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>


      </div>
    </aside>
  );
};

export default Sidebar;