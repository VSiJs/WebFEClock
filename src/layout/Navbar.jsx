import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMale, FaFemale, FaChild, FaTag, FaGift } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navItems = [
        { path: '/', label: 'Trang chủ', icon: <FaHome /> },
        { path: '/danh-muc/nam', label: 'Đồng hồ Nam', icon: <FaMale /> },
        { path: '/danh-muc/nu', label: 'Đồng hồ Nữ', icon: <FaFemale /> },
        { path: '/danh-muc/tre-em', label: 'Đồng hồ Trẻ Em', icon: <FaChild /> },
        { path: '/thuong-hieu', label: 'Thương hiệu', icon: <FaTag /> },
        { path: '/phu-kien', label: 'Phụ kiện', icon: <FaGift /> },
        { path: '/khuyen-mai', label: 'Khuyến mãi' },
        { path: '/tin-tuc', label: 'Tin tức' },
    ];

    return (
        <nav className="navbar">
            <div className="container">
                <ul className="nav-menu">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                {item.icon && <span className="nav-icon">{item.icon}</span>}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;