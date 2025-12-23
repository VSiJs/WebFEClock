import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTruck, FaHeadset, FaCrown } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            const mockProducts = [
                {
                    id: 1,
                    name: "Rolex Submariner Date",
                    price: 385000000,
                    originalPrice: 420000000,
                    discount: 8,
                    category: "luxury",
                    brand: "Rolex",
                    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
                    description: "Đồng hồ lặn biểu tượng với vỏ thép không gỉ 41mm",
                    stock: 3,
                    rating: 4.9,
                    reviews: 128,
                    features: ["Chống nước 300m", "Cerachrom bezel", "Caliber 3235"]
                },
                {
                    id: 2,
                    name: "Omega Speedmaster Moonwatch",
                    price: 285000000,
                    originalPrice: 310000000,
                    discount: 8,
                    category: "heritage",
                    brand: "Omega",
                    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w-800&q=80",
                    description: "Đồng hồ phi hành gia chính hãng Thụy Sĩ",
                    stock: 5,
                    rating: 4.8,
                    reviews: 95,
                    features: ["Hand-wound", "Hesalite crystal", "Moonwatch"]
                },
                {
                    id: 3,
                    name: "Cartier Tank Must",
                    price: 185000000,
                    category: "classic",
                    brand: "Cartier",
                    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80",
                    description: "Biểu tượng đồng hồ hình chữ nhật thanh lịch",
                    stock: 8,
                    rating: 4.7,
                    reviews: 67,
                    features: ["Quartz movement", "Roman numerals", "Alligator strap"]
                },
                {
                    id: 4,
                    name: "Patek Philippe Nautilus",
                    price: 985000000,
                    category: "luxury",
                    brand: "Patek Philippe",
                    image: "https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=800&q=80",
                    description: "Siêu phẩm đồng hồ thể thao đẳng cấp",
                    stock: 1,
                    rating: 5.0,
                    reviews: 48,
                    features: ["Stainless steel", "Sapphire crystal", "Self-winding"]
                },
            ];
            setFeaturedProducts(mockProducts);
            setNewProducts([...mockProducts].reverse());
            setLoading(false);
        }, 1000);
    }, []);

    const categories = [
        { id: 'luxury', name: 'Đồng hồ Cao cấp', count: 12, image: 'https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=400&q=80' },
        { id: 'sports', name: 'Đồng hồ Thể thao', count: 18, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80' },
        { id: 'classic', name: 'Đồng hồ Cổ điển', count: 15, image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80' },
        { id: 'smart', name: 'Đồng hồ Thông minh', count: 8, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80' },
    ];

    const brands = [
        { id: 'rolex', name: 'Rolex', logo: 'R' },
        { id: 'omega', name: 'Omega', logo: 'Ω' },
        { id: 'cartier', name: 'Cartier', logo: 'C' },
        { id: 'patek', name: 'Patek Philippe', logo: 'PP' },
        { id: 'audemars', name: 'Audemars Piguet', logo: 'AP' },
    ];

    if (loading) {
        return <div className="loading-screen">Chrono<span className="luxury-dot">.</span></div>;
    }

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title" style={{color: 'black'}}>
                                Bộ sưu tập<span className="luxury-dot">.</span>
                                <br />
                                <span className="hero-subtitle">Đồng hồ đẳng cấp Thụy Sĩ</span>
                            </h1>
                            <p className="hero-description">
                                Khám phá bộ sưu tập đồng hồ cao cấp chính hãng với thiết kế tinh xảo và
                                chất lượng hoàn hảo. Mỗi chiếc đồng hồ là một tác phẩm nghệ thuật.
                            </p>
                            <Link to="/danh-muc" className="hero-button">
                                Khám phá bộ sưu tập
                                <FaArrowRight className="button-icon" />
                            </Link>
                        </div>
                        <div className="hero-image">
                            <img
                                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80"
                                alt="Premium Watch Collection"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-item">
                            <FaShieldAlt className="trust-icon" />
                            <h3>Bảo hành 5 năm</h3>
                            <p>Bảo hành chính hãng toàn cầu</p>
                        </div>
                        <div className="trust-item">
                            <FaTruck className="trust-icon" />
                            <h3>Miễn phí vận chuyển</h3>
                            <p>Giao hàng toàn quốc trong 24h</p>
                        </div>
                        <div className="trust-item">
                            <FaHeadset className="trust-icon" />
                            <h3>Tư vấn 24/7</h3>
                            <p>Chuyên gia đồng hồ hỗ trợ</p>
                        </div>
                        <div className="trust-item">
                            <FaCrown className="trust-icon" />
                            <h3>Chứng nhận chính hãng</h3>
                            <p>100% đồng hồ Thụy Sĩ nguyên bản</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Bộ sưu tập</h2>
                        <p className="section-subtitle">Lựa chọn theo phong cách và nhu cầu của bạn</p>
                    </div>
                    <div className="categories-grid">
                        {categories.map(category => (
                            <Link to={`/danh-muc/${category.id}`} key={category.id} className="category-card">
                                <div className="category-image">
                                    <img src={category.image} alt={category.name} />
                                    <div className="category-overlay" />
                                </div>
                                <div className="category-content">
                                    <h3>{category.name}</h3>
                                    <p>{category.count} mẫu</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm đặc biệt</h2>
                        <Link to="/danh-muc" className="section-link">
                            Xem tất cả
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ProductList products={featuredProducts.slice(0, 4)} />
                </div>
            </section>

            {/* Brands Section */}
            <section className="brands-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Thương hiệu đối tác</h2>
                        <p className="section-subtitle">Những thương hiệu đồng hồ hàng đầu thế giới</p>
                    </div>
                    <div className="brands-grid">
                        {brands.map(brand => (
                            <Link to={`/thuong-hieu/${brand.id}`} key={brand.id} className="brand-card">
                                <div className="brand-logo">{brand.logo}</div>
                                <h3>{brand.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="new-arrivals">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm mới về</h2>
                        <Link to="/danh-muc?sort=new" className="section-link">
                            Xem mới nhất
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ProductList products={newProducts.slice(0, 4)} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Tìm chiếc đồng hồ hoàn hảo</h2>
                        <p>Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn giúp bạn lựa chọn chiếc đồng hồ phù hợp nhất.</p>
                        <Link to="/contact" className="cta-button">
                            Đặt lịch tư vấn
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;