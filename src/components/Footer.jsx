import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const branches = [
    { address: "133/3 Đỗ Xuân Hợp, Phước Long B, Thủ Đức, TP. HCM", phone: "0968.123.456" },
    { address: "85 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM", phone: "0968.123.457" },
    { address: "42 Trần Cao Vân, Võ Thị Sáu, Quận 3, TP. HCM", phone: "0968.123.458" },
    { address: "120 Nguyễn Gia Trí, Phường 25, Bình Thạnh, TP. HCM", phone: "0968.123.459" },
    { address: "45 Nguyễn Văn Linh, Tân Phong, Quận 7, TP. HCM", phone: "0968.123.460" },
    { address: "68 Bàu Cát, Phường 14, Tân Bình, TP. HCM", phone: "0968.123.461" }
  ];

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <h3 className="footer-brand">GenX PKS</h3>
            <p className="footer-slogan">Dệt hương thanh, dịu vị trà</p>
            <p className="brand-desc">
              Chúng tôi sáng tạo nên một câu chuyện mới mẻ về sự mê hoặc của từng lớp hương hoa. Nơi mỗi ly trà sữa GenX PKS là một tác phẩm được thêu dệt tinh tế từ những hương vị quyến rũ.
            </p>
            <div className="social-links">
              <a href="https://facebook.com/genxpks" target="_blank" rel="noreferrer" aria-label="Facebook GenX PKS">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Youtube GenX PKS">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
              </a>
            </div>
          </div>

          {/* Nav Links Col */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">Liên Kết</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/story">Chuyện GenX PKS</Link></li>
              <li><Link to="/menu">Thực đơn</Link></li>
              <li><Link to="/products">Sản phẩm</Link></li>
              <li><Link to="/membership">Chính sách thành viên</Link></li>
              <li><Link to="/news">Tin tức mới</Link></li>
              <li><Link to="/contact">Liên hệ chi nhánh</Link></li>
            </ul>
          </div>

          {/* Branches Col */}
          <div className="footer-col branches-col">
            <h4 className="footer-col-title">Hệ thống Cửa hàng</h4>
            <div className="branches-list">
              {branches.slice(0, 3).map((branch, i) => (
                <div key={i} className="footer-branch-item">
                  <MapPin size={16} className="branch-icon" />
                  <div>
                    <p className="branch-addr">{branch.address}</p>
                    <p className="branch-phone">Hotline: {branch.phone}</p>
                  </div>
                </div>
              ))}
              <Link to="/contact" className="view-more-branches">Xem tất cả 6 chi nhánh →</Link>
            </div>
          </div>

          {/* Contact Col */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Liên hệ Hỗ trợ</h4>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Phone size={16} />
                <p>CSKH: 1900 8888 (8:00 - 22:00)</p>
              </div>
              <div className="contact-info-item">
                <Mail size={16} />
                <p>lienhe@genxpks.com</p>
              </div>
              <div className="contact-info-item">
                <Clock size={16} />
                <p>Giờ hoạt động: 08:30 - 22:30 hàng ngày</p>
              </div>
            </div>
            <div className="footer-tagline-box">
              <p>Mỗi ly trà sữa GenX PKS là một tác phẩm được thêu dệt tinh tế.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <div className="company-info-block">
            <p className="company-name">CÔNG TY TNHH GENX PK STORY</p>
            <p>Mã số doanh nghiệp: 0319221437 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 12/04/2024</p>
            <p>Địa chỉ ĐKKD: 133/3 Đỗ Xuân Hợp, Khu phố 9, Phường Phước Long, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p>Người đại diện pháp luật: Lê Trọng Phúc - Hotline: 1900 8888 - CSKH: lienhe@genxpks.com</p>
          </div>
          <div className="footer-bottom-flex">
            <p className="copyright">© 2026 GenX PKS. Thiết kế và phát triển bởi Genx PKS. Bản quyền thuộc về thương hiệu GenX PKS.</p>
            <div className="footer-bottom-links">
              <a href="#privacy">Chính sách bảo mật</a>
              <span>•</span>
              <a href="#terms">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .main-footer {
          background-color: #2C2B29;
          color: #FAF7F0;
          font-family: var(--font-sans);
        }

        .footer-top {
          padding: 80px 0 50px;
          border-bottom: 1px solid rgba(250, 247, 240, 0.08);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1.5fr 1.5fr;
          gap: 40px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-brand {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--color-accent-gold);
          margin-bottom: 4px;
        }

        .footer-slogan {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(250, 247, 240, 0.6);
          margin-bottom: 20px;
        }

        .brand-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(250, 247, 240, 0.75);
          margin-bottom: 24px;
        }

        .social-links {
          display: flex;
          gap: 12px;
        }

        .social-links a {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(250, 247, 240, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FAF7F0;
          transition: var(--transition-smooth);
        }

        .social-links a:hover {
          background-color: var(--color-accent-gold);
          color: #2C2B29;
          transform: translateY(-2px);
        }

        .footer-col-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-accent-gold);
          margin-bottom: 24px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 1px;
          background-color: var(--color-accent-gold);
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links-list a {
          font-size: 0.9rem;
          color: rgba(250, 247, 240, 0.75);
        }

        .footer-links-list a:hover {
          color: var(--color-accent-gold);
          padding-left: 4px;
        }

        .branches-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-branch-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .branch-icon {
          color: var(--color-accent-gold);
          margin-top: 3px;
        }

        .branch-addr {
          font-size: 0.85rem;
          font-weight: 500;
          line-height: 1.4;
          color: rgba(250, 247, 240, 0.9);
        }

        .branch-phone {
          font-size: 0.8rem;
          color: rgba(250, 247, 240, 0.5);
          margin-top: 2px;
        }

        .view-more-branches {
          font-size: 0.85rem;
          color: var(--color-accent-gold);
          font-weight: 500;
          margin-top: 8px;
        }

        .view-more-branches:hover {
          text-decoration: underline;
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: rgba(250, 247, 240, 0.9);
        }

        .contact-info-item svg {
          color: var(--color-accent-gold);
        }

        .footer-tagline-box {
          margin-top: 24px;
          padding: 16px;
          border-left: 2px solid var(--color-primary);
          background-color: rgba(85, 111, 82, 0.08);
        }

        .footer-tagline-box p {
          font-size: 0.85rem;
          font-style: italic;
          color: rgba(250, 247, 240, 0.8);
        }

        .footer-bottom {
          padding: 32px 0;
          background-color: #201F1E;
          font-size: 0.8rem;
          color: rgba(250, 247, 240, 0.4);
          line-height: 1.6;
        }

        .footer-bottom-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .company-info-block {
          border-bottom: 1px solid rgba(250, 247, 240, 0.05);
          padding-bottom: 20px;
        }

        .company-name {
          font-weight: 600;
          color: rgba(250, 247, 240, 0.7);
          margin-bottom: 4px;
        }

        .footer-bottom-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-bottom-links {
          display: flex;
          gap: 8px;
        }

        .footer-bottom-links a {
          color: rgba(250, 247, 240, 0.4);
        }

        .footer-bottom-links a:hover {
          color: var(--color-accent-gold);
        }

        @media (max-width: 768px) {
          .footer-bottom-container {
            text-align: center;
          }
          .footer-bottom-flex {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
