import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getTranslation } from "../data/translations";

import moneyIcon from "../assets/images/moneyIcon.png";
import cokeImg from "../assets/images/coke.png";

export default function InsightsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("TODAY");
  const t = getTranslation();
  const [data, setData] = useState({
    totalRevenue: 0,
    netProfit: 0,
    topProducts: [],
    chartData: []
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetch(`${API_URL}/api/insights?timeframe=${activeTab}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(console.error);
  }, [activeTab]);

  const resolveProductImage = (imageSrc, fallbackText) => {
    if (!imageSrc) return cokeImg; // Use cokeImg as ultimate fallback
    if (imageSrc.startsWith("/src/assets/")) {
      return new URL(".." + imageSrc.substring(4), import.meta.url).href;
    }
    return imageSrc;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .insights-page-wrapper {
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

        /* Scrollable block core body view */
        .insights-scroll-body {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 64px 20px 24px 20px;
        }
        .insights-scroll-body::-webkit-scrollbar { display: none; }

        /* ── Status Bar ── */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 0;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }
        .status-bar svg { fill: #1a1a1a; stroke: #1a1a1a; }
        .status-bar svg rect { fill: #1a1a1a; }
        .status-bar svg path { fill: #1a1a1a; }

        .insights-title {
          font-size: 24px;
          font-weight: 800;
          color: #4A2603;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          text-align: left;
        }

        /* ── Premium Navigation Segment Tabs ── */
        .tabs-segmented-control {
          display: flex;
          background: #EAEAEA;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
        }

        .segment-tab-btn {
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          color: #666666;
          font-size: 12.5px;
          font-weight: 700;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .segment-tab-btn.active {
          background: #ffffff;
          color: #EA6113;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }

        /* ── Analytics Graphic Data Block ── */
        .graph-card-wrapper {
          background: #ffffff;
          border-radius: 20px;
          padding: 16px;
          border: 1px solid #EAEAEA;
          margin-bottom: 16px;
        }

        .graph-meta-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          text-align: left;
        }

        .graph-eyebrow {
          font-size: 11px;
          font-weight: 800;
          color: #A3A3A3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .graph-headline-value {
          font-size: 32px;
          font-weight: 800;
          color: #4A2603;
          line-height: 1.1;
          margin-top: 2px;
        }

        .graph-stat-pill {
          background: #FFF0E6;
          color: #EA6113;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .chart-visual-render {
          width: 100%;
          height: 200px;
          margin-top: 10px;
        }

        /* ── Revenue Metric Block rows ── */
        .insights-metric-row-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 16px;
          border: 1px solid #EAEAEA;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .metric-icon-avatar {
          width: 48px;
          height: 48px;
          background: #FFF8EE;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .metric-icon-avatar img { width: 24px; height: 24px; object-fit: contain; }

        .metric-content-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .metric-label-title { font-size: 12px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.5px; }
        .metric-total-amount { font-size: 22px; font-weight: 800; color: #4A2603; margin-top: 1px; }

        /* ── Product Performance List ── */
        .performance-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .performance-title { font-size: 15px; font-weight: 800; color: #4A2603; text-transform: uppercase; letter-spacing: 0.5px; }
        .performance-view-all-link { font-size: 13px; font-weight: 700; color: #EA6113; cursor: pointer; text-decoration: none; }

        .products-card-list-stack {
          background: #ffffff;
          border-radius: 20px;
          padding: 4px 16px;
          border: 1px solid #EAEAEA;
          display: flex;
          flex-direction: column;
        }

        .product-performance-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #F3F4F6;
        }
        .product-performance-item:last-child { border-bottom: none; }

        .product-thumbnail-frame {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #F8F9FA;
          object-fit: contain;
          flex-shrink: 0;
        }

        .product-meta-desc {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 1px;
        }
        .product-item-title { font-size: 14.5px; font-weight: 800; color: #1a1a1a; }
        .product-item-category { font-size: 11.5px; font-weight: 600; color: #888888; text-transform: uppercase; }
        
        .product-revenue-output {
          font-size: 15px;
          font-weight: 800;
          color: #4A2603;
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

      <div className="insights-page-wrapper">
        <div className="phone-shell">

          {/* Status bar */}
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" />
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" fillOpacity="0.4"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" />
                <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z" />
                <circle cx="7.5" cy="10" r="2" />
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" strokeOpacity="0.5"/>
                <rect x="2" y="2" width="16" height="8" rx="2" />
                <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fillOpacity="0.5"/>
              </svg>
            </div>
          </div>

          <div className="insights-scroll-body">
            <h2 className="insights-title">{t.insights}</h2>

            {/* Timed Segment Controls Tabs */}
            <div className="tabs-segmented-control">
              {["TODAY", "WEEK", "MONTH"].map((tab) => {
                const tabLabels = { TODAY: t.tabToday, WEEK: t.tabWeek, MONTH: t.tabMonth };
                return (
                  <button 
                    key={tab} 
                    className={`segment-tab-btn ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Core Revenue Analytical Vector Chart */}
            <div className="graph-card-wrapper">
              <div className="graph-meta-header">
                <div>
                  <div className="graph-eyebrow">{t.totalRevenueGenerated}</div>
                  <div className="graph-headline-value">₱{data.totalRevenue.toFixed(2)}</div>
                </div>
                <div className="graph-stat-pill">+--%</div>
              </div>
              <div className="chart-visual-render">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chartData}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} />
                    <Tooltip cursor={{ stroke: '#EAEAEA', strokeWidth: 2 }} formatter={(val) => [`₱${val.toFixed(2)}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#EA6113" strokeWidth={3} dot={{ r: 4, fill: "#EA6113", strokeWidth: 2, stroke: "#FFF" }} activeDot={{ r: 6, fill: "#EA6113", stroke: "#FFF", strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profit Card Layer row info */}
            <div className="insights-metric-row-card">
              <div className="metric-icon-avatar">
                <img src={moneyIcon} alt="currency peso tracking icon" />
              </div>
              <div className="metric-content-details">
                <span className="metric-label-title">{t.calculatedNetProfit}</span>
                <span className="metric-total-amount">₱{data.netProfit.toFixed(2)}</span>
              </div>
            </div>

            {/* Product Performance Section */}
            <div className="performance-section-header">
              <h3 className="performance-title">{t.productPerformance}</h3>
              <span 
                className="performance-view-all-link"
                onClick={() => onNavigate && onNavigate("top-selling")}
              >
                {t.viewRankedList}
              </span>
            </div>

            {/* Top performing product item cards */}
            <div className="products-card-list-stack">
              {data.topProducts.length === 0 ? (
                <div style={{ padding: 16, fontSize: 14, color: "#666" }}>{t.noDataAvailable}</div>
              ) : (
                data.topProducts.map((product, idx) => (
                  <div className="product-performance-item" key={idx}>
                    <img src={resolveProductImage(product.image, product.name)} alt={product.name} className="product-thumbnail-frame" />
                    <div className="product-meta-desc">
                      <span className="product-item-title">{product.name}</span>
                      <span className="product-item-category">{product.category}</span>
                    </div>
                    <span className="product-revenue-output">₱{product.revenue.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div style={{ height: 100 }} />
          </div>

          {/* Completely consistent navigation bar integration */}
          <BottomNav onNavigate={onNavigate} />

          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}