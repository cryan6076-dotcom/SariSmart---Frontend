import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import brand_logo from '../assets/images/SariLogo.png';
import brand_name from '../assets/images/SariSmart.png';
import eyeIcon from '../assets/images/eye.png';
import googleIcon from '../assets/images/google.png';
import fbIcon from '../assets/images/facebook.png';
import appleIcon from '../assets/images/apple.png';

export default function CreateLoginSetup({ onFinish }) {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const navigate = useNavigate();

  const isLogin = action === "Login";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFinish) {
      onFinish();
    } else {
      navigate('/language');
    }
  };

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
          background: #E8821A; /* Solid orange background layout */
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

        /* Horizontal Side-by-Side Brand Row */
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
          margin-bottom: 36px;
        }
        .main-title {
          font-size: 28px;
          font-weight: 800;
          color: #2d3748;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .sub-title {
          font-size: 14px;
          font-weight: 500;
          color: #a0aec0;
        }

        /* Form Styling Underline Fields */
        .auth-form-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .input-group {
          position: relative;
          width: 100%;
        }
        .input-group input {
          width: 100%;
          padding: 12px 0;
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background: transparent;
          font-size: 15px;
          font-weight: 500;
          color: #2d3748;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-group input::placeholder {
          color: #a0aec0;
        }
        .input-group input:focus {
          border-bottom-color: #E8821A;
        }
        .toggle-eye {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          cursor: pointer;
          opacity: 0.4;
        }

        /* Forgot Password link position */
        .forgot-password-link {
          text-align: right;
          font-size: 13.5px;
          font-weight: 600;
          color: #E8821A;
          cursor: pointer;
          margin-top: -8px;
          margin-bottom: 8px;
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
          margin-top: 4px;
          transition: background 0.2s, transform 0.1s;
        }
        .primary-submit-btn:hover {
          background: #C96B0A;
        }
        .primary-submit-btn:active {
          transform: scale(0.99);
        }

        /* Agreement Policy Elements placed below button */
        .agreement-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
        }
        .agreement-row input {
          accent-color: #E8821A;
          width: 15px;
          height: 15px;
          cursor: pointer;
        }
        .agreement-row label {
          font-size: 12.5px;
          color: #718096;
          font-weight: 500;
        }
        .agreement-row label span {
          color: #E8821A;
          cursor: pointer;
        }

        /* Row Separator Divider */
        .auth-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 32px 0 24px;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #edf2f7;
        }
        .auth-divider span {
          color: #a0aec0;
          font-size: 13px;
          font-weight: 600;
        }

        /* Social Authenticators */
        .social-button-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .social-icon-btn {
          width: 48px;
          height: 48px;
          background: #ffffff;
          border: 1px solid #edf2f7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .social-icon-btn:hover {
          background: #f7fafc;
        }
        .social-icon-btn img {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        /* Switch Mode Footer Link Toggle */
        .auth-footer-toggle {
          text-align: center;
          margin-top: auto;
          padding-bottom: 8px;
        }
        .auth-footer-toggle p {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
        }
        .auth-footer-toggle span {
          color: #E8821A;
          font-weight: 700;
          cursor: pointer;
          margin-left: 4px;
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
          
          {/* Status Bar Header Grid */}
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

          {/* Elegant White Sheet Content Container */}
          <div className="auth-card-body">
            
            {/* Side-by-Side Brand Row Layout */}
            <div className="brand-header-row">
              <img className="logo" src={brand_logo} alt="SariSmart Logo" />
              <div className="brand-text">
                <img className="brand-name" src={brand_name} alt="SariSmart" />
                <span className="tagline-text">Track Smarter. Stock Better. Earn More.</span>
              </div>
            </div>

            {/* Separator Line */}
            <div className="brand-divider"></div>

            {/* Left-Aligned Heading & Subtitle Block */}
            <div className="title-section">
              <h2 className="main-title">
                {isLogin ? "Log in to account" : "Create an account"}
              </h2>
              <p className="sub-title">Join us and explore new possibilities!</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-fields">
              <div className="input-group">
                <input type="email" placeholder="Enter your email" required />
              </div>

              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password" 
                  required 
                />
                <img 
                  src={eyeIcon} 
                  alt="Toggle Visibility" 
                  className="toggle-eye" 
                  onClick={() => setShowPassword(!showPassword)} 
                />
              </div>

              {isLogin && (
                <div className="forgot-password-link">Forgot Password</div>
              )}

              <button type="submit" className="primary-submit-btn">
                {isLogin ? "Log In" : "Create Account"}
              </button>

              {!isLogin && (
                <div className="agreement-row">
                  <input type="checkbox" id="agree" required />
                  <label htmlFor="agree">
                    I agree to the <span>Privacy Policy</span> and <span>Terms of Service</span>
                  </label>
                </div>
              )}
            </form>

            {/* Social Break Authentication Divider */}
            <div className="auth-divider">
              <div className="divider-line"></div>
              <span>OR</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-button-row">
              <button type="button" className="social-icon-btn" onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}>
                <img src={googleIcon} alt="Google" />
              </button>
              <button type="button" className="social-icon-btn">
                <img src={fbIcon} alt="Facebook" />
              </button>
              <button type="button" className="social-icon-btn">
                <img src={appleIcon} alt="Apple" />
              </button>
            </div>

            {/* Toggle Action Footer Link */}
            <div className="auth-footer-toggle">
              {isLogin ? (
                <p>
                  Don't have an account?
                  <span onClick={() => setAction("Sign Up")}>Sign Up</span>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <span onClick={() => setAction("Login")}>Log in</span>
                </p>
              )}
            </div>
          </div>

          {/* Home Bottom System Indicator */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}