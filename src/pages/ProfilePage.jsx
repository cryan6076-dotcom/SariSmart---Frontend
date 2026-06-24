import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Imported navigate hook
import BottomNav from "../components/BottomNav";

export default function ProfilePage() {
  const navigate = useNavigate(); // Initialized router navigation

  // Toggle states matching the UI preferences panels
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(true);
  const [markupSuggestions, setMarkupSuggestions] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
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
                <h2>Aling Nena</h2>
                <p>Aling Nena's Store</p>
                <button className="edit-profile-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* STORE INFORMATION SECTION */}
            <div>
              <h3 className="section-eyebrow-label">Store Information</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/></svg>
                    </span>
                    Store Name
                  </div>
                  <div className="item-right-block">Aling Nena's Store <span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    </span>
                    Business Address
                  </div>
                  <div className="item-right-block">Brgy. 123, Manila <span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                    </span>
                    Opening Hours
                  </div>
                  <div className="item-right-block">6:00 AM - 10:00 PM <span>❯</span></div>
                </div>
              </div>
            </div>

            {/* PREFERENCES SECTION */}
            <div>
              <h3 className="section-eyebrow-label">Preferences</h3>
              <div className="settings-card-group">
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.3 22c-5.52 0-10-4.48-10-10S6.78 2 12.3 2c.56 0 1.12.05 1.66.14a10.027 10.027 0 0 0-3.64 7.64c0 4.1 2.48 7.61 6.04 9.13-.91.71-2.02 1.09-3.36 1.09z"/></svg>
                    </span>
                    Dark Mode
                  </div>
                  <div className={`toggle-switch-input ${darkMode ? "active" : ""}`} onClick={() => setDarkMode(!darkMode)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14c-.16-.64-.26-1.31-.26-2s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A8.03 8.03 0 0 1 5.08 16zm2.95-8H5.08a8.03 8.03 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>
                    </span>
                    Language
                  </div>
                  <div className="item-right-block">English <span>❯</span></div>
                </div>
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                    </span>
                    Notifications
                  </div>
                  <div className={`toggle-switch-input ${notifications ? "active" : ""}`} onClick={() => setNotifications(!notifications)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
              </div>
            </div>

            {/* AI PREFERENCES SECTION */}
            <div>
              <h3 className="section-eyebrow-label">AI Preferences</h3>
              <div className="settings-card-group">
                <div className="settings-row-item">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </span>
                    AI Suggestions
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
                    Restock Alerts
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
                    Markup Suggestions
                  </div>
                  <div className={`toggle-switch-input ${markupSuggestions ? "active" : ""}`} onClick={() => setMarkupSuggestions(!markupSuggestions)}>
                    <div className="toggle-switch-handle" />
                  </div>
                </div>
              </div>
            </div>

            {/* EXPORT DATA SECTION */}
            <div>
              <h3 className="section-eyebrow-label">Export Data</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>
                    </span>
                    Sales Report
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    </span>
                    Inventory Export
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
              </div>
            </div>

            {/* SUPPORT SECTION */}
            <div>
              <h3 className="section-eyebrow-label">Support</h3>
              <div className="settings-card-group">
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm1 16h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    </span>
                    Help Center
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                <div className="settings-row-item clickable-row">
                  <div className="item-left-block">
                    <span className="item-icon-wrapper">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18h2v-6h-2v6zm1-14C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v-2h-2v2z"/></svg>
                    </span>
                    About SariSmart
                  </div>
                  <div className="item-right-block"><span>❯</span></div>
                </div>
                
                {/* LOGOUT ROW BUTTON - Added click router destination handler here */}
                <div className="settings-row-item clickable-row" onClick={() => navigate("/auth")}>
                  <div className="item-left-block logout-text">
                    <span className="item-icon-wrapper" style={{ color: '#DC2626' }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                    </span>
                    Logout
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

          {/* iOS Device bottom line gesture zone */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}