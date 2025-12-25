import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    if (items.length === 0) {
        return (
            <div className="cart-empty">
                <div className="container">
                    <div className="empty-content">
                        <div className="empty-icon">
                            <FaShoppingBag />
                        </div>
                        <h1>Giỏ hàng của bạn đang trống</h1>
                        <p>Hãy thêm những chiếc đồng hồ yêu thích vào giỏ hàng để bắt đầu mua sắm</p>
                        <Link to="/" className="continue-shopping-btn">
                            <FaArrowLeft />
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1 className="page-title">Giỏ hàng</h1>
                    <div className="cart-summary-header">
                        <span className="item-count">{items.length} sản phẩm</span>
                        <span className="total-price">{formatPrice(total)}</span>
                    </div>
                </div>

                <div className="cart-content">
                    {/* Cart Items */}
                    <div className="cart-items-section">
                        <div className="cart-items">
                            {items.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>

                                    <div className="item-details">
                                        <div className="item-header">
                                            <h3 className="item-name">{item.product.name}</h3>
                                            <span className="item-brand">{item.product.brand}</span>
                                        </div>

                                        <div className="item-specs">
                                            <span className="spec">Màu sắc: Đen</span>
                                            <span className="spec">Kích thước: 41mm</span>
                                        </div>

                                        <div className="item-actions">
                                            <div className="quantity-control">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="quantity-btn"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <FaMinus />
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="quantity-btn"
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="remove-item-btn"
                                            >
                                                <FaTrash />
                                                Xóa
                                            </button>
                                        </div>
                                    </div>

                                    <div className="item-price-section">
                                        <div className="price-unit">{formatPrice(item.product.price)}</div>
                                        <div className="price-total">{formatPrice(item.product.price * item.quantity)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions">
                            <button onClick={clearCart} className="clear-cart-btn">
                                Xóa tất cả
                            </button>
                            <Link to="/" className="continue-shopping-link">
                                <FaArrowLeft />
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-section">
                        <div className="summary-card">
                            <h3 className="summary-title">Tóm tắt đơn hàng</h3>

                            <div className="summary-details">
                                <div className="detail-row">
                                    <span>Tạm tính</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Phí vận chuyển</span>
                                    <span className="free">Miễn phí</span>
                                </div>
                                <div className="detail-row">
                                    <span>Thuế VAT</span>
                                    <span>Đã bao gồm</span>
                                </div>

                                <div className="divider" />

                                <div className="detail-row total">
                                    <span>Tổng cộng</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link to="/checkout" className="checkout-btn">
                                Tiến hành thanh toán
                            </Link>

                            <div className="secure-checkout">
                                <div className="secure-icon">🔒</div>
                                <div className="secure-text">
                                    <strong>Thanh toán an toàn</strong>
                                    <span>Thông tin được bảo mật và mã hóa</span>
                                </div>
                            </div>

                            <div className="payment-methods">
                                <p>Chấp nhận thanh toán:</p>
                                <div className="payment-icons">
                                    <span className="payment-icon">💳</span>
                                    <span className="payment-icon">🏦</span>
                                    <span className="payment-icon">📱</span>
                                    <span className="payment-icon">💰</span>
                                </div>
                            </div>
                        </div>

                        <div className="shipping-info">
                            <h4>Thông tin giao hàng</h4>
                            <ul>
                                <li>Giao hàng miễn phí toàn quốc</li>
                                <li>Nhận hàng trong 1-3 ngày làm việc</li>
                                <li>Đổi trả trong 7 ngày</li>
                                <li>Bảo hành chính hãng 5 năm</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;