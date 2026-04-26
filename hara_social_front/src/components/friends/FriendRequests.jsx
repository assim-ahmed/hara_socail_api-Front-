import React, { useState } from 'react';
import useFriendStore from '../../store/friendStore';

const FriendRequests = ({ request }) => {
    const { acceptRequest, rejectRequest } = useFriendStore();
    const [isLoading, setIsLoading] = useState(false);

const handleAccept = async () => {
    setIsLoading(true);
    try {
        await acceptRequest(request?.request_id, request?.user_id);  // ✅ request_id و user_id
    } catch (error) {
        console.error("فشل قبول الطلب", error);
    } finally {
        setIsLoading(false);
    }
};

const handleReject = async () => {
    setIsLoading(true);
    try {
        await rejectRequest(request?.request_id, request?.user_id);  // ✅ request_id و user_id
    } catch (error) {
        console.error("فشل رفض الطلب", error);
    } finally {
        setIsLoading(false);
    }
};

    // ✅ إذا لم توجد بيانات، لا تعرض شيء
    if (!request) {
        return null;
    }


    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
                <img 
                    src={`http://localhost:2000/${request.profile_pic}` ||  'http://localhost:2000/uploads/profiles/user1.png' } alt={request.sender_full_name || 'مستخدم'}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h4 className="font-medium text-gray-800">{request.full_name || 'غير معروف'}</h4>
                    <p className="text-sm text-gray-500">@{request.username || 'username'}</p>
                    {request.bio && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{request.bio}</p>
                    )}
                </div>
            </div>
            
            <div className="flex gap-2">
                <button
                    onClick={handleAccept}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg text-sm transition-colors"
                >
                    {isLoading ? 'جاري...' : 'قبول'}
                </button>
                
                <button
                    onClick={handleReject}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg text-sm transition-colors"
                >
                    {isLoading ? 'جاري...' : 'رفض'}
                </button>
            </div>
        </div>
    );
};

export default FriendRequests;