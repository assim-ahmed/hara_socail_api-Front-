import React, { useState } from 'react';
import useFriendStore from '../../store/friendStore';

const FriendCard = ({ user, type }) => {
    const { sendRequest, searchResults, setSearchResults } = useFriendStore();
    const [isLoading, setIsLoading] = useState(false);
    const [localStatus, setLocalStatus] = useState(user.friendship_status);
    const [localDirection, setLocalDirection] = useState(user.friendship_direction);

    const handleSendRequest = async () => {
        setIsLoading(true);
        try {
            const response = await sendRequest(user.id);
            if (response?.success) {
                // ✅ تحديث الحالة محلياً
                setLocalStatus('pending');
                setLocalDirection('sent');
            }
        } catch (error) {
            console.error("فشل إرسال الطلب", error);
        } finally {
            setIsLoading(false);
        }
    };

    // استخدم localStatus و localDirection بدلاً من user
    const status = localStatus || user.friendship_status;
    const direction = localDirection || user.friendship_direction;

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
            <img 
                src={`http://localhost:2000/${user?.profile_pic}` || 'http://localhost:2000/uploads/profiles-user2.png'}
                alt={user.full_name}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
                <h4 className="font-medium text-gray-800">{user.full_name}</h4>
                <p className="text-sm text-gray-500">@{user.username}</p>
                {user.bio && <p className="text-xs text-gray-400 mt-1">{user.bio}</p>}
            </div>
            
            {type === 'search' && status === 'none' && (
                <button 
                    onClick={handleSendRequest}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg text-sm transition-colors"
                >
                    {isLoading ? 'جاري الإرسال...' : 'إضافة صديق'}
                </button>
            )}
            
            {status === 'pending' && direction === 'sent' && (
                <span className="text-yellow-600 text-sm">انتظار الموافقة</span>
            )}
            
            {status === 'pending' && direction === 'received' && (
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm">
                        قبول
                    </button>
                    <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm">
                        رفض
                    </button>
                </div>
            )}
            
            {status === 'accepted' && (
                <span className="text-green-600 text-sm">صديق</span>
            )}
        </div>
    );
};

export default FriendCard;