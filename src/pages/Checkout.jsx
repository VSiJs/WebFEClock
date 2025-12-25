import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCheckCircle, FaCreditCard, FaTruck, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        note: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = () => {
        if (step === 1 && validateShippingInfo()) {
            setStep(2);
        } else if (step === 2) {
            handlePlaceOrder();
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const validateShippingInfo = () => {
        const required = ['fullName', 'phone', 'address', 'city', 'district'];
        return required.every(field => shippingInfo[field].trim() !== '');
    };

    const handlePlaceOrder = () => {
        // Generate order number
        const newOrderNumber = 'ORD-' + Date.now().toString().slice(-8);
        setOrderNumber(newOrderNumber);

        // Simulate order processing
        setTimeout(() => {
            setOrderComplete(true);
            clearCart();
        }, 1500);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    if (items.length === 0 && !orderComplete) {
        return (
            <div className="empty-checkout">
                <div className="container">
                    <div className="empty-content">
                        <h2>Giỏ hàng của bạn đang trống</h2>
                        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục thanh toán</p>
                        <button onClick={() => navigate('/')} className="continue-shopping-btn">
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="order-complete">
                <div className="container">
                    <div className="complete-content">
                        <div className="success-icon">
                            <FaCheckCircle />
                        </div>
                        <h1>Đặt hàng thành công!</h1>
                        <p className="order-number">Mã đơn hàng: {orderNumber}</p>
                        <div className="order-summary-card">
                            <h3>Thông tin đơn hàng</h3>
                            <div className="summary-details">
                                <div className="detail-item">
                                    <span>Người nhận:</span>
                                    <span>{shippingInfo.fullName}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Số điện thoại:</span>
                                    <span>{shippingInfo.phone}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Địa chỉ:</span>
                                    <span>{shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district}, {shippingInfo.city}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Phương thức thanh toán:</span>
                                    <span>
                    {paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' :
                        paymentMethod === 'banking' ? 'Chuyển khoản ngân hàng' :
                            'Ví điện tử MoMo'}
                  </span>
                                </div>
                                <div className="detail-item total">
                                    <span>Tổng thanh toán:</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                        <p className="confirmation-text">
                            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận đơn hàng.
                            Cảm ơn bạn đã mua sắm tại Chrono!
                        </p>
                        <div className="action-buttons">
                            <button onClick={() => navigate('/')} className="continue-shopping-btn">
                                Tiếp tục mua sắm
                            </button>
                            <button onClick={() => window.print()} className="print-invoice-btn">
                                In hóa đơn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-header">
                    <h1 className="page-title">Thanh toán</h1>
                    <div className="secure-checkout">
                        <FaLock />
                        <span>Thanh toán an toàn & bảo mật</span>
                    </div>
                </div>

                <div className="checkout-content">
                    <div className="checkout-steps">
                        <div className={`step ${step >= 1 ? 'active' : ''}`}>
                            <div className="step-number">1</div>
                            <div className="step-info">
                                <div className="step-title">Thông tin giao hàng</div>
                                <div className="step-subtitle">Nhập địa chỉ nhận hàng</div>
                            </div>
                        </div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <div className="step-info">
                                <div className="step-title">Phương thức thanh toán</div>
                                <div className="step-subtitle">Chọn cách thanh toán</div>
                            </div>
                        </div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`}>
                            <div className="step-number">3</div>
                            <div className="step-info">
                                <div className="step-title">Xác nhận đơn hàng</div>
                                <div className="step-subtitle">Kiểm tra và xác nhận</div>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-main">
                        {/* Left Column - Forms */}
                        <div className="checkout-forms">
                            {step === 1 && (
                                <div className="form-section">
                                    <div className="section-header">
                                        <FaUser className="section-icon" />
                                        <h2>Thông tin giao hàng</h2>
                                    </div>

                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label>Họ và tên *</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={shippingInfo.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Nguyễn Văn A"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Số điện thoại *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={shippingInfo.phone}
                                                onChange={handleInputChange}
                                                placeholder="0912 345 678"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={shippingInfo.email}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                            />
                                        </div>

                                        <div className="form-group full-width">
                                            <label>Địa chỉ *</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={shippingInfo.address}
                                                onChange={handleInputChange}
                                                placeholder="Số nhà, tên đường"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Tỉnh/Thành phố *</label>
                                            <select
                                                name="city"
                                                value={shippingInfo.city}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                <option value="hcm">TP. Hồ Chí Minh</option>
                                                <option value="hn">Hà Nội</option>
                                                <option value="dn">Đà Nẵng</option>
                                                <option value="hp">Hải Phòng</option>
                                                <option value="ct">Cần Thơ</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Quận/Huyện *</label>
                                            <select
                                                name="district"
                                                value={shippingInfo.district}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value="">Chọn quận/huyện</option>
                                                <option value="q1">Quận 1</option>
                                                <option value="q7">Quận 7</option>
                                                <option value="qbt">Quận Bình Thạnh</option>
                                                <option value="qpn">Quận Phú Nhuận</option>
                                            </select>
                                        </div>

                                        <div className="form-group full-width">
                                            <label>Ghi chú (tùy chọn)</label>
                                            <textarea
                                                name="note"
                                                value={shippingInfo.note}
                                                onChange={handleInputChange}
                                                placeholder="Ghi chú về đơn hàng, địa chỉ giao hàng..."
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="form-section">
                                    <div className="section-header">
                                        <FaCreditCard className="section-icon" />
                                        <h2>Phương thức thanh toán</h2>
                                    </div>

                                    <div className="payment-methods">
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                            />
                                            <div className="payment-content">
                                                <div className="payment-title">
                                                    <FaTruck />
                                                    <span>Thanh toán khi nhận hàng (COD)</span>
                                                </div>
                                                <p className="payment-description">
                                                    Thanh toán bằng tiền mặt khi nhận được hàng
                                                </p>
                                            </div>
                                        </label>

                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="banking"
                                                checked={paymentMethod === 'banking'}
                                                onChange={() => setPaymentMethod('banking')}
                                            />
                                            <div className="payment-content">
                                                <div className="payment-title">
                                                    <FaCreditCard />
                                                    <span>Chuyển khoản ngân hàng</span>
                                                </div>
                                                <p className="payment-description">
                                                    Chuyển khoản trước qua ngân hàng
                                                </p>
                                                <div className="bank-info">
                                                    <p><strong>Ngân hàng:</strong> Techcombank</p>
                                                    <p><strong>Số tài khoản:</strong> 1903 5555 8888</p>
                                                    <p><strong>Chủ tài khoản:</strong> CHRONO WATCH STORE</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="order-summary">
                            <div className="summary-card">
                                <h3 className="summary-title">Tóm tắt đơn hàng</h3>

                                <div className="order-items">
                                    {items.map(item => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-image">
                                                <img src={item.product.image} alt={item.product.name} />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.product.name}</h4>
                                                <p className="item-quantity">Số lượng: {item.quantity}</p>
                                            </div>
                                            <div className="item-price">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-totals">
                                    <div className="total-row">
                                        <span>Tạm tính:</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                    <div className="total-row">
                                        <span>Phí vận chuyển:</span>
                                        <span className="free-shipping">Miễn phí</span>
                                    </div>
                                    <div className="total-row grand-total">
                                        <span>Tổng cộng:</span>
                                        <span>{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <div className="summary-actions">
                                    {step > 1 && (
                                        <button onClick={handlePrevStep} className="prev-step-btn">
                                            Quay lại
                                        </button>
                                    )}
                                    <button
                                        onClick={handleNextStep}
                                        className="next-step-btn"
                                        disabled={step === 1 && !validateShippingInfo()}
                                    >
                                        {step === 1 ? 'Tiếp tục thanh toán' :
                                            step === 2 ? 'Đặt hàng' : 'Hoàn tất'}
                                    </button>
                                </div>

                                <div className="security-note">
                                    <FaLock />
                                    <span>Thông tin thanh toán của bạn được bảo mật và mã hóa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;