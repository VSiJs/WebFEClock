import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);

    // Mock products data - trong thực tế sẽ lấy từ API
    const allProducts = [
        {
            id: 1,
            name: "Rolex Submariner Date - Black Dial",
            price: 385000000,
            category: "luxury",
            brand: "Rolex",
            image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80"
        },
        {
            id: 2,
            name: "Omega Speedmaster Moonwatch Professional",
            price: 285000000,
            category: "heritage",
            brand: "Omega",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80"
        },
        {
            id: 3,
            name: "Cartier Tank Must - Medium",
            price: 185000000,
            category: "dress",
            brand: "Cartier",
            image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&q=80"
        },
        {
            id: 4,
            name: "Seiko 5 Sports Automatic",
            price: 8500000,
            category: "sports",
            brand: "Seiko",
            image: "https://images.unsplash.com/photo-1553062407-98feb7a5f78c?w=400&q=80"
        },
        {
            id: 5,
            name: "Tissot T-Classic Dream",
            price: 12500000,
            category: "dress",
            brand: "Tissot",
            image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80"
        },
        {
            id: 6,
            name: "Casio G-Shock GA-2100",
            price: 4500000,
            category: "sports",
            brand: "Casio",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
        },
        {
            id: 7,
            name: "Fossil Jacqueline Three-Hand",
            price: 5500000,
            category: "fashion",
            brand: "Fossil",
            image: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?w=400&q=80"
        },
        {
            id: 8,
            name: "Daniel Wellington Classic Petite",
            price: 3800000,
            category: "fashion",
            brand: "Daniel Wellington",
            image: "https://images.unsplash.com/photo-1593642632553-4c0a6f5d2c2f?w=400&q=80"
        },
        {
            id: 9,
            name: "TAG Heuer Carrera Chronograph",
            price: 185000000,
            category: "luxury",
            brand: "TAG Heuer",
            image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&q=80"
        },
        {
            id: 10,
            name: "Patek Philippe Nautilus 5711",
            price: 985000000,
            category: "luxury",
            brand: "Patek Philippe",
            image: "https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=400&q=80"
        },
    ];

    const popularSearches = [
        "Rolex", "Omega", "Đồng hồ nam", "Đồng hồ nữ", "Đồng hồ thể thao",
        "Đồng hồ cao cấp", "Cartier", "Seiko", "Casio", "Tissot"
    ];

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSuggestions = (query) => {
        if (!query.trim()) {
            return [];
        }

        const queryLower = query.toLowerCase();

        // Search by product name, brand, or category
        const productMatches = allProducts.filter(product =>
            product.name.toLowerCase().includes(queryLower) ||
            product.brand.toLowerCase().includes(queryLower) ||
            product.category.toLowerCase().includes(queryLower)
        );

        // Limit to 6 suggestions
        return productMatches.slice(0, 6);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim()) {
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                const newSuggestions = getSuggestions(value);
                setSuggestions(newSuggestions);
                setShowSuggestions(true);
                setIsLoading(false);
            }, 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (product) => {
        navigate(`/san-pham/${product.id}`);
        setSearchQuery('');
        setShowSuggestions(false);
    };

    const handlePopularSearch = (term) => {
        setSearchQuery(term);
        navigate(`/tim-kiem?q=${encodeURIComponent(term)}`);
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + '₫';
    };

    return (
        <div className="search-bar-container" ref={searchRef}>
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                        placeholder="Tìm kiếm đồng hồ, thương hiệu..."
                        className="search-input"
                        autoComplete="off"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            className="clear-button"
                            onClick={clearSearch}
                            aria-label="Xóa tìm kiếm"
                        >
                            <FaTimes />
                        </button>
                    )}
                    <button type="submit" className="search-button" aria-label="Tìm kiếm">
                        {isLoading ? (
                            <div className="spinner"></div>
                        ) : (
                            <FaSearch />
                        )}
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                    <div className="suggestions-dropdown">
                        {suggestions.length > 0 ? (
                            <>
                                <div className="suggestions-header">
                                    <h4>Gợi ý tìm kiếm</h4>
                                </div>
                                <div className="suggestions-list">
                                    {suggestions.map((product) => (
                                        <div
                                            key={product.id}
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(product)}
                                        >
                                            <div className="suggestion-image">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                            <div className="suggestion-info">
                                                <div className="suggestion-name">{product.name}</div>
                                                <div className="suggestion-brand">{product.brand}</div>
                                                <div className="suggestion-price">{formatPrice(product.price)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : searchQuery.trim() ? (
                            <div className="no-results">
                                <p>Không tìm thấy kết quả cho "{searchQuery}"</p>
                                <button
                                    type="button"
                                    className="view-all-button"
                                    onClick={() => handleSubmit({ preventDefault: () => {} })}
                                >
                                    Xem tất cả kết quả
                                </button>
                            </div>
                        ) : (
                            <div className="popular-searches">
                                <div className="suggestions-header">
                                    <h4>Tìm kiếm phổ biến</h4>
                                </div>
                                <div className="popular-tags">
                                    {popularSearches.map((term, index) => (
                                        <button
                                            key={index}
                                            className="popular-tag"
                                            onClick={() => handlePopularSearch(term)}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <div className="suggestions-footer">
                                <button
                                    type="button"
                                    className="view-all-results"
                                    onClick={() => handleSubmit({ preventDefault: () => {} })}
                                >
                                    Xem tất cả kết quả cho "{searchQuery}"
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;