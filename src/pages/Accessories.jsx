import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSearch, FaFilter } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Accessories.css';

const Accessories = () => {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    const accessories = [
        {
            id: 1,
            name: "Dây đồng hồ da cá sấu Ý",
            price: 4500000,
            category: "straps",
            material: "Da cá sấu thật",
            colors: ["Đen", "Nâu", "Xanh navy"],
            image: "https://i.pinimg.com/736x/35/94/07/35940711923d0f0e022083cf5e0df130.jpg?w=800&q=80",
            description: "Dây da cá sấu cao cấp nhập khẩu từ Ý, phù hợp với các dòng đồng hồ cao cấp.",
            stock: 15,
            rating: 4.7,
            reviews: 42,
        },
        {
            id: 2,
            name: "Hộp đựng đồng hồ gỗ sồi",
            price: 2800000,
            category: "boxes",
            material: "Gỗ sồi tự nhiên",
            capacity: "5 đồng hồ",
            image: "https://i.pinimg.com/736x/d7/e3/c9/d7e3c9427e61382244f5815546c206ed.jpg?w=800&q=80",
            description: "Hộp đựng bằng gỗ sồi tự nhiên với lớp lót nỉ mềm mại, bảo vệ đồng hồ tối ưu.",
            stock: 8,
            rating: 4.9,
            reviews: 28,
        },
        {
            id: 3,
            name: "Bộ vệ sinh đồng hồ chuyên nghiệp",
            price: 850000,
            category: "care",
            includes: ["Dung dịch vệ sinh", "Khăn chuyên dụng", "Chổi mềm"],
            image: "https://i.pinimg.com/736x/90/79/74/9079743cb7022ae7db5fc7e0e029de15.jpg?w=800&q=80",
            description: "Bộ dụng cụ vệ sinh chuyên nghiệp, an toàn cho mọi loại đồng hồ.",
            stock: 25,
            rating: 4.5,
            reviews: 36,
        },
        {
            id: 4,
            name: "Máy xoay đồng hồ tự động",
            price: 3200000,
            category: "winders",
            capacity: "2 đồng hồ",
            power: "Pin & USB",
            image: "https://i.pinimg.com/736x/54/8b/c0/548bc0a1bd5555bb24e38d24cc458d8d.jpg?w=800&q=80",
            description: "Máy xoay tự động giúp đồng hồ cơ luôn hoạt động chính xác khi không đeo.",
            stock: 6,
            rating: 4.8,
            reviews: 19,
        },
        {
            id: 5,
            name: "Bộ dụng cụ thay dây",
            price: 350000,
            category: "tools",
            includes: ["Tua vít đa năng", "Đầu lò xo", "Búa nhỏ"],
            image: "https://i.pinimg.com/736x/52/0c/5f/520c5f8697e8e6e73ed198b898ebffe7.jpg?w=800&q=80",
            description: "Bộ dụng cụ chuyên dụng giúp thay dây đồng hồ dễ dàng tại nhà.",
            stock: 30,
            rating: 4.4,
            reviews: 51,
        },
        {
            id: 6,
            name: "Túi đựng đồng hồ du lịch",
            price: 1250000,
            category: "travel",
            material: "Da tổng hợp",
            compartments: "3 ngăn",
            image: "https://i.pinimg.com/736x/57/ed/9b/57ed9bd2b7ad01a51d993618bdf82eae.jpg?w=800&q=80",
            description: "Túi đựng chống sốc, bảo vệ đồng hồ khi di chuyển, đi du lịch.",
            stock: 12,
            rating: 4.6,
            reviews: 24,
        },
    ];

    const categories = [
        { id: 'all', name: 'Tất cả', count: accessories.length },
        { id: 'straps', name: 'Dây đồng hồ', count: accessories.filter(a => a.category === 'straps').length },
        { id: 'boxes', name: 'Hộp đựng', count: accessories.filter(a => a.category === 'boxes').length },
        { id: 'care', name: 'Chăm sóc', count: accessories.filter(a => a.category === 'care').length },
        { id: 'winders', name: 'Máy xoay', count: accessories.filter(a => a.category === 'winders').length },
        { id: 'tools', name: 'Dụng cụ', count: accessories.filter(a => a.category === 'tools').length },
        { id: 'travel', name: 'Du lịch', count: accessories.filter(a => a.category === 'travel').length },
    ];

    const filteredAccessories = accessories.filter(accessory => {
        const matchesFilter = filter === 'all' || accessory.category === filter;
        const matchesSearch = search === '' ||
            accessory.name.toLowerCase().includes(search.toLowerCase()) ||
            accessory.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    const handleAddToCart = (accessory) => {
        addToCart(accessory, 1);
    };

    return (
        <div className="accessories-page">
            {/* Hero Section */}
            <div className="accessories-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Phụ kiện</h1>
                        <p className="hero-subtitle">
                            Hoàn thiện bộ sưu tập đồng hồ của bạn với các phụ kiện cao cấp
                            được thiết kế riêng để bảo vệ và nâng tầm chiếc đồng hồ.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Search & Filter */}
                <div className="accessories-controls">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm phụ kiện..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-tabs">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-tab ${filter === category.id ? 'active' : ''}`}
                                onClick={() => setFilter(category.id)}
                            >
                                {category.name}
                                <span className="tab-count">{category.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accessories Grid */}
                <div className="accessories-grid">
                    {filteredAccessories.map(accessory => (
                        <div key={accessory.id} className="accessory-card">
                            <div className="accessory-image">
                                <img src={accessory.image} alt={accessory.name} />
                                <button
                                    className="favorite-button"
                                    onClick={() => console.log('Add to favorite:', accessory.id)}
                                >
                                    <FaHeart />
                                </button>
                            </div>

                            <div className="accessory-info">
                                <div className="accessory-category">{accessory.category}</div>
                                <h3 className="accessory-name">{accessory.name}</h3>

                                <div className="accessory-rating">
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`star ${i < Math.floor(accessory.rating) ? 'filled' : ''}`}
                                            >
                        ★
                      </span>
                                        ))}
                                    </div>
                                    <span className="rating-count">({accessory.reviews})</span>
                                </div>

                                <p className="accessory-description">{accessory.description}</p>

                                <div className="accessory-specs">
                                    {accessory.material && (
                                        <div className="spec">
                                            <span className="spec-label">Chất liệu:</span>
                                            <span className="spec-value">{accessory.material}</span>
                                        </div>
                                    )}
                                    {accessory.colors && (
                                        <div className="spec">
                                            <span className="spec-label">Màu sắc:</span>
                                            <span className="spec-value">{accessory.colors.join(', ')}</span>
                                        </div>
                                    )}
                                    {accessory.capacity && (
                                        <div className="spec">
                                            <span className="spec-label">Sức chứa:</span>
                                            <span className="spec-value">{accessory.capacity}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="accessory-footer">
                                    <div className="accessory-price">
                                        <span className="current-price">{formatPrice(accessory.price)}</span>
                                        <span className="stock-status">
                      {accessory.stock > 0 ? `Còn ${accessory.stock} cái` : 'Hết hàng'}
                    </span>
                                    </div>

                                    <button
                                        className="add-to-cart-button"
                                        onClick={() => handleAddToCart(accessory)}
                                        disabled={accessory.stock === 0}
                                    >
                                        <FaShoppingCart />
                                        Thêm vào giỏ
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredAccessories.length === 0 && (
                    <div className="empty-accessories">
                        <div className="empty-content">
                            <h3>Không tìm thấy phụ kiện phù hợp</h3>
                            <p>Vui lòng thử lại với bộ lọc hoặc từ khóa tìm kiếm khác</p>
                            <button
                                className="reset-button"
                                onClick={() => {
                                    setFilter('all');
                                    setSearch('');
                                }}
                            >
                                <FaFilter />
                                Đặt lại bộ lọc
                            </button>
                        </div>
                    </div>
                )}

                {/* Care Guide */}
                <div className="care-guide">
                    <div className="section-header">
                        <h2 className="section-title">Hướng dẫn chăm sóc</h2>
                        <p className="section-subtitle">
                            Bảo quản và bảo dưỡng đồng hồ đúng cách để duy trì vẻ đẹp và độ bền
                        </p>
                    </div>

                    <div className="guide-tips">
                        <div className="tip-card">
                            <div className="tip-number">01</div>
                            <h3>Vệ sinh định kỳ</h3>
                            <p>Sử dụng bộ vệ sinh chuyên dụng để loại bỏ bụi bẩn và mồ hôi tích tụ.</p>
                        </div>
                        <div className="tip-card">
                            <div className="tip-number">02</div>
                            <h3>Bảo quản đúng cách</h3>
                            <p>Đặt đồng hồ trong hộp đựng chuyên dụng khi không sử dụng trong thời gian dài.</p>
                        </div>
                        <div className="tip-card">
                            <div className="tip-number">03</div>
                            <h3>Thay dây định kỳ</h3>
                            <p>Thay dây đồng hồ khi có dấu hiệu hư hỏng để đảm bảo an toàn và thẩm mỹ.</p>
                        </div>
                        <div className="tip-card">
                            <div className="tip-number">04</div>
                            <h3>Kiểm tra độ chính xác</h3>
                            <p>Sử dụng máy xoay cho đồng hồ cơ để duy trì độ chính xác khi không đeo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accessories;