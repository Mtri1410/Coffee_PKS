import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard, ChevronRight } from 'lucide-react';

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [step, setStep] = useState(1); // 1: Cart Items, 2: Checkout Info, 3: Completed
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'transfer', // 'transfer' or 'cash'
    notes: ''
  });

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price + (item.toppingPrice || 0)) * item.quantity, 0);
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty <= 0) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, newQty);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
      return;
    }
    if (checkoutForm.paymentMethod === 'transfer' && !checkoutForm.address) {
      alert('Vui lòng nhập địa chỉ để giao hàng và thanh toán chuyển khoản!');
      return;
    }
    setStep(3);
  };

  const resetCartFlow = () => {
    onClearCart();
    setStep(1);
    onClose();
  };

  const generateOrderMessage = () => {
    let msg = `ĐƠN HÀNG MỚI - BÔNG BIÊNG\n`;
    msg += `---------------------\n`;
    msg += `Khách hàng: ${checkoutForm.name}\n`;
    msg += `SĐT: ${checkoutForm.phone}\n`;
    if (checkoutForm.address) msg += `Địa chỉ: ${checkoutForm.address}\n`;
    msg += `Thanh toán: ${checkoutForm.paymentMethod === 'transfer' ? 'Chuyển khoản QR' : 'Tiền mặt khi nhận hàng'}\n`;
    if (checkoutForm.notes) msg += `Ghi chú: ${checkoutForm.notes}\n`;
    msg += `---------------------\n`;
    cartItems.forEach((item, index) => {
      msg += `${index + 1}. ${item.name} (${item.size === 'L' ? 'Size L' : 'Size M'})\n`;
      msg += `   - Đường: ${item.sugar}, Đá: ${item.ice}\n`;
      if (item.toppings && item.toppings.length > 0) {
        msg += `   - Topping: ${item.toppings.join(', ')}\n`;
      }
      msg += `   - SL: ${item.quantity} x ${formatPrice(item.price + (item.toppingPrice || 0))}\n`;
    });
    msg += `---------------------\n`;
    msg += `Tổng cộng: ${formatPrice(getSubtotal())}`;
    return msg;
  };

  const handleSendZalo = () => {
    const text = encodeURIComponent(generateOrderMessage());
    window.open(`https://zalo.me/0968123456`, '_blank');
  };

  return (
    <>
      {/* Overlay Backdrop */}
      {isOpen && <div className="cart-backdrop" onClick={onClose}></div>}

      {/* Cart Drawer */}
      <div className={`cart-drawer-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} className="primary-color-text" />
            <h3>Giỏ Hàng Của Bạn</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Đóng giỏ hàng">
            <X size={24} />
          </button>
        </div>

        {/* Step 1: List Items */}
        {step === 1 && (
          <div className="cart-content-container">
            {cartItems.length === 0 ? (
              <div className="cart-empty-state">
                <ShoppingBag size={48} className="empty-icon" />
                <p className="empty-text">Giỏ hàng của bạn đang trống</p>
                <button onClick={onClose} className="btn btn-primary">Mua sắm ngay</button>
              </div>
            ) : (
              <>
                <div className="cart-items-scroll">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-img-placeholder">
                        <span>🌸</span>
                      </div>
                      <div className="cart-item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-options">
                          Size: {item.size === 'L' ? 'Lớn (+6,000đ)' : 'Vừa'} | {item.sugar} đường | {item.ice} đá
                        </p>
                        {item.toppings && item.toppings.length > 0 && (
                          <p className="item-toppings">Topping: {item.toppings.join(', ')}</p>
                        )}
                        <p className="item-price-calc">
                          {formatPrice(item.price + (item.toppingPrice || 0))}
                        </p>
                      </div>
                      <div className="cart-qty-trash-col">
                        <div className="qty-picker">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="qty-btn">
                            <Minus size={14} />
                          </button>
                          <span className="qty-num">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="qty-btn">
                            <Plus size={14} />
                          </button>
                        </div>
                        <button onClick={() => onRemoveItem(item.id)} className="item-remove-btn" title="Xóa món">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer-summary">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span className="summary-price">{formatPrice(getSubtotal())}</span>
                  </div>
                  <button onClick={() => setStep(2)} className="btn btn-primary w-full next-step-btn">
                    Tiến hành Đặt hàng <ChevronRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Customer Details & Checkout Form */}
        {step === 2 && (
          <div className="cart-content-container">
            <form onSubmit={handleCheckoutSubmit} className="checkout-form-scroll">
              <h4 className="checkout-title">Thông tin giao hàng</h4>
              
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  className="form-control"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  placeholder="0968xxxxxx"
                  className="form-control"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ nhận hàng *</label>
                <input
                  type="text"
                  required
                  placeholder="Số nhà, Tên đường, Quận, Hà Nội"
                  className="form-control"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phương thức thanh toán</label>
                <div className="payment-options-grid">
                  <label className={`payment-card-option ${checkoutForm.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={checkoutForm.paymentMethod === 'transfer'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'transfer' })}
                    />
                    <CreditCard size={18} />
                    <span>Chuyển khoản QR</span>
                  </label>
                  <label className={`payment-card-option ${checkoutForm.paymentMethod === 'cash' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={checkoutForm.paymentMethod === 'cash'}
                      onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cash' })}
                    />
                    <ShoppingBag size={18} />
                    <span>Tiền mặt (COD)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú đơn hàng</label>
                <textarea
                  placeholder="Ít đá, giao giờ hành chính,..."
                  className="form-control"
                  rows="3"
                  value={checkoutForm.notes}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="checkout-summary-box">
                <div className="summary-row">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="summary-price highlight-price">{formatPrice(getSubtotal())}</span>
                </div>
              </div>

              <div className="checkout-actions-flex">
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  Quay lại
                </button>
                <button type="submit" className="btn btn-primary flex-grow">
                  Đặt hàng ngay
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Completed Order & Bank QR */}
        {step === 3 && (
          <div className="cart-content-container completed-container">
            <div className="order-completed-scroll">
              <div className="success-badge-mark">✓</div>
              <h3 className="success-title">Đặt Hàng Thành Công!</h3>
              <p className="success-subtitle">Đơn hàng của bạn đang được pha chế.</p>

              {checkoutForm.paymentMethod === 'transfer' && (
                <div className="bank-transfer-qr-box">
                  <h4 className="bank-qr-title">Chuyển khoản quét mã VietQR</h4>
                  <div className="qr-image-placeholder">
                    {/* Recreating a simulated QR code using CSS art and canvas or branding logo */}
                    <div className="qr-graphics">
                      <div className="qr-squares"></div>
                      <span className="qr-brand-label">Bông Biêng Pay</span>
                    </div>
                  </div>
                  <div className="bank-details-text">
                    <p>Ngân hàng: <strong>MB Bank (Quân Đội)</strong></p>
                    <p>Số tài khoản: <strong>0968123456</strong></p>
                    <p>Chủ tài khoản: <strong>CONG TY CPTMDV BLACK PEARL</strong></p>
                    <p>Số tiền: <strong>{formatPrice(getSubtotal())}</strong></p>
                    <p>Nội dung: <strong>BB {checkoutForm.phone}</strong></p>
                  </div>
                </div>
              )}

              <div className="order-message-preview">
                <p className="order-msg-label">Tóm tắt tin nhắn đơn hàng:</p>
                <pre className="order-msg-text">{generateOrderMessage()}</pre>
              </div>

              <div className="action-buttons-column">
                <button onClick={handleSendZalo} className="btn btn-gold w-full">
                  Gửi đơn qua Zalo nhận ưu đãi
                </button>
                <button onClick={resetCartFlow} className="btn btn-primary w-full">
                  Hoàn thành & Quay lại Cửa hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cart-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 150;
          backdrop-filter: blur(2px);
          animation: fadeIn 0.3s ease;
        }

        .cart-drawer-panel {
          position: fixed;
          top: 0;
          right: -100%;
          width: 450px;
          height: 100%;
          background-color: var(--color-bg-secondary);
          z-index: 250;
          box-shadow: -5px 0 35px rgba(0, 0, 0, 0.08);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 480px) {
          .cart-drawer-panel {
            width: 100%;
          }
        }

        .cart-drawer-panel.open {
          right: 0;
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid var(--color-bg-primary);
        }

        .cart-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cart-header-title h3 {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--color-text-primary);
        }

        .cart-close-btn {
          color: var(--color-text-secondary);
          padding: 4px;
        }

        .cart-close-btn:hover {
          color: var(--color-text-primary);
        }

        .cart-content-container {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background-color: var(--color-bg-primary);
        }

        /* Cart Empty State */
        .cart-empty-state {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          gap: 20px;
        }

        .empty-icon {
          color: var(--color-bg-tertiary);
          animation: float 5s ease-in-out infinite;
        }

        .empty-text {
          font-size: 1rem;
          color: var(--color-text-secondary);
        }

        /* Cart Items Scroll */
        .cart-items-scroll {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item-row {
          background-color: var(--color-bg-secondary);
          padding: 16px;
          border-radius: var(--border-radius-md);
          display: flex;
          gap: 16px;
          align-items: center;
          border: 1px solid rgba(250, 247, 240, 0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.01);
        }

        .cart-item-img-placeholder {
          width: 50px;
          height: 50px;
          background-color: var(--color-accent-gold-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .cart-item-details {
          flex-grow: 1;
        }

        .item-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }

        .item-options {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 2px;
        }

        .item-toppings {
          font-size: 0.8rem;
          color: var(--color-accent-gold);
          font-weight: 500;
          margin-bottom: 4px;
        }

        .item-price-calc {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .cart-qty-trash-col {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-bg-tertiary);
          border-radius: var(--border-radius-sm);
          background-color: var(--color-bg-secondary);
          overflow: hidden;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
        }

        .qty-btn:hover {
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
        }

        .qty-num {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0 6px;
        }

        .item-remove-btn {
          color: #d49b91;
          padding: 4px;
        }

        .item-remove-btn:hover {
          color: var(--color-text-primary);
        }

        .cart-footer-summary {
          background-color: var(--color-bg-secondary);
          padding: 24px;
          border-top: 1px solid var(--color-bg-primary);
          box-shadow: 0 -4px 15px rgba(0,0,0,0.02);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .summary-price {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          color: var(--color-text-primary);
        }

        .next-step-btn {
          font-weight: 700;
          font-size: 0.95rem;
        }

        /* Checkout Form Step */
        .checkout-form-scroll {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .checkout-title {
          font-size: 1.15rem;
          margin-bottom: 20px;
          color: var(--color-text-primary);
          border-bottom: 1px solid var(--color-bg-tertiary);
          padding-bottom: 8px;
        }

        .payment-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .payment-card-option {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border: 1px solid var(--color-bg-tertiary);
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          background-color: var(--color-bg-secondary);
          transition: var(--transition-smooth);
        }

        .payment-card-option.selected {
          border-color: var(--color-primary);
          background-color: var(--color-accent-gold-light);
          color: var(--color-primary);
        }

        .payment-card-option input {
          display: none;
        }

        .checkout-summary-box {
          background-color: var(--color-bg-secondary);
          padding: 16px;
          border-radius: var(--border-radius-sm);
          margin: 24px 0;
          border: 1px dashed var(--color-accent-gold);
        }

        .highlight-price {
          color: var(--color-primary) !important;
          font-weight: 700 !important;
        }

        .checkout-actions-flex {
          display: flex;
          gap: 12px;
        }

        .flex-grow {
          flex-grow: 1;
        }

        /* Order Completed Step */
        .completed-container {
          padding: 24px;
        }

        .order-completed-scroll {
          flex-grow: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-badge-mark {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--color-primary);
          color: white;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          margin-top: 10px;
          box-shadow: 0 4px 15px rgba(85, 111, 82, 0.2);
        }

        .success-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          margin-bottom: 4px;
        }

        .success-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 28px;
          text-align: center;
        }

        .bank-transfer-qr-box {
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-bg-tertiary);
          border-radius: var(--border-radius-md);
          padding: 20px;
          width: 100%;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bank-qr-title {
          font-size: 1rem;
          margin-bottom: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .qr-image-placeholder {
          width: 160px;
          height: 160px;
          border: 1px solid var(--color-bg-tertiary);
          background-color: white;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-sm);
          margin-bottom: 16px;
        }

        .qr-graphics {
          width: 100%;
          height: 100%;
          border: 4px double var(--color-text-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
          background-size: 16px 16px;
          background-position: 0 0, 8px 8px;
          position: relative;
        }

        .qr-brand-label {
          background-color: var(--color-primary);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          position: absolute;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .bank-details-text {
          width: 100%;
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-top: 1px dashed var(--color-bg-tertiary);
          padding-top: 12px;
          color: var(--color-text-secondary);
        }

        .bank-details-text strong {
          color: var(--color-text-primary);
        }

        .order-message-preview {
          width: 100%;
          margin-bottom: 24px;
        }

        .order-msg-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
        }

        .order-msg-text {
          font-family: monospace;
          background-color: var(--color-bg-secondary);
          padding: 12px;
          border-radius: var(--border-radius-sm);
          font-size: 0.8rem;
          color: var(--color-text-primary);
          border: 1px solid var(--color-bg-tertiary);
          white-space: pre-wrap;
          max-height: 120px;
          overflow-y: auto;
        }

        .action-buttons-column {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
