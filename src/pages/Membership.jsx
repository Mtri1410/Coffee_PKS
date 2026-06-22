import React, { useState } from 'react';
import { Gift, Award, Star, TrendingUp, HelpCircle } from 'lucide-react';

export default function Membership() {
  const [spending, setSpending] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const amount = parseFloat(spending);
    if (isNaN(amount) || amount <= 0) {
      alert('Vui lòng nhập số tiền chi tiêu hợp lệ!');
      return;
    }

    const points = Math.floor(amount / 10000); // 10,000đ = 1 point
    let tier = 'Thành viên Mới';
    let discount = '0%';
    let benefits = [
      'Tích lũy 1% giá trị đơn hàng quy đổi thành điểm thưởng.',
      'Nhận tin tức ưu đãi và mã giảm giá sớm nhất qua Zalo OA.'
    ];

    if (points >= 150) { // VIP
      tier = 'Thành viên VIP (Hạng Sen Vàng)';
      discount = '10%';
      benefits = [
        'Giảm giá trực tiếp 10% cho mọi đơn hàng tại quầy và online.',
        'Tặng 1 ly trà sữa signature miễn phí trong ngày sinh nhật kèm bánh ngọt.',
        'Ưu tiên đặt chỗ và trải nghiệm thử các dòng trà mới ra mắt miễn phí.',
        'Nhận quà tặng lưu niệm cao cấp Bông Biêng (Ly giữ nhiệt sứ) dịp cuối năm.'
      ];
    } else if (points >= 50) { // Thân Thiết
      tier = 'Thành viên Thân Thiết (Hạng Nhài Bạc)';
      discount = '5%';
      benefits = [
        'Giảm giá trực tiếp 5% cho mọi đơn hàng.',
        'Tặng 1 ly trà sữa signature miễn phí trong ngày sinh nhật.',
        'X2 điểm thưởng cho toàn bộ đơn đặt hàng trong tháng sinh nhật.'
      ];
    }

    setCalcResult({
      spending: amount,
      points,
      tier,
      discount,
      benefits
    });
  };

  const tiers = [
    {
      name: "Thành viên Mới",
      condition: "Đăng ký tài khoản (Dưới 50 điểm)",
      discount: "Tích điểm 1%",
      gift: "Mã giảm giá 10% khi đăng ký thành công Zalo OA.",
      icon: <HelpCircle size={20} className="tier-icon-gray" />
    },
    {
      name: "Thân Thiết (Nhài Bạc)",
      condition: "Tích lũy từ 50 - 149 điểm (Chi tiêu từ 500.000đ)",
      discount: "Giảm trực tiếp 5%",
      gift: "1 Ly nước signature sinh nhật, X2 điểm thưởng tháng sinh nhật.",
      icon: <Award size={20} className="tier-icon-silver" />
    },
    {
      name: "VIP (Sen Vàng)",
      condition: "Tích lũy từ 150 điểm trở lên (Chi tiêu từ 1.500.000đ)",
      discount: "Giảm trực tiếp 10%",
      gift: "Ly nước + Bánh sinh nhật, thử món mới miễn phí, quà tặng tri ân cuối năm.",
      icon: <Star size={20} className="tier-icon-gold" />
    }
  ];

  return (
    <div className="page-wrapper membership-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Đặc Quyền Thành Viên</p>
          <h1 className="page-header-title">Chính Sách Thành Viên</h1>
        </div>
      </section>

      {/* Point Rules Intro */}
      <section className="membership-intro section-padding">
        <div className="container intro-grid">
          <div className="intro-text-col">
            <h2>Đăng ký thành viên - Nhận ngàn ưu đãi</h2>
            <p>Tại Bông Biêng, chúng tôi trân trọng mỗi sự ủng hộ từ bạn. Chương trình thành viên Bông Biêng Zalo OA được thiết kế để mang lại nhiều đặc quyền và món quà thiết thực nhất cho bạn trên mỗi hành trình thưởng trà.</p>
            <div className="points-rule-box">
              <TrendingUp size={24} color="#C29F68" />
              <div>
                <h4>Quy tắc tích điểm cực dễ</h4>
                <p>Mỗi <strong>10.000đ</strong> chi tiêu mua hàng trực tiếp hoặc online tương ứng với <strong>1 điểm tích lũy</strong>.</p>
              </div>
            </div>
          </div>
          <div className="intro-cards-col">
            <div className="loyalty-badge-card panel-glass">
              <Gift size={32} color="#C29F68" />
              <h3>Quà tặng Sinh Nhật</h3>
              <p>Món quà ngọt ngào thay lời chúc mừng gửi tới bạn trong ngày đặc biệt.</p>
            </div>
            <div className="loyalty-badge-card panel-glass">
              <Star size={32} color="#C29F68" />
              <h3>Ưu Đãi Giảm Giá</h3>
              <p>Hưởng mức chiết khấu trực tiếp lên tới 10% trên tổng giá trị hóa đơn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ranks Table Section */}
      <section className="membership-table-section section-padding">
        <div className="container">
          <div className="section-title">
            <p>Bảng Xếp Hạng</p>
            <h2>Cấp Bậc & Quyền Lợi</h2>
          </div>

          <div className="table-responsive">
            <table className="ranks-table">
              <thead>
                <tr>
                  <th>Cấp bậc</th>
                  <th>Điều kiện đạt hạng</th>
                  <th>Mức giảm giá</th>
                  <th>Quà tặng đặc quyền</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, i) => (
                  <tr key={i} className={tier.name.includes("VIP") ? "row-highlight-gold" : ""}>
                    <td className="cell-tier-name">
                      {tier.icon}
                      <span>{tier.name}</span>
                    </td>
                    <td>{tier.condition}</td>
                    <td className="cell-discount">{tier.discount}</td>
                    <td>{tier.gift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Points Calculator Interactive */}
      <section className="calculator-section section-padding">
        <div className="container calculator-grid-box">
          <div className="calculator-form-side">
            <h2>Ước Tính Hạng Thành Viên</h2>
            <p>Nhập số tiền bạn dự kiến chi tiêu tại Bông Biêng để tính toán số điểm tích lũy và kiểm tra cấp bậc cùng các đặc quyền tương ứng bạn sẽ nhận được.</p>
            
            <form onSubmit={handleCalculate} className="calc-form">
              <div className="form-group">
                <label>Nhập số tiền chi tiêu (VNĐ) *</label>
                <input
                  type="number"
                  required
                  min="10000"
                  step="10000"
                  placeholder="Ví dụ: 500000"
                  className="form-control"
                  value={spending}
                  onChange={(e) => setSpending(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Tính toán ngay
              </button>
            </form>
          </div>

          <div className="calculator-result-side">
            {calcResult ? (
              <div className="result-display-panel panel-glass">
                <div className="result-badge-header">
                  <span className="result-tier-badge">{calcResult.tier}</span>
                </div>
                <div className="result-stats-row">
                  <div className="result-stat-box">
                    <span>Số điểm tích lũy</span>
                    <strong>{calcResult.points}</strong>
                  </div>
                  <div className="result-stat-box">
                    <span>Chiết khấu trực tiếp</span>
                    <strong className="primary-color-text">{calcResult.discount}</strong>
                  </div>
                </div>
                <div className="result-benefits-box">
                  <h4>Quyền lợi của hạng này:</h4>
                  <ul>
                    {calcResult.benefits.map((b, i) => (
                      <li key={i}>✓ {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="result-empty-panel">
                <HelpCircle size={48} className="empty-calc-icon" />
                <p>Hãy nhập số tiền bên trái để ước tính thứ hạng của bạn nhé!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        /* Intro grid styles */
        .intro-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .intro-text-col h2 {
          font-size: 2.2rem;
          margin-bottom: 20px;
        }

        .intro-text-col p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .points-rule-box {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 20px;
          background-color: var(--color-accent-gold-light);
          border-radius: var(--border-radius-md);
          border: 1px solid rgba(194, 159, 104, 0.2);
        }

        .points-rule-box h4 {
          font-size: 1rem;
          color: var(--color-text-primary);
          margin-bottom: 4px;
        }

        .points-rule-box p {
          margin-bottom: 0;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .intro-cards-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .loyalty-badge-card {
          padding: 24px;
          border-radius: var(--border-radius-md);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loyalty-badge-card h3 {
          font-size: 1.15rem;
        }

        .loyalty-badge-card p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* Table styles */
        .membership-table-section {
          background-color: var(--color-bg-secondary);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .ranks-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          background-color: var(--color-bg-primary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-subtle);
          font-size: 0.9rem;
        }

        .ranks-table th {
          background-color: var(--color-primary);
          color: white;
          font-weight: 600;
          padding: 16px 20px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ranks-table td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--color-bg-tertiary);
          color: var(--color-text-secondary);
        }

        .ranks-table tr:last-child td {
          border-bottom: none;
        }

        .row-highlight-gold {
          background-color: var(--color-accent-gold-light);
        }

        .row-highlight-gold td {
          color: var(--color-text-primary);
        }

        .cell-tier-name {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          color: var(--color-text-primary) !important;
        }

        .tier-icon-gray { color: #8c8c8c; }
        .tier-icon-silver { color: #a0a0a0; }
        .tier-icon-gold { color: var(--color-accent-gold); }

        .cell-discount {
          font-weight: 700;
          color: var(--color-primary) !important;
        }

        /* Calculator section styles */
        .calculator-grid-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          background-color: var(--color-bg-secondary);
          padding: 60px;
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--color-bg-tertiary);
          box-shadow: var(--shadow-medium);
        }

        @media (max-width: 900px) {
          .calculator-grid-box {
            grid-template-columns: 1fr;
            padding: 32px 20px;
            gap: 40px;
          }
        }

        .calculator-form-side h2 {
          font-size: 2rem;
          margin-bottom: 16px;
        }

        .calculator-form-side p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .calculator-result-side {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-display-panel {
          width: 100%;
          padding: 32px;
          border-radius: var(--border-radius-md);
          border: 1.5px solid var(--color-accent-gold);
          animation: fadeIn 0.4s ease;
        }

        .result-badge-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .result-tier-badge {
          background-color: var(--color-primary);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 20px;
          letter-spacing: 0.5px;
          display: inline-block;
          box-shadow: 0 4px 10px rgba(85, 111, 82, 0.15);
        }

        .result-stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .result-stat-box {
          background-color: var(--color-bg-primary);
          padding: 16px;
          border-radius: var(--border-radius-sm);
          text-align: center;
          border: 1px solid rgba(85, 111, 82, 0.03);
        }

        .result-stat-box span {
          display: block;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .result-stat-box strong {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
        }

        .result-benefits-box h4 {
          font-size: 0.9rem;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          border-bottom: 1px dashed var(--color-bg-tertiary);
          padding-bottom: 6px;
        }

        .result-benefits-box ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .result-benefits-box li {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .result-empty-panel {
          text-align: center;
          color: var(--color-text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 320px;
        }

        .empty-calc-icon {
          color: var(--color-bg-tertiary);
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
