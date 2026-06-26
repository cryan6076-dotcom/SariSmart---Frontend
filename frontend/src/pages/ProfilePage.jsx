import { apiFetch } from "../utils/api.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Imported navigate hook
import BottomNav from "../components/BottomNav";
import { getTranslation } from "../data/translations";
import { exportToCSV } from "../utils/exportToCSV";
import { useTheme } from "../context/ThemeContext";

export default function ProfilePage() {
  const navigate = useNavigate(); // Initialized router navigation

  // Toggle states matching the UI preferences panels
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(true);
  const [markupSuggestions, setMarkupSuggestions] = useState(true);
  
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [ownerName, setOwnerName] = useState(localStorage.getItem("ownerName") || "Aling Nena");
  const [storeName, setStoreName] = useState(localStorage.getItem("storeName") || "Aling Nena's Store");
  const [businessAddress, setBusinessAddress] = useState(localStorage.getItem("businessAddress") || "Brgy. 123, Manila");
  const [openingHours, setOpeningHours] = useState(localStorage.getItem("openingHours") || "6:00 AM - 10:00 PM");

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editForm, setEditForm] = useState({
    ownerName,
    storeName,
    businessAddress,
    openingHours
  });

  const handleEditProfile = () => {
    setEditForm({ ownerName, storeName, businessAddress, openingHours });
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = () => {
    setOwnerName(editForm.ownerName);
    setStoreName(editForm.storeName);
    setBusinessAddress(editForm.businessAddress);
    setOpeningHours(editForm.openingHours);
    
    localStorage.setItem("ownerName", editForm.ownerName);
    localStorage.setItem("storeName", editForm.storeName);
    localStorage.setItem("businessAddress", editForm.businessAddress);
    localStorage.setItem("openingHours", editForm.openingHours);
    
    setShowEditProfileModal(false);
  };
  // Handle True Sales Report Export from the Profile Page
  const handleExportSales = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      
      // Fetching from your dedicated transactions endpoint
      const response = await apiFetch(`${API_URL}/api/transactions`);
      
      if (!response.ok) throw new Error("Failed to fetch transaction data");
      const transactions = await response.json();

      // Guard clause in case there are no sales yet
      if (!transactions || transactions.length === 0) {
        alert("No sales data available to export!");
        return;
      }

      // Define financial headers
      const headers = ["Date", "Time", "Receipt Number", "Total Amount (PHP)"];

      // Map your live transaction data based on the shape found in HomePage
      const rows = transactions.map(tx => {
        const txDate = new Date(tx.createdAt).toLocaleDateString();
        const txTime = new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return [
          txDate,
          txTime,
          `"${tx.number}"`, // Quotes prevent formatting issues with receipt strings
          tx.total.toFixed(2)
        ];
      });

      // Join everything with commas and newlines
      const csvContent = [
        headers.join(","),
        ...rows.map(e => e.join(","))
      ].join("\n");

      // Generate and trigger the download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.setAttribute("href", url);
      link.setAttribute("download", `SariSmart_SalesReport_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export sales data. Ensure your backend /api/transactions route is active.");
    }
  };

  // Handle Dynamic Inventory Export from the Profile Page
  const handleExportInventory = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      
      // Fetching from your products endpoint
      const response = await apiFetch(`${API_URL}/api/products`);
      
      if (!response.ok) throw new Error("Failed to fetch inventory data");
      const products = await response.json();

      if (!products || products.length === 0) {
        alert("No inventory data available to export!");
        return;
      }

      // Define inventory headers
      const headers = ["Product Name", "Category", "Price (PHP)", "Stock Quantity", "Restock Threshold"];

      // Map your live product data
      const rows = products.map(product => [
        `"${product.name.replace(/"/g, '""')}"`, // Sanitizes quotes
        `"${product.category}"`,
        product.price.toFixed(2),
        product.stock,
        product.restockThreshold || 5
      ]);

      // Join everything with commas and newlines
      const csvContent = [
        headers.join(","),
        ...rows.map(e => e.join(","))
      ].join("\n");

      // Generate and trigger the download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.setAttribute("href", url);
      link.setAttribute("download", `SariSmart_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export inventory data. Please check your connection.");
    }
  };

  const t = getTranslation(language);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .profile-view-wrapper {
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

        /* ── Phone Status Bar ── */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 8px;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          background: #F8F9FA;
          z-index: 10;
          flex-shrink: 0;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }

        /* Scrollable layout area */
        .profile-scroll-container {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 8px 16px 120px 16px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .profile-scroll-container::-webkit-scrollbar { display: none; }

        /* ── Branded Owner Header Card ── */
        .owner-branded-card {
          background: #3B1F0E;
          border-radius: 20px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          flex-shrink: 0;
        }

        .avatar-frame {
          width: 64px;
          height: 64px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }

        .owner-details-layout h2 { font-size: 20px; font-weight: 800; color: white; line-height: 1.2; }
        .owner-details-layout p { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
        
        .edit-profile-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.5);
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* ── Preferences Lists & Sections ── */
        .section-eyebrow-label {
          font-size: 11px;
          font-weight: 800;
          color: #1A1A1A;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 8px;
          text-align: left;
        }

        .settings-card-group {
          background: white;
          border-radius: 16px;
          border: 1px solid #EAEAEA;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .settings-row-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: white;
          border-bottom: 1px solid #F1F5F9;
        }
        .settings-row-item:last-child { border-bottom: none; }

        .item-left-block {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #1A1A1A;
          font-size: 13px;
          font-weight: 700;
        }
        .item-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          color: #EA6113;
        }

        .item-right-block {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }

        /* ── Interactive Switch Element ── */
        .toggle-switch-input {
          width: 44px;
          height: 24px;
          background: #E2E8F0;
          border-radius: 12px;
          position: relative;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-switch-input.active { background: #EA6113; }
        .toggle-switch-handle {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .toggle-switch-input.active .toggle-switch-handle { transform: translateX(20px); }

        .clickable-row { cursor: pointer; }
        .clickable-row:active { background: #FAFAFA; }

        .logout-text { color: #DC2626 !important; }

        /* Home Indicator footer shell */
        .home-indicator {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          flex-shrink: 0;
          z-index: 40;
          position: absolute;
          bottom: 0; left: 0; right: 0;
        }
        .home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }

        
        /* ── Language Bottom Sheet ── */
        .bottom-sheet-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          z-index: 50;
          display: flex;
          align-items: flex-end;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .bottom-sheet-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }
        .bottom-sheet {
          width: 100%;
          background: white;
          border-radius: 24px 24px 0 0;
          padding: 24px 24px 40px;
          transform: translateY(100%);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .bottom-sheet-overlay.open .bottom-sheet {
          transform: translateY(0);
        }
        .bottom-sheet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .bottom-sheet-title {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #64748B;
          cursor: pointer;
        }
        .lang-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #F1F5F9;
          cursor: pointer;
        }
        .lang-option:last-child {
          border-bottom: none;
        }
        .lang-name {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .lang-local {
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
        }
        .lang-check {
          color: #EA6113;
        }

        /* Edit Profile Form Styles to match AddTransactionPage */
        .edit-profile-label {
          font-size: 14px; font-weight: 700; color: #E8821A; margin-bottom: 8px; display: block; text-align: left;
        }
        .edit-profile-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #E8821A;
          background: white;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          color: #E8821A;
          outline: none;
          transition: border-color 0.2s;
        }
        .edit-profile-input:focus {
          border-color: #E8821A;
          box-shadow: 0 0 0 3px rgba(232, 130, 26, 0.15);
        }
        .save-profile-btn {
          width: 100%;
          height: 52px;
          background: #E8821A;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 800;
          color: white;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: background 0.15s, transform 0.1s;
          margin-top: 8px;
        }
        .save-profile-btn:hover { background: #C96B0A; }
        .save-profile-btn:active { transform: scale(0.98); }
      `}</style>

      <div className="profile-view-wrapper">
        <div className="phone-shell">
          
          {/* Status Bar */}
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/>
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a"/>
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#1a1a1a"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" fillOpacity="0.4"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" fill="#1a1a1a"/>
                <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z" fill="#1a1a1a"/>
                <circle cx="7.5" cy="10" r="2" fill="#1a1a1a"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.5"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a1a"/>
                <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="#1a1a1a" fillOpacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Main List Scroller Container */}
          <div className="profile-scroll-container">
            
            {/* Owner Branded Profile Block */}
            <div className="owner-branded-card">
              <div className="avatar-frame">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#EA6113">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="owner-details-layout">
                <h2>{ownerName}</h2>
                <p>{storeName}</p>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  {t.editProfile}
                </button>
              </div>
            </div>

            {/* STORE INFORMATION SECTION */}
            <div>
              <h3 className="section-eyebrow-label">{t.storeInfo}</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row" onClick={handleEditProfile}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
                    </span>
                    {t.storeName}
                  </div>
                  <div className="item-right-block">{storeName} <span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row" onClick={handleEditProfile}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </span>
                    {t.businessAddress}
                  </div>
                  <div className="item-right-block">{businessAddress} <span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row" onClick={handleEditProfile}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    </span>
                    {t.openingHours}
                  </div>
                  <div className="item-right-block">{openingHours} <span>❯</span></div>
                </div>
              </div>
            </div>

            {/* PREFERENCES SECTION */}
            <div>
              <h3 className="section-eyebrow-label">{t.preferences}</h3>
              <div className="settings-card-group">
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.3 22c-5.52 0-10-4.48-10-10S6.78 2 12.3 2c.56 0 1.12.05 1.66.14a10.027 10.027 0 0 0-3.64 7.64c0 4.1 2.48 7.61 6.04 9.13-.91.71-2.02 1.09-3.36 1.09z"/></svg>
                    </span>
                    {t.darkMode}
                  </div>
                  <div className={`toggle-switch-input ${isDarkMode ? "active" : ""}`} onClick={toggleDarkMode}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
                <div className="settings-row-item clickable-row" onClick={() => setShowLanguageModal(true)}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14c-.16-.64-.26-1.31-.26-2s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.03 8.03 0 0 1 5.08 16zm2.95-8H5.08a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>
                    </span>
                    {t.language}
                  </div>
                  <div className="item-right-block">{language} <span>❯</span></div>
                </div>
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                    </span>
                    {t.notifications}
                  </div>
                  <div className={`toggle-switch-input ${notifications ? "active" : ""}`} onClick={() => setNotifications(!notifications)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI PREFERENCES SECTION */}
            <div>
              <h3 className="section-eyebrow-label">{t.aiPreferences}</h3>
              <div className="settings-card-group">
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </span>
                    {t.aiSuggestions}
                  </div>
                  <div className={`toggle-switch-input ${aiSuggestions ? "active" : ""}`} onClick={() => setAiSuggestions(!aiSuggestions)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                    </span>
                    {t.restockAlerts}
                  </div>
                  <div className={`toggle-switch-input ${restockAlerts ? "active" : ""}`} onClick={() => setRestockAlerts(!restockAlerts)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
                    </span>
                    {t.markupSuggestions}
                  </div>
                  <div className={`toggle-switch-input ${markupSuggestions ? "active" : ""}`} onClick={() => setMarkupSuggestions(!markupSuggestions)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
              </div>
            </div>

            {/* EXPORT DATA SECTION */}
            <div>
              <h3 className="section-eyebrow-label">{t.exportData}</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row" onClick={handleExportSales}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>
                    </span>
                    {t.salesReport}
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row" onClick={handleExportInventory}>
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    </span>
                    {t.inventoryExport}
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
              </div>
            </div>

            {/* SUPPORT SECTION */}
            <div>
              <h3 className="section-eyebrow-label">{t.support}</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm1 16h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    </span>
                    {t.helpCenter}
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18h2v-6h-2v6zm1-14C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v-2h-2v2z"/></svg>
                    </span>
                    {t.about}
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                
                {/* LOGOUT ROW BUTTON - Added click router destination handler here */}
                <div className="settings-row-item clickable-row" onClick={() => navigate("/auth")}>
                  <div className="item-left-block logout-text">
                    <span className="item-icon-wrapper" style={{ color: '#DC2626' }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                    </span>
                    {t.logout}
                  </div>
                  <div className="item-right-block" style={{ color: '#DC2626' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Persistent Global Bottom Menu Bar Navigation */}
          <BottomNav />

          {/* Language Bottom Sheet */}
          {showLanguageModal && (
          <div className="bottom-sheet-overlay open" onClick={() => setShowLanguageModal(false)}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="bottom-sheet-header">
                <h3 className="bottom-sheet-title">{t.selectLanguage}</h3>
                <button className="close-btn" onClick={() => setShowLanguageModal(false)}>×</button>
              </div>
              <div className="lang-list">
                {['English', 'Filipino', 'Bisaya'].map((lang) => (
                  <div key={lang} className="lang-option" onClick={() => { 
                    setLanguage(lang); 
                    localStorage.setItem("language", lang);
                    setShowLanguageModal(false); 
                  }}>
                    <div>
                      <div className="lang-name">{lang}</div>
                      <div className="lang-local">{lang === 'English' ? 'English' : lang === 'Filipino' ? 'Tagalog' : 'Cebuano'}</div>
                    </div>
                    {language === lang && (
                      <div className="lang-check">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Edit Profile Bottom Sheet */}
          {showEditProfileModal && (
          <div className="bottom-sheet-overlay open" onClick={() => setShowEditProfileModal(false)}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: '40px' }}>
              <div className="bottom-sheet-header">
                <h3 className="bottom-sheet-title">{t.editProfile}</h3>
                <button className="close-btn" onClick={() => setShowEditProfileModal(false)}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="edit-profile-label">{t.ownerName}</label>
                  <input 
                    className="edit-profile-input"
                    type="text" 
                    value={editForm.ownerName} 
                    onChange={(e) => setEditForm({...editForm, ownerName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="edit-profile-label">{t.storeName}</label>
                  <input 
                    className="edit-profile-input"
                    type="text" 
                    value={editForm.storeName} 
                    onChange={(e) => setEditForm({...editForm, storeName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="edit-profile-label">{t.businessAddress}</label>
                  <input 
                    className="edit-profile-input"
                    type="text" 
                    value={editForm.businessAddress} 
                    onChange={(e) => setEditForm({...editForm, businessAddress: e.target.value})}
                  />
                </div>
                <div>
                  <label className="edit-profile-label">{t.openingHours}</label>
                  <input 
                    className="edit-profile-input"
                    type="text" 
                    value={editForm.openingHours} 
                    onChange={(e) => setEditForm({...editForm, openingHours: e.target.value})}
                  />
                </div>
                <button className="save-profile-btn" onClick={handleSaveProfile}>
                  {t.save}
                </button>
              </div>
            </div>
          </div>
          )}

          {/* iOS Device bottom line gesture zone */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}