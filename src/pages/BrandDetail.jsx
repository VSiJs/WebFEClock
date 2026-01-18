import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowRight, FaHistory, FaGlobe, FaAward, FaStar, FaClock, FaTag } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import './BrandDetail.css';

const BrandDetail = () => {
    const { brandId } = useParams();
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const brandsData = {
        rolex: {
            id: 'rolex',
            name: 'Rolex',
            founded: '1905',
            founder: 'Hans Wilsdorf & Alfred Davis',
            origin: 'Geneva, Switzerland',
            description: 'Rolex là biểu tượng của sự sang trọng, độ tin cậy và đổi mới trong ngành đồng hồ.',
            heritage: 'Với hơn 100 năm lịch sử, Rolex đã định hình ngành công nghiệp đồng hồ với những phát minh đột phá như đồng hồ chống nước đầu tiên (Oyster) và cơ chế tự động thay đổi ngày (Perpetual).',
            logo: 'R',
            heroImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
            specialties: ['Oyster Perpetual', 'Submariner', 'Daytona', 'Datejust', 'GMT-Master II'],
            collections: 15,
            awards: 120,
        },
        omega: {
            id: 'omega',
            name: 'Omega',
            founded: '1848',
            founder: 'Louis Brandt',
            origin: 'Bienne, Switzerland',
            description: 'Omega là nhà sản xuất đồng hồ chính thức của NASA và là biểu tượng của sự chính xác.',
            heritage: 'Được thành lập bởi Louis Brandt, Omega đã trở thành nhà cung cấp đồng hồ chính thức cho NASA và là chiếc đồng hồ đầu tiên đặt chân lên mặt trăng với sứ mệnh Apollo 11.',
            logo: 'Ω',
            heroImage: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80',
            specialties: ['Speedmaster', 'Seamaster', 'Constellation', 'De Ville'],
            collections: 12,
            awards: 85,
        },
        cartier: {
            id: 'cartier',
            name: 'Cartier',
            founded: '1847',
            founder: 'Louis-François Cartier',
            origin: 'Paris, France',
            description: 'Cartier kết hợp hoàn hảo giữa nghệ thuật chế tác đồng hồ và thiết kế trang sức cao cấp.',
            heritage: 'Bắt đầu từ một cửa hàng trang sức ở Paris, Cartier đã trở thành nhà cung cấp cho các gia đình hoàng gia châu Âu.',
            logo: 'C',
            heroImage: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=1200&q=80',
            specialties: ['Tank', 'Santos', 'Ballon Bleu', 'Calibre'],
            collections: 10,
            awards: 95,
        },
        patek: {
            id: 'patek',
            name: 'Patek Philippe',
            founded: '1839',
            founder: 'Antoni Patek',
            origin: 'Geneva, Switzerland',
            description: 'Patek Philippe tạo ra những cỗ máy thời gian cho thế hệ tương lai, mỗi chiếc đồng hồ đều là một di sản.',
            heritage: 'Thương hiệu gia đình độc lập duy nhất còn tồn tại trong ngành đồng hồ cao cấp Geneva với triết lý "Bạn không bao giờ thực sự sở hữu một chiếc Patek Philippe, bạn chỉ đang chăm sóc nó cho thế hệ tiếp theo".',
            logo: 'PP',
            heroImage: 'https://images.unsplash.com/photo-1600897425543-5369a38bd193?w=1200&q=80',
            specialties: ['Nautilus', 'Aquanaut', 'Calatrava', 'Grand Complications'],
            collections: 8,
            awards: 105,
        },
        audemars: {
            id: 'audemars',
            name: 'Audemars Piguet',
            founded: '1875',
            founder: 'Jules-Louis Audemars & Edward-Auguste Piguet',
            origin: 'Le Brassus, Switzerland',
            description: 'Thương hiệu tiên phong trong thiết kế đồng hồ thể thao cao cấp với Royal Oak làm biểu tượng.',
            heritage: 'Được thành lập bởi hai người bạn thời thơ ấu, Audemars Piguet đã tạo ra Royal Oak - chiếc đồng hồ thể thao bằng thép không gỉ đầu tiên trên thế giới vào năm 1972.',
            logo: 'AP',
            heroImage: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=1200&q=80',
            specialties: ['Royal Oak', 'Royal Oak Offshore', 'Code 11.59', 'Millenary'],
            collections: 9,
            awards: 78,
        },
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const brandData = brandsData[brandId] || brandsData.rolex;
            setBrand(brandData);

            // Mock products for this brand
            const mockProducts = [
                {
                    id: 1,
                    name: `${brandData.name} Submariner Date`,
                    price: 385000000,
                    originalPrice: 420000000,
                    discount: 8,
                    category: "luxury",
                    brand: brandData.name,
                    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
                    description: `Đồng hồ ${brandData.name} cao cấp chính hãng Thụy Sĩ`,
                    stock: 3,
                    rating: 4.9,
                    reviews: 128,
                    features: ["Chống nước 300m", "Máy tự động", "Kính sapphire"]
                },
                {
                    id: 2,
                    name: `${brandData.name} Speedmaster Professional`,
                    price: 285000000,
                    originalPrice: 310000000,
                    discount: 8,
                    category: "heritage",
                    brand: brandData.name,
                    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
                    description: `Đồng hồ ${brandData.name} phiên bản đặc biệt`,
                    stock: 5,
                    rating: 4.8,
                    reviews: 95,
                    features: ["Máy lên dây tay", "Kính Hesalite", "Moonwatch"]
                },
                {
                    id: 3,
                    name: `${brandData.name} Seamaster Diver 300M`,
                    price: 225000000,
                    category: "diving",
                    brand: brandData.name,
                    image: "https://i.pinimg.com/736x/28/27/8b/28278b7c5f2d721546f1d3f0002ed305.jpg?w=800&q=80",
                    description: `Đồng hồ lặn chuyên nghiệp ${brandData.name}`,
                    stock: 8,
                    rating: 4.7,
                    reviews: 67,
                    features: ["Chống nước 300m", "Bezel gốm", "Dây titanium"]
                },
                {
                    id: 4,
                    name: `${brandData.name} Constellation`,
                    price: 185000000,
                    category: "dress",
                    brand: brandData.name,
                    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
                    description: `Đồng hồ dạ hội thanh lịch ${brandData.name}`,
                    stock: 12,
                    rating: 4.6,
                    reviews: 48,
                    features: ["Máy quartz", "Vỏ vàng hồng", "Dây da cá sấu"]
                },
            ];

            setProducts(mockProducts);
            setLoading(false);
        }, 800);
    }, [brandId]);

    if (loading || !brand) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Đang tải thông tin thương hiệu<span className="luxury-dot">.</span></p>
            </div>
        );
    }

    return (
        <div className="brand-detail-page">
            {/* Hero Section */}
            <div className="brand-hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="brand-logo-large">
                            {brand.logo}
                        </div>
                        <div className="hero-text">
                            <h1 className="hero-title">{brand.name}</h1>
                            <p className="hero-subtitle">{brand.description}</p>
                            <div className="brand-stats">
                                <div className="stat">
                                    <FaHistory />
                                    <span>Thành lập: {brand.founded}</span>
                                </div>
                                <div className="stat">
                                    <FaGlobe />
                                    <span>Xuất xứ: {brand.origin}</span>
                                </div>
                                <div className="stat">
                                    <FaAward />
                                    <span>{brand.collections} bộ sưu tập</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Brand Heritage */}
                {/*<div className="brand-heritage">*/}
                {/*    <div className="section-header">*/}
                {/*        <h2 className="section-title">Di sản thương hiệu</h2>*/}
                {/*        <p className="section-subtitle">*/}
                {/*            Hành trình hơn một thế kỷ của sự đổi mới và hoàn hảo*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <div className="heritage-content">*/}
                {/*        <p>{brand.heritage}</p>*/}
                {/*        <div className="heritage-highlights">*/}
                {/*            <div className="highlight">*/}
                {/*                <div className="highlight-icon">*/}
                {/*                    <FaStar />*/}
                {/*                </div>*/}
                {/*                <h3>Chất lượng đỉnh cao</h3>*/}
                {/*                <p>Mỗi chiếc đồng hồ được kiểm tra nghiêm ngặt với tiêu chuẩn COSC</p>*/}
                {/*            </div>*/}
                {/*            <div className="highlight">*/}
                {/*                <div className="highlight-icon">*/}
                {/*                    <FaClock />*/}
                {/*                </div>*/}
                {/*                <h3>Sáng tạo không ngừng</h3>*/}
                {/*                <p>Tiên phong trong công nghệ chế tác đồng hồ với nhiều bằng sáng chế</p>*/}
                {/*            </div>*/}
                {/*            <div className="highlight">*/}
                {/*                <div className="highlight-icon">*/}
                {/*                    <FaTag />*/}
                {/*                </div>*/}
                {/*                <h3>Biểu tượng thời trang</h3>*/}
                {/*                <p>Được các ngôi sao và nhân vật nổi tiếng toàn cầu ưa chuộng</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* Specialties */}
                <div className="brand-specialties">
                    <div className="section-header">
                        <h2 className="section-title">Dòng sản phẩm chính</h2>
                        <p className="section-subtitle">
                            Những bộ sưu tập làm nên tên tuổi {brand.name}
                        </p>
                    </div>
                    <div className="specialties-grid">
                        {brand.specialties.map((specialty, index) => (
                            <div key={index} className="specialty-card">
                                <div className="specialty-number">0{index + 1}</div>
                                <h3>{specialty}</h3>
                                <p>Bộ sưu tập biểu tượng của {brand.name}</p>
                                <Link to={`/danh-muc?brand=${brand.id}`} className="specialty-link">
                                    Khám phá
                                    <FaArrowRight />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products from this brand */}
                <div className="brand-products">
                    <div className="section-header">
                        <h2 className="section-title">Sản phẩm {brand.name}</h2>
                        <Link to={`/danh-muc?brand=${brand.id}`} className="section-link">
                            Xem tất cả sản phẩm
                            <FaArrowRight />
                        </Link>
                    </div>
                    <ProductList
                        products={products}
                        viewMode="grid"
                    />
                </div>

                {/* Brand Story */}
                <div className="brand-story">
                    <div className="story-content">
                        <h2>Câu chuyện {brand.name}</h2>
                        <p>
                            Từ những ngày đầu thành lập vào năm {brand.founded}, {brand.name} đã không ngừng
                            theo đuổi sự hoàn hảo trong từng chi tiết. Mỗi chiếc đồng hồ không chỉ là một công cụ
                            đo thời gian mà còn là một tác phẩm nghệ thuật, kết tinh tinh thần sáng tạo và đam mê
                            của những người thợ thủ công lành nghề.
                        </p>
                        <p>
                            Ngày nay, {brand.name} tiếp tục là biểu tượng của sự sang trọng và đẳng cấp,
                            xuất hiện trên cổ tay của những nhân vật có tầm ảnh hưởng toàn cầu và trong những
                            sự kiện quan trọng nhất của thế giới.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="brand-cta">
                    <div className="cta-content">
                        <h2>Trải nghiệm {brand.name} chính hãng</h2>
                        <p>
                            Đến với Tango chú để khám phá bộ sưu tập {brand.name} đầy đủ nhất,
                            với chứng nhận chính hãng và chế độ bảo hành toàn cầu.
                        </p>
                        <Link to="/danh-muc" className="cta-button">
                            Khám phá bộ sưu tập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandDetail;