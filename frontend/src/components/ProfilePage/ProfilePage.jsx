import { useState } from "react";
import "./ProfilePage.css";
import homeIcon from "../Assets/homeIcon.png";
import invenIcon from "../Assets/invenIcon.png";
import profileIcon from "../Assets/profileIcon.png";
import statsIcon2 from "../Assets/statsIcon2.png";
import whiteSari from "../Assets/transparentSari.png";

const ORANGE = "#e07b39";
const LOGOUT_ORANGE = "#e05c2a";

function Toggle({ on, onToggle }) {
  return (
    <button
      className={`settings-toggle-track ${on ? "on" : "off"}`}
      onClick={onToggle}
      role="switch"
      aria-checked={on}
    >
      <div className="settings-toggle-thumb" />
    </button>
  );
}

function ChevronRight() {
  return <span className="settings-chevron">›</span>;
}

function Icon({ children }) {
  return <div className="settings-row-icon">{children}</div>;
}

function ProfilePage({ onNavigate }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [restockAlerts, setRestockAlerts] = useState(true);
  const [markupSuggestions, setMarkupSuggestions] = useState(true);

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <div className="settings-avatar-wrapper">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="15" r="8" fill={ORANGE} />
            <ellipse cx="20" cy="34" rx="14" ry="9" fill={ORANGE} />
          </svg>
        </div>
        <p className="settings-header-name">Aling Nena</p>
        <p className="settings-header-sub">Aling Nena's Store</p>
        <button className="settings-edit-btn">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Store Information */}
      <div className="settings-section-group">
        <p className="settings-section-label">Store Information</p>
        <div className="settings-section-card">
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="8" width="16" height="10" rx="1.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M5 8V6a5 5 0 0 1 10 0v2" stroke={ORANGE} strokeWidth="1.5" />
              </svg>
            </Icon>
            <span className="settings-row-label">Store Name</span>
            <span className="settings-row-value">Aling Nena's Store</span>
            <ChevronRight />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C7.24 2 5 4.24 5 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5Z" stroke={ORANGE} strokeWidth="1.5" />
                <circle cx="10" cy="7" r="2" stroke={ORANGE} strokeWidth="1.5" />
              </svg>
            </Icon>
            <span className="settings-row-label">Business Address</span>
            <span className="settings-row-value">Brgy. 123, Manila</span>
            <ChevronRight />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M10 5.5V10l3 2" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">Opening Hours</span>
            <span className="settings-row-value">6:00 AM – 10:00 PM</span>
            <ChevronRight />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="settings-section-group">
        <p className="settings-section-label">Preferences</p>
        <div className="settings-section-card">
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 10.5a7 7 0 1 1-8-6.93A5.5 5.5 0 0 0 17 10.5Z" stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">Dark Mode</span>
            <Toggle on={darkMode} onToggle={() => setDarkMode((v) => !v)} />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M10 2.5C10 2.5 7 6 7 10s3 7.5 3 7.5" stroke={ORANGE} strokeWidth="1.3" />
                <path d="M2.5 10h15" stroke={ORANGE} strokeWidth="1.3" />
              </svg>
            </Icon>
            <span className="settings-row-label">Language</span>
            <span className="settings-row-value">English</span>
            <ChevronRight />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a5 5 0 0 1 5 5v3l1.5 2.5H3.5L5 10V7a5 5 0 0 1 5-5Z" stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 15.5a2 2 0 0 0 4 0" stroke={ORANGE} strokeWidth="1.5" />
              </svg>
            </Icon>
            <span className="settings-row-label">Notifications</span>
            <Toggle on={notifications} onToggle={() => setNotifications((v) => !v)} />
          </div>
        </div>
      </div>

      {/* AI Preferences */}
      <div className="settings-section-group">
        <p className="settings-section-label">AI Preferences</p>
        <div className="settings-section-card">
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l1.5 4.5H16l-3.5 2.5 1.5 4.5L10 11l-4 2.5 1.5-4.5L4 6.5h4.5L10 2Z" stroke={ORANGE} strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">AI Suggestions</span>
            <Toggle on={aiSuggestions} onToggle={() => setAiSuggestions((v) => !v)} />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a5 5 0 0 1 5 5v3l1.5 2.5H3.5L5 10V7a5 5 0 0 1 5-5Z" stroke={ORANGE} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 15.5a2 2 0 0 0 4 0" stroke={ORANGE} strokeWidth="1.5" />
              </svg>
            </Icon>
            <span className="settings-row-label">Restock Alerts</span>
            <Toggle on={restockAlerts} onToggle={() => setRestockAlerts((v) => !v)} />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 10h14M10 3v14" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="10" cy="10" r="7.5" stroke={ORANGE} strokeWidth="1.5" />
              </svg>
            </Icon>
            <span className="settings-row-label">Markup Suggestions</span>
            <Toggle on={markupSuggestions} onToggle={() => setMarkupSuggestions((v) => !v)} />
          </div>
        </div>
      </div>

      {/* Export Data */}
      <div className="settings-section-group">
        <p className="settings-section-label">Export Data</p>
        <div className="settings-section-card">
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="12" rx="1.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M7 10v3M10 8v5M13 12v1" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">Sales Report</span>
            <ChevronRight />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="3" width="12" height="14" rx="1.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M7 7h6M7 10h6M7 13h3" stroke={ORANGE} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">Inventory Export</span>
            <ChevronRight />
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="settings-section-group">
        <p className="settings-section-label">Support</p>
        <div className="settings-section-card">
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M10 13v1" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" />
                <path d="M10 7a2 2 0 0 1 1.5 3.3L10 11.5" stroke={ORANGE} strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </Icon>
            <span className="settings-row-label">Help Center</span>
            <ChevronRight />
          </div>
          <div className="settings-row">
            <Icon>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke={ORANGE} strokeWidth="1.5" />
                <path d="M10 9v5" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="10" cy="7" r="0.8" fill={ORANGE} />
              </svg>
            </Icon>
            <span className="settings-row-label">About SariSmart</span>
            <ChevronRight />
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="settings-section-group">
        <div className="settings-logout-row">
          <Icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 14l3-4-3-4" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 10H8" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Icon>
          <span className="settings-logout-label">Logout</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 14l3-4-3-4" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 10H8" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 4H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4" stroke={LOGOUT_ORANGE} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

       {/* Bottom Navigation */}
              <div className="bottom-nav">
                <div onClick={() => onNavigate("home")}>
                  <img src={homeIcon} alt="home"/>
                  <span>Home</span>
                </div>
      
                <div onClick={() => onNavigate("inventory")}>
                  <img src={invenIcon} alt="inventory"/>
                  <span>Inventory</span>
                </div>
      
                <div className="center-btn" onClick={() => onNavigate("chat")}>
                  <img src={whiteSari} alt="chat"/>
                </div>

                <div onClick={() => onNavigate("insights")}>
                  <img src={statsIcon2} alt="insights"/>
                  <span>Insights</span>
                </div>
                
                <div className="active-nav">
                  <img src={profileIcon} alt="profile"/>
                  <span>Profile</span>
                </div>
              </div>
    </div>



  );
}

export default ProfilePage;