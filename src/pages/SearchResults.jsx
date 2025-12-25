import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes, FaArrowLeft, FaSort, FaStar, FaTag } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState('relevance');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Mock products data
    const allProducts = [
        {
            id: 1,
            name: "Rolex Submariner Date - Black Dial",
            price: 385000000,
            originalPrice: 420000000,
            discount: 8,
            category: "luxury",
            brand: "Rolex",
            image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80",
            rating: 4.9,
            reviews: 128,
            stock: 3
        },
        {
            id: 2,
            name: "Omega Speedmaster Moonwatch Professional",
            price: 285000000,
            originalPrice: 310000000,
            discount: 8,
            category: "heritage",
            brand: "Omega",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80",
            rating: 4.8,
            reviews: 95,
            stock: 5
        },
        {
            id: 3,
            name: "Cartier Tank Must - Medium",
            price: 185000000,
            category: "dress",
            brand: "Cartier",
            image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80",
            rating: 4.7,
            reviews: 67,
            stock: 8
        },
        {
            id: 4,
            name: "Seiko 5 Sports Automatic",
            price: 8500000,
            originalPrice: 12000000,
            discount: 29,
            category: "sports",
            brand: "Seiko",
            image: "https://images.unsplash.com/photo-1553062407-98feb7a5f78c?w=400&q=80",
            rating: 4.5,
            reviews: 210,
            stock: 25
        },
        {
            id: 5,
            name: "Tissot T-Classic Dream",
            price: 12500000,
            category: "dress",
            brand: "Tissot",
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80",
            rating: 4.6,
            reviews: 48,
            stock: 12
        },
        {
            id: 6,
            name: "Casio G-Shock GA-2100",
            price: 4500000,
            originalPrice: 6500000,
            discount: 31,
            category: "sports",
            brand: "Casio",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
            rating: 4.7,
            reviews: 156,
            stock: 30
        },
        {
            id: 7,
            name: "Fossil Jacqueline Three-Hand",
            price: 5500000,
            category: "fashion",
            brand: "Fossil",
            image: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?w=400&q=80",
            rating: 4.4,
            reviews: 89,
            stock: 18
        },
        {
            id: 8,
            name: "Daniel Wellington Classic Petite",
            price: 3800000,
            category: "fashion",
            brand: "Daniel Wellington",
            image: "https://images.unsplash.com/photo-1593642632553-4c0a6f5d2c2f?w=400&q=80",
            rating: 4.3,
            reviews: 67,
            stock: 22
        },
        {
            id: 9,
            name: "TAG Heuer Carrera Chronograph",
            price: 185000000,
            originalPrice: 210000000,
            discount: 12,
            category: "luxury",
            brand: "TAG Heuer",
            image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80",
            rating: 4.8,
            reviews: 94,
            stock: 7
        },
        {
            id: 10,
            name: "Patek Philippe Nautilus 5711",
            price: 985000000,
            category: "luxury",
            brand: "Patek Philippe",
            image: "https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=400&q=80",
            rating: 5.0,
            reviews: 48,
            stock: 1
        },
    ];

    const categories = [
        { id: 'luxury', name: 'Đồng hồ cao cấp', count: 4 },
        { id: 'sports', name: 'Đồng hồ thể thao', count: 2 },
        { id: 'dress', name: 'Đồng hồ dạ hội', count: 2 },
        { id: 'fashion', name: 'Đồng hồ thời trang', count: 2 },
    ];

    const brands = [
        { id: 'rolex', name: 'Rolex', count: 1 },
        { id: 'omega', name: 'Omega', count: 1 },
        { id: 'cartier', name: 'Cartier', count: 1 },
        { id: 'seiko', name: 'Seiko', count: 1 },
        { id: 'tissot', name: 'Tissot', count: 1 },
        { id: 'casio', name: 'Casio', count: 1 },
        { id: 'fossil', name: 'Fossil', count: 1 },
        { id: 'daniel-wellington', name: 'Daniel Wellington', count: 1 },
        { id: 'tag-heuer', name: 'TAG Heuer', count: 1 },
        { id: 'patek-philippe', name: 'Patek Philippe', count: 1 },
    ];

    useEffect(() => {
        // Get search query from URL
        const params = new URLSearchParams(location.search);
        const query = params.get('q') || '';
        setSearchQuery(query);

        if (query) {
            performSearch(query);
        } else {
            setLoading(false);
            setProducts([]);
        }
    }, [location.search]);

    const performSearch = (query) => {
        setLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const queryLower = query.toLowerCase();

            const results = allProducts.filter(product =>
                product.name.toLowerCase().includes(queryLower) ||
                product.brand.toLowerCase().includes(queryLower) ||
                product.category.toLowerCase().includes(queryLower)
            );

            setProducts(results);
            setFilteredProducts(results);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        let results = [...products];

        // Filter by price range
        results = results.filter(p =>
            p.price >= priceRange.min &&
            p.price <= priceRange.max
        );

        // Filter by selected brands
        if (selectedBrands.length > 0) {
            results = results.filter(p =>
                selectedBrands.includes(p.brand.toLowerCase().replace(/\s+/g, '-'))
            );
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            results = results.filter(p =>
                selectedCategories.includes(p.category)
            );
        }

        // Sort results
        results = sortProducts(results, sortBy);

        setFilteredProducts(results);
    }, [products, priceRange, selectedBrands, selectedCategories, sortBy]);

    const sortProducts = (productsToSort, sortType) => {
        const sorted = [...productsToSort];

        switch (sortType) {
            case 'price_asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price_desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'rating_desc':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
            case 'name_asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            default:
                return sorted;
        }
    };

    const handleBrandToggle = (brandId) => {
        setSelectedBrands(prev =>
            prev.includes(brandId)
                ? prev.filter(id => id !== brandId)
                : [...prev, brandId]
        );
    };

    const handleCategoryToggle = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handlePriceChange = (min, max) => {
        setPriceRange({ min, max });
    };

    const clearFilters = () => {
        setPriceRange({ min: 0, max: 1000000000 });
        setSelectedBrands([]);
        setSelectedCategories([]);
        setSortBy('relevance');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    if (loading) {
        return (
            <div className="search-results-page">
                <div className="loading-screen">
                    <div className="loading-spinner"></div>
                    <p>Đang tìm kiếm<span className="luxury-dot">.</span></p>
                </div>
            </div>
        );
    }

    return (
        <div className="search-results-page">
            {/* Search Header */}
            <div className="search-header">
                <div className="container">
                    <div className="search-header-content">
                        <button onClick={() => navigate(-1)} className="back-button">
                            <FaArrowLeft />
                            <span>Quay lại</span>
                        </button>

                        <form onSubmit={handleSearchSubmit} className="search-box-large">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="search-input-large"
                            />
                            <button type="submit" className="search-button-large">
                                <FaSearch />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="search-results-content">
                    {/* Mobile Filter Button */}
                    <button
                        className="mobile-filter-button"
                        onClick={() => setShowFilter(!showFilter)}
                    >
                        <FaFilter />
                        <span>{showFilter ? 'Đóng bộ lọc' : 'Mở bộ lọc'}</span>
                        {(selectedBrands.length > 0 || selectedCategories.length > 0 ||
                            priceRange.min > 0 || priceRange.max < 1000000000) && (
                            <span className="filter-badge">!</span>
                        )}
                    </button>

                    <div className="search-layout">
                        {/* Sidebar Filter */}
                        <aside className={`filter-sidebar ${showFilter ? 'mobile-show' : ''}`}>
                            <div className="filter-header">
                                <h3><FaFilter /> Bộ lọc tìm kiếm</h3>
                                <button
                                    className="close-filter"
                                    onClick={() => setShowFilter(false)}
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Active Filters */}
                            {(selectedBrands.length > 0 || selectedCategories.length > 0 ||
                                priceRange.min > 0 || priceRange.max < 1000000000) && (
                                <div className="active-filters">
                                    <h4>Bộ lọc đang áp dụng:</h4>
                                    <div className="filter-chips">
                                        {priceRange.min > 0 && (
                                            <span className="filter-chip">
                                                Giá từ: {formatPrice(priceRange.min)}
                                                <button onClick={() => setPriceRange(prev => ({ ...prev, min: 0 }))}>
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        )}
                                        {priceRange.max < 1000000000 && (
                                            <span className="filter-chip">
                                                Giá đến: {formatPrice(priceRange.max)}
                                                <button onClick={() => setPriceRange(prev => ({ ...prev, max: 1000000000 }))}>
                                                    <FaTimes />
                                                </button>
                                            </span>
                                        )}
                                        {selectedBrands.map(brandId => {
                                            const brand = brands.find(b => b.id === brandId);
                                            return brand && (
                                                <span key={brandId} className="filter-chip">
                                                    {brand.name}
                                                    <button onClick={() => handleBrandToggle(brandId)}>
                                                        <FaTimes />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                        {selectedCategories.map(categoryId => {
                                            const category = categories.find(c => c.id === categoryId);
                                            return category && (
                                                <span key={categoryId} className="filter-chip">
                                                    {category.name}
                                                    <button onClick={() => handleCategoryToggle(categoryId)}>
                                                        <FaTimes />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <button className="clear-filters-button" onClick={clearFilters}>
                                        Xóa tất cả
                                    </button>
                                </div>
                            )}

                            {/* Price Filter */}
                            <div className="filter-section">
                                <h4>Khoảng giá</h4>
                                <div className="price-inputs">
                                    <div className="price-input">
                                        <label>Từ (₫)</label>
                                        <input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange(prev => ({
                                                ...prev,
                                                min: parseInt(e.target.value) || 0
                                            }))}
                                            min="0"
                                        />
                                    </div>
                                    <div className="price-input">
                                        <label>Đến (₫)</label>
                                        <input
                                            type="number"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange(prev => ({
                                                ...prev,
                                                max: parseInt(e.target.value) || 1000000000
                                            }))}
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="price-slider">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000000000"
                                        step="1000000"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({
                                            ...prev,
                                            max: parseInt(e.target.value)
                                        }))}
                                        className="slider"
                                    />
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="filter-section">
                                <h4>Thương hiệu</h4>
                                <div className="brand-list">
                                    {brands.map(brand => (
                                        <label key={brand.id} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand.id)}
                                                onChange={() => handleBrandToggle(brand.id)}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="label-text">{brand.name}</span>
                                            <span className="item-count">({brand.count})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="filter-section">
                                <h4>Danh mục</h4>
                                <div className="category-list">
                                    {categories.map(category => (
                                        <label key={category.id} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category.id)}
                                                onChange={() => handleCategoryToggle(category.id)}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="label-text">{category.name}</span>
                                            <span className="item-count">({category.count})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Results */}
                        <main className="search-results-main">
                            {/* Results Header */}
                            <div className="results-header">
                                <div className="results-info">
                                    <h2>Kết quả tìm kiếm cho "{searchQuery}"</h2>
                                    <p className="results-count">
                                        Tìm thấy {filteredProducts.length} sản phẩm
                                        {products.length !== filteredProducts.length &&
                                            ` (trong tổng số ${products.length})`}
                                    </p>
                                </div>

                                <div className="sort-options">
                                    <FaSort />
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="relevance">Phù hợp nhất</option>
                                        <option value="price_asc">Giá thấp đến cao</option>
                                        <option value="price_desc">Giá cao đến thấp</option>
                                        <option value="rating_desc">Đánh giá cao nhất</option>
                                        <option value="newest">Mới nhất</option>
                                        <option value="name_asc">Tên A-Z</option>
                                    </select>
                                </div>
                            </div>

                            {/* Results Grid */}
                            {filteredProducts.length > 0 ? (
                                <ProductList
                                    products={filteredProducts}
                                    viewMode="grid"
                                />
                            ) : (
                                <div className="no-results-found">
                                    <div className="no-results-icon">
                                        <FaSearch />
                                    </div>
                                    <h3>Không tìm thấy sản phẩm phù hợp</h3>
                                    <p>Vui lòng thử lại với từ khóa khác hoặc điều chỉnh bộ lọc</p>
                                    <div className="no-results-actions">
                                        <button
                                            className="clear-filters-button"
                                            onClick={clearFilters}
                                        >
                                            Xóa bộ lọc
                                        </button>
                                        <Link to="/danh-muc" className="browse-all-button">
                                            Xem tất cả sản phẩm
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Related Searches */}
                            {products.length > 0 && (
                                <div className="related-searches">
                                    <h3>Tìm kiếm liên quan</h3>
                                    <div className="related-tags">
                                        <button
                                            className="related-tag"
                                            onClick={() => navigate(`/tim-kiem?q=${encodeURIComponent('đồng hồ nam')}`)}
                                        >
                                            đồng hồ nam
                                        </button>
                                        <button
                                            className="related-tag"
                                            onClick={() => navigate(`/tim-kiem?q=${encodeURIComponent('đồng hồ cao cấp')}`)}
                                        >
                                            đồng hồ cao cấp
                                        </button>
                                        <button
                                            className="related-tag"
                                            onClick={() => navigate(`/tim-kiem?q=${encodeURIComponent('đồng hồ thể thao')}`)}
                                        >
                                            đồng hồ thể thao
                                        </button>
                                        <button
                                            className="related-tag"
                                            onClick={() => navigate(`/tim-kiem?q=${encodeURIComponent('đồng hồ thụy sĩ')}`)}
                                        >
                                            đồng hồ thụy sĩ
                                        </button>
                                        <button
                                            className="related-tag"
                                            onClick={() => navigate(`/tim-kiem?q=${encodeURIComponent('đồng hồ chính hãng')}`)}
                                        >
                                            đồng hồ chính hãng
                                        </button>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;