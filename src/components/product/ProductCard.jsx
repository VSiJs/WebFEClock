import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCartPlus, FaEye, FaTag } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = React.useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/san-pham/${product.id}`} className="product-link">
                {/* Product Image */}
                <div className="product-image">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={isHovered ? 'image-zoomed' : ''}
                    />

                    {/* Discount Badge */}
                    {product.discount && product.discount > 0 && (
                        <div className="discount-badge">
                            <FaTag className="tag-icon" />
                            <span className="discount-text">-{product.discount}%</span>
                        </div>
                    )}

                    {/* Stock Status */}
                    {product.stock === 0 && (
                        <div className="out-of-stock">
                            Hết hàng
                        </div>
                    )}

                    {/* Quick View Button */}
                    <div className={`quick-view ${isHovered ? 'visible' : ''}`}>
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Xử lý xem nhanh
                            console.log('Quick view:', product.id);
                        }}>
                            <FaEye /> Xem nhanh
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    {/* Brand */}
                    <div className="product-brand">{product.brand}</div>

                    {/* Product Name */}
                    <h3 className="product-name">{product.name}</h3>

                    {/* Rating */}
                    <div className="product-rating">
                        <div className="stars">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className={index < Math.floor(product.rating) ? 'star filled' : 'star'}
                                />
                            ))}
                        </div>
                        <span className="review-count">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="product-price">
                        <span className="current-price">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <span className="original-price">
                {formatPrice(product.originalPrice)}
              </span>
                        )}
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div className="product-features">
                            {product.features.slice(0, 2).map((feature, index) => (
                                <span key={index} className="feature">
                  {feature}
                </span>
                            ))}
                        </div>
                    )}

                    {/* Stock Status */}
                    <div className="product-stock">
                        {product.stock > 0 ? (
                            <span className="in-stock">
                Còn {product.stock} sản phẩm
              </span>
                        ) : (
                            <span className="out-stock">Liên hệ đặt hàng</span>
                        )}
                    </div>
                </div>
            </Link>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`add-to-cart-btn ${isHovered && product.stock > 0 ? 'hover' : ''} ${product.stock === 0 ? 'disabled' : ''}`}
            >
                <FaCartPlus className="cart-icon" />
                {product.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
            </button>
        </div>
    );
};

export default ProductCard;