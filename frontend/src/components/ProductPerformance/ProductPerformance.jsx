import React, { useState } from "react";
import "./ProductPerformance.css";

// Navigation Icons
import homeIcon from "../Assets/homeIcon.png";
import invenIcon from "../Assets/invenIcon.png";
import profileIcon from "../Assets/profileIcon.png";
import statsIcon2 from "../Assets/statsIcon2.png";
import whiteSari from "../Assets/transparentSari.png";

// Placeholder Images
import coffeeImg from "../Assets/coffee.png";
import pancitImg from "../Assets/pancit.png";
import cokeImg from "../Assets/coke.png";
import eggsImg from "../Assets/eggs.png";
import oreoImg from "../Assets/oreo.png";
import juiceImg from "../Assets/juice.png";

const ProductPerformance = ({ onBack, onNavigate }) => {
  const [activeTab, setActiveTab] = useState("Top Sellers");

  return (
    <div className="perf-page">
      <div className="perf-container">
        
        {/* Header with Back Arrow */}
        <div className="perf-header">
          <button className="back-btn" onClick={onBack}>←</button>
          <h2>Product Performance</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="toggle-container">
          <button 
            className={`toggle-btn ${activeTab === "Top Sellers" ? "active" : ""}`}
            onClick={() => setActiveTab("Top Sellers")}
          >
            ★ Top Sellers
          </button>
          <button 
            className={`toggle-btn ${activeTab === "Slow Movers" ? "active" : ""}`}
            onClick={() => setActiveTab("Slow Movers")}
          >
            📈 Slow Movers
          </button>
        </div>

        {/* Ranked Top Sellers List */}
        <div className="ranked-list">
          {[
            { rank: 1, name: "Coffee", sold: "13 pcs sold", price: "₱180.00", img: coffeeImg },
            { rank: 2, name: "Lucky Me Pancit Canton", sold: "8 pcs sold", price: "₱144.00", img: pancitImg },
            { rank: 3, name: "Coca-Cola 250ml", sold: "7 pcs sold", price: "₱175.00", img: cokeImg },
            { rank: 4, name: "Eggs", sold: "6 pcs sold", price: "₱90.00", img: eggsImg },
            { rank: 5, name: "Oreo Sandwich Cookies", sold: "5 pcs sold", price: "₱90.00", img: oreoImg }
          ].map((item) => (
            <div className="ranked-item" key={item.rank}>
              <span className="rank-num">{item.rank}</span>
              <img src={item.img} alt={item.name} className="perf-prod-img" />
              <div className="perf-prod-details">
                <span className="perf-prod-name">{item.name}</span>
                <span className="perf-prod-sold">{item.sold}</span>
              </div>
              <span className="perf-prod-val">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Continuous List (Matching the overlapping card on bottom of mockup) */}
        <div className="unranked-list">
             <div className="ranked-item">
                <img src={cokeImg} alt="Coke" className="perf-prod-img unranked-img" />
                <div className="perf-prod-details">
                  <span className="perf-prod-name">Coke Mismo 120 ML</span>
                  <span className="perf-prod-sold">Drinks</span>
                </div>
                <span className="perf-prod-val">₱25.00</span>
             </div>
             <div className="ranked-item">
                <img src={juiceImg} alt="Tang" className="perf-prod-img unranked-img" />
                <div className="perf-prod-details">
                  <span className="perf-prod-name">Powdered Juice</span>
                  <span className="perf-prod-sold">Drinks</span>
                </div>
                <span className="perf-prod-val">₱20.00</span>
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
          
          <div>
            <img src={profileIcon} alt="profile"/>
            <span>Profile</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPerformance;