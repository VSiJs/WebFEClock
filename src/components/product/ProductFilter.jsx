import React, { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './ProductFilter.css';

const ProductFilter = ({
                           categories = [],
                           brands = [],
                           selectedCategory,
                           selectedBrand,
                           priceRange,
                           sortBy,
                           onCategoryChange,
                           onBrandChange,
                           onPriceChange,
                           onSortChange,
                           onReset,
                       }) => {
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const handlePriceInput = (e, type) => {
        const value = parseInt(e.target.value) || 0;
        if (type === 'min') {
            onPriceChange(value, priceRange.max);
        } else {
            onPriceChange(priceRange.min, value);
        }
    };

    return (
        <div className="product-filter">
            {/* Mobile Filter Toggle */}
            <div className="mobile-filter-toggle">
                <button
                    onClick={() => setShowMobileFilter(!showMobileFilter)}
                    className="mobile-toggle-btn"
                >
                    <FaFilter /> Lọc sản phẩm
                </button>
            </div>

            {/* Filter Container */}
            <div className={`filter-container ${showMobileFilter ? 'mobile-show' : ''}`}>
                <div className="filter-header">
                    <h3 className="filter-title">
                        <FaFilter className="filter-icon" /> Bộ lọc
                    </h3>
                    <button onClick={onReset} className="reset-btn">
                        <FaTimes /> Xóa bộ lọc
                    </button>
                </div>

                {/* Sort Options */}
                <div className="filter-section">
                    <h4 className="section-title">Sắp xếp</h4>
                    <div className="sort-options">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sort"
                                value="default"
                                checked={sortBy === 'default'}
                                onChange={() => onSortChange('default')}
                            />
                            Mặc định
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sort"
                                value="price_asc"
                                checked={sortBy === 'price_asc'}
                                onChange={() => onSortChange('price_asc')}
                            />
                            Giá thấp đến cao
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sort"
                                value="price_desc"
                                checked={sortBy === 'price_desc'}
                                onChange={() => onSortChange('price_desc')}
                            />
                            Giá cao đến thấp
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sort"
                                value="name_asc"
                                checked={sortBy === 'name_asc'}
                                onChange={() => onSortChange('name_asc')}
                            />
                            Tên A-Z
                        </label>
                    </div>
                </div>

                {/* Price Filter */}
                <div className="filter-section">
                    <h4 className="section-title">Khoảng giá</h4>
                    <div className="price-inputs">
                        <div className="price-input-group">
                            <label>Từ</label>
                            <input
                                type="number"
                                value={priceRange.min || ''}
                                onChange={(e) => handlePriceInput(e, 'min')}
                                placeholder="0"
                            />
                            <span className="price-unit">₫</span>
                        </div>
                        <div className="price-separator">-</div>
                        <div className="price-input-group">
                            <label>Đến</label>
                            <input
                                type="number"
                                value={priceRange.max || ''}
                                onChange={(e) => handlePriceInput(e, 'max')}
                                placeholder="50000000"
                            />
                            <span className="price-unit">₫</span>
                        </div>
                    </div>
                    <div className="price-display">
                        <span>{priceRange.min.toLocaleString('vi-VN')}₫</span>
                        <span> - </span>
                        <span>{priceRange.max.toLocaleString('vi-VN')}₫</span>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="filter-section">
                    <h4 className="section-title">Danh mục</h4>
                    <div className="filter-list">
                        <button
                            onClick={() => onCategoryChange('')}
                            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
                        >
                            Tất cả
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => onCategoryChange(category.id)}
                                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                            >
                                {category.name} ({category.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Brand Filter */}
                <div className="filter-section">
                    <h4 className="section-title">Thương hiệu</h4>
                    <div className="filter-list">
                        <button
                            onClick={() => onBrandChange('')}
                            className={`filter-btn ${!selectedBrand ? 'active' : ''}`}
                        >
                            Tất cả
                        </button>
                        {brands.map((brand) => (
                            <button
                                key={brand.id}
                                onClick={() => onBrandChange(brand.id)}
                                className={`filter-btn ${selectedBrand === brand.id ? 'active' : ''}`}
                            >
                                {brand.name} ({brand.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Close Button */}
                <div className="mobile-actions">
                    <button
                        onClick={() => setShowMobileFilter(false)}
                        className="apply-btn"
                    >
                        Áp dụng bộ lọc
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;