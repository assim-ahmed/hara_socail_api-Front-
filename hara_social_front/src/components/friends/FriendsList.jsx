import React, { useEffect } from 'react';
import useFriendStore from '../../store/friendStore';
import FriendRequestCard from './FriendRequests';

const FriendRequestsList = () => {
    const { requests = [], fetchRequests, isLoading } = useFriendStore(); // ✅ قيمة افتراضية

    useEffect(() => {
        fetchRequests();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!requests || requests.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <p className="text-center text-gray-500">لا توجد طلبات صداقة</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">
                طلبات الصداقة ({requests.length})
            </h3>
            <div className="space-y-3">
                {requests.map((request) => (
    <FriendRequestCard key={request.request_id} request={request} />
))}
            </div>
        </div>
    );
};

export default FriendRequestsList;