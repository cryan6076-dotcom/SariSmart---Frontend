import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const TODAY_TRANSACTIONS = [
  {
    id: 3,
    number: "Transaction No. 3",
    time: "12:35 AM",
    itemsCount: 8,
    total: 155.00,
    itemsList: [
      { name: "Coke Mismo 120 ML", qty: 3, price: 75.00 },
      { name: "Lucky Me Pancit Canton", qty: 3, price: 45.00 },
      { name: "SkyFlakes", qty: 2, price: 35.00 }
    ]
  },
  {
    id: 2,
    number: "Transaction No. 2",
    time: "11:14 AM",
    itemsCount: 4,
    total: 85.00,
    itemsList: [
      { name: "Chippy BBQ", qty: 2, price: 30.00 },
      { name: "C2 Apple 230ml", qty: 2, price: 40.00 }
    ]
  },
  {
    id: 1,
    number: "Transaction No. 1",
    time: "09:20 AM",
    itemsCount: 2,
    total: 50.00,
    itemsList: [
      { name: "Coke Mismo 120 ML", qty: 2, price: 50.00 }
    ]
  }
];

export default function TransactionsPage({ onNavigate }) {
  const navigate = useNavigate();
  const [expandedTx, setExpandedTx] = useState(3); // Defaulting transaction #3 to open

  const handleBack = () => {
    if (onNavigate) onNavigate("home");
    else navigate("/home");
  };

  const toggleExpand = (id) => {
    setExpandedTx(expandedTx === id ? null : id);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .txp-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
          font-family: 'Manrope', sans-serif;
        }

        .txp-shell {
          width: 390px;
          height: 844px;
          background: #ffffff;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Status Bar */
        .txp-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 0;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .txp-status-icons { display: flex; gap: 6px; align-items: center; }

        /* Header */
        .txp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px 14px;
          border-bottom: 1px solid #F1F5F9;
        }
        .txp-back-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px; display: flex; align-items: center; color: #1a1a1a;
        }
        .txp-title { font-size: 20px; font-weight: 800; color: #1a1a1a; }

        /* Scroll Body */
        .txp-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 16px;
          padding-bottom: 100px;
        }
        .txp-scroll::-webkit-scrollbar { display: none; }

        .txp-date-section {
          font-size: 12px;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          margin-top: 4px;
        }

        /* Card Setup */
        .txp-card {
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          background: white;
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .txp-card.active {
          border-color: #E8821A;
        }

        .txp-card-header {
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .txp-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .txp-icon-box {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #FFF5EB;
          display: flex; align-items: center; justify-content: center;
          color: #E8821A;
        }

        .txp-info-block {
          display: flex;
          flex-direction: column;
        }

        .txp-number-text {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .txp-time-text {
          font-size: 13px;
          color: #64748B;
          font-weight: 500;
          margin-top: 1px;
        }

        .txp-header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .txp-price-summary {
          font-size: 16px;
          font-weight: 800;
          color: #1A1A1A;
          text-align: right;
        }

        /* Accordion Drawer Content */
        .txp-drawer {
          background: #FAFAFA;
          border-top: 1px solid #E2E8F0;
          padding: 14px 16px;
        }

        .txp-drawer-title {
          font-size: 11px;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 10px;
        }

        .txp-line-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .txp-line-item:last-child {
          margin-bottom: 0;
        }

        .txp-item-left {
          color: #334155;
          font-weight: 600;
        }
        .txp-qty-pill {
          color: #64748B;
          font-weight: 500;
          margin-left: 6px;
        }
        .txp-item-right {
          color: #1A1A1A;
          font-weight: 700;
        }

        /* Home Indicator footer */
        .txp-home-indicator {
          height: 24px; display: flex; align-items: center; justify-content: center;
          background: white; flex-shrink: 0;
        }
        .txp-home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }
      `}</style>

      <div className="txp-wrapper">
        <div className="txp-shell">

          {/* Status Bar */}
          <div className="txp-status-bar">
            <span>9:41</span>
            <div className="txp-status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/>
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a"/>
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#1a1a1a"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" fillOpacity="0.4"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" fill="#1a1a1a"/>
                <circle cx="7.5" cy="10" r="2" fill="#1a1a1a"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.5"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a1a"/>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="txp-header">
            <button className="txp-back-btn" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
              </svg>
            </button>
            <span className="txp-title">Transactions</span>
          </div>

          {/* List Content */}
          <div className="txp-scroll">
            <div className="txp-date-section">Today</div>

            {TODAY_TRANSACTIONS.map((tx) => {
              const isOpen = expandedTx === tx.id;
              return (
                <div key={tx.id} className={`txp-card ${isOpen ? "active" : ""}`}>
                  <div className="txp-card-header" onClick={() => toggleExpand(tx.id)}>
                    <div className="txp-header-left">
                      <div className="txp-icon-box">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                      <div className="txp-info-block">
                        <span className="txp-number-text">{tx.number}</span>
                        <span className="txp-time-text">{tx.time}</span>
                      </div>
                    </div>
                    
                    <div className="txp-header-right">
                      <span className="txp-price-summary">₱{tx.total.toFixed(2)}</span>
                      <svg 
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {/* Expansion Items Drawer */}
                  {isOpen && (
                    <div className="txp-drawer">
                      <div className="txp-drawer-title">Itemized Items ({tx.itemsCount})</div>
                      {tx.itemsList.map((item, idx) => (
                        <div key={idx} className="txp-line-item">
                          <div className="txp-item-left">
                            {item.name}
                            <span className="txp-qty-pill">x{item.qty}</span>
                          </div>
                          <div className="txp-item-right">₱{item.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <BottomNav />

          <div className="txp-home-indicator">
            <div className="txp-home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}