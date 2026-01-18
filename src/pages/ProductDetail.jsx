import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTruck, FaShieldAlt, FaArrowLeft, FaCheck, FaTag, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import ProductList from '../components/product/ProductList';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    // Mock product data
    const product = {
        id: 1,
        name: "Rolex Submariner Date",
        price: 385000000,
        originalPrice: 420000000,
        discount: 8,
        category: "luxury",
        brand: "Rolex",
        images: [
            "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80",
            "https://i.pinimg.com/736x/7f/7d/a4/7f7da48b4bca692476b3deaaaa06af04.jpg?w=1200&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80",
            "https://i.pinimg.com/736x/5d/30/df/5d30dfd221700bb0af2dd54be5a508d3.jpg?w=1200&q=80",
        ],
        description: "Rolex Submariner Date là biểu tượng của đồng hồ lặn cao cấp. Với thiết kế cổ điển không bao giờ lỗi thời, chiếc đồng hồ này kết hợp giữa vẻ đẹp truyền thống và công nghệ hiện đại.",
        detailedDescription: `
      <p>Được ra mắt lần đầu tiên vào năm 1953, Rolex Submariner đã trở thành biểu tượng của đồng hồ lặn chuyên nghiệp. Phiên bản Date này mang đến chức năng hiển thị ngày, kết hợp hoàn hảo giữa tính năng và thẩm mỹ.</p>
      <p>Với khả năng chống nước lên đến 300 mét (1,000 feet), vỏ Oyster bằng thép không gỉ 904L, và bezel xoay một chiều bằng gốm Cerachrom, Submariner Date là sự lựa chọn hoàn hảo cho những người đam mê thể thao dưới nước và phong cách sống năng động.</p>
    `,
        specifications: [
            { label: "Thương hiệu", value: "Rolex" },
            { label: "Dòng sản phẩm", value: "Submariner" },
            { label: "Máy", value: "Caliber 3235, tự động" },
            { label: "Chống nước", value: "300m" },
            { label: "Chất liệu vỏ", value: "Thép không gỉ Oystersteel" },
            { label: "Kính", value: "Sapphire chống phản chiếu" },
            { label: "Đường kính mặt", value: "41mm" },
            { label: "Dây đeo", value: "Oyster, thép không gỉ" },
            { label: "Bảo hành", value: "5 năm chính hãng" },
            { label: "Xuất xứ", value: "Thụy Sĩ" },
        ],
        features: [
            "Chống nước 300 mét",
            "Bezel Cerachrom một chiều",
            "Máy tự động Caliber 3235",
            "Chứng nhận Superlative Chronometer",
            "Dây Oyster với hệ thống Easylink",
            "Kính sapphire chống trầy",
            "Hiển thị ngày với kính Cyclops",
            "Vỏ Oyster chống bụi và nước",
        ],
        rating: 4.9,
        reviews: 128,
        stock: 3,
        deliveryTime: "1-3 ngày làm việc",
        warranty: "5 năm chính hãng",
    };

    const relatedProducts = [
        {
            id: 2,
            name: "Omega Seamaster Diver 300M",
            price: 285000000,
            image: "https://images.unsplash.com/photo-1691865179028-1729b766a5cd?w=400&q=80",
            brand: "Omega",
            rating: 4.8,
        },
        {
            id: 3,
            name: "Cartier Santos de Cartier",
            price: 185000000,
            image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80",
            brand: "Cartier",
            rating: 4.7,
        },
        {
            id: 4,
            name: "TAG Heuer Carrera",
            price: 95000000,
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80",
            brand: "TAG Heuer",
            rating: 4.5,
        },
        {
            id: 5,
            name: "Breitling Navitimer",
            price: 320000000,
            image: "https://images.unsplash.com/photo-1553062407-98feb7a5f78c?w=400&q=80",
            brand: "Breitling",
            rating: 4.6,
        },
    ];

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/cart');
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <Link to="/" className="breadcrumb-link">Trang chủ</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to="/danh-muc" className="breadcrumb-link">Đồng hồ</Link>
                    <span className="breadcrumb-separator">/</span>
                    <Link to={`/danh-muc/${product.category}`} className="breadcrumb-link">Đồng hồ cao cấp</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">{product.name}</span>
                </div>
            </div>

            <div className="container">
                <div className="product-detail-content">
                    {/* Back Button Mobile */}
                    <button onClick={() => navigate(-1)} className="back-button-mobile">
                        <FaArrowLeft />
                        Quay lại
                    </button>

                    {/* Product Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.images[selectedImage]} alt={product.name} />
                            {product.discount > 0 && (
                                <div className="discount-badge">
                                    <FaTag />
                                    <span>-{product.discount}%</span>
                                </div>
                            )}
                        </div>
                        <div className="thumbnail-images">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                    aria-label={`Xem ảnh ${index + 1}`}
                                >
                                    <img src={img} alt={`${product.name} ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        {/* Brand & Category */}
                        <div className="product-meta">
                            <span className="product-brand">{product.brand}</span>
                            <span className="product-category">{product.category}</span>
                        </div>

                        {/* Product Name */}
                        <h1 className="product-name">{product.name}</h1>

                        {/* Rating */}
                        <div className="product-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                                    />
                                ))}
                            </div>
                            <span className="rating-value">{product.rating.toFixed(1)}</span>
                            <span className="reviews">({product.reviews} đánh giá)</span>
                            <span className="stock-badge">
                <FaClock />
                Còn {product.stock} sản phẩm
              </span>
                        </div>

                        {/* Price */}
                        <div className="product-price">
                            <span className="current-price">{formatPrice(product.price)}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                    <span className="discount">-{product.discount}%</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>

                        {/* Key Features */}
                        <div className="key-features">
                            <h3>Đặc điểm nổi bật</h3>
                            <div className="features-grid">
                                {product.features.slice(0, 4).map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <FaCheck />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="quantity-selector">
                            <label>Số lượng:</label>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    className="quantity-btn"
                                    aria-label="Giảm số lượng"
                                >
                                    -
                                </button>
                                <span className="quantity-value">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                    className="quantity-btn"
                                    aria-label="Tăng số lượng"
                                >
                                    +
                                </button>
                            </div>
                            <span className="stock-info">
                Chỉ còn {product.stock} sản phẩm trong kho
              </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="add-to-cart-button" onClick={handleAddToCart}>
                                <FaShoppingCart />
                                Thêm vào giỏ hàng
                            </button>
                            <button className="buy-now-button" onClick={handleBuyNow}>
                                Mua ngay
                            </button>
                            <div className="secondary-actions">
                                <button
                                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                                >
                                    <FaHeart />
                                </button>
                                <button className="share-button" aria-label="Chia sẻ sản phẩm">
                                    <FaShare />
                                </button>
                            </div>
                        </div>

                        {/* Delivery & Warranty */}
                        <div className="service-info">
                            <div className="service-item">
                                <FaTruck />
                                <div>
                                    <h4>Giao hàng nhanh</h4>
                                    <p>{product.deliveryTime}</p>
                                </div>
                            </div>
                            <div className="service-item">
                                <FaShieldAlt />
                                <div>
                                    <h4>Bảo hành</h4>
                                    <p>{product.warranty}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Mô tả chi tiết
                        </button>
                        <button
                            className={`tab ${activeTab === 'specifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('specifications')}
                        >
                            Thông số kỹ thuật
                        </button>
                        <button
                            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Đánh giá ({product.reviews})
                        </button>
                        <button
                            className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
                            onClick={() => setActiveTab('faq')}
                        >
                            Câu hỏi thường gặp
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-panel">
                                <div className="detailed-description"
                                     dangerouslySetInnerHTML={{ __html: product.detailedDescription }}
                                />
                                <div className="full-features">
                                    <h3>Tất cả tính năng</h3>
                                    <div className="features-list">
                                        {product.features.map((feature, index) => (
                                            <div key={index} className="feature-item-full">
                                                <FaCheck />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="tab-panel">
                                <div className="specifications-grid">
                                    {product.specifications.map((spec, index) => (
                                        <div key={index} className="specification-item">
                                            <span className="spec-label">{spec.label}</span>
                                            <span className="spec-value">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-panel">
                                <div className="reviews-summary">
                                    <div className="average-rating">
                                        <div className="rating-number">{product.rating.toFixed(1)}</div>
                                        <div className="stars-large">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className={i < Math.floor(product.rating) ? 'filled' : ''} />
                                            ))}
                                        </div>
                                        <div className="total-reviews">{product.reviews} đánh giá</div>
                                    </div>
                                    <div className="reviews-list">
                                        <div className="review-item">
                                            <div className="review-header">
                                                <div className="reviewer">Nguyễn Văn A</div>
                                                <div className="review-date">15/12/2023</div>
                                            </div>
                                            <div className="review-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className="filled" />
                                                ))}
                                            </div>
                                            <div className="review-content">
                                                "Sản phẩm tuyệt vời, chất lượng đúng như mong đợi. Đồng hồ chạy rất chính xác và thiết kế rất sang trọng."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="related-products">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm tương tự</h2>
                        <p className="section-subtitle">
                            Khám phá thêm những chiếc đồng hồ cùng phân khúc
                        </p>
                    </div>
                    <ProductList products={relatedProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;