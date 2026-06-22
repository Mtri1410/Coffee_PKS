import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Sparkles } from 'lucide-react';
import { productsData } from '../data/productsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Menu() {
  const categories = [
    { id: 'flower-tea', name: 'Trà Sữa Hương Hoa', label: 'Tầng hương tinh khiết, thanh mát dịu lòng' },
    { id: 'cheese-tea', name: 'Trà Sữa Kem Cheese', label: 'Lớp kem cheese béo ngậy phủ trên nền trà hoa thơm lựng' },
    { id: 'cloud-blend', name: 'Mây & Đá Xay', label: 'Sảng khoái tức thì với dòng kem mây và trái cây xay nhuyễn' },
    { id: 'pistachio', name: 'Kem Dẻ Cười (Signature)', label: 'Công thức độc bản với kem Pistachio bùi béo khó cưỡng' }
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleDownloadPDF = () => {
    alert('Đang chuẩn bị tải xuống tệp thực đơn chất lượng cao (PDF)...');
  };

  return (
    <div className="page-wrapper menu-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Hương Vị Thiên Nhiên</p>
          <h1 className="page-header-title">Thực Đơn Nhà Bông</h1>
        </div>
      </section>

      {/* Menu Action Row */}
      <section className="menu-action-section">
        <div className="container action-flex-container">
          <p className="menu-disclaimer">
            * Toàn bộ giá thực đơn đã bao gồm phí VAT. Có tùy chọn đặt đơn giao hàng tận nơi.
          </p>
          <div className="menu-action-buttons">
            <button onClick={handleDownloadPDF} className="btn btn-outline pdf-download-btn">
              <FileText size={18} /> Tải Menu PDF
            </button>
            <Link to="/products" className="btn btn-primary">
              Đặt hàng trực tuyến <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Digital Menu Grid */}
      <section className="digital-menu-section section-padding">
        <div className="container menu-categories-list">
          {categories.map((cat) => {
            const catProducts = productsData.filter(p => p.category === cat.id);
            return (
              <ScrollReveal key={cat.id} animation="up">
                <div className="menu-category-block">
                  <div className="category-block-header">
                    <div className="cat-title-flex">
                      <Sparkles className="cat-star-icon" size={20} />
                      <h2>{cat.name}</h2>
                    </div>
                    <p className="category-subtitle">{cat.label}</p>
                  </div>

                  <div className="menu-items-grid">
                    {catProducts.map((prod) => (
                      <div key={prod.id} className="menu-item-card">
                        <div className="menu-item-head">
                          <h3 className="menu-item-title">
                            {prod.name}
                            {prod.isSignature && <span className="menu-item-badge">Bán Chạy</span>}
                          </h3>
                          <div className="menu-item-price-column">
                            <span className="price-label">Size M</span>
                            <span className="price-val">{formatPrice(prod.price)}</span>
                          </div>
                        </div>
                        <p className="menu-item-description">{prod.description}</p>
                        <div className="menu-item-size-options">
                          <span>Tùy chọn: Size L (+6.000đ) | Topping trân châu (+10.000đ)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Tea Experience CTA Banner */}
      <section className="menu-experience-cta section-padding">
        <div className="container cta-box-content">
          <ScrollReveal animation="scale">
            <h2>Bông Biêng trân quý từng trải nghiệm của khách hàng</h2>
            <p>Dù thưởng trà tại quán hay tại gia, mỗi ly trà sữa đều được đong đầy bằng sự chu đáo và tỉ mỉ trong từng khâu pha chế. Hãy chọn cho mình ly trà yêu thích và tận hưởng ngay lúc này nhé.</p>
            <Link to="/products" className="btn btn-gold">
              Đến trang Đặt trà ngay <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .menu-action-section {
          background-color: var(--color-bg-secondary);
          padding: 20px 0;
          border-bottom: 1px solid var(--color-bg-tertiary);
        }

        .action-flex-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .menu-disclaimer {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        .menu-action-buttons {
          display: flex;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .action-flex-container {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Digital Menu Categories styling */
        .menu-categories-list {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .menu-category-block {
          border-bottom: 1px solid rgba(85, 111, 82, 0.08);
          padding-bottom: 40px;
        }

        .menu-category-block:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .category-block-header {
          margin-bottom: 32px;
          border-left: 3px solid var(--color-accent-gold);
          padding-left: 16px;
        }

        .cat-title-flex {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .cat-title-flex h2 {
          font-size: 1.8rem;
          color: var(--color-text-primary);
        }

        .cat-star-icon {
          color: var(--color-accent-gold);
        }

        .category-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }

        .menu-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        @media (max-width: 900px) {
          .menu-items-grid {
            grid-template-columns: 1fr;
          }
        }

        .menu-item-card {
          background-color: var(--color-bg-secondary);
          padding: 24px;
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(250, 247, 240, 0.8);
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
        }

        .menu-item-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-medium);
          transform: translateY(-2px);
        }

        .menu-item-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 10px;
        }

        .menu-item-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .menu-item-badge {
          background-color: var(--color-accent-gold-light);
          border: 1px solid var(--color-accent-gold);
          color: var(--color-accent-gold);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .menu-item-price-column {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
        }

        .price-val {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .menu-item-description {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .menu-item-size-options {
          font-size: 0.75rem;
          color: var(--color-accent-gold);
          font-weight: 500;
        }

        /* CTA experience section */
        .menu-experience-cta {
          background-color: var(--color-primary);
          color: white;
          text-align: center;
        }

        .cta-box-content {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .cta-box-content h2 {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--color-bg-primary);
        }

        .cta-box-content p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 16px;
        }
      `}</style>
    </div>
  );
}
