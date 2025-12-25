import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ products, title }) => {
    if (products.length === 0) {
        return (
            <div className="product-list-empty">
                <h3>Không tìm thấy sản phẩm nào</h3>
                <p>Hãy thử tìm kiếm với tiêu chí khác</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {title && <h2 className="product-list-title">{title}</h2>}
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;