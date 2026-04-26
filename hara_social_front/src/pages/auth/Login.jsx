import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useAuthStore from '../../store/authStore';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import logo from '../../assets/image/logo.png'

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState('');

  const { values, handleChange, resetForm } = useForm({
    email_or_username: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!values.email_or_username || !values.password) {
      setLocalError('يرجى إدخال البريد الإلكتروني/اسم المستخدم وكلمة المرور');
      return;
    }

    const result = await login(values.email_or_username, values.password);
    
    if (result.success) {
      navigate('/feed');
      resetForm();
    }
  };

  return (
    <div className="login-container">
      {/* Animated Background */}
      <div className="login-background">
        <div className="login-grid-pattern"></div>
      </div>
      
      {/* Animated Shapes */}
      <div className="animated-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper">
        {/* Brand Logo */}
        <div className="brand-section">
          <div className="brand-logo-wrapper">
            <img src={logo} alt="HARA Logo" className="brand-logo-img" />
            <div className="brand-text">
              <h1 className="brand-title">HARA</h1>
              <p className="brand-subtitle">منصتك الاجتماعية الأولى</p>
            </div>
          </div>
          <h2 className="welcome-title">مرحباً بعودتك! 👋</h2>
          <p className="welcome-subtitle">سجل دخولك لتتواصل مع أصدقائك وتشارك لحظاتك</p>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <div className="form-card-decoration"></div>
          
          {/* Error Message */}
          {(error || localError) && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error || localError}
            </div>
          )}

          {/* Welcome Back Message */}
          <div className="welcome-back">
            <div className="divider-line"></div>
            <span className="welcome-back-text">تسجيل الدخول بحسابك</span>
            <div className="divider-line"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                البريد الإلكتروني أو اسم المستخدم
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email_or_username"
                  value={values.email_or_username}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                كلمة المرور
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="أدخل كلمة المرور"
                  className="form-input"
                  required
                />
              </div>
            </div>

       

            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>


     

          {/* Footer */}
          <div className="login-footer">
            <p className="footer-text">
              ليس لديك حساب؟{' '}
              <Link to="/register" className="register-link">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="copyright">
          © 2026 HARA SOCIAL. جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Login;