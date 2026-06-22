import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({ product, onSelect }) {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-image-container">
        {/* We use a colorful flower icon or simple visual style as image background since Vite serves assets */}
        <div className="product-image-fallback">
          <span className="product-fallback-icon">🌸</span>
        </div>
        {product.isSignature && <span className="signature-badge">Bán Chạy</span>}
      </div>
      
      <div className="product-body">
        <div className="product-meta-row">
          <span className="product-category-label">{product.categoryName}</span>
          <div className="product-rating-box">
            <Star size={12} fill="#C29F68" color="#C29F68" />
            <span>4.9</span>
          </div>
        </div>
        
        <h3 className="product-title-text">{product.name}</h3>
        <p className="product-desc-text">{product.description}</p>
        
        <div className="product-footer-row">
          <span className="product-price-text">{formatPrice(product.price)}</span>
          <button 
            className="product-add-bag-btn" 
            onClick={(e) => { e.stopPropagation(); onSelect(product); }}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingBag size={16} />
            <span>Mua ngay</span>
          </button>
        </div>
      </div>

      <style>{`
        .product-card {
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid rgba(250, 247, 240, 0.6);
          box-shadow: var(--shadow-subtle);
          cursor: pointer;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-medium);
          border-color: var(--color-accent-gold);
        }

        .product-image-container {
          position: relative;
          width: 100%;
          padding-top: 80%; /* 5:4 aspect ratio */
          background-color: var(--color-accent-gold-light);
          overflow: hidden;
        }

        .product-image-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-accent-gold-light) 0%, var(--color-bg-tertiary) 100%);
        }

        .product-fallback-icon {
          font-size: 3rem;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-fallback-icon {
          transform: scale(1.2) rotate(15deg);
        }

        .signature-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: var(--color-accent-gold);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .product-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .product-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .product-category-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-rating-box {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .product-title-text {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-text-primary);
          margin-bottom: 8px;
          font-weight: 700;
        }

        .product-desc-text {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
          line-height: 1.5;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid var(--color-bg-primary);
          padding-top: 12px;
        }

        .product-price-text {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .product-add-bag-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: var(--color-primary);
          color: white;
          padding: 8px 14px;
          border-radius: var(--border-radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .product-add-bag-btn:hover {
          background-color: var(--color-primary-hover);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
