import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaArrowLeft, FaCheck } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        // Kiểm tra nếu đã đăng nhập thì redirect về trang chủ
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
            navigate('/');
        }
    }, [navigate]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ tên';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
        }

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Vui lòng chấp nhận điều khoản';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const checkEmailExists = (email) => {
        // Mock: kiểm tra xem email đã tồn tại chưa
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.some(user => user.email === email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Check if email already exists
        if (checkEmailExists(formData.email)) {
            setErrors({ email: 'Email này đã được đăng ký' });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // Generate user ID
            const userId = Date.now();

            // Create user object (trong thực tế password sẽ được hash)
            const newUser = {
                id: userId,
                fullName: formData.fullName.trim(),
                email: formData.email,
                phone: formData.phone,
                password: formData.password, // Trong thực tế cần hash password
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName)}&background=random`,
                createdAt: new Date().toISOString(),
                isActive: true,
                membershipLevel: 'standard',
                points: 1000 // Điểm thưởng đăng ký
            };

            // Get existing users from localStorage
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            existingUsers.push(newUser);

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Create session
            const userSession = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.fullName,
                phone: newUser.phone,
                avatar: newUser.avatar,
                loginTime: new Date().toISOString(),
                membershipLevel: newUser.membershipLevel,
                points: newUser.points
            };

            localStorage.setItem('userSession', JSON.stringify(userSession));

            // Show success message
            setRegistrationSuccess(true);

            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);

            setIsSubmitting(false);
        }, 1500);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setFormData(prev => ({ ...prev, phone: value }));
        }
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
                        <h1 className="brand-slogan">Tạo tài khoản mới</h1>
                        <p className="brand-description">
                            Đăng ký ngay để nhận ưu đãi thành viên và trải nghiệm mua sắm tốt nhất
                        </p>

                        <div className="benefits-list">
                            <div className="benefit">
                                <FaCheck />
                                <span>Nhận ngay 1.000 điểm thưởng</span>
                            </div>
                            <div className="benefit">
                                <FaCheck />
                                <span>Miễn phí vận chuyển đơn đầu tiên</span>
                            </div>
                            <div className="benefit">
                                <FaCheck />
                                <span>Ưu đãi đặc biệt cho thành viên</span>
                            </div>
                            <div className="benefit">
                                <FaCheck />
                                <span>Theo dõi đơn hàng dễ dàng</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h2>Đăng ký tài khoản</h2>
                            <p>Nhập thông tin để tạo tài khoản mới</p>
                        </div>

                        {registrationSuccess && (
                            <div className="auth-success">
                                ✅ Đăng ký thành công! Chào mừng bạn đến với Tango chú
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {/* Full Name Field */}
                            <div className="form-group">
                                <label htmlFor="fullName">
                                    <FaUser />
                                    <span>Họ và tên</span>
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={errors.fullName ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>

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

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <FaPhone />
                                    <span>Số điện thoại</span>
                                </label>
                                <div className="phone-input-container">
                                    <span className="phone-prefix">+84</span>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="912345678"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        className={errors.phone ? 'error' : ''}
                                        disabled={isSubmitting}
                                        maxLength="10"
                                    />
                                </div>
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
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
                                <div className="password-hint">
                                    Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group">
                                <label htmlFor="confirmPassword">
                                    <FaLock />
                                    <span>Xác nhận mật khẩu</span>
                                </label>
                                <div className="password-input-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={errors.confirmPassword ? 'error' : ''}
                                        disabled={isSubmitting}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="form-group checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                    <span>
                                        Tôi đồng ý với{' '}
                                        <Link to="/dieu-khoan" className="terms-link">
                                            Điều khoản dịch vụ
                                        </Link>{' '}
                                        và{' '}
                                        <Link to="/chinh-sach" className="terms-link">
                                            Chính sách bảo mật
                                        </Link>
                                    </span>
                                </label>
                                {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
                            </button>

                            {/* Already have account */}
                            <div className="auth-footer">
                                <p>
                                    Đã có tài khoản?
                                    <Link to="/dang-nhap" className="auth-link">
                                        Đăng nhập ngay
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;