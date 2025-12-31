import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaGoogle, FaFacebookF } from 'react-icons/fa';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Mock user data
    const mockUsers = [
        {
            id: 1,
            email: 'user@example.com',
            password: 'password123',
            name: 'Nguyễn Văn A',
            phone: '0912345678',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
        },
        {
            id: 2,
            email: 'customer@tangochu.com',
            password: 'tangochu2024',
            name: 'Trần Thị B',
            phone: '0987654321',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80'
        }
    ];

    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập thì redirect về trang chủ
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
            navigate('/');
        }
    }, [navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Function để kích hoạt Header re-render
    const triggerHeaderUpdate = () => {
        // Tạo custom event
        const event = new CustomEvent('userSessionUpdated', {
            detail: { action: 'login' }
        });
        window.dispatchEvent(event);

        // Alternative: dispatch storage event để trigger storage event listener
        localStorage.setItem('userSessionUpdate', Date.now().toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const user = mockUsers.find(u =>
                u.email === formData.email && u.password === formData.password
            );

            if (user) {
                // Create user session object
                const userSession = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    avatar: user.avatar,
                    loginTime: new Date().toISOString()
                };

                // Lưu session vào localStorage
                localStorage.setItem('userSession', JSON.stringify(userSession));

                // Trigger Header update ngay lập tức
                triggerHeaderUpdate();

                // Show success message
                setLoginSuccess(true);

                // Redirect to home after delay
                setTimeout(() => {
                    // Force reload hoặc navigate với state để trigger re-render
                    navigate('/', {
                        replace: true,
                        state: { userLoggedIn: true }
                    });

                    // Alternative: Reload page để đảm bảo Header cập nhật
                    // window.location.reload();
                }, 1000);
            } else {
                setErrors({
                    general: 'Email hoặc mật khẩu không chính xác'
                });
            }

            setIsSubmitting(false);
        }, 800);
    };

    const handleSocialLogin = (provider) => {
        alert(`Đang đăng nhập với ${provider}... (Chức năng demo)`);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Back Button */}
                <Link to="/" className="auth-back-button">
                    <FaArrowLeft />
                    <span>Quay lại trang chủ</span>
                </Link>

                <div className="auth-card">
                    {/* Left Side - Branding */}
                    <div className="auth-branding">
                        <div className="brand-logo">Đồng hồ Chorono</div>
                        <h1 className="brand-slogan">Chào mừng trở lại</h1>
                        <p className="brand-description">
                            Đăng nhập để tiếp tục mua sắm và quản lý tài khoản của bạn
                        </p>

                        <div className="brand-features">
                            <div className="feature">
                                <div className="feature-icon">🎁</div>
                                <span style={{color: 'black'}}>Ưu đãi thành viên</span>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">🚚</div>
                                <span style={{color: 'black'}}>Miễn phí vận chuyển</span>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">⭐</div>
                                <span style={{color: 'black'}}>Tích điểm đổi quà</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h2>Đăng nhập</h2>
                            <p>Nhập thông tin đăng nhập của bạn</p>
                        </div>

                        {loginSuccess && (
                            <div className="auth-success">
                                ✅ Đăng nhập thành công! Đang chuyển hướng...
                            </div>
                        )}

                        {errors.general && (
                            <div className="auth-error">
                                ❌ {errors.general}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">
                                    <FaEnvelope />
                                    <span>Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email của bạn"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">
                                    <FaLock />
                                    <span>Mật khẩu</span>
                                </label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Nhập mật khẩu"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span>Ghi nhớ đăng nhập</span>
                                </label>

                                <Link to="/quen-mat-khau" className="forgot-password">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>

                            {/* Social Login */}
                            <div className="social-login">
                                <p className="social-divider">Hoặc đăng nhập với</p>

                                <div className="social-buttons">
                                    <button
                                        type="button"
                                        className="social-button google"
                                        onClick={() => handleSocialLogin('Google')}
                                    >
                                        <FaGoogle />
                                        <span>Google</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="social-button facebook"
                                        onClick={() => handleSocialLogin('Facebook')}
                                    >
                                        <FaFacebookF />
                                        <span>Facebook</span>
                                    </button>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="auth-footer">
                                <p>
                                    Chưa có tài khoản?
                                    <Link to="/dang-ky" className="auth-link">
                                        Đăng ký ngay
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="demo-credentials">
                    <h4>Thông tin demo:</h4>
                    <p>Email: <strong>user@example.com</strong></p>
                    <p>Mật khẩu: <strong>password123</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Login;