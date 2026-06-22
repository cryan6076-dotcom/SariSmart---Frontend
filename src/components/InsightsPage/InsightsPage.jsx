import React, { useState } from "react";
import "./InsightsPage.css";

// Navigation Icons
import homeIcon from "../Assets/homeIcon.png";
import invenIcon from "../Assets/invenIcon.png";
import profileIcon from "../Assets/profileIcon.png";
import statsIcon2 from "../Assets/statsIcon2.png";
import whiteSari from "../Assets/transparentSari.png";

// Placeholder Images (Replace these with your actual assets)
import chartPlaceholder from "../Assets/chartPlaceholder.png"; 
import moneyIcon from "../Assets/moneyIcon.png";
import cokeImg from "../Assets/coke.png";
import juiceImg from "../Assets/juice.png";
import pancitImg from "../Assets/pancit.png";

const Insights = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("TODAY");

  return (
    <div className="insights-page">
      <div className="insights-container">
        
        <h2 className="page-title">INSIGHTS</h2>

        {/* Top Tabs */}
        <div className="tabs-container">
          {["TODAY", "WEEK", "MONTH"].map((tab) => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sales Chart Card */}
        <div className="sales-card">
          <p className="card-label">TOTAL SALES</p>
          <h1 className="sales-amount">₱480.00</h1>
          <p className="sales-trend">↑ 12% vs yesterday</p>
          <img className="chart-image" src={chartPlaceholder} alt="Sales Chart" />
          <div className="chart-x-axis">
            <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span>
          </div>
        </div>

        {/* Quick Metrics Row */}
        <div className="metrics-row">
          <div className="metric-box">
            <span className="metric-label">Profit</span>
            <span className="metric-val">₱480</span>
            <span className="metric-sub">as of today</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">Transactions</span>
            <span className="metric-val">67</span>
          </div>
          <div className="metric-box">
            <span className="metric-label">Need Restock</span>
            <span className="metric-val">22</span>
            <span className="metric-sub">items</span>
          </div>
        </div>

        {/* Average Sale Card */}
        <div className="avg-sale-card">
          <div className="avg-text">
            <p className="card-label">AVERAGE SALE</p>
            <h2 className="avg-amount">₱95.00</h2>
            <p className="avg-sub">15% higher than yesterday</p>
          </div>
          <img src={moneyIcon} alt="Money Icon" className="money-icon" />
        </div>

        {/* Top Selling Products List */}
        <div className="top-selling-section">
          <div className="section-header">
            <h3>TOP SELLING PRODUCTS</h3>
            <button className="view-all-btn" onClick={() => onNavigate("product-performance")}>
              View All
            </button>
          </div>

          <div className="product-list">
            <div className="product-item">
              <img src={cokeImg} alt="Coke" className="prod-img" />
              <div className="prod-details">
                <span className="prod-name">Coke Mismo 120 ML</span>
                <span className="prod-cat">Drinks</span>
              </div>
              <span className="prod-price">₱25.00</span>
            </div>

            <div className="product-item">
              <img src={juiceImg} alt="Juice" className="prod-img" />
              <div className="prod-details">
                <span className="prod-name">Powdered Juice</span>
                <span className="prod-cat">Drinks</span>
              </div>
              <span className="prod-price">₱20.00</span>
            </div>

            <div className="product-item">
              <img src={pancitImg} alt="Pancit" className="prod-img" />
              <div className="prod-details">
                <span className="prod-name">Pancit Canton</span>
                <span className="prod-cat">Goods</span>
              </div>
              <span className="prod-price">₱10.00</span>
            </div>
            
            <div className="product-item">
              <img src={pancitImg} alt="Pancit" className="prod-img" />
              <div className="prod-details">
                <span className="prod-name">Pancit Canton</span>
                <span className="prod-cat">Goods</span>
              </div>
              <span className="prod-price">₱10.00</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div>
            <img src={homeIcon} alt="home"/>
            <span>Home</span>
          </div>

          <div>
            <img src={invenIcon} alt="inventory"/>
            <span>Inventory</span>
          </div>

          <div className="center-btn" onClick={() => onNavigate("chat")}>
          <img src={whiteSari} alt="chat"/>
          </div>

          <div className="active-nav">
            <img src={statsIcon2} alt="insights"/>
            <span>Insights</span>
          </div>
          
           <div onClick={() => onNavigate("profile")}>
              <img src={profileIcon} alt="profile"/>
              <span>Profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Insights;