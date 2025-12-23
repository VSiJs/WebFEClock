import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-column">
                            <h3>Về WatchStore</h3>
                            <ul>
                                <li><Link to="/about">Giới thiệu</Link></li>
                                <li><Link to="/career">Tuyển dụng</Link></li>
                                <li><Link to="/contact">Liên hệ</Link></li>
                                <li><Link to="/stores">Hệ thống cửa hàng</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Chính sách</h3>
                            <ul>
                                <li><Link to="/warranty">Chính sách bảo hành</Link></li>
                                <li><Link to="/return">Chính sách đổi trả</Link></li>
                                <li><Link to="/shipping">Chính sách vận chuyển</Link></li>
                                <li><Link to="/privacy">Chính sách bảo mật</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Hỗ trợ khách hàng</h3>
                            <ul>
                                <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                                <li><Link to="/guide">Hướng dẫn mua hàng</Link></li>
                                <li><Link to="/payment">Hướng dẫn thanh toán</Link></li>
                                <li><Link to="/size">Hướng dẫn chọn size</Link></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Liên hệ</h3>
                            <div className="contact-info">
                                <p><FaPhone /> 1900 6868</p>
                                <p><FaEnvelope /> support@watchstore.vn</p>
                                <p><FaMapMarkerAlt /> 123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                            </div>
                            <div className="social-links">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>© 2024 WatchStore. Tất cả các quyền được bảo lưu.</p>
                    <p>Website được xây dựng cho mục đích học tập</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;