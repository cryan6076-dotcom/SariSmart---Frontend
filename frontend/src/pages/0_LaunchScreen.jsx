import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Imported the router hook
import whiteLogo from "../assets/icons/whitelogo-sarismart.png";

export default function LaunchScreen() {
  const navigate = useNavigate(); // Initialized the navigator

  // Auto-advance to onboarding after 2.5 seconds, or redirect to home if logged in via OAuth
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const user = searchParams.get('user');

    if (token) {
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('user', decodeURIComponent(user));
      }
      navigate('/home');
      return;
    }

    // If user is already logged in, skip the launch screen delay and go to home
    if (localStorage.getItem('token')) {
      navigate('/home');
      return;
    }

    const timer = setTimeout(() => {
      navigate("/onboarding"); // Triggers the router redirect
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .launch-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
          font-family: 'Manrope', sans-serif;
        }

        .launch-phone {
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

        /* Status bar */
        .launch-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 28px 0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Manrope', sans-serif;
          color: white;
          flex-shrink: 0;
        }
        .launch-status-icons { display: flex; gap: 6px; align-items: center; }

        /* Center content */
        .launch-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .launch-logo-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .launch-logo-img {
          width: 68px;
          height: 68px;
          object-fit: contain;
        }

        .launch-app-name {
          font-size: 42px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .launch-tagline {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.5px;
        }

        /* Home indicator */
        .launch-home {
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .launch-home-bar {
          width: 120px;
          height: 5px;
          border-radius: 3px;
          background: rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="launch-wrapper">
        <div className="launch-phone">
          {/* Status bar */}
          <div className="launch-status">
            <span>9:41</span>
            <div className="launch-status-icons">
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

          {/* Centered logo + name + tagline */}
          <div className="launch-center">
            <div className="launch-logo-row">
              <img src={whiteLogo} alt="SariSmart Logo" className="launch-logo-img" />
              <span className="launch-app-name">SariSmart</span>
            </div>

            <span className="launch-tagline">Track Smarter. Stock Better. Earn More.</span>
          </div>

          {/* Home indicator */}
          <div className="launch-home">
            <div className="launch-home-bar" />
          </div>
        </div>
      </div>
    </>
  );
}