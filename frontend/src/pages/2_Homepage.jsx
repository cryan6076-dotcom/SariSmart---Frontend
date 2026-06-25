import { useState } from "react";
import BottomNav from "../components/BottomNav";
import FAB from "../components/FAB";
import waveMascot from "../assets/images/wavemascot1.png";
import thumbMascot from "../assets/images/thumbupmascot1.png";

function BarChart() {
  const bars = [0.4, 0.55, 0.5, 0.7, 0.6, 0.85, 1.0];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 54, flexShrink: 0, marginBottom: 4 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 10,
          height: `${h * 100}%`,
          borderRadius: 4,
          background: i === bars.length - 1 ? "#ffffff" : "rgba(255,255,255,0.35)",
        }} />
      ))}
    </div>
  );
}

function TxRow({ label, sub, time }) {
  return (
    <div className="tx-row">
      <div className="tx-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="#1A1A1A" strokeWidth="2" />
          {/* Top arrow pointing left */}
          <path d="M15.5 9.5H8.5M8.5 9.5L11 7M8.5 9.5L11 12" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Bottom arrow pointing right */}
          <path d="M8.5 14.5H15.5M15.5 14.5L13 12M15.5 14.5L13 17" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="tx-info">
        <span className="tx-label">{label}</span>
        <span className="tx-sub">{sub}</span>
      </div>
      <span className="tx-time">{time}</span>
    </div>
  );
}

// FIXED: Destructured onNavigate from props here so the homepage can forward it
export default function HomePage({ onNavigate }) {
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .home-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
          font-family: 'Manrope', sans-serif;
        }

        .phone-shell {
          width: 390px;
          height: 844px;
          background: #F8F9FA;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Scrollable layout area */
        .home-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
        }
        .home-scroll::-webkit-scrollbar { display: none; }

        /* ── Status Bar ── */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 0;
          font-size: 13px;
          font-weight: 700;
          color: white;
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }

        /* ── Header ── */
        .header-card {
          background: #3B1F0E;
          padding: 64px 20px 24px 20px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          position: relative;
        }
        
        .header-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        
        .header-greeting {
          font-size: 26px;
          font-weight: 800;
          color: white;
          line-height: 1.2;
          text-align: left;
        }
        .header-store {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          margin-top: 6px;
          text-align: left;
        }
        .header-mascot {
          width: 100px;
          height: 110px;
          object-fit: contain;
          object-position: bottom;
          flex-shrink: 0;
          margin-bottom: -24px;
        }

        /* ── Main content block grid ── */
        .home-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Today's Sales Card ── */
        .sales-card {
          background: #EA6113;
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          box-shadow: 0 4px 12px rgba(234,97,19,0.15);
        }
        
        .sales-text-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        
        .sales-eyebrow {
          font-size: 11px;
          font-weight: 800;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 4px;
          text-align: left;
        }
        .sales-amount {
          font-size: 40px;
          font-weight: 800;
          color: white;
          line-height: 1;
          letter-spacing: -1px;
          text-align: left;
        }
        .sales-change {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.95);
          text-align: left;
          
        }

        /* ── Stat Rows ── */
        .stat-row {
          display: flex;
          gap: 8px;
        }
        .stat-card {
          flex: 1;
          background: #F88F22;
          border-radius: 14px;
          padding: 12px 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 2px;
          box-shadow: 0 4px 10px rgba(248,143,34,0.15);
          cursor: pointer;
        }
        .stat-label {
          font-size: 10px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: left;
        }
        .stat-value {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          text-align: left;
        }
        .stat-sub {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-align: left;
        }

        /* ── AI Tip Card Left Aligned ── */
        .tip-card {
          background: #FFF8EE;
          border-radius: 20px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid #FFEED9;
        }
        .tip-mascot {
          width: 62px;
          height: 66px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .tip-body { 
          flex: 1; 
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .tip-title {
          font-size: 14px;
          font-weight: 800;
          color: #6A3105;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          margin-bottom: 4px;
          text-align: left;
        }
        .tip-text {
          font-size: 11px;
          font-weight: 600;
          color: #3C3C3C;
          line-height: 1.35;
          text-align: left;
        }
        .tip-bulb { 
          font-size: 34px; 
          line-height: 1;
          flex-shrink: 0; 
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Restock Banner ── */
        .restock-banner {
          background: white;
          border-radius: 20px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
          border: 1px solid #EAEAEA;
          cursor: pointer;
        }
        .restock-icon-wrap {
          width: 56px;
          height: 56px;
          background: #FBF0E9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .restock-body { 
          flex: 1; 
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 2px;
        }
        .restock-eyebrow {
          font-size: 13.5px;
          font-weight: 800;
          color: #4A2603;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          text-align: left;
        }
        .restock-count {
          font-size: 18px;
          font-weight: 800;
          color: #4A2603;
          line-height: 1.1;
          text-align: left;
        }
        .restock-sub {
          font-size: 12px;
          color: #555555;
          font-weight: 600;
          text-align: left;
        }
        .restock-chevron { 
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-right: 4px;
        }

        /* ── Section Divider ── */
        .section-divider {
          height: 1px;
          background: #EBEBEB;
          margin: 4px 16px;
        }

        /* ── Recent Activity Section Style ── */
        .activity-wrap {
          padding: 16px 20px 0;
        }
        .activity-title {
          font-size: 18px;
          font-weight: 800;
          color: #4A2603;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 16px;
          text-align: left;
        }
        .group-label {
          font-size: 12.5px;
          font-weight: 700;
          color: #555555;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin-bottom: 12px;
          margin-top: 18px;
          text-align: left;
        }
        .group-label:first-of-type { margin-top: 0; }

        /* ── Premium Transaction Rows ── */
        .tx-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid #EAEAEA;
        }
        .tx-row:last-child { border-bottom: none; }
        
        .tx-icon {
          width: 52px;
          height: 52px;
          background: #FBF0E9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .tx-info { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          gap: 2px; 
          align-items: flex-start;
          text-align: left;
        }
        .tx-label { 
          font-size: 16px; 
          font-weight: 800; 
          color: #4A2603; 
          text-align: left; 
        }
        .tx-sub { 
          font-size: 12px; 
          font-weight: 600; 
          color: #555555; 
          text-align: left; 
        }
        .tx-time { 
          font-size: 11px; 
          font-weight: 700; 
          color: #333333; 
          flex-shrink: 0; 
          align-self: flex-start;
          margin-top: 4px;
        }

        /* ── Bottom Navigation Active State Overrides ── */
        .phone-shell footer a, 
        .phone-shell nav a {
          color: #334155 !important;
        }
        .phone-shell footer a svg, 
        .phone-shell nav a svg {
          stroke: #334155 !important;
        }

        .phone-shell footer a.active,
        .phone-shell footer a[class*="active"],
        .phone-shell nav a.active,
        .phone-shell nav a[class*="active"] {
          color: #EA6113 !important;
        }
        .phone-shell footer a.active svg,
        .phone-shell footer a[class*="active"] svg,
        .phone-shell nav a.active svg,
        .phone-shell nav a[class*="active"] svg,
        .phone-shell footer a.active svg path,
        .phone-shell footer a[class*="active"] svg path,
        .phone-shell nav a.active svg path,
        .phone-shell nav a[class*="active"] svg path {
          stroke: #EA6113 !important;
        }

        .phone-shell footer a:nth-child(3) svg,
        .phone-shell footer a:nth-child(3) svg path,
        .phone-shell nav a:nth-child(3) svg,
        .phone-shell nav a:nth-child(3) svg path {
          stroke: #ffffff !important;
        }

        /* Home Indicator footer shell */
        .home-indicator {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          flex-shrink: 0;
          z-index: 40;
        }
        .home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }
      `}</style>

      <div className="home-wrapper">
        <div className="phone-shell">

          {/* Status bar */}
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="white"/>
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="white"/>
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="white"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" fill="white" fillOpacity="0.4"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" fill="white"/>
                <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z" fill="white"/>
                <circle cx="7.5" cy="10" r="2" fill="white"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.5"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="white"/>
                <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="white" fillOpacity="0.5"/>
              </svg>
            </div>
          </div>

          <div className="home-scroll">

            {/* Header */}
            <div className="header-card">
              <div className="header-text">
                <div className="header-greeting">Magandang Umaga! 👋</div>
                <div className="header-store">Aling Nena's Store</div>
              </div>
              <img src={waveMascot} alt="mascot" className="header-mascot" />
            </div>

            <div className="home-content">

              {/* Today's Sales */}
              <div className="sales-card">
                <div className="sales-text-container">
                  <div className="sales-eyebrow">Today's Sales</div>
                  <div className="sales-amount">₱1,200</div>
                  <div className="sales-change">
                    <span>↑</span> 12% higher than yesterday
                  </div>
                </div>
                <BarChart />
              </div>

              {/* Stat grid metrics rows */}
              <div className="stat-row">
                <div className="stat-card">
                  <span className="stat-label">Profit</span>
                  <span className="stat-value">₱480</span>
                  <span className="stat-sub">as of today</span>
                </div>
                <div className="stat-card">
                  <span className="stat-label">Transactions</span>
                  <span className="stat-value">67</span>
                  <span className="stat-sub">completed</span>
                </div>
                {/* Optional navigation link to inventory screen */}
                <div className="stat-card" onClick={() => onNavigate && onNavigate('inventory')}>
                  <span className="stat-label">Need Restock</span>
                  <span className="stat-value">22</span>
                  <span className="stat-sub">items low</span>
                </div>
              </div>

              {/* Left Indented AI Tip Card */}
              <div className="tip-card">
                <img src={thumbMascot} alt="mascot" className="tip-mascot" />
                <div className="tip-body">
                  <div className="tip-title">AI TIP</div>
                  <div className="tip-text">Coffee demand increased today. Restock before Wednesday.</div>
                </div>
                <span className="tip-bulb">💡</span>
              </div>

              {/* Big Warning Icon Left Indented Restock Banner */}
              <div className="restock-banner" onClick={() => onNavigate && onNavigate('inventory')}>
                <div className="restock-icon-wrap">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1F1102" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="restock-body">
                  <div className="restock-eyebrow">Need Restock</div>
                  <div className="restock-count">4 Products</div>
                  <div className="restock-sub">View and Restock Soon</div>
                </div>
                <div className="restock-chevron">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A2603" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>

            </div>

            <div className="section-divider" />

            {/* Recent Activity Section */}
            <div className="activity-wrap">
              <div className="activity-title">Recent Activity</div>

              <div className="group-label">Today</div>
              <TxRow label="Transaction No. 3" sub="View and Restock Soon" time="12:35 AM" />
              <TxRow label="Transaction No. 2" sub="View and Restock Soon" time="11:14 AM" />
              <TxRow label="Transaction No. 1" sub="View and Restock Soon" time="09:20 AM" />

              <div className="group-label">Yesterday</div>
              <TxRow label="Transaction No. 42" sub="View and Restock Soon" time="06:45 PM" />
            </div>

            <div style={{ height: 110 }} />
          </div>

          {/* FAB — anchors to .phone-shell (position:relative), floats above BottomNav */}
          <FAB onPress={() => onNavigate('add-transaction')} />

          {/* FIXED: Passed down the onNavigate function to BottomNav here */}
          <BottomNav onNavigate={onNavigate} />

          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}