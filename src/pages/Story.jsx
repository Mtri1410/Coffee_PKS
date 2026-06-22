import React, { useState } from 'react';
import { Sparkles, Heart, Compass, Send } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function Story() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'feedback',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Vui lòng nhập đầy đủ Họ tên, Email và Nội dung tin nhắn!');
      return;
    }
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'feedback',
        message: ''
      });
    }, 600);
  };

  const timelineEvents = [
    {
      year: "2024",
      title: "Khởi Đầu Ý Tưởng",
      desc: "Bông Biêng được thành lập bởi một đội ngũ đam mê trà sữa tại Hà Nội. Với ý tưởng kết hợp hương hoa phương Đông tinh tế vào trà sữa tươi, dự án đã trải qua 18 tháng nghiên cứu phát triển cốt trà và tỷ lệ sữa để đảm bảo hương hoa tự nhiên nhất."
    },
    {
      year: "2025",
      title: "Chi Nhánh Đầu Tiên",
      desc: "Cửa hàng đầu tiên tại B4 Phạm Ngọc Thạch chính thức đi vào hoạt động. Với phong cách thiết kế tối giản, yên tĩnh cùng sản phẩm chất lượng cao, Bông Biêng nhanh chóng thu hút được lượng lớn khách hàng trẻ yêu mến."
    },
    {
      year: "2026",
      title: "Hành Trình Mở Rộng",
      desc: "Chỉ sau 2 năm, Bông Biêng đã nhân rộng quy mô lên 6 chi nhánh tại các khu vực sầm uất nhất Hà Nội như Đội Cấn, Duy Tân, Phố Huế, Lê Văn Lương... Thương hiệu khẳng định vị thế dẫn đầu trong dòng trà sữa hương hoa tươi nguyên lá."
    }
  ];

  return (
    <div className="page-wrapper story-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Về Chúng Tôi</p>
          <h1 className="page-header-title">Chuyện Bông Biêng</h1>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="philosophy-section section-padding">
        <div className="container philosophy-grid">
          <ScrollReveal animation="left">
            <div className="philo-text-col">
              <h2 className="philo-title">Dệt hương thanh, dịu vị trà</h2>
              <p className="philo-p font-serif-italic">
                "Chúng tôi không chỉ bán trà sữa, chúng tôi thêu dệt những tầng hương hoa và tạo nên những khoảnh khắc bình yên."
              </p>
              <p className="philo-p">
                Bông Biêng ra đời từ mong muốn mang lại một làn gió mới cho văn hóa thưởng trà hiện đại của giới trẻ Việt Nam. Giữa nhịp sống hối hả của phố thị, một ly trà thơm nhẹ hương nhài hay ấm nồng hương quế hoa sẽ là chất xúc tác tuyệt vời giúp bạn tìm lại sự thư thái, tĩnh lặng trong tâm hồn.
              </p>
              <p className="philo-p">
                Mỗi sản phẩm tại Bông Biêng là sự chắt lọc tinh tế từ thiên nhiên. Lá trà tươi nguyên chất từ vùng cao nguyên Bảo Lộc kết hợp cùng hoa nhài tươi, quế hoa tự nhiên tạo nên tầng hương thanh tao, hậu vị ngọt ngào lưu luyến.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="right" delay={150}>
            <div className="philo-graphics-col">
              <div className="philo-circle-graphic">
                <span className="flower-emoji-float">🌸</span>
                <span className="leaf-emoji-float">🍃</span>
                <span className="heart-emoji-float">💖</span>
                <div className="circle-inner-brand">
                  <span className="circle-brand-name">Bông Biêng</span>
                  <span className="circle-brand-tag">Since 2024</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="core-values-section section-padding">
        <div className="container">
          <ScrollReveal animation="up">
            <div className="section-title">
              <p>Giá Trị Cốt Lõi</p>
              <h2>Sứ Mệnh & Tầm Nhìn</h2>
            </div>
          </ScrollReveal>
          
          <div className="values-cards-grid">
            <ScrollReveal animation="up" delay={0}>
              <div className="value-card">
                <div className="value-icon-box"><Sparkles size={24} color="#C29F68" /></div>
                <h3>Sứ Mệnh</h3>
                <p>Sáng tạo dòng trà sữa hương hoa chất lượng cao, đem lại trải nghiệm thư giãn tinh thần trọn vẹn và thúc đẩy thói quen thưởng trà lành mạnh cho thế hệ trẻ.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="up" delay={150}>
              <div className="value-card">
                <div className="value-icon-box"><Compass size={24} color="#C29F68" /></div>
                <h3>Tầm Nhìn</h3>
                <p>Trở thành chuỗi trà sữa hương hoa hàng đầu Việt Nam, biểu tượng cho phong cách sống tinh tế, yên bình và kết nối văn hóa trà truyền thống với hơi thở hiện đại.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="up" delay={300}>
              <div className="value-card">
                <div className="value-icon-box"><Heart size={24} color="#C29F68" /></div>
                <h3>Giá Trị</h3>
                <p>Tử tế trong nguồn nguyên liệu, sáng tạo trong hương vị, chân thành trong phục vụ và bền vững trong mọi hoạt động hướng tới cộng đồng.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-padding">
        <div className="container">
          <ScrollReveal animation="up">
            <div className="section-title">
              <p>Hành Trình</p>
              <h2>Cột Mốc Lịch Sử</h2>
            </div>
          </ScrollReveal>

          <div className="timeline-track">
            {timelineEvents.map((event, i) => (
              <ScrollReveal key={i} animation={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
                <div className="timeline-event-item">
                  <div className="timeline-year-badge">{event.year}</div>
                  <div className="timeline-event-content">
                    <h3>{event.title}</h3>
                    <p>{event.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story Form Feedback */}
      <section className="feedback-section section-padding">
        <div className="container feedback-box">
          <ScrollReveal animation="left">
            <div className="feedback-text-side">
              <h2>Chuyện Riêng Cùng Bông Biêng</h2>
              <p>Bạn có điều gì muốn nhắn nhủ đến Bông Biêng không? Một lời khen, một ý kiến đóng góp hay chỉ đơn giản là chia sẻ câu chuyện của bạn ngày hôm nay bên ly trà.</p>
              <p>Chúng tôi luôn ở đây để lắng nghe từng câu chuyện nhỏ nhất của khách hàng.</p>
              <div className="feedback-quote-box">
                <p>"Trà ngon phải có bạn hiền,<br />Chuyện riêng có Bông lắng nghe."</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="right" delay={150}>
            <div className="feedback-form-side">
              {isSubmitted ? (
                <div className="form-success-state">
                  <div className="success-icon-circle">✓</div>
                  <h3>Cảm ơn bạn đã chia sẻ!</h3>
                  <p>Bông Biêng đã nhận được lời nhắn của bạn và sẽ phản hồi sớm nhất có thể.</p>
                  <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
                    Gửi thêm lời nhắn
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
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
                      <label>Email *</label>
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
                    <label>Chủ đề</label>
                    <select
                      className="form-control"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="feedback">Góp ý chất lượng phục vụ</option>
                      <option value="product">Gợi ý món mới</option>
                      <option value="franchise">Liên hệ hợp tác / Nhượng quyền</option>
                      <option value="other">Tâm sự chuyện nhỏ</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Lời nhắn của bạn *</label>
                    <textarea
                      required
                      rows="4"
                      placeholder="Hãy viết lời nhắn của bạn ở đây..."
                      className="form-control"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-full btn-send-feedback">
                    Gửi Lời Nhắn <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        /* Header Banner styles */
        .page-header-banner {
          background-color: var(--color-accent-gold-light);
          padding: 60px 0;
          text-align: center;
          border-bottom: 1px solid var(--color-bg-tertiary);
        }

        .page-header-pre {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-accent-gold);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .page-header-title {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          color: var(--color-text-primary);
        }

        /* Philosophy styles */
        .philosophy-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .philo-title {
          font-size: 2.2rem;
          margin-bottom: 24px;
        }

        .philo-p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          line-height: 1.7;
        }

        .font-serif-italic {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--color-primary);
          border-left: 2px solid var(--color-accent-gold);
          padding-left: 16px;
          margin: 24px 0 !important;
        }

        .philo-circle-graphic {
          position: relative;
          width: 280px;
          height: 280px;
          border: 1px dashed var(--color-accent-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .circle-inner-brand {
          width: 220px;
          height: 220px;
          background-color: var(--color-bg-secondary);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-medium);
          border: 1px solid rgba(85, 111, 82, 0.05);
        }

        .circle-brand-name {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .circle-brand-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-accent-gold);
          margin-top: 4px;
        }

        .flower-emoji-float, .leaf-emoji-float, .heart-emoji-float {
          position: absolute;
          font-size: 2rem;
          animation: float 4s ease-in-out infinite;
        }

        .flower-emoji-float { top: 10px; left: 10px; animation-delay: 0.5s; }
        .leaf-emoji-float { bottom: 20px; right: 10px; animation-delay: 1.5s; }
        .heart-emoji-float { top: 40%; right: -20px; animation-delay: 2.5s; }

        /* Core Values styles */
        .core-values-section {
          background-color: var(--color-bg-secondary);
        }

        .values-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 900px) {
          .values-cards-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .value-card {
          background-color: var(--color-bg-primary);
          padding: 32px;
          border-radius: var(--border-radius-md);
          border-top: 4px solid var(--color-accent-gold);
          box-shadow: var(--shadow-subtle);
        }

        .value-icon-box {
          width: 50px;
          height: 50px;
          background-color: var(--color-accent-gold-light);
          border-radius: var(--border-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .value-card h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }

        .value-card p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Timeline styles */
        .timeline-track {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 40px;
          border-left: 2px dashed var(--color-bg-tertiary);
        }

        .timeline-event-item {
          position: relative;
          margin-bottom: 48px;
        }

        .timeline-event-item:last-child {
          margin-bottom: 0;
        }

        .timeline-year-badge {
          position: absolute;
          left: -71px;
          top: 0;
          background-color: var(--color-primary);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          border: 3px solid var(--color-bg-primary);
          box-shadow: var(--shadow-subtle);
        }

        .timeline-event-content {
          background-color: var(--color-bg-secondary);
          padding: 24px 30px;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(85, 111, 82, 0.03);
        }

        .timeline-event-content h3 {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: var(--color-text-primary);
        }

        .timeline-event-content p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Feedback/Form styles */
        .feedback-box {
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-bg-tertiary);
          box-shadow: var(--shadow-medium);
          padding: 60px;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
        }

        @media (max-width: 900px) {
          .feedback-box {
            grid-template-columns: 1fr;
            padding: 32px 24px;
            gap: 40px;
          }
        }

        .feedback-text-side h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .feedback-text-side p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .feedback-quote-box {
          margin-top: 32px;
          padding: 20px;
          border: 1px dashed var(--color-accent-gold);
          border-radius: var(--border-radius-md);
          background-color: var(--color-accent-gold-light);
          text-align: center;
        }

        .feedback-quote-box p {
          font-family: var(--font-serif);
          font-style: italic;
          font-weight: 500;
          color: var(--color-primary);
          margin-bottom: 0;
          font-size: 1.05rem;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .form-group-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .btn-send-feedback {
          font-weight: 700;
        }

        /* Success state styles */
        .form-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 0;
        }

        .success-icon-circle {
          width: 50px;
          height: 50px;
          background-color: var(--color-primary);
          color: white;
          font-size: 1.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 10px rgba(85, 111, 82, 0.2);
        }

        .form-success-state h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .form-success-state p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }
      `}</style>
    </div>
  );
}
