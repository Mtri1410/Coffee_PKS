import React, { useState, useMemo } from 'react';
import { Search, Calendar, User, ArrowRight, X } from 'lucide-react';

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [activeArticle, setActiveArticle] = useState(null);

  const tags = [
    { id: 'all', name: 'Tất cả' },
    { id: 'promo', name: 'Khuyến mãi' },
    { id: 'menu', name: 'Món mới' },
    { id: 'story', name: 'Thương hiệu' }
  ];

  const articles = [
    {
      id: 1,
      tag: 'promo',
      tagName: 'Khuyến mãi',
      date: '15 Tháng 6, 2026',
      author: 'Admin GenX PKS',
      title: 'GenX PKS Khai Trương Cửa Hàng Thứ 6 Tại Bàu Cát',
      desc: 'Chào đón thành viên mới tại 68 Bàu Cát, Tân Bình với chương trình Mua 1 Tặng 1 toàn bộ menu trong tuần lễ vàng khai trương từ ngày 15/06 đến ngày 22/06/2026.',
      content: 'GenX PKS vô cùng phấn khởi thông báo sự ra mắt của cửa hàng thứ 6 tại TP. HCM, tọa lạc tại số 68 Bàu Cát, Phường 14, Quận Tân Bình. Để tri ân sự tin yêu của quý khách, chúng tôi tổ chức chương trình QUÀ TẶNG KHAI TRƯƠNG lớn nhất năm: \n\n1. Mua 1 ly trà tặng 1 ly nước bất kỳ trong menu.\n2. Tặng Voucher 20% cho hóa đơn tiếp theo khi đăng ký Zalo OA thành viên mới.\n\nKhông gian rộng rãi với hơn 100 chỗ ngồi ngập tràn cây xanh đang sẵn sàng phục vụ các bạn học tập, làm việc và tụ tập bạn bè. Ghé GenX PKS Bàu Cát ngay hôm nay nhé!'
    },
    {
      id: 2,
      tag: 'menu',
      tagName: 'Món mới',
      date: '01 Tháng 6, 2026',
      author: 'R&D Team',
      title: 'Ra Mắt Dòng Sản Phẩm Mới: Trà Sữa Kem Dẻ Cười Độc Đáo',
      desc: 'Sự sáng tạo đột phá từ bộ phận nghiên cứu của GenX PKS: Kết hợp trà sữa nhài tươi truyền thống cùng lớp kem dẻ cười (Pistachio cream) béo bùi và hạt dẻ cười xay nhuyễn.',
      content: 'Bộ đôi siêu phẩm mới vừa gia nhập menu nhà GenX bao gồm: "Thanh Nhài Kem Dẻ Cười" và "Nhài Dừa Kem Dẻ Cười". \n\nLấy cảm hứng từ hạt dẻ cười Pistachio - nữ hoàng của các loại hạt dinh dưỡng, chúng tôi đã tạo nên lớp kem dẻ cười độc bản có màu xanh ngọc bích tự nhiên, hương thơm ngậy béo đặc trưng cùng vị bùi dịu thanh nhẹ. Khi thưởng thức, bạn sẽ cảm nhận lớp kem béo mượt, hạt dẻ cười giòn giòn nhai vui miệng trên nền cốt trà sữa nhài tươi nguyên lá thơm lừng. \n\nSản phẩm hiện đã có mặt trên toàn hệ thống cửa hàng và các ứng dụng đặt hàng online.'
    },
    {
      id: 3,
      tag: 'promo',
      tagName: 'Khuyến mãi',
      date: '01 Tháng 6, 2026',
      author: 'Marketing Team',
      title: 'Mừng Tết Thiếu Nhi 1/6 - Free Topping Trân Châu Trắng',
      desc: 'Tặng ngay 1 phần topping trân châu trắng dẻo giòn cho tất cả khách hàng nhí và gia đình khi ghé mua trực tiếp tại các cửa hàng GenX PKS trong ngày 1/6.',
      content: 'Nhân ngày Quốc tế Thiếu nhi, GenX PKS gửi lời chúc tốt đẹp nhất tới toàn bộ các em nhỏ. \n\nTrong ngày 01/06/2026, mỗi đơn hàng mua trực tiếp tại quầy có trẻ em đi cùng sẽ được TẶNG MIỄN PHÍ 1 phần topping trân châu trắng ngọc trai dẻo giòn thơm ngọt. Chương trình áp dụng đồng thời với tích điểm thành viên Zalo OA. Hãy để GenX PKS đồng hành cùng gia đình bạn trong ngày hội của bé!'
    },
    {
      id: 4,
      tag: 'story',
      tagName: 'Thương hiệu',
      date: '25 Tháng 5, 2026',
      author: 'Founder GenX PKS',
      title: 'Câu Chuyện Phía Sau Tên Gọi "GenX PKS" đầy mơ mộng',
      desc: 'GenX PKS không đơn thuần là một cái tên vui tai, đó là triết lý sống và ước mơ mang sự tĩnh lặng hoa cỏ Á Đông vào từng ly trà sữa gửi tới khách hàng.',
      content: '"GenX" đại diện cho sự năng động, hiện đại và kết nối thế hệ. "PKS" là viết tắt của sự chuẩn mực, chất lượng và dịch vụ tận tâm. \n\nChúng tôi đặt tên thương hiệu là GenX PKS với mong muốn mỗi ly trà không chỉ giải khát, mà còn là người bạn đồng hành kéo bạn ra khỏi những xô bồ, ồn ã của đời sống thường nhật để tận hưởng một khoảng lặng dịu êm. Cảm ơn bạn đã luôn đồng hành cùng câu chuyện của GenX PKS!'
    },
    {
      id: 5,
      tag: 'story',
      tagName: 'Thương hiệu',
      date: '10 Tháng 5, 2026',
      author: 'QC Team',
      title: 'Cam Kết Nguyên Liệu Trà Sạch Chuẩn Organic Cao Nguyên',
      desc: 'Tìm hiểu quy trình canh tác trà nguyên lá không hóa chất tại Bảo Lộc - Lâm Đồng, nguồn cung cấp cốt trà sữa chất lượng cao cho toàn hệ thống GenX PKS.',
      content: 'Để giữ trọn vị chát nhẹ và hậu vị ngọt sâu nguyên bản của lá trà, GenX PKS ký kết hợp tác độc quyền với các nông hộ đạt chuẩn VietGAP tại Bảo Lộc. \n\nQuy trình thu hoạch diễn ra nghiêm ngặt: chỉ thu hái búp trà 1 tôm 2 lá vào sáng sớm khi sương còn chưa tan, trải qua các công đoạn héo, vò, lên men tự nhiên dưới sự giám sát của các chuyên gia trà lâu năm. Không chất bảo quản, không chất tạo hương liệu nhân tạo - đó là lời hứa sắt đá về chất lượng sản phẩm sạch GenX PKS gửi tới sức khỏe người tiêu dùng.'
    }
  ];

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (selectedTag !== 'all') {
      result = result.filter(a => a.tag === selectedTag);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.desc.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedTag, searchQuery]);

  return (
    <div className="page-wrapper news-page">
      {/* Page Header */}
      <section className="page-header-banner">
        <div className="container">
          <p className="page-header-pre">Cập Nhật Tin Tức</p>
          <h1 className="page-header-title">Bản Tin GenX PKS</h1>
        </div>
      </section>

      {/* Toolbar Filters */}
      <section className="catalog-toolbar-section">
        <div className="container toolbar-grid-flex">
          {/* Tags list */}
          <div className="news-tags-flex">
            {tags.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTag(t.id)}
                className={`news-tag-btn ${selectedTag === t.id ? 'active' : ''}`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="search-bar-input-box">
            <Search className="search-box-icon" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-list-section section-padding">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="catalog-empty-results">
              <h3>Không tìm thấy bài viết nào</h3>
              <p>Bạn vui lòng tìm kiếm với từ khóa khác nhé.</p>
            </div>
          ) : (
            <div className="blog-posts-grid">
              {filteredArticles.map((art) => (
                <article key={art.id} className="blog-card-item" onClick={() => setActiveArticle(art)}>
                  <div className="blog-card-img-placeholder">
                    <span>📰</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{art.tagName}</span>
                      <div className="blog-card-date-box">
                        <Calendar size={12} />
                        <span>{art.date}</span>
                      </div>
                    </div>
                    <h3 className="blog-card-title">{art.title}</h3>
                    <p className="blog-card-desc">{art.desc}</p>
                    <button className="blog-card-link-btn">
                      Đọc chi tiết <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="customize-modal-backdrop" onClick={() => setActiveArticle(null)}>
          <div className="customize-modal-dialog article-detail-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-text">
                <span className="detail-tag-label">{activeArticle.tagName}</span>
                <h3>{activeArticle.title}</h3>
              </div>
              <button onClick={() => setActiveArticle(null)} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-scroll-body">
              <div className="article-meta-info-row">
                <div className="meta-info-item">
                  <Calendar size={14} />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="meta-info-item">
                  <User size={14} />
                  <span>Viết bởi: {activeArticle.author}</span>
                </div>
              </div>

              <div className="article-detailed-content">
                {activeArticle.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .news-tags-flex {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .news-tag-btn {
          padding: 8px 18px;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--border-radius-sm);
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-bg-tertiary);
          color: var(--color-text-secondary);
        }

        .news-tag-btn:hover {
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        .news-tag-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        /* Blog grid layout styling */
        .blog-posts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .blog-posts-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .blog-posts-grid {
            grid-template-columns: 1fr;
          }
        }

        .blog-card-item {
          background-color: var(--color-bg-secondary);
          border-radius: var(--border-radius-md);
          overflow: hidden;
          border: 1px solid rgba(85, 111, 82, 0.05);
          box-shadow: var(--shadow-subtle);
          cursor: pointer;
          transition: var(--transition-smooth);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .blog-card-item:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-medium);
          border-color: var(--color-accent-gold);
        }

        .blog-card-img-placeholder {
          height: 180px;
          background: linear-gradient(135deg, var(--color-accent-gold-light) 0%, var(--color-bg-tertiary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .blog-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .blog-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .blog-card-category {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-accent-gold);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .blog-card-date-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: var(--color-text-secondary);
        }

        .blog-card-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-text-primary);
          margin-bottom: 8px;
          line-height: 1.4;
          font-weight: 700;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-desc {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .blog-card-link-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-top: auto;
        }

        .blog-card-item:hover .blog-card-link-btn {
          color: var(--color-primary-hover);
          gap: 10px;
        }

        /* Detail Modal dialog overrides */
        .article-detail-dialog {
          width: 700px;
          max-height: 85%;
        }

        .detail-tag-label {
          background-color: var(--color-accent-gold-light);
          color: var(--color-accent-gold);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 6px;
        }

        .modal-scroll-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 24px;
          background-color: var(--color-bg-secondary);
        }

        .article-meta-info-row {
          display: flex;
          gap: 20px;
          border-bottom: 1px solid var(--color-bg-primary);
          padding-bottom: 16px;
          margin-bottom: 24px;
          color: var(--color-text-secondary);
          font-size: 0.85rem;
        }

        .meta-info-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .article-detailed-content p {
          font-size: 0.95rem;
          color: var(--color-text-primary);
          line-height: 1.7;
          margin-bottom: 18px;
          white-space: pre-line;
        }
      `}</style>
    </div>
  );
}
