import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaFilter, FaSort, FaThLarge, FaList, FaTimes, FaArrowLeft } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import ProductFilter from '../components/product/ProductFilter';
import './Products.css';

const Products = () => {
    const { category } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilter, setShowFilter] = useState(false);
    const [filterState, setFilterState] = useState({
        selectedCategory: '',
        selectedBrand: '',
        priceRange: { min: 0, max: 1000000000 },
        sortBy: 'default',
    });

    // Categories với hình ảnh đại diện
    const categories = [
        {
            id: 'nam',
            name: 'Đồng hồ Nam',
            count: 25,
            image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80',
            description: 'Phong cách mạnh mẽ, thể thao và thanh lịch'
        },
        {
            id: 'nu',
            name: 'Đồng hồ Nữ',
            count: 18,
            image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80',
            description: 'Thanh lịch, tinh tế và quyến rũ'
        },
        {
            id: 'tre-em',
            name: 'Đồng hồ Trẻ Em',
            count: 12,
            image: 'https://i.pinimg.com/736x/0e/ad/3f/0ead3fe7dd631038a1470fa271efda48.jpg?w=400&q=80',
            description: 'Ngộ nghĩnh, an toàn và bền bỉ'
        },
        {
            id: 'doi',
            name: 'Đồng hồ Đôi',
            count: 8,
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80',
            description: 'Phối hợp hoàn hảo cho cặp đôi'
        },
        {
            id: 'sports',
            name: 'Đồng hồ Thể thao',
            count: 15,
            image: 'https://images.unsplash.com/photo-1553062407-98feb7a5f78c?w=400&q=80',
            description: 'Bền bỉ, chống nước và năng động'
        },
        {
            id: 'luxury',
            name: 'Đồng hồ Cao cấp',
            count: 10,
            image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80',
            description: 'Sang trọng, đẳng cấp và tinh xảo'
        },
    ];

    const brands = [
        { id: 'rolex', name: 'Rolex', count: 25 },
        { id: 'omega', name: 'Omega', count: 18 },
        { id: 'cartier', name: 'Cartier', count: 12 },
        { id: 'patek', name: 'Patek Philippe', count: 8 },
        { id: 'audemars', name: 'Audemars Piguet', count: 6 },
        { id: 'tag', name: 'TAG Heuer', count: 15 },
        { id: 'breitling', name: 'Breitling', count: 14 },
        { id: 'iwc', name: 'IWC', count: 10 },
        { id: 'tissot', name: 'Tissot', count: 20 },
        { id: 'seiko', name: 'Seiko', count: 22 },
        { id: 'casio', name: 'Casio', count: 30 },
        { id: 'fossil', name: 'Fossil', count: 18 },
    ];

    // Mock products database
    const allProducts = [
        {
            id: 1,
            name: "Rolex Submariner Date - Black Dial",
            price: 385000000,
            originalPrice: 420000000,
            discount: 8,
            category: "nam",
            brand: "Rolex",
            image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
            description: "Đồng hồ lặn biểu tượng với vỏ thép không gỉ 41mm",
            stock: 3,
            rating: 4.9,
            reviews: 128,
            features: ["Chống nước 300m", "Cerachrom bezel", "Caliber 3235", "Mặt số màu đen"]
        },
        {
            id: 2,
            name: "Omega Speedmaster Moonwatch Professional",
            price: 285000000,
            originalPrice: 310000000,
            discount: 8,
            category: "nam",
            brand: "Omega",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
            description: "Đồng hồ phi hành gia chính hãng Thụy Sĩ",
            stock: 5,
            rating: 4.8,
            reviews: 95,
            features: ["Hand-wound", "Hesalite crystal", "Moonwatch", "Bấm giờ thể thao"]
        },
        {
            id: 3,
            name: "Cartier Tank Must - Medium",
            price: 185000000,
            category: "nu",
            brand: "Cartier",
            image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80",
            description: "Biểu tượng đồng hồ hình chữ nhật thanh lịch",
            stock: 8,
            rating: 4.7,
            reviews: 67,
            features: ["Quartz movement", "Roman numerals", "Alligator strap", "Vỏ thép không gỉ"]
        },
        {
            id: 4,
            name: "Seiko 5 Sports Automatic",
            price: 8500000,
            originalPrice: 12000000,
            discount: 29,
            category: "nam",
            brand: "Seiko",
            image: "https://images.unsplash.com/photo-1611353229593-16439c293495?w=800&q=80",
            description: "Đồng hồ thể thao tự động với độ bền cao",
            stock: 25,
            rating: 4.5,
            reviews: 210,
            features: ["Automatic movement", "Chống nước 100m", "Hardlex crystal", "Lịch ngày"]
        },
        {
            id: 5,
            name: "Tissot T-Classic Dream",
            price: 12500000,
            category: "nu",
            brand: "Tissot",
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
            description: "Đồng hồ nữ thanh lịch với mặt số kim cương",
            stock: 12,
            rating: 4.6,
            reviews: 48,
            features: ["Quartz movement", "Mặt số kim cương", "Dây thép không gỉ", "Chống nước 30m"]
        },
        {
            id: 6,
            name: "Casio G-Shock GA-2100",
            price: 4500000,
            originalPrice: 6500000,
            discount: 31,
            category: "sports",
            brand: "Casio",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            description: "Đồng hồ thể thao chống sốc với thiết kế hiện đại",
            stock: 30,
            rating: 4.7,
            reviews: 156,
            features: ["Chống sốc", "Chống nước 200m", "Đèn LED", "Bấm giờ 1/1000 giây"]
        },
        {
            id: 7,
            name: "Fossil Jacqueline Three-Hand",
            price: 5500000,
            category: "nu",
            brand: "Fossil",
            image: "https://i.pinimg.com/736x/6b/28/e5/6b28e5a5d64756bb2b72ddf660849cf5.jpg?w=800&q=80",
            description: "Đồng hồ nữ cổ điển với dây da cao cấp",
            stock: 18,
            rating: 4.4,
            reviews: 89,
            features: ["Quartz movement", "Dây da genuine", "Vỏ thép không gỉ", "Chống nước 50m"]
        },
        {
            id: 8,
            name: "Daniel Wellington Classic Petite",
            price: 3800000,
            category: "tre-em",
            brand: "Daniel Wellington",
            image: "https://images.unsplash.com/photo-1604489354387-8d3fe9990f0f?w=800&q=80",
            description: "Đồng hồ trẻ em với thiết kế an toàn và dễ thương",
            stock: 22,
            rating: 4.3,
            reviews: 67,
            features: ["Quartz movement", "Dây silicone", "Vỏ nhựa an toàn", "Chống nước 30m"]
        },
        {
            id: 9,
            name: "TAG Heuer Carrera Chronograph",
            price: 185000000,
            originalPrice: 210000000,
            discount: 12,
            category: "nam",
            brand: "TAG Heuer",
            image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
            description: "Đồng hồ chronograph thể thao cao cấp",
            stock: 7,
            rating: 4.8,
            reviews: 94,
            features: ["Automatic chronograph", "Sapphire crystal", "Chống nước 100m", "Mặt số skeleton"]
        },
        {
            id: 10,
            name: "Patek Philippe Nautilus 5711",
            price: 985000000,
            category: "luxury",
            brand: "Patek Philippe",
            image: "https://images.unsplash.com/photo-1600897425543-5369a38bd193?w=800&q=80",
            description: "Siêu phẩm đồng hồ thể thao đẳng cấp",
            stock: 1,
            rating: 5.0,
            reviews: 48,
            features: ["Automatic movement", "Stainless steel", "Sapphire crystal", "Chống nước 120m"]
        },
        {
            id: 11,
            name: "Breitling Navitimer B01 Chronograph",
            price: 320000000,
            category: "sports",
            brand: "Breitling",
            image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80",
            description: "Đồng hồ phi công với bảng tính slide rule",
            stock: 4,
            rating: 4.9,
            reviews: 76,
            features: ["Manufacture Caliber 01", "Sapphire crystal", "Slide rule bezel", "Chống nước 30m"]
        },
        {
            id: 12,
            name: "IWC Portugieser Chronograph",
            price: 285000000,
            category: "nam",
            brand: "IWC",
            image: "https://images.unsplash.com/photo-1696430257997-470acf236b1b?w=800&q=80",
            description: "Đồng hồ dress watch với chronograph cổ điển",
            stock: 6,
            rating: 4.7,
            reviews: 52,
            features: ["Automatic chronograph", "Arabic numerals", "Alligator strap", "Sapphire case back"]
        },
    ];

    useEffect(() => {
        // Lấy tham số từ URL
        const params = new URLSearchParams(location.search);
        const brandFromUrl = params.get('brand');
        const priceMin = params.get('price_min');
        const priceMax = params.get('price_max');
        const sort = params.get('sort');

        // Cập nhật filter state từ URL
        const newFilterState = {
            selectedCategory: category || '',
            selectedBrand: brandFromUrl || '',
            priceRange: {
                min: priceMin ? parseInt(priceMin) : 0,
                max: priceMax ? parseInt(priceMax) : 1000000000
            },
            sortBy: sort || 'default',
        };

        setFilterState(newFilterState);
    }, [location.search, category]);

    useEffect(() => {
        // Simulate API call với delay
        setTimeout(() => {
            let filteredProducts = [...allProducts];

            // Filter theo category
            if (filterState.selectedCategory) {
                filteredProducts = filteredProducts.filter(p => p.category === filterState.selectedCategory);
            }

            // Filter theo brand
            if (filterState.selectedBrand) {
                filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === filterState.selectedBrand.toLowerCase());
            }

            // Filter theo giá
            filteredProducts = filteredProducts.filter(p =>
                p.price >= filterState.priceRange.min &&
                p.price <= filterState.priceRange.max
            );

            // Sort products
            filteredProducts = sortProducts(filteredProducts, filterState.sortBy);

            setProducts(filteredProducts);
            setLoading(false);
        }, 800);
    }, [filterState]);

    const sortProducts = (products, sortBy) => {
        const sorted = [...products];
        switch (sortBy) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name_asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'rating_desc':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            default:
                return sorted.sort((a, b) => a.id - b.id);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilterState(newFilters);
        setShowFilter(false);

        // Cập nhật URL với các tham số filter
        const params = new URLSearchParams();

        if (newFilters.selectedBrand) {
            params.set('brand', newFilters.selectedBrand);
        }

        if (newFilters.priceRange.min > 0) {
            params.set('price_min', newFilters.priceRange.min);
        }

        if (newFilters.priceRange.max < 1000000000) {
            params.set('price_max', newFilters.priceRange.max);
        }

        if (newFilters.sortBy !== 'default') {
            params.set('sort', newFilters.sortBy);
        }

        const queryString = params.toString();
        navigate(`?${queryString}`, { replace: true });
    };

    const handleReset = () => {
        setFilterState({
            selectedCategory: '',
            selectedBrand: '',
            priceRange: { min: 0, max: 1000000000 },
            sortBy: 'default',
        });

        // Reset URL
        navigate('', { replace: true });
    };

    const getCategoryInfo = () => {
        if (category) {
            const cat = categories.find(c => c.id === category);
            if (cat) {
                return {
                    name: cat.name,
                    description: cat.description,
                    image: cat.image,
                    count: cat.count
                };
            }
        }

        const params = new URLSearchParams(location.search);
        const brandFromUrl = params.get('brand');

        if (brandFromUrl) {
            const brandObj = brands.find(b => b.id === brandFromUrl);
            if (brandObj) {
                return {
                    name: `Đồng hồ ${brandObj.name}`,
                    description: `Khám phá bộ sưu tập đồng hồ chính hãng ${brandObj.name}`,
                    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80',
                    count: brandObj.count
                };
            }
        }

        return {
            name: 'Tất cả sản phẩm',
            description: 'Khám phá bộ sưu tập đồng hồ đa dạng từ các thương hiệu hàng đầu',
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80',
            count: allProducts.length
        };
    };

    const getPageTitle = () => {
        const info = getCategoryInfo();
        return info.name;
    };

    const getPageSubtitle = () => {
        const info = getCategoryInfo();
        return `${products.length} sản phẩm ${category || filterState.selectedBrand ? 'tìm thấy' : 'có sẵn'}`;
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Đang tải sản phẩm<span className="luxury-dot">.</span></p>
            </div>
        );
    }

    return (
        <div className="products-page">
            {/* Breadcrumb Navigation */}
            <div className="breadcrumb">
                <div className="container">
                    <button onClick={() => navigate(-1)} className="breadcrumb-back">
                        <FaArrowLeft />
                        Quay lại
                    </button>
                    <div className="breadcrumb-links">
                        <span onClick={() => navigate('/')} className="breadcrumb-link">Trang chủ</span>
                        <span className="breadcrumb-separator">/</span>
                        <span onClick={() => navigate('/danh-muc')} className="breadcrumb-link">Danh mục</span>
                        {category && (
                            <>
                                <span className="breadcrumb-separator">/</span>
                                <span className="breadcrumb-current">{getCategoryInfo().name}</span>
                            </>
                        )}
                        {filterState.selectedBrand && !category && (
                            <>
                                <span className="breadcrumb-separator">/</span>
                                <span className="breadcrumb-current">{getCategoryInfo().name}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <div className="container">
                    <div className="category-header">
                        <div className="category-info">
                            <h1 className="page-title" style={{ color: 'white' }}>{getPageTitle()}</h1>
                            <p className="page-subtitle">{getPageSubtitle()}</p>
                            <div className="category-description">
                                <p>{getCategoryInfo().description}</p>
                            </div>
                        </div>
                        <div className="category-image">
                            <img src={getCategoryInfo().image} alt={getPageTitle()} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="products-content">
                    {/* Mobile Filter Button */}
                    <div className="mobile-filter-header">
                        <button
                            className="filter-toggle-button"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <FaFilter />
                            {showFilter ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                        </button>
                        <div className="view-controls">
                            <button
                                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                aria-label="Xem dạng lưới"
                            >
                                <FaThLarge />
                            </button>
                            <button
                                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                aria-label="Xem dạng danh sách"
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>

                    <div className="products-layout">
                        {/* Sidebar Filter */}
                        <aside className={`filter-sidebar ${showFilter ? 'mobile-show' : ''}`}>
                            <div className="filter-header">
                                <h3>
                                    <FaFilter />
                                    Bộ lọc & Sắp xếp
                                </h3>
                                <button
                                    className="close-filter"
                                    onClick={() => setShowFilter(false)}
                                    aria-label="Đóng bộ lọc"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <ProductFilter
                                categories={categories}
                                brands={brands}
                                selectedCategory={filterState.selectedCategory}
                                selectedBrand={filterState.selectedBrand}
                                priceRange={filterState.priceRange}
                                sortBy={filterState.sortBy}
                                onCategoryChange={(cat) => handleFilterChange({...filterState, selectedCategory: cat})}
                                onBrandChange={(brand) => handleFilterChange({...filterState, selectedBrand: brand})}
                                onPriceChange={(min, max) => handleFilterChange({...filterState, priceRange: { min, max }})}
                                onSortChange={(sort) => handleFilterChange({...filterState, sortBy: sort})}
                                onReset={handleReset}
                            />
                        </aside>

                        {/* Main Content */}
                        <main className="products-main">
                            {/* Toolbar */}
                            <div className="products-toolbar">
                                <div className="toolbar-left">
                                    <span className="products-count">
                                        Hiển thị {products.length} sản phẩm
                                    </span>
                                    {filterState.selectedCategory && (
                                        <span className="active-filter">
                                            Danh mục: {categories.find(c => c.id === filterState.selectedCategory)?.name}
                                        </span>
                                    )}
                                    {filterState.selectedBrand && (
                                        <span className="active-filter">
                                            Thương hiệu: {brands.find(b => b.id === filterState.selectedBrand)?.name}
                                        </span>
                                    )}
                                </div>
                                <div className="toolbar-right">
                                    <div className="sort-select">
                                        <FaSort />
                                        <select
                                            value={filterState.sortBy}
                                            onChange={(e) => handleFilterChange({...filterState, sortBy: e.target.value})}
                                            aria-label="Sắp xếp sản phẩm"
                                        >
                                            <option value="default">Sắp xếp mặc định</option>
                                            <option value="newest">Mới nhất</option>
                                            <option value="price_asc">Giá: Thấp đến cao</option>
                                            <option value="price_desc">Giá: Cao đến thấp</option>
                                            <option value="name_asc">Tên: A-Z</option>
                                            <option value="rating_desc">Đánh giá cao nhất</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Products Grid/List */}
                            <div className={`products-view ${viewMode}`}>
                                <ProductList
                                    products={products}
                                    viewMode={viewMode}
                                />
                            </div>

                            {/* Empty State */}
                            {products.length === 0 && (
                                <div className="empty-products">
                                    <div className="empty-icon">⌚</div>
                                    <h3>Không tìm thấy sản phẩm phù hợp</h3>
                                    <p>Vui lòng thử lại với bộ lọc khác hoặc xem tất cả sản phẩm</p>
                                    <div className="empty-actions">
                                        <button className="reset-filters-button" onClick={handleReset}>
                                            Đặt lại bộ lọc
                                        </button>
                                        <button
                                            className="view-all-button"
                                            onClick={() => navigate('/danh-muc')}
                                        >
                                            Xem tất cả sản phẩm
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Category Suggestions */}
                            {/*{products.length > 0 && (*/}
                            {/*    <div className="category-suggestions">*/}
                            {/*        <h3>Khám phá thêm</h3>*/}
                            {/*        <div className="suggestion-categories">*/}
                            {/*            {categories*/}
                            {/*                .filter(c => c.id !== category)*/}
                            {/*                .slice(0, 4)*/}
                            {/*                .map(cat => (*/}
                            {/*                    <div*/}
                            {/*                        key={cat.id}*/}
                            {/*                        className="suggestion-category"*/}
                            {/*                        onClick={() => navigate(`/danh-muc/${cat.id}`)}*/}
                            {/*                    >*/}
                            {/*                        <div className="suggestion-image">*/}
                            {/*                            <img src={cat.image} alt={cat.name} />*/}
                            {/*                        </div>*/}
                            {/*                        <div className="suggestion-info">*/}
                            {/*                            <h4>{cat.name}</h4>*/}
                            {/*                            <p>{cat.count} sản phẩm</p>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                ))}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;