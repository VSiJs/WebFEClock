import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHistory, FaAward, FaGlobe } from 'react-icons/fa';
import './Brands.css';

const Brands = () => {
    const brands = [
        {
            id: 'rolex',
            name: 'Rolex',
            founded: '1905',
            origin: 'Geneva, Switzerland',
            description: 'Biểu tượng của sự sang trọng và độ tin cậy. Rolex đã định nghĩa lại ngành công nghiệp đồng hồ với sự đổi mới không ngừng.',
            logo: 'R',
            heroImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
            products: 25,
            specialties: ['Oyster Perpetual', 'Submariner', 'Daytona', 'Datejust']
        },
        {
            id: 'omega',
            name: 'Omega',
            founded: '1848',
            origin: 'Bienne, Switzerland',
            description: 'Nhà sản xuất đồng hồ chính thức của NASA và là biểu tượng của sự chính xác và khám phá.',
            logo: 'Ω',
            heroImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
            products: 18,
            specialties: ['Speedmaster', 'Seamaster', 'Constellation', 'De Ville']
        },
        {
            id: 'cartier',
            name: 'Cartier',
            founded: '1847',
            origin: 'Paris, France',
            description: 'Sự kết hợp hoàn hảo giữa nghệ thuật chế tác đồng hồ và thiết kế trang sức cao cấp.',
            logo: 'C',
            heroImage: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1200&q=80',
            products: 12,
            specialties: ['Tank', 'Santos', 'Ballon Bleu', 'Calibre']
        },
        {
            id: 'patek',
            name: 'Patek Philippe',
            founded: '1839',
            origin: 'Geneva, Switzerland',
            description: 'Bậc thầy của nghệ thuật chế tác đồng hồ phức tạp, tạo ra những kiệt tác để đời.',
            logo: 'PP',
            heroImage: 'https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=1200&q=80',
            products: 8,
            specialties: ['Nautilus', 'Aquanaut', 'Calatrava', 'Grand Complications']
        },
        {
            id: 'audemars',
            name: 'Audemars Piguet',
            founded: '1875',
            origin: 'Le Brassus, Switzerland',
            description: 'Nhà tiên phong trong thiết kế đồng hồ thể thao cao cấp với Royal Oak làm biểu tượng.',
            logo: 'AP',
            heroImage: 'https://images.unsplash.com/photo-1553062407-98feb7a5f78c?w=1200&q=80',
            products: 6,
            specialties: ['Royal Oak', 'Royal Oak Offshore', 'Millenary', 'Jules Audemars']
        },
        {
            id: 'tag',
            name: 'TAG Heuer',
            founded: '1860',
            origin: 'La Chaux-de-Fonds, Switzerland',
            description: 'Biểu tượng của thể thao tốc độ và sự chính xác, là đối tác của nhiều đội đua F1.',
            logo: 'TH',
            heroImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&q=80',
            products: 15,
            specialties: ['Carrera', 'Monaco', 'Aquaracer', 'Formula 1']
        },
    ];

    const brandStats = [
        { label: 'Thương hiệu', value: '6+' },
        { label: 'Sản phẩm', value: '85+' },
        { label: 'Năm kinh nghiệm', value: '100+' },
        { label: 'Quốc gia phân phối', value: '50+' },
    ];

    return (
        <div className="brands-page">
            {/* Hero Section */}
            <div className="brands-hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Thương hiệu</h1>
                        <p className="hero-subtitle">
                            Khám phá những thương hiệu đồng hồ hàng đầu thế giới,
                            mỗi thương hiệu là một câu chuyện về sự đam mê và tinh thần sáng tạo.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="brands-stats">
                <div className="container">
                    <div className="stats-grid">
                        {brandStats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                {/* All Brands */}
                <div className="all-brands-section">
                    <div className="section-header">
                        <h2 className="section-title">Tất cả thương hiệu</h2>
                        <p className="section-subtitle">
                            Lựa chọn từ những cái tên đẳng cấp nhất trong làng đồng hồ
                        </p>
                    </div>

                    <div className="brands-grid">
                        {brands.map(brand => (
                            <div key={brand.id} className="brand-card-large">
                                <Link to={`/thuong-hieu/${brand.id}`} className="brand-link">
                                    <div className="brand-header">
                                        <div className="brand-logo-large">{brand.logo}</div>
                                        <div className="brand-info">
                                            <h3 className="brand-name-large">{brand.name}</h3>
                                            <div className="brand-meta">
                        <span className="brand-founded">
                          <FaHistory />
                            {brand.founded}
                        </span>
                                                <span className="brand-origin">
                          <FaGlobe />
                                                    {brand.origin}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="brand-image-large">
                                        <img src={brand.heroImage} alt={brand.name} />
                                    </div>
                                    <div className="brand-content">
                                        <p className="brand-description">{brand.description}</p>
                                        <div className="brand-specialties">
                                            <h4>Dòng sản phẩm chính:</h4>
                                            <div className="specialties-tags">
                                                {brand.specialties.map((specialty, idx) => (
                                                    <span key={idx} className="specialty-tag">{specialty}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="brand-footer">
                      <span className="brand-products-count">
                        {brand.products} sản phẩm
                      </span>
                                            <span className="brand-link-text">
                        Khám phá thương hiệu
                        <FaArrowRight />
                      </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Heritage Section */}
                <div className="heritage-section">
                    <div className="section-header">
                        <h2 className="section-title">Di sản và Đổi mới</h2>
                        <p className="section-subtitle">
                            Sự kết hợp hoàn hảo giữa truyền thống lâu đời và công nghệ hiện đại
                        </p>
                    </div>

                    <div className="heritage-content">
                        <div className="heritage-card">
                            <div className="heritage-icon">
                                <FaHistory />
                            </div>
                            <h3>Truyền thống lâu đời</h3>
                            <p>
                                Mỗi thương hiệu mang trong mình một lịch sử phong phú,
                                với những câu chuyện về sự đam mê và kiên trì qua nhiều thế hệ.
                            </p>
                        </div>
                        <div className="heritage-card">
                            <div className="heritage-icon">
                                <FaAward />
                            </div>
                            <h3>Chất lượng đỉnh cao</h3>
                            <p>
                                Mỗi chiếc đồng hồ đều trải qua quá trình kiểm tra nghiêm ngặt
                                để đảm bảo độ chính xác và độ bền vượt thời gian.
                            </p>
                        </div>
                        <div className="heritage-card">
                            <div className="heritage-icon">
                                <FaGlobe />
                            </div>
                            <h3>Phân phối toàn cầu</h3>
                            <p>
                                Các thương hiệu có mặt tại hơn 50 quốc gia,
                                mang đến trải nghiệm mua sắm và dịch vụ hậu mãi chuẩn mực.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="brands-cta">
                    <div className="cta-content">
                        <h2>Cần tư vấn chọn thương hiệu?</h2>
                        <p>
                            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn
                            lựa chọn thương hiệu phù hợp với phong cách và nhu cầu.
                        </p>
                        <Link to="/contact" className="cta-button">
                            Đặt lịch tư vấn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;