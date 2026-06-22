import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Check, ShoppingBag, X } from 'lucide-react';
import { productsData, categories, toppingsList } from '../data/productsData';
import ProductCard from '../components/ProductCard';

export default function Products({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Customization Modal State
  const [customizingProduct, setCustomizingProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M'); // 'M' or 'L'
  const [selectedSugar, setSelectedSugar] = useState('100%');
  const [selectedIce, setSelectedIce] = useState('100%');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = productsData;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortOrder === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleOpenCustomize = (product) => {
    setCustomizingProduct(product);
    setSelectedSize('M');
    setSelectedSugar('100%');
    setSelectedIce('100%');
    setSelectedToppings([]);
    setQuantity(1);
  };

  const handleCloseCustomize = () => {
    setCustomizingProduct(null);
  };

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev => {
      if (prev.find(t => t.name === topping.name)) {
        return prev.filter(t => t.name !== topping.name);
      } else {
        return [...prev, topping];
      }
    });
  };

  const getToppingPrice = () => {
    return selectedToppings.reduce((sum, t) => sum + t.price, 0);
  };

  const getModalSubtotal = () => {
    if (!customizingProduct) return 0;
    const basePrice = customizingProduct.price;
    const sizePrice = selectedSize === 'L' ? 6000 : 0;
    const toppingPrice = getToppingPrice();
    return (basePrice + sizePrice + toppingPrice) * quantity;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!customizingProduct) return;

    const basePrice = customizingProduct.price;
    const sizePrice = selectedSize === 'L' ? 6000 : 0;
    const itemToppingPrice = getToppingPrice();

    const cartItem = {
      // Create a unique ID incorporating the customization details
      id: `${customizingProduct.id}-${selectedSize}-${selectedSugar}-${selectedIce}-${selectedToppings.map(t => t.name).join('-')}`,
      productId: customizingProduct.id,
      name: customizingProduct.name,
      price: basePrice + sizePrice,
      toppingPrice: itemToppingPrice,
      size: selectedSize,
      sugar: selectedSugar,
      ice: selectedIce,
      toppings: selectedToppings.map(t => t.name),
      quantity: quantity
    };

    onAddToCart(cartItem);
    handleCloseCustomize();
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="page-wrapper products-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Mua Sắm Trực Tuyến</p>
          <h1 className="page-header-title">Cửa Hàng Nhà Bông</h1>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="catalog-toolbar-section">
        <div className="container toolbar-grid-flex">
          {/* Search bar */}
          <div className="search-bar-input-box">
            <Search className="search-box-icon" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm trà sữa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort selection */}
          <div className="sort-order-box">
            <SlidersHorizontal size={16} />
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select-field"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </section>

      {/* Category Tabs & Products Grid */}
      <section className="catalog-body-section section-padding">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-tabs-flex">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="catalog-empty-results">
              <h3>Không tìm thấy sản phẩm phù hợp</h3>
              <p>Bạn hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc xem sao nhé.</p>
              <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} className="btn btn-primary">
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="products-layout-grid">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={handleOpenCustomize}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Customize & Detail Modal */}
      {customizingProduct && (
        <div className="customize-modal-backdrop" onClick={handleCloseCustomize}>
          <div className="customize-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-text">
                <h3>Tùy Chọn Đồ Uống</h3>
                <p>{customizingProduct.name}</p>
              </div>
              <button onClick={handleCloseCustomize} className="modal-close-btn" aria-label="Đóng bảng">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="modal-form-content">
              {/* Product description and price overview */}
              <div className="modal-overview-row">
                <p className="modal-desc-text">{customizingProduct.description}</p>
                <div className="modal-base-price">
                  <span>Giá gốc:</span>
                  <strong>{formatPrice(customizingProduct.price)}</strong>
                </div>
              </div>

              {/* Option Groups */}
              <div className="options-scrollable-area">
                {/* Size Choice */}
                <div className="option-group-card">
                  <h4 className="group-title">Chọn kích cỡ (Size) *</h4>
                  <div className="options-selection-grid">
                    <label className={`option-label-card ${selectedSize === 'M' ? 'selected' : ''}`}>
                      <input type="radio" name="size" value="M" checked={selectedSize === 'M'} onChange={() => setSelectedSize('M')} />
                      <span>Size M</span>
                      <span className="price-diff-badge">Mặc định</span>
                    </label>
                    <label className={`option-label-card ${selectedSize === 'L' ? 'selected' : ''}`}>
                      <input type="radio" name="size" value="L" checked={selectedSize === 'L'} onChange={() => setSelectedSize('L')} />
                      <span>Size L</span>
                      <span className="price-diff-badge">+6.000đ</span>
                    </label>
                  </div>
                </div>

                {/* Sugar Level */}
                <div className="option-group-card">
                  <h4 className="group-title">Mức đường (Sugar)</h4>
                  <div className="options-bubble-grid">
                    {['0%', '30%', '50%', '70%', '100%'].map((sugar) => (
                      <button
                        key={sugar}
                        type="button"
                        onClick={() => setSelectedSugar(sugar)}
                        className={`bubble-option-btn ${selectedSugar === sugar ? 'active' : ''}`}
                      >
                        {sugar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ice Level */}
                <div className="option-group-card">
                  <h4 className="group-title">Mức đá (Ice)</h4>
                  <div className="options-bubble-grid">
                    {['0%', '30%', '50%', '70%', '100%'].map((ice) => (
                      <button
                        key={ice}
                        type="button"
                        onClick={() => setSelectedIce(ice)}
                        className={`bubble-option-btn ${selectedIce === ice ? 'active' : ''}`}
                      >
                        {ice}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toppings Multi-Select */}
                <div className="option-group-card">
                  <h4 className="group-title">Thêm Topping</h4>
                  <div className="toppings-list-grid">
                    {toppingsList.map((top) => {
                      const isChecked = !!selectedToppings.find(t => t.name === top.name);
                      return (
                        <label key={top.name} className={`topping-checkbox-row ${isChecked ? 'active' : ''}`}>
                          <div className="checkbox-input-wrapper">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToppingToggle(top)}
                            />
                            <div className="custom-check-box">
                              {isChecked && <Check size={12} color="white" />}
                            </div>
                            <span className="topping-name-label">{top.name}</span>
                          </div>
                          <span className="topping-price-label">+{formatPrice(top.price)}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="modal-footer-summary">
                <div className="modal-qty-picker-row">
                  <span className="qty-label">Số lượng:</span>
                  <div className="qty-picker">
                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="qty-btn">
                      <X size={10} style={{ display: 'none' }} /> -
                    </button>
                    <span className="qty-num">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(q => q + 1)} className="qty-btn">
                      +
                    </button>
                  </div>
                </div>

                <div className="modal-actions-grid">
                  <div className="modal-subtotal-column">
                    <span className="subtotal-label">Tổng cộng:</span>
                    <span className="subtotal-val">{formatPrice(getModalSubtotal())}</span>
                  </div>
                  <button type="submit" className="btn btn-primary add-to-bag-submit-btn">
                    <ShoppingBag size={18} /> Thêm Giỏ Hàng
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .catalog-toolbar-section {
          background-color: var(--color-bg-secondary);
          padding: 16px 0;
          border-bottom: 1px solid var(--color-bg-tertiary);
        }

        .toolbar-grid-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-bar-input-box {
          position: relative;
          width: 320px;
        }

        @media (max-width: 480px) {
          .search-bar-input-box {
            width: 100%;
          }
        }

        .search-box-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
        }

        .search-input-field {
          width: 100%;
          padding: 10px 40px 10px 40px;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--color-bg-tertiary);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--color-text-primary);
          background-color: var(--color-bg-primary);
          transition: var(--transition-smooth);
        }

        .search-input-field:focus {
          outline: none;
          border-color: var(--color-primary);
          background-color: var(--color-bg-secondary);
        }

        .clear-search-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-secondary);
          padding: 2px;
        }

        .sort-order-box {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-secondary);
        }

        .sort-select-field {
          padding: 8px 12px;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--color-bg-tertiary);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }

        .sort-select-field:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        /* Tabs styling */
        .category-tabs-flex {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .category-tab-btn {
          padding: 10px 24px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 30px;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          transition: var(--transition-smooth);
        }

        .category-tab-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .category-tab-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(85, 111, 82, 0.15);
        }

        .catalog-empty-results {
          text-align: center;
          padding: 60px 20px;
          max-width: 450px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .catalog-empty-results h3 {
          font-family: var(--font-serif);
          font-size: 1.4rem;
        }

        .catalog-empty-results p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }

        .products-layout-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        @media (max-width: 1100px) {
          .products-layout-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 800px) {
          .products-layout-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .products-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Modal Styles */
        .customize-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 300;
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.25s ease;
        }

        .customize-modal-dialog {
          width: 550px;
          max-width: 90%;
          max-height: 90%;
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-deep);
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-bg-primary);
        }

        .modal-header-text h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--color-text-primary);
        }

        .modal-header-text p {
          font-size: 0.8rem;
          color: var(--color-accent-gold);
          font-weight: 600;
        }

        .modal-close-btn {
          color: var(--color-text-secondary);
          padding: 4px;
        }

        .modal-close-btn:hover {
          color: var(--color-text-primary);
        }

        .modal-form-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: var(--color-bg-primary);
        }

        .modal-overview-row {
          padding: 16px 24px;
          background-color: var(--color-accent-gold-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border-bottom: 1px solid rgba(85, 111, 82, 0.05);
        }

        .modal-desc-text {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
          flex-grow: 1;
        }

        .modal-base-price {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-width: 80px;
        }

        .modal-base-price span {
          font-size: 0.7rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
        }

        .modal-base-price strong {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--color-primary);
        }

        .options-scrollable-area {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .option-group-card {
          background-color: var(--color-bg-secondary);
          padding: 16px;
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(250, 247, 240, 0.8);
        }

        .group-title {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }

        /* Size radio card grids */
        .options-selection-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .option-label-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px;
          border: 1px solid var(--color-bg-tertiary);
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          font-weight: 600;
          background-color: var(--color-bg-secondary);
          transition: var(--transition-smooth);
        }

        .option-label-card.selected {
          border-color: var(--color-primary);
          background-color: var(--color-accent-gold-light);
          color: var(--color-primary);
        }

        .option-label-card input {
          display: none;
        }

        .price-diff-badge {
          font-size: 0.7rem;
          color: var(--color-text-secondary);
          margin-top: 4px;
          font-weight: 500;
        }

        .option-label-card.selected .price-diff-badge {
          color: var(--color-accent-gold);
          font-weight: 600;
        }

        /* Bubbles selection grid */
        .options-bubble-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .bubble-option-btn {
          padding: 8px 18px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 20px;
          border: 1px solid var(--color-bg-tertiary);
          background-color: var(--color-bg-secondary);
          color: var(--color-text-secondary);
        }

        .bubble-option-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .bubble-option-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        /* Toppings list checkboxes */
        .toppings-list-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .topping-checkbox-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--color-bg-primary);
          cursor: pointer;
          background-color: var(--color-bg-secondary);
          transition: var(--transition-smooth);
        }

        .topping-checkbox-row:hover {
          background-color: var(--color-bg-primary);
        }

        .topping-checkbox-row.active {
          background-color: var(--color-accent-gold-light);
          border-color: rgba(194, 159, 104, 0.2);
        }

        .checkbox-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkbox-input-wrapper input {
          display: none;
        }

        .custom-check-box {
          width: 18px;
          height: 18px;
          border: 1px solid var(--color-bg-tertiary);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
        }

        .topping-checkbox-row.active .custom-check-box {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .topping-name-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .topping-price-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        /* Form Footer styling */
        .modal-footer-summary {
          background-color: var(--color-bg-secondary);
          padding: 20px 24px;
          border-top: 1px solid var(--color-bg-primary);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-qty-picker-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .qty-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .modal-actions-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .modal-subtotal-column {
          display: flex;
          flex-direction: column;
        }

        .subtotal-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
        }

        .subtotal-val {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .add-to-bag-submit-btn {
          flex-grow: 1;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
