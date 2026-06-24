// RestockCard.jsx
// Usage:
// import { RestockCard, RestockSection } from "../components/RestockCard"
//
// <RestockSection count={4} onViewAll={() => {}}>
//   <RestockCard name="Eggs" stock={2} image={eggsImg} onRestock={() => {}} />
//   <RestockCard name="Coffee" stock={5} image={coffeeImg} onRestock={() => {}} />
// </RestockSection>
//
// Or standalone:
// <RestockCard name="Eggs" stock={2} image={eggsImg} onRestock={() => {}} />

// ── Single restock card ──
export function RestockCard({ name = "Product", stock = 0, image = null, onRestock }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');

        .rc-card {
          background: white;
          border-radius: 16px;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          min-width: 140px;
          width: 140px;
          flex-shrink: 0;
          font-family: 'Manrope', sans-serif;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        .rc-img-wrap {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rc-img {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }
        .rc-img-placeholder {
          font-size: 40px;
        }

        .rc-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2px;
        }
        .rc-name {
          font-size: 14px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .rc-stock {
          font-size: 13px;
          font-weight: 600;
          color: #E8821A;
        }

        .rc-btn {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: #E8821A;
          color: white;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          text-align: center;
        }
        .rc-btn:hover { background: #C96B0A; }
        .rc-btn:active { transform: scale(0.96); }
      `}</style>

      <div className="rc-card">
        <div className="rc-img-wrap">
          {image
            ? <img src={image} alt={name} className="rc-img" />
            : <span className="rc-img-placeholder">📦</span>
          }
        </div>
        <div className="rc-info">
          <span className="rc-name">{name}</span>
          <span className="rc-stock">{stock} pcs left</span>
        </div>
        <button className="rc-btn" onClick={onRestock}>Restock</button>
      </div>
    </>
  );
}

// ── Restock section with header + horizontal scroll ──
export function RestockSection({ count = 0, onViewAll, children }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&display=swap');

        .rs-wrap {
          background: #FFF8EE;
          border-radius: 18px;
          padding: 14px 16px 16px;
          font-family: 'Manrope', sans-serif;
          border: 1.5px solid #FFE0B0;
        }

        .rs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .rs-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .rs-title {
          font-size: 13px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .rs-chevron {
          font-size: 18px;
          color: #999;
          cursor: pointer;
          padding: 0 4px;
        }
        .rs-chevron:hover { color: #E8821A; }

        .rs-scroll {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 2px;
        }
        .rs-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="rs-wrap">
        <div className="rs-header">
          <div className="rs-header-left">
            {/* Warning icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L1.5 15h15L9 2Z" stroke="#E8821A" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
              <path d="M9 7.5v4" stroke="#E8821A" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="9" cy="13" r="0.8" fill="#E8821A"/>
            </svg>
            <span className="rs-title">Need Restock ({count})</span>
          </div>
          <span className="rs-chevron" onClick={onViewAll}>›</span>
        </div>

        <div className="rs-scroll">
          {children}
        </div>
      </div>
    </>
  );
}

// Default export for convenience
export default RestockCard;