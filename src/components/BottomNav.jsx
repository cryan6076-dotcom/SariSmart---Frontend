import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import aiChatbotIcon from "../assets/images/AIChatbotIcon.png";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // Check which view is running to handle visual active highlight tabs
  const isInventory = currentPath.includes("/inventory");
  const isInsights = currentPath.includes("/insights");
  const isChat = currentPath.includes("/chat");
  const isProfile = currentPath.includes("/profile");
  
  // Default to active Home if no other explicit tab route matches
  const isHome = !isInventory && !isInsights && !isChat && !isProfile;

  // Track structural stroke colors explicitly based on active tracking path states
  const homeColor = isHome ? "#EA6113" : "#334155";
  const inventoryColor = isInventory ? "#EA6113" : "#334155";
  const insightsColor = isInsights ? "#EA6113" : "#334155";
  const profileColor = isProfile ? "#EA6113" : "#334155";

  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#ffffff",
      padding: "10px 16px 8px 16px",
      borderTop: "1px solid #EAEAEA",
      position: "absolute",
      bottom: "24px",
      left: 0,
      right: 0,
      zIndex: 30,
      height: "66px"
    }}>
      {/* 1. Home Tab Button */}
      <button 
        type="button" 
        onClick={() => navigate("/home")}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", cursor: "pointer", width: "20%", padding: 0 }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ stroke: homeColor }}
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" style={{ stroke: homeColor }}></path>
          <polyline points="9 22 9 12 15 12 15 22" style={{ stroke: homeColor }}></polyline>
        </svg>
        <span style={{ fontSize: "11px", marginTop: "4px", color: homeColor, fontWeight: isHome ? "700" : "600", fontFamily: "sans-serif" }}>
          Home
        </span>
      </button>

      {/* 2. Inventory Tab Button */}
      <button 
        type="button" 
        onClick={() => navigate("/inventory")}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", cursor: "pointer", width: "20%", padding: 0 }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ stroke: inventoryColor }}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" style={{ stroke: inventoryColor }}></rect>
          <line x1="3" y1="9" x2="21" y2="9" style={{ stroke: inventoryColor }}></line>
          <line x1="9" y1="21" x2="9" y2="9" style={{ stroke: inventoryColor }}></line>
        </svg>
        <span style={{ fontSize: "11px", marginTop: "4px", color: inventoryColor, fontWeight: isInventory ? "700" : "600", fontFamily: "sans-serif" }}>
          Inventory
        </span>
      </button>

      {/* 3. Center Flat AI Chatbot Button */}
      <div style={{ position: "relative", width: "20%", display: "flex", justifyContent: "center", top: "-16px" }}>
        <button 
          type="button"
          onClick={() => navigate("/chat")}
          style={{
            width: "58px",
            height: "58px",
            backgroundColor: "#EA6113",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            boxShadow: "none", 
            cursor: "pointer",
            padding: 0
          }}
        >
          <img 
            src={aiChatbotIcon} 
            alt="SariSmart AI Chatbot" 
            style={{ 
              width: "40px", 
              height: "40px", 
              objectFit: "contain" 
            }} 
          />
        </button>
      </div>

      {/* 4. Insights Tab Button */}
      <button 
        type="button" 
        onClick={() => navigate("/insights")}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", cursor: "pointer", width: "20%", padding: 0 }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ stroke: insightsColor }}
        >
          <line x1="18" y1="20" x2="18" y2="10" style={{ stroke: insightsColor }}></line>
          <line x1="12" y1="20" x2="12" y2="4" style={{ stroke: insightsColor }}></line>
          <line x1="6" y1="20" x2="6" y2="14" style={{ stroke: insightsColor }}></line>
        </svg>
        <span style={{ fontSize: "11px", marginTop: "4px", color: insightsColor, fontWeight: isInsights ? "700" : "600", fontFamily: "sans-serif" }}>
          Insights
        </span>
      </button>

      {/* 5. Profile Tab Button */}
      <button 
        type="button" 
        onClick={() => navigate("/profile")}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "none", border: "none", cursor: "pointer", width: "20%", padding: 0 }}
      >
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ stroke: profileColor }}
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" style={{ stroke: profileColor }}></path>
          <circle cx="12" cy="7" r="4" style={{ stroke: profileColor }}></circle>
        </svg>
        <span style={{ fontSize: "11px", marginTop: "4px", color: profileColor, fontWeight: isProfile ? "700" : "600", fontFamily: "sans-serif" }}>
          Profile
        </span>
      </button>
    </footer>
  );
}