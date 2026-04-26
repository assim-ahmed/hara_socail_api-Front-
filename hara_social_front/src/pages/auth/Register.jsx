import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useAuthStore from '../../store/authStore';
import logo from '../../assets/image/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { values, handleChange, resetForm } = useForm({
    username: '',
    email: '',
    password: '',
    full_name: '',
  });

  const validateForm = () => {
    if (!values.full_name) {
      setLocalError('الاسم الكامل مطلوب');
      return false;
    }
    if (!values.username || values.username.length < 3) {
      setLocalError('اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
      return false;
    }
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setLocalError('البريد الإلكتروني غير صحيح');
      return false;
    }
    if (!values.password || values.password.length < 6) {
      setLocalError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    return true;
  };

  // معالجة اختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setLocalError('يرجى اختيار ملف صورة صالح');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setLocalError('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }
      
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // إزالة الصورة
  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('full_name', values.full_name);
    
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/feed');
      resetForm();
      removeImage();
    }
  };

  return (
    <div className="register-container">
      {/* Animated Background */}
      <div className="register-background">
        <div className="register-grid-pattern"></div>
      </div>
      
      {/* Animated Shapes */}
      <div className="animated-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Register Card */}
      <div className="register-card-wrapper">
        {/* Brand Logo */}
        <div className="brand-section">
          <div className="brand-logo-wrapper">
            <img src={logo} alt="HARA Logo" className="brand-logo-img" />
            <div className="brand-text">
              <h1 className="brand-title">HARA</h1>
              <p className="brand-subtitle">منصتك الاجتماعية الأولى</p>
            </div>
          </div>
          <h2 className="welcome-title">انضم إلينا الآن! 🎉</h2>
          <p className="welcome-subtitle">أنشئ حسابك وابدأ التواصل</p>
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

          {/* Profile Image Upload */}
          <div className="profile-image-section">
            <div className="profile-image-container">
              <div 
                className="profile-image-wrapper"
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile preview" 
                    className="profile-preview"
                  />
                ) : (
                  <svg className="camera-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
                <div className="image-overlay">
                  <svg className="overlay-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="remove-image-btn"
                >
                  <svg className="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </div>
            <p className="profile-hint">
              اضغط على الصورة لاختيار صورة البروفايل (اختياري)
            </p>
          </div>

          {/* Welcome Back Message */}
          <div className="welcome-back">
            <div className="divider-line"></div>
            <span className="welcome-back-text">معلومات الحساب</span>
            <div className="divider-line"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label className="form-label">
                الاسم الكامل
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                اسم المستخدم
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="أدخل اسم المستخدم"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                البريد الإلكتروني
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="أدخل بريدك الإلكتروني"
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
                  placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="register-button"
            >
              {isLoading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>جاري إنشاء الحساب...</span>
                </div>
              ) : (
                'إنشاء حساب'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="register-footer">
            <p className="footer-text">
              لديك حساب بالفعل؟{' '}
              <Link to="/login" className="register-link">
                تسجيل الدخول
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

export default Register;