import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [selectedBranchIdx, setSelectedBranchIdx] = useState(0);

  const branches = [
    { name: "Chi Nhánh Phạm Ngọc Thạch", address: "B4 Phạm Ngọc Thạch, Đống Đa, Hà Nội", phone: "0968.123.456", coords: { x: 45, y: 55 } },
    { name: "Chi Nhánh Đội Cấn", address: "115 Đội Cấn, Ba Đình, Hà Nội", phone: "0968.123.457", coords: { x: 38, y: 35 } },
    { name: "Chi Nhánh Duy Tân", address: "14 Duy Tân, Cầu Giấy, Hà Nội", phone: "0968.123.458", coords: { x: 15, y: 40 } },
    { name: "Chi Nhánh Phố Huế", address: "96 Phố Huế, Hai Bà Trưng, Hà Nội", phone: "0968.123.459", coords: { x: 65, y: 48 } },
    { name: "Chi Nhánh Nguyễn Văn Lộc", address: "149 Nguyễn Văn Lộc, Hà Đông, Hà Nội", phone: "0968.123.460", coords: { x: 20, y: 80 } },
    { name: "Chi Nhánh Lê Văn Lương", address: "Tòa 18T1 Lê Văn Lương, Thanh Xuân, Hà Nội", phone: "0968.123.461", coords: { x: 35, y: 62 } }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return;
    }
    setTimeout(() => {
      setIsSent(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <div className="page-wrapper contact-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Gặp Gỡ Bông Biêng</p>
          <h1 className="page-header-title">Hệ Thống Cửa Hàng</h1>
        </div>
      </section>

      {/* Main Branches Layout */}
      <section className="branches-section section-padding">
        <div className="container branches-map-grid">
          {/* Branch list */}
          <div className="branches-list-col">
            <h2 className="section-subtitle-left">Danh sách Chi nhánh</h2>
            <div className="branches-cards-stack">
              {branches.map((branch, idx) => {
                const isActive = idx === selectedBranchIdx;
                return (
                  <div 
                    key={idx} 
                    className={`branch-detail-card ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedBranchIdx(idx)}
                  >
                    <div className="branch-card-header">
                      <h3>{branch.name}</h3>
                      <span className="open-badge">Đang mở cửa</span>
                    </div>
                    <div className="branch-info-rows">
                      <div className="info-row">
                        <MapPin size={16} color="#C29F68" />
                        <p>{branch.address}</p>
                      </div>
                      <div className="info-row">
                        <Phone size={16} color="#C29F68" />
                        <p>Hotline: {branch.phone}</p>
                      </div>
                      <div className="info-row">
                        <Clock size={16} color="#C29F68" />
                        <p>Giờ bán: 08:30 - 22:30 hàng ngày</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="branches-map-col">
            <div className="styled-map-container panel-glass">
              <div className="map-header">
                <span className="map-title-label">Bản đồ chi nhánh Bông Biêng Hà Nội</span>
              </div>
              <div className="map-canvas-visual">
                {/* SVG Visualizing Hanoi Districts and Branch Pins */}
                <svg className="hanoi-map-svg" viewBox="0 0 100 100" width="100%" height="100%">
                  {/* Styled Background Grid/Paths representing districts */}
                  <path d="M10,20 Q30,10 50,20 T90,20" fill="none" stroke="#E6D3C3" strokeWidth="1.5" />
                  <path d="M20,40 Q40,30 60,50 T100,45" fill="none" stroke="#E6D3C3" strokeWidth="1.5" />
                  <path d="M5,65 Q35,60 55,75 T95,65" fill="none" stroke="#E6D3C3" strokeWidth="1.5" />
                  <path d="M30,5 Q45,25 40,65 T45,95" fill="none" stroke="#E6D3C3" strokeWidth="1.5" />
                  <path d="M60,0 Q65,40 70,80 T75,100" fill="none" stroke="#E6D3C3" strokeWidth="1.5" />

                  {/* Red River representation */}
                  <path d="M0,30 Q30,35 60,20 T100,5" fill="none" stroke="rgba(85, 111, 82, 0.15)" strokeWidth="6" />

                  {/* Branch pins */}
                  {branches.map((b, i) => {
                    const isSelected = i === selectedBranchIdx;
                    return (
                      <g key={i} className="map-pin-group" onClick={() => setSelectedBranchIdx(i)}>
                        {isSelected && (
                          <circle cx={b.coords.x} cy={b.coords.y} r="6" fill="rgba(194, 159, 104, 0.4)" className="pin-pulse" />
                        )}
                        <circle 
                          cx={b.coords.x} 
                          cy={b.coords.y} 
                          r={isSelected ? "4.5" : "3.5"} 
                          fill={isSelected ? "#556F52" : "#C29F68"} 
                          stroke="white" 
                          strokeWidth="1"
                          style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                        />
                        <text 
                          x={b.coords.x} 
                          y={b.coords.y - 6} 
                          fontSize="2.5" 
                          fontWeight="700" 
                          textAnchor="middle" 
                          fill="#2C2B29"
                          style={{ pointerEvents: 'none' }}
                        >
                          {b.name.replace("Chi Nhánh ", "")}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="map-footer-info">
                <h4>{branches[selectedBranchIdx].name}</h4>
                <p>{branches[selectedBranchIdx].address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="contact-form-section section-padding">
        <div className="container contact-form-grid">
          <div className="form-info-side">
            <div className="info-icon-card">
              <MessageSquare size={28} color="#C29F68" />
              <h3>Liên hệ nhanh</h3>
              <p>Nếu bạn có bất kỳ thắc mắc nào về hóa đơn, sự kiện, phản ánh dịch vụ hoặc mong muốn đồng hành hợp tác đại lý, hãy điền thông tin vào mẫu bên cạnh.</p>
              <p>Đội ngũ Chăm sóc khách hàng Bông Biêng sẽ phản hồi email của bạn trong vòng 24 giờ làm việc.</p>
            </div>
            
            <div className="hotline-card-info panel-glass">
              <h4>Đường dây nóng hỗ trợ khẩn cấp</h4>
              <p className="highlight-phone">1900 8888</p>
              <p className="working-hours">Hoạt động từ 8:00 - 22:30 hàng ngày</p>
            </div>
          </div>

          <div className="form-input-side">
            {isSent ? (
              <div className="form-success-state">
                <div className="success-icon-circle">✓</div>
                <h3>Thông Tin Đã Được Tiếp Nhận!</h3>
                <p>Cảm ơn bạn đã liên hệ với Bông Biêng. Chúng tôi sẽ phản hồi lại bạn qua địa chỉ email cung cấp sớm nhất.</p>
                <button onClick={() => setIsSent(false)} className="btn btn-primary">
                  Gửi thêm liên hệ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-main-form panel-glass">
                <div className="form-group">
                  <label>Họ và Tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Địa chỉ Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="09xxxxxxxx"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Nội dung liên hệ *</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Hãy viết câu hỏi hoặc nội dung liên hệ của bạn ở đây..."
                    className="form-control"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Gửi thông tin liên hệ <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .branches-map-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .branches-map-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .section-subtitle-left {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          margin-bottom: 24px;
          border-left: 3px solid var(--color-accent-gold);
          padding-left: 16px;
        }

        .branches-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 520px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .branch-detail-card {
          background-color: var(--color-bg-secondary);
          padding: 20px;
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(85, 111, 82, 0.05);
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .branch-detail-card:hover {
          border-color: var(--color-accent-gold);
          box-shadow: var(--shadow-subtle);
        }

        .branch-detail-card.active {
          border-color: var(--color-primary);
          background-color: var(--color-accent-gold-light);
          box-shadow: var(--shadow-subtle);
        }

        .branch-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .branch-card-header h3 {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-text-primary);
        }

        .open-badge {
          background-color: rgba(85, 111, 82, 0.1);
          color: var(--color-primary);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .branch-info-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-row {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        /* Map column styles */
        .styled-map-container {
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-bg-tertiary);
          overflow: hidden;
          box-shadow: var(--shadow-medium);
          display: flex;
          flex-direction: column;
          background-color: var(--color-bg-secondary);
        }

        .map-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--color-bg-primary);
        }

        .map-title-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .map-canvas-visual {
          height: 380px;
          background-color: #F8F5EE;
          position: relative;
          overflow: hidden;
        }

        .hanoi-map-svg {
          width: 100%;
          height: 100%;
        }

        .pin-pulse {
          animation: pulse 2s infinite ease-out;
          transform-origin: center;
        }

        @keyframes pulse {
          0% { r: 4; opacity: 0.9; }
          100% { r: 10; opacity: 0; }
        }

        .map-footer-info {
          padding: 20px;
          border-top: 1px solid var(--color-bg-primary);
          background-color: var(--color-bg-secondary);
        }

        .map-footer-info h4 {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          margin-bottom: 4px;
          color: var(--color-primary);
        }

        .map-footer-info p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        /* Contact form grid layout */
        .contact-form-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .info-icon-card h3 {
          font-size: 1.5rem;
          margin: 16px 0 12px;
        }

        .info-icon-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .hotline-card-info {
          margin-top: 32px;
          padding: 24px;
          border-radius: var(--border-radius-md);
          border: 1px solid var(--color-bg-tertiary);
          text-align: center;
        }

        .hotline-card-info h4 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .highlight-phone {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 4px;
        }

        .working-hours {
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .contact-main-form {
          padding: 40px;
          border-radius: var(--border-radius-lg);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-bg-tertiary);
        }

        @media (max-width: 480px) {
          .contact-main-form {
            padding: 24px 16px;
          }
        }
      `}</style>
    </div>
  );
}
