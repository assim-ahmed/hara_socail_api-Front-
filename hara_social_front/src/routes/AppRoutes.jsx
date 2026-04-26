import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Feed from '../pages/main/Feed';
import Friends from '../pages/main/Friends';
import Profile from '../pages/main/Profile';
import Chat from '../pages/main/Chat';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Private Routes */}

        <Route path="/feed" element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        } />


        <Route path="/friends" element={
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        
        <Route path="/profile/:userId" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        <Route path="/chat" element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        } />

        <Route path="/chat/:conversationId?" element={<PrivateRoute><Chat /></PrivateRoute>} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;