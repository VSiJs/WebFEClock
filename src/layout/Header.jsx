import React, { useState, useEffect } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaPhone, FaSignOutAlt, FaUserCircle, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from '../../pages/SearchBar';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation(); // Sử dụng useLocation để listen route changes
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(0); // State để force re-render

    // Navigation items
    const navItems = [
        { path: '/', label: 'Trang chủ' },
        { path: '/danh-muc/nam', label: 'Đồng hồ Nam' },
        { path: '/danh-muc/nu', label: 'Đồng hồ Nữ' },
        { path: '/danh-muc/tre-em', label: 'Đồng hồ Trẻ Em' },
        { path: '/thuong-hieu', label: 'Thương hiệu' },
        { path: '/phu-kien', label: 'Phụ kiện' },
        { path: '/khuyen-mai', label: 'Khuyến mãi' },
        { path: '/tin-tuc', label: 'Tin tức' },
    ];

    // Hàm kiểm tra và lấy thông tin user từ localStorage
    const getUserSession = () => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
            try {
                return JSON.parse(userSession);
            } catch (error) {
                console.error('Error parsing user session:', error);
                localStorage.removeItem('userSession');
                return null;
            }
        }
        return null;
    };

    // Hàm cập nhật user session
    const updateUserSession = () => {
        const userData = getUserSession();
        setUser(userData);
    };

    useEffect(() => {
        // Lấy thông tin user khi component mount
        updateUserSession();

        // Lắng nghe custom event từ Login/Register
        const handleUserSessionUpdated = (e) => {
            console.log('User session updated event received', e);
            updateUserSession();
            setUpdateTrigger(prev => prev + 1); // Force re-render
        };

        // Lắng nghe storage event (cho các tab khác)
        const handleStorageChange = (e) => {
            if (e.key === 'userSession' || e.key === 'userSessionUpdate') {
                updateUserSession();
                setUpdateTrigger(prev => prev + 1);
            }
        };

        // Đăng ký event listeners
        window.addEventListener('userSessionUpdated', handleUserSessionUpdated);
        window.addEventListener('storage', handleStorageChange);

        // Cleanup
        return () => {
            window.removeEventListener('userSessionUpdated', handleUserSessionUpdated);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Thêm effect để listen route changes
    useEffect(() => {
        updateUserSession();
    }, [location.pathname]); // Re-run khi route thay đổi

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        setUser(null);
        setShowUserMenu(false);

        // Dispatch event để các component khác biết
        const event = new CustomEvent('userSessionUpdated', {
            detail: { action: 'logout' }
        });
        window.dispatchEvent(event);

        // Force re-render
        setUpdateTrigger(prev => prev + 1);

        navigate('/');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Debug log để kiểm tra
    console.log('Header render - User:', user, 'Update trigger:', updateTrigger);

    return (
        <header className="header">
            {/* Top Bar */}
            <div className="header-top">
                <div className="container">
                    <div className="header-top-content">
                        <div className="contact-info">
                            <FaPhone className="phone-icon" />
                            <span>Hotline: 1900 6868</span>
                        </div>
                        <div className="header-links">
                            <Link to="/he-thong-cua-hang">Hệ thống cửa hàng</Link>
                            <Link to="/tin-tuc">Tin tức</Link>
                            <Link to="/lien-he">Liên hệ</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="header-main">
                <div className="container">
                    <div className="header-main-content">
                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-toggle"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>

                        {/* Logo */}
                        <div className="logo">
                            <Link to="/">
                                <h1>Đồng Hồ Choro</h1>
                                <p>Chuyên đồng hồ chính hãng</p>
                            </Link>
                        </div>

                        {/* Search Bar Component */}
                        <div className="search-bar">
                            <SearchBar />
                        </div>

                        {/* User Actions */}
                        <div className="header-actions">
                            {/* Cart */}
                            <Link to="/cart" className="cart-icon">
                                <FaShoppingCart />
                                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                                <span className="cart-text">Giỏ hàng</span>
                            </Link>

                            {/* User Section */}
                            <div className="user-section">
                                {user ? (
                                    <div
                                        className="user-info"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        onMouseEnter={() => setShowUserMenu(true)}
                                        onMouseLeave={() => setShowUserMenu(false)}
                                    >
                                        <div className="user-avatar">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.name} />
                                            ) : (
                                                <FaUserCircle />
                                            )}
                                        </div>
                                        <div className="user-details">
                                            <span className="user-greeting">Xin chào</span>
                                            <span className="user-name">{user.name.split(' ')[0]}</span>
                                            <FaCaretDown className={`dropdown-icon ${showUserMenu ? 'rotated' : ''}`} />
                                        </div>

                                        {/* Dropdown Menu */}
                                        {showUserMenu && (
                                            <div className="user-dropdown">
                                                <div className="dropdown-header">
                                                    <div className="dropdown-avatar">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} />
                                                        ) : (
                                                            <FaUserCircle />
                                                        )}
                                                    </div>
                                                    <div className="dropdown-user-info">
                                                        <h4>{user.name}</h4>
                                                        <p>{user.email}</p>
                                                        <p className="member-since">
                                                            Đăng nhập lúc {new Date(user.loginTime).toLocaleTimeString('vi-VN', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="dropdown-menu">
                                                    <Link
                                                        to="/tai-khoan"
                                                        className="dropdown-item"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        <FaUserCircle />
                                                        <span>Tài khoản của tôi</span>
                                                    </Link>

                                                    <Link
                                                        to="/don-hang"
                                                        className="dropdown-item"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        <FaShoppingCart />
                                                        <span>Đơn hàng của tôi</span>
                                                    </Link>

                                                    <Link
                                                        to="/yeu-thich"
                                                        className="dropdown-item"
                                                        onClick={() => setShowUserMenu(false)}
                                                    >
                                                        <FaUser />
                                                        <span>Sản phẩm yêu thích</span>
                                                    </Link>

                                                    <div className="dropdown-divider"></div>

                                                    <button
                                                        className="dropdown-item logout-item"
                                                        onClick={handleLogout}
                                                    >
                                                        <FaSignOutAlt />
                                                        <span>Đăng xuất</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="auth-actions">
                                        <Link to="/dang-nhap" className="login-btn">
                                            <FaUser />
                                            <span>Đăng nhập</span>
                                        </Link>
                                        <Link to="/dang-ky" className="register-btn">
                                            <span>Đăng ký</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="header-nav">
                <div className="container">
                    <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </header>
    );
};

export default Header;