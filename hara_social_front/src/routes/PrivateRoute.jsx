import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useChatStore from './../store/chatStore'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading , user} = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  useChatStore.getState().connect(user?.id)
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;