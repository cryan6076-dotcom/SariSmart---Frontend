import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const RANKED_DATA = {
  week: [
    { rank: 1, name: "Coke Mismo 120 ML", price: "₱1,250.00", sales: "50 units sold", growth: "+12%" },
    { rank: 2, name: "Lucky Me Pancit Canton", price: "₱900.00", sales: "60 units sold", growth: "+8%" },
    { rank: 3, name: "SkyFlakes", price: "₱500.00", sales: "20 units sold", growth: "+3%" },
    { rank: 4, name: "Chippy BBQ", price: "₱300.00", sales: "20 units sold", growth: "0%" },
    { rank: 5, name: "C2 Apple 230ml", price: "₱200.00", sales: "10 units sold", growth: "-2%" },
  ],
  month: [
    { rank: 1, name: "Coke Mismo 120 ML", price: "₱5,400.00", sales: "216 units sold", growth: "+15%" },
    { rank: 2, name: "Lucky Me Pancit Canton", price: "₱3,850.00", sales: "256 units sold", growth: "+10%" },
    { rank: 3, name: "SkyFlakes", price: "₱2,100.00", sales: "84 units sold", growth: "+5%" },
    { rank: 4, name: "Chippy BBQ", price: "₱1,450.00", sales: "96 units sold", growth: "+2%" },
    { rank: 5, name: "C2 Apple 230ml", price: "₱920.00", sales: "46 units sold", growth: "+1%" },
  ],
  year: [
    { rank: 1, name: "Coke Mismo 120 ML", price: "₱62,400.00", sales: "2,496 units sold", growth: "+22%" },
    { rank: 2, name: "Lucky Me Pancit Canton", price: "₱44,200.00", sales: "2,946 units sold", growth: "+18%" },
    { rank: 3, name: "SkyFlakes", price: "₱22,500.00", sales: "900 units sold", growth: "+11%" },
    { rank: 4, name: "Chippy BBQ", price: "₱16,200.00", sales: "1,080 units sold", growth: "+7%" },
    { rank: 5, name: "C2 Apple 230ml", price: "₱11,400.00", sales: "570 units sold", growth: "+4%" },
  ]
};

export default function TopSellingProductsPage({ onNavigate }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("week"); // 'week' | 'month' | 'year'

  const handleBack = () => {
    if (onNavigate) onNavigate("insights");
    else navigate("/insights");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tspp-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
          font-family: 'Manrope', sans-serif;
        }

        .tspp-shell {
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
        .tspp-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 0;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .tspp-status-icons { display: flex; gap: 6px; align-items: center; }

        /* Header */
        .tspp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px 10px;
        }
        .tspp-back-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px; display: flex; align-items: center; color: #1a1a1a;
        }
        .tspp-title { font-size: 20px; font-weight: 800; color: #1a1a1a; }

        /* Timeframe Selection Tabs */
        .tspp-tabs-container {
          display: flex;
          padding: 4px 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #F1F5F9;
        }
        .tspp-tab {
          flex: 1;
          text-align: center;
          background: none;
          border: none;
          padding: 10px 0;
          font-size: 14px;
          font-weight: 700;
          color: #94A3B8;
          cursor: pointer;
          position: relative;
          font-family: 'Manrope', sans-serif;
        }
        .tspp-tab.active {
          color: #E8821A;
        }
        .tspp-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 20%; right: 20%;
          height: 3px;
          background: #E8821A;
          border-radius: 99px;
        }

        /* Scroll Area */
        .tspp-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 4px 16px 100px;
        }
        .tspp-scroll::-webkit-scrollbar { display: none; }

        /* Ranked Items Cards */
        .tspp-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tspp-item-card {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 16px;
          transition: border-color 0.2s, background 0.2s;
        }
        .tspp-item-card:hover {
          border-color: #E8821A;
          background: #FFFBF7;
        }

        /* Rank Badge */
        .tspp-rank-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 800;
          color: #475569;
          margin-right: 14px;
          flex-shrink: 0;
        }
        /* Highlight Podium Ranks */
        .tspp-item-card:nth-child(1) .tspp-rank-badge { background: #FFEEDC; color: #E8821A; }
        .tspp-item-card:nth-child(2) .tspp-rank-badge { background: #F1F5F9; color: #475569; }
        .tspp-item-card:nth-child(3) .tspp-rank-badge { background: #EFF6FF; color: #1D4ED8; }

        .tspp-details-block {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .tspp-item-name {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 2px;
        }
        .tspp-item-sales {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }

        .tspp-metrics-block {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .tspp-item-revenue {
          font-size: 15px;
          font-weight: 800;
          color: #1A1A1A;
          margin-bottom: 2px;
        }
        .tspp-item-growth {
          font-size: 12px;
          font-weight: 700;
          color: #2E9E5B;
        }
        .tspp-item-growth.negative {
          color: #E84545;
        }

        /* Home Indicator footer */
        .tspp-home-indicator {
          height: 24px; display: flex; align-items: center; justify-content: center;
          background: white; flex-shrink: 0;
        }
        .tspp-home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }
      `}</style>

      <div className="tspp-wrapper">
        <div className="tspp-shell">

          {/* Status Bar */}
          <div className="tspp-status-bar">
            <span>9:41</span>
            <div className="tspp-status-icons">
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
          <div className="tspp-header">
            <button className="tspp-back-btn" onClick={handleBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
              </svg>
            </button>
            <span className="tspp-title">Top Selling Products</span>
          </div>

          {/* Timeframe Toggle Tabs */}
          <div className="tspp-tabs-container">
            <button 
              className={`tspp-tab ${activeTab === "week" ? "active" : ""}`} 
              onClick={() => setActiveTab("week")}
            >
              This Week
            </button>
            <button 
              className={`tspp-tab ${activeTab === "month" ? "active" : ""}`} 
              onClick={() => setActiveTab("month")}
            >
              This Month
            </button>
            <button 
              className={`tspp-tab ${activeTab === "year" ? "active" : ""}`} 
              onClick={() => setActiveTab("year")}
            >
              This Year
            </button>
          </div>

          {/* Ranked List Area */}
          <div className="tspp-scroll">
            <div className="tspp-list">
              {RANKED_DATA[activeTab].map((item) => (
                <div key={item.rank} className="tspp-item-card">
                  <div className="tspp-rank-badge">{item.rank}</div>
                  
                  <div className="tspp-details-block">
                    <span className="tspp-item-name">{item.name}</span>
                    <span className="tspp-item-sales">{item.sales}</span>
                  </div>

                  <div className="tspp-metrics-block">
                    <span className="tspp-item-revenue">{item.price}</span>
                    <span className={`tspp-item-growth ${item.growth.startsWith('-') ? 'negative' : ''}`}>
                      {item.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <BottomNav />

          <div className="tspp-home-indicator">
            <div className="tspp-home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}