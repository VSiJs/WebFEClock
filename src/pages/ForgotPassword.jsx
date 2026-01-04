import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import './Auth.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = () => {
        if (!email) {
            return 'Vui lòng nhập email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Email không hợp lệ';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateEmail();

        if (emailError) {
            setErrors({ email: emailError });
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            // In thực tế, đây là nơi gọi API gửi email reset mật khẩu
            console.log('Gửi email reset mật khẩu đến:', email);

            setIsSubmitted(true);
            setIsSubmitting(false);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="auth-page">
                <div className="auth-container">
                    <Link to="/dang-nhap" className="auth-back-button">
                        <FaArrowLeft />
                        <span>Quay lại đăng nhập</span>
                    </Link>

                    <div className="auth-card success-card">
                        <div className="auth-branding">
                            <div className="brand-logo">Đồng hồ Chorono</div>
                            <h1 className="brand-slogan">Email đã được gửi</h1>
                        </div>

                        <div className="auth-form-container">
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>

                            <div className="success-content">
                                <h2>Kiểm tra email của bạn</h2>
                                <p>
                                    Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến:
                                    <strong> {email}</strong>
                                </p>

                                <div className="instructions">
                                    <p>Vui lòng làm theo các bước sau:</p>
                                    <ol>
                                        <li>Kiểm tra hộp thư đến hoặc thư mục spam</li>
                                        <li>Nhấp vào liên kết đặt lại mật khẩu trong email</li>
                                        <li>Tạo mật khẩu mới cho tài khoản của bạn</li>
                                    </ol>
                                </div>

                                <div className="success-actions">
                                    <Link to="/dang-nhap" className="back-to-login">
                                        Quay lại đăng nhập
                                    </Link>
                                    <button
                                        className="resend-button"
                                        onClick={() => {
                                            setEmail('');
                                            setIsSubmitted(false);
                                        }}
                                    >
                                        Gửi lại email
                                    </button>
                                </div>

                                <div className="contact-support">
                                    <p>
                                        Không nhận được email?
                                        <Link to="/lien-he" className="support-link">
                                            Liên hệ hỗ trợ
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <Link to="/dang-nhap" className="auth-back-button">
                    <FaArrowLeft />
                    <span>Quay lại đăng nhập</span>
                </Link>

                <div className="auth-card">
                    <div className="auth-branding">
                        <div className="brand-logo">Đồng hồ Chorono</div>
                        <h1 className="brand-slogan">Quên mật khẩu?</h1>
                        <p className="brand-description">
                            Đừng lo lắng! Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email của bạn.
                        </p>
                    </div>

                    <div className="auth-form-container">
                        <div className="auth-header">
                            <h2>Đặt lại mật khẩu</h2>
                            <p>Nhập email đăng ký tài khoản của bạn</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
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
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (errors.email) setErrors({ email: '' });
                                    }}
                                    className={errors.email ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <button
                                type="submit"
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang gửi...' : 'Gửi hướng dẫn đặt lại'}
                            </button>

                            <div className="auth-footer">
                                <p>
                                    Nhớ mật khẩu?
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

export default ForgotPassword;