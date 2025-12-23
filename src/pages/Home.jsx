import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt, FaTruck, FaHeadset, FaCrown } from 'react-icons/fa';
import ProductList from '../components/product/ProductList';
import './Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data
        setTimeout(() => {
            const mockProducts = [
                {
                    id: 1,
                    name: "Rolex Submariner Date",
                    price: 385000000,
                    originalPrice: 420000000,
                    discount: 8,
                    category: "luxury",
                    brand: "Rolex",
                    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
                    description: "Đồng hồ lặn biểu tượng với vỏ thép không gỉ 41mm",
                    stock: 3,
                    rating: 4.9,
                    reviews: 128,
                    features: ["Chống nước 300m", "Cerachrom bezel", "Caliber 3235"]
                },
                {
                    id: 2,
                    name: "Omega Speedmaster Moonwatch",
                    price: 285000000,
                    originalPrice: 310000000,
                    discount: 8,
                    category: "heritage",
                    brand: "Omega",
                    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w-800&q=80",
                    description: "Đồng hồ phi hành gia chính hãng Thụy Sĩ",
                    stock: 5,
                    rating: 4.8,
                    reviews: 95,
                    features: ["Hand-wound", "Hesalite crystal", "Moonwatch"]
                },
                {
                    id: 3,
                    name: "Cartier Tank Must",
                    price: 185000000,
                    category: "classic",
                    brand: "Cartier",
                    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=80",
                    description: "Biểu tượng đồng hồ hình chữ nhật thanh lịch",
                    stock: 8,
                    rating: 4.7,
                    reviews: 67,
                    features: ["Quartz movement", "Roman numerals", "Alligator strap"]
                },
                {
                    id: 4,
                    name: "Patek Philippe Nautilus",
                    price: 985000000,
                    category: "luxury",
                    brand: "Patek Philippe",
                    image: "https://images.unsplash.com/photo-1594576722512-582d5577dc56?w=800&q=80",
                    description: "Siêu phẩm đồng hồ thể thao đẳng cấp",
                    stock: 1,
                    rating: 5.0,
                    reviews: 48,
                    features: ["Stainless steel", "Sapphire crystal", "Self-winding"]
                },
            ];
            setFeaturedProducts(mockProducts);
            setNewProducts([...mockProducts].reverse());
            setLoading(false);
        }, 1000);
    }, []);

    

};

export default Home;