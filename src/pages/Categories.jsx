import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock, FaGem, FaSwimmer, FaPlane } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
    const categories = [
        {
            id: 'luxury',
            name: 'Đồng hồ Cao cấp',
            description: 'Những siêu phẩm từ các thương hiệu hàng đầu thế giới',
            count: 15,
            image: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=800&q=80',
            icon: <FaGem />,
            brands: ['Rolex', 'Patek Philippe', 'Audemars Piguet']
        },
        {
            id: 'diving',
            name: 'Đồng hồ Lặn',
            description: 'Được thiết kế cho các hoạt động dưới nước chuyên nghiệp',
            count: 12,
            image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80',
            icon: <FaSwimmer />,
            brands: ['Rolex', 'Omega', 'TAG Heuer']
        },
        {
            id: 'pilot',
            name: 'Đồng hồ Phi công',
            description: 'Đồng hồ chuyên dụng với các chức năng hàng không',
            count: 8,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
            icon: <FaPlane />,
            brands: ['Breitling', 'IWC', 'Bell & Ross']
        },
        {
            id: 'dress',
            name: 'Đồng hồ Dạ hội',
            description: 'Thanh lịch và tinh tế cho những dịp đặc biệt',
            count: 10,
            image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80',
            icon: <FaClock />,
            brands: ['Cartier', 'Jaeger-LeCoultre', 'Vacheron Constantin']
        },
        {
            id: 'sports',
            name: 'Đồng hồ Thể thao',
            description: 'Bền bỉ và năng động cho phong cách sống hiện đại',
            count: 18,
            image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
            icon: <FaClock />,
            brands: ['TAG Heuer', 'Omega', 'Tudor']
        },
        {
            id: 'smart',
            name: 'Đồng hồ Thông minh',
            description: 'Kết hợp công nghệ hiện đại với thiết kế thời trang',
            count: 6,
            image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
            icon: <FaClock />,
            brands: ['Apple', 'Samsung', 'Garmin']
        },
    ];

    const featuredBrands = [
        { id: 'rolex', name: 'Rolex', products: 25, image: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=400&q=80' },
        { id: 'omega', name: 'Omega', products: 18, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80' },
        { id: 'cartier', name: 'Cartier', products: 12, image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80' },
        { id: 'patek', name: 'Patek Philippe', products: 8, image: 'https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=400&q=80' },
    ];

    return (
        <div className="categories-page">
            {/* Hero Section */}
            <div className="categories-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Bộ sưu tập</h1>
                        <p className="hero-subtitle">
                            Khám phá các danh mục đồng hồ đa dạng, từ cao cấp đến thể thao
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Categories Grid */}
                <div className="categories-section">
                    <div className="section-header">
                        <h2 className="section-title">Danh mục chính</h2>
                        <p className="section-subtitle">
                            Lựa chọn theo phong cách và mục đích sử dụng
                        </p>
                    </div>

                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link
                                to={`/danh-muc/${category.id}`}
                                key={category.id}
                                className="category-card"
                            >
                                <div className="category-image">
                                    <img src={category.image} alt={category.name} />
                                    <div className="category-icon">{category.icon}</div>
                                    <div className="category-overlay" />
                                </div>
                                <div className="category-content">
                                    <h3 className="category-name">{category.name}</h3>
                                    <p className="category-description">{category.description}</p>
                                    <div className="category-meta">
                                        <span className="category-count">{category.count} mẫu</span>
                                        <div className="category-brands">
                                            {category.brands.slice(0, 3).map((brand, idx) => (
                                                <span key={idx} className="brand-tag">{brand}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="category-link">
                                        Xem danh mục
                                        <FaArrowRight />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Brands */}
                <div className="brands-section">
                    <div className="section-header">
                        <h2 className="section-title">Thương hiệu nổi bật</h2>
                        <p className="section-subtitle">
                            Khám phá các thương hiệu đồng hồ hàng đầu
                        </p>
                    </div>

                    <div className="brands-grid">
                        {featuredBrands.map(brand => (
                            <Link
                                to={`/thuong-hieu/${brand.id}`}
                                key={brand.id}
                                className="brand-card"
                            >
                                <div className="brand-image">
                                    <img src={brand.image} alt={brand.name} />
                                    <div className="brand-overlay" />
                                </div>
                                <div className="brand-content">
                                    <h3 className="brand-name">{brand.name}</h3>
                                    <p className="brand-products">{brand.products} sản phẩm</p>
                                    <div className="brand-link">
                                        Xem thương hiệu
                                        <FaArrowRight />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Guide Section */}
                <div className="guide-section">
                    <div className="section-header">
                        <h2 className="section-title">Hướng dẫn chọn đồng hồ</h2>
                        <p className="section-subtitle">
                            Những yếu tố quan trọng khi lựa chọn đồng hồ
                        </p>
                    </div>

                    <div className="guide-grid">
                        <div className="guide-card">
                            <div className="guide-number">01</div>
                            <h3>Xác định mục đích sử dụng</h3>
                            <p>Đồng hồ công sở, thể thao hay dự tiệc? Mỗi mục đích cần một phong cách phù hợp.</p>
                        </div>
                        <div className="guide-card">
                            <div className="guide-number">02</div>
                            <h3>Chọn kích thước phù hợp</h3>
                            <p>Cân đối giữa kích thước đồng hồ và cổ tay giúp tạo sự hài hòa.</p>
                        </div>
                        <div className="guide-card">
                            <div className="guide-number">03</div>
                            <h3>Xem xét ngân sách</h3>
                            <p>Thiết lập ngân sách phù hợp giúp bạn tập trung vào các lựa chọn tốt nhất.</p>
                        </div>
                        <div className="guide-card">
                            <div className="guide-number">04</div>
                            <h3>Chất liệu và độ bền</h3>
                            <p>Thép không gỉ, titanium hay vàng? Mỗi chất liệu có ưu điểm riêng.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;