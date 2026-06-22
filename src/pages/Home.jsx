import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Compass, ArrowRight, ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { productsData } from '../data/productsData';
import ScrollReveal from '../components/ScrollReveal';

export default function Home({ onSelectProduct }) {
  const signatures = productsData.filter(p => p.isSignature);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % signatures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + signatures.length) % signatures.length);
  };

  const advantages = [
    {
      icon: <Leaf className="adv-icon" size={32} />,
      title: "Trà Tươi Nguyên Lá",
      desc: "Lá trà được tuyển chọn từ các nông trường trà organic cao cấp, bảo toàn độ tươi mới và hàm lượng chất chống oxy hóa tự nhiên."
    },
    {
      icon: <Award className="adv-icon" size={32} />,
      title: "Hương Hoa Thiên Nhiên",
      desc: "Chúng tôi chắt lọc hương thơm thuần khiết từ các loài hoa phương Đông như nhài, quế hoa, phong lan... nói không với hương liệu nhân tạo."
    },
    {
      icon: <Compass className="adv-icon" size={32} />,
      title: "Công Thức Độc Quyền",
      desc: "Tỉ lệ pha chế độc bản được nghiên cứu kỹ lưỡng trong 18 tháng để cân bằng hoàn hảo vị chát thanh nhẹ của trà và độ ngậy dịu của sữa."
    }
  ];

  const newsItems = [
    {
      date: "15 Th06, 2026",
      category: "SỰ KIỆN",
      title: "Bông Biêng Khai Trương Chi Nhánh Thứ 6 Tại Lê Văn Lương",
      desc: "Chào đón thành viên mới tại Tòa 18T1 Lê Văn Lương với ưu đãi Mua 1 Tặng 1 toàn bộ menu trong tuần lễ vàng khai trương từ ngày 15/06 đến ngày 22/06/2026."
    },
    {
      date: "01 Th06, 2026",
      category: "THỰC ĐƠN MỚI",
      title: "Ra Mắt Dòng Sản Phẩm Kem Dẻ Cười Béo Bùi Độc Đáo",
      desc: "Bộ đôi 'Thanh Nhài Kem Dẻ Cười' và 'Nhài Dừa Kem Dẻ Cười' chính thức lên kệ với lớp kem dẻ cười (Pistachio cream) béo ngậy cùng vụn hạt dẻ giòn rụm."
    },
    {
      date: "20 Th05, 2026",
      category: "ƯU ĐÃI THÀNH VIÊN",
      title: "Chương Trình Khách Hàng Thân Thiết - Nhận Ly Giữ Nhiệt Cao Cấp",
      desc: "Tích điểm đổi quà độc quyền cực chất cùng Bông Biêng Zalo OA. Cơ hội nhận ngay ly giữ nhiệt sứ nhám phiên bản giới hạn cho các khách hàng VIP."
    }
  ];

  return (
    <div className="page-wrapper home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span className="hero-badge animate-fade-in">Khám phá Trà Sữa Hương Hoa Phương Đông</span>
          <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Dệt hương thanh,<br /><span>dịu vị trà.</span>
          </h1>
          <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Nơi mỗi ly trà sữa Bông Biêng là một tác phẩm nghệ thuật, kết hợp tinh tế từ hương hoa tinh khiết Á Đông và vị sữa tươi nguyên lá thượng hạng.
          </p>
          <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/products" className="btn btn-primary">Đặt Trà Ngay</Link>
            <Link to="/story" className="btn btn-outline text-white-btn">Chuyện Bông Biêng</Link>
          </div>
        </div>
      </section>

      {/* 2. Core Advantages */}
      <section className="advantages-section section-padding">
        <div className="container">
          <ScrollReveal animation="up">
            <div className="section-title">
              <p>Giá Trị Cốt Lõi</p>
              <h2>Lợi Thế Từ Bông Biêng</h2>
            </div>
          </ScrollReveal>
          
          <div className="advantages-grid">
            {advantages.map((adv, i) => (
              <ScrollReveal key={i} animation="up" delay={i * 150}>
                <div className="adv-card">
                  <div className="adv-icon-wrapper">{adv.icon}</div>
                  <h3 className="adv-title">{adv.title}</h3>
                  <p className="adv-desc">{adv.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Signature Slider */}
      <section className="signature-section section-padding">
        <div className="container">
          <ScrollReveal animation="up">
            <div className="section-title">
              <p>Món Ngon Phải Thử</p>
              <h2>Bộ Sưu Tập Chữ Ký</h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="scale" delay={150}>
            <div className="slider-wrapper">
              <button className="slider-arrow prev" onClick={prevSlide} aria-label="Slide trước">
                <ChevronLeft size={24} />
              </button>
              
              <div className="slider-track-container">
                {signatures.map((prod, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div key={prod.id} className={`slider-item ${isActive ? 'active' : ''}`}>
                      <div className="slider-card-grid">
                        <div className="slider-img-col">
                          <div className="slider-img-placeholder">
                            <span>🍵</span>
                          </div>
                        </div>
                        <div className="slider-text-col">
                          <span className="slider-item-badge">Bán Chạy Nhất</span>
                          <h3 className="slider-item-name">{prod.name}</h3>
                          <p className="slider-item-desc">{prod.description}</p>
                          <p className="slider-item-price">{prod.price.toLocaleString('vi-VN')}đ</p>
                          <div className="slider-item-actions">
                            <button onClick={() => onSelectProduct(prod)} className="btn btn-primary">
                              Thêm Giỏ Hàng
                            </button>
                            <Link to="/products" className="btn btn-outline">
                              Xem tất cả sản phẩm
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="slider-arrow next" onClick={nextSlide} aria-label="Slide sau">
                <ChevronRight size={24} />
              </button>
            </div>
          </ScrollReveal>

          <div className="slider-dots">
            {signatures.map((_, idx) => (
              <button 
                key={idx} 
                className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Đi tới slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Experience Space Showcase */}
      <section className="space-section section-padding">
        <div className="container space-grid">
          <ScrollReveal animation="left">
            <div className="space-text-col">
              <p className="space-pretitle">Không Gian Trải Nghiệm</p>
              <h2 className="space-title">Tìm bình yên giữa phố thị ồn ào</h2>
              <p className="space-desc">
                Các cửa hàng Bông Biêng được thiết kế theo phong cách tối giản kiểu Á Đông hiện đại. Sự kết hợp tinh tế giữa vật liệu gỗ sồi sáng màu, mảng tường kem nhã nhặn và rất nhiều cây xanh mang lại cho bạn cảm giác nhẹ nhõm, thư thái ngay từ khi bước vào.
              </p>
              <p className="space-desc">
                Một không gian lý tưởng để bạn học tập, làm việc hay đơn giản là ngồi thưởng thức một ly trà thơm ngát, trò chuyện cùng bạn bè thân yêu.
              </p>
              <div className="space-info-boxes">
                <div className="space-info-box">
                  <MapPin size={20} color="#C29F68" />
                  <div>
                    <h4>6 Chi Nhánh</h4>
                    <p>Tại các quận trung tâm Hà Nội</p>
                  </div>
                </div>
                <div className="space-info-box">
                  <Phone size={20} color="#C29F68" />
                  <div>
                    <h4>Dịch vụ sự kiện</h4>
                    <p>Nhận đặt tiệc trà, Workshop nhỏ</p>
                  </div>
                </div>
              </div>
              <Link to="/contact" className="btn btn-gold">Tìm cửa hàng gần nhất</Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="right" delay={150}>
            <div className="space-img-col">
              <div className="space-img-wrapper">
                <div className="space-img-fallback">
                  <div className="space-fallback-graphics">
                    <span>🍃</span>
                    <p>Không gian trà sữa Bông Biêng</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Highlight News */}
      <section className="news-section section-padding">
        <div className="container">
          <ScrollReveal animation="up">
            <div className="section-title">
              <p>Bản Tin Bông Biêng</p>
              <h2>Sự Kiện & Tin Tức Nổi Bật</h2>
            </div>
          </ScrollReveal>
          
          <div className="news-grid">
            {newsItems.map((news, i) => (
              <ScrollReveal key={i} animation="up" delay={i * 150}>
                <article className="news-card">
                  <div className="news-img-placeholder">
                    <span>🌸</span>
                  </div>
                  <div className="news-body">
                    <div className="news-meta">
                      <span className="news-date">{news.date}</span>
                      <span className="news-category">{news.category}</span>
                    </div>
                    <h3 className="news-card-title">{news.title}</h3>
                    <p className="news-card-desc">{news.desc}</p>
                    <Link to="/news" className="news-read-more">
                      Đọc tiếp <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal animation="up" delay={200}>
            <div className="news-footer-action">
              <Link to="/news" className="btn btn-outline">Xem tất cả bài viết</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        /* Hero Section styles */
        .hero-section {
          position: relative;
          height: calc(100vh - 80px);
          min-height: 600px;
          display: flex;
          align-items: center;
          background-image: url('/tea_hero.png');
          background-size: cover;
          background-position: center;
          color: white;
          overflow: hidden;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(44, 43, 41, 0.7) 0%, rgba(44, 43, 41, 0.4) 50%, rgba(44, 43, 41, 0.8) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          max-width: 650px;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-accent-gold);
          margin-bottom: 20px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .hero-title span {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--color-accent-gold);
          font-weight: 500;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .text-white-btn {
          border-color: white !important;
          color: white !important;
        }

        .text-white-btn:hover {
          background-color: white !important;
          color: var(--color-text-primary) !important;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-actions {
            flex-direction: column;
            gap: 12px;
          }
        }

        /* Advantages styles */
        .advantages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        @media (max-width: 900px) {
          .advantages-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .adv-card {
          background-color: var(--color-bg-secondary);
          padding: 40px 32px;
          border-radius: var(--border-radius-md);
          text-align: center;
          border: 1px solid rgba(85, 111, 82, 0.05);
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
        }

        .adv-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-primary);
          box-shadow: var(--shadow-medium);
        }

        .adv-icon-wrapper {
          width: 70px;
          height: 70px;
          background-color: var(--color-accent-gold-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .adv-icon {
          color: var(--color-primary);
        }

        .adv-title {
          font-size: 1.3rem;
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }

        .adv-desc {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Signature Slider styles */
        .slider-wrapper {
          position: relative;
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-lg);
          padding: 50px 70px;
          border: 1px solid rgba(85, 111, 82, 0.08);
          box-shadow: var(--shadow-medium);
          display: flex;
          align-items: center;
          min-height: 380px;
        }

        @media (max-width: 768px) {
          .slider-wrapper {
            padding: 40px 24px;
          }
        }

        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-bg-tertiary);
          z-index: 10;
        }

        .slider-arrow:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .slider-arrow.prev { left: 16px; }
        .slider-arrow.next { right: 16px; }

        @media (max-width: 768px) {
          .slider-arrow { display: none; }
        }

        .slider-track-container {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .slider-item {
          display: none;
          width: 100%;
          animation: fadeIn 0.5s ease-in-out;
        }

        .slider-item.active {
          display: block;
        }

        .slider-card-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .slider-card-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .slider-img-col {
          display: flex;
          justify-content: center;
        }

        .slider-img-placeholder {
          width: 250px;
          height: 250px;
          background-color: var(--color-accent-gold-light);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.02);
        }

        .slider-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .slider-item-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .slider-item-name {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          color: var(--color-text-primary);
          margin-bottom: 16px;
        }

        .slider-item-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .slider-item-price {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 32px;
        }

        .slider-item-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--color-bg-tertiary);
          transition: var(--transition-smooth);
        }

        .slider-dot.active {
          background-color: var(--color-primary);
          width: 24px;
          border-radius: 6px;
        }

        /* Experience Space styles */
        .space-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .space-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .space-pretitle {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-accent-gold);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .space-title {
          font-size: 2.2rem;
          color: var(--color-text-primary);
          margin-bottom: 24px;
        }

        .space-desc {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .space-info-boxes {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 32px 0;
        }

        .space-info-box {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 16px;
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-sm);
          border-left: 3px solid var(--color-accent-gold);
        }

        .space-info-box h4 {
          font-size: 1rem;
          color: var(--color-text-primary);
          margin-bottom: 2px;
        }

        .space-info-box p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .space-img-wrapper {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-medium);
          background-image: url('/store_interior.png');
          background-size: cover;
          background-position: center;
        }

        .space-img-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(44, 43, 41, 0.25);
          display: flex;
          align-items: flex-end;
          padding: 40px;
        }

        .space-fallback-graphics {
          color: white;
        }

        .space-fallback-graphics span {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 8px;
          animation: float 4s ease-in-out infinite;
        }

        .space-fallback-graphics p {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 500;
        }

        /* News Cards styles */
        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 900px) {
          .news-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .news-card {
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid rgba(85, 111, 82, 0.05);
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
        }

        .news-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-medium);
          border-color: var(--color-accent-gold);
        }

        .news-img-placeholder {
          height: 200px;
          background: linear-gradient(135deg, var(--color-accent-gold-light) 0%, var(--color-bg-tertiary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .news-body {
          padding: 24px;
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .news-date {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        .news-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .news-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .news-read-more:hover {
          color: var(--color-primary-hover);
          gap: 10px;
        }

        .news-footer-action {
          display: flex;
          justify-content: center;
          margin-top: 48px;
        }
      `}</style>
    </div>
  );
}
