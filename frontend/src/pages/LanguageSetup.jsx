import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import brand_logo from '../assets/images/SariLogo.png';
import brand_name from '../assets/images/SariSmart.png';

export default function ConfigurationSetup({ onFinish }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [storeName, setStoreName] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault(); // Triggered cleanly upon valid HTML form submission
    
    // Trim input to check for empty strings or purely white spaces
    if (!storeName.trim()) {
      return;
    }

    if (onFinish) {
      onFinish({ selectedLanguage, storeName: storeName.trim() });
    } else {
      navigate('/home');
    }
  };

  const languages = [
    { name: 'English', local: 'English' },
    { name: 'Filipino', local: 'Tagalog' },
    { name: 'Bisaya', local: 'Cebuano' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Manrope', sans-serif;
        }

        .auth-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
        }

        .phone-shell {
          width: 390px;
          height: 844px;
          background: #E8821A; 
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* System Header Status Bar */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 28px 0;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
          z-index: 10;
        }
        .status-icons {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        /* Rounded White Main Body Container */
        .auth-card-body {
          flex: 1;
          background: white;
          border-top-left-radius: 40px;
          border-top-right-radius: 40px;
          margin-top: 24px;
          padding: 32px 28px 20px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .auth-card-body::-webkit-scrollbar {
          display: none;
        }

        /* Unified Brand Identity Row */
        .brand-header-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          margin-bottom: 24px;
          width: 100%;
        }
        .brand-header-row .logo {
          width: 54px;
          height: auto;
        }
        .brand-header-row .brand-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
        }
        .brand-header-row .brand-name {
          height: 20px;
        }
        .tagline-text {
          font-size: 10.5px;
          font-weight: 500;
          color: #a0aec0;
          white-space: nowrap;
        }

        /* Sleek Separator Line */
        .brand-divider {
          width: 100%;
          height: 1px;
          background: #edf2f7;
          margin-bottom: 28px;
        }

        /* Left-aligned Headings Section */
        .title-section {
          text-align: left;
          width: 100%;
          margin-bottom: 24px;
        }
        .main-title {
          font-size: 26px;
          font-weight: 800;
          color: #2D3748;
          line-height: 1.25;
          margin-bottom: 6px;
        }
        .sub-title {
          font-size: 13.5px;
          font-weight: 500;
          color: #a0aec0;
          line-height: 1.45;
        }

        /* Form Layout Setup Container */
        .setup-form-container {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Language Selector Cards Setup */
        .lang-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 36px;
        }
        .lang-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .lang-item.selected {
          border-color: #E8821A;
        }
        .lang-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .lang-main {
          font-size: 15px;
          font-weight: 700;
          color: #2D3748;
        }
        .lang-local {
          font-size: 12.5px;
          font-weight: 500;
          color: #a0aec0;
        }

        /* Custom Selector Outer Bullet Circle */
        .radio-bullet {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .lang-item.selected .radio-bullet {
          border-color: #E8821A;
        }
        .radio-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: transparent;
          transition: background 0.2s ease;
        }
        .lang-item.selected .radio-inner {
          background: #E8821A;
        }

        /* Store Name Wireframe Configuration Section */
        .store-name-section {
          margin-bottom: auto; /* Pushes button clean to the bottom */
          display: flex;
          flex-direction: column;
          align-items: flex-start; 
          gap: 12px;
          width: 100%;
        }
        .store-name-label {
          font-size: 14px;
          font-weight: 700;
          color: #2D3748;
          text-align: left; 
        }
        .input-group {
          position: relative;
          width: 100%;
        }
        .input-group input {
          width: 100%;
          padding: 10px 0;
          border: none;
          border-bottom: 1.5px solid #E8821A; /* Solid orange accent line matches image_273ec1.png */
          background: transparent;
          font-size: 15px;
          font-weight: 500;
          color: #2D3748;
          outline: none;
          text-align: left; 
        }
        .input-group input::placeholder {
          color: #cbd5e1;
        }

        /* Main Action Button */
        .primary-submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 16px;
          background: #E8821A;
          color: white;
          font-size: 16px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          margin-top: 24px;
          margin-bottom: 12px;
          transition: background 0.2s, transform 0.1s;
        }
        .primary-submit-btn:hover {
          background: #C96B0A;
        }
        .primary-submit-btn:active {
          transform: scale(0.99);
        }

        /* System Bottom Indicator Bar */
        .home-indicator {
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: white;
        }
        .home-bar {
          width: 120px;
          height: 5px;
          border-radius: 3px;
          background: #cbd5e1;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="phone-shell">
          
          {/* Status Bar System Layout */}
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#1a1a1a"/>
                <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#1a1a1a"/>
                <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#1a1a1a"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1a1a1a" fillOpacity="0.3"/>
              </svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path d="M7.5 2.5C9.8 2.5 11.8 3.5 13.2 5.1L14.5 3.8C12.7 1.8 10.2 0.5 7.5 0.5C4.8 0.5 2.3 1.8 0.5 3.8L1.8 5.1C3.2 3.5 5.2 2.5 7.5 2.5Z" fill="#1a1a1a"/>
                <circle cx="7.5" cy="10" r="2" fill="#1a1a1a"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a1a"/>
              </svg>
            </div>
          </div>

          {/* White Card Body Viewport */}
          <div className="auth-card-body">
            
            {/* Unified Branding Header Row */}
            <div className="brand-header-row">
              <img className="logo" src={brand_logo} alt="SariSmart Logo" />
              <div className="brand-text">
                <img className="brand-name" src={brand_name} alt="SariSmart" />
                <span className="tagline-text">Track Smarter. Stock Better. Earn More.</span>
              </div>
            </div>

            {/* Layout Boundary Divider */}
            <div className="brand-divider"></div>

            {/* Left-Indented Header Descriptions */}
            <div className="title-section">
              <h2 className="main-title">Choose language</h2>
              <p className="sub-title">Select your preferred language to customize your interaction interface setup.</p>
            </div>

            {/* Form layout wrapping to manage native validations */}
            <form onSubmit={handleGetStarted} className="setup-form-container">
              
              {/* Interactive Cards List */}
              <div className="lang-list">
                {languages.map((lang) => (
                  <div 
                    key={lang.name} 
                    className={`lang-item ${selectedLanguage === lang.name ? 'selected' : ''}`}
                    onClick={() => setSelectedLanguage(lang.name)}
                  >
                    <div className="lang-info">
                      <span className="lang-main">{lang.name}</span>
                      <span className="lang-local">{lang.local}</span>
                    </div>
                    <div className="radio-bullet">
                      <div className="radio-inner" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Store Name Section - Enforced to be Non-Blank */}
              <div className="store-name-section">
                <label className="store-name-label" htmlFor="storeNameInput">Store Name</label>
                <div className="input-group">
                  <input 
                    id="storeNameInput"
                    type="text" 
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter your store name" 
                    required 
                  />
                </div>
              </div>

              {/* Submit Type Action Button */}
              <button type="submit" className="primary-submit-btn">
                Get Started
              </button>
              
            </form>

          </div>

          {/* System Device Navigation Strip Footer */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}