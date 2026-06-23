import { useState } from "react";
import slide1 from "../assets/images/onboarding-1.png";
import slide2 from "../assets/images/onboarding-2.png";
import slide3 from "../assets/images/onboarding-3.png";
import slide4 from "../assets/images/onboarding-4.png";

// --- Awning SVG at top ---
function Awning() {
  // Draw striped rectangle, then place white scallop bumps on top at the bottom edge
  // Each bump is an ellipse, creating the classic market awning look
  const bumps = [40, 120, 200, 280, 360]; // cx positions for 5 bumps

  return (
    <svg viewBox="0 0 400 105" xmlns="http://www.w3.org/2000/svg" className="awning-svg" style={{display:"block"}}>
      {/* Stripes background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 20} y={0} width={20} height={105} fill={i % 2 === 0 ? "#E8821A" : "#F5C842"} />
      ))}
      {/* White scallop bumps at the bottom — these sit ON TOP of the stripes */}
      {bumps.map((cx) => (
        <ellipse key={cx} cx={cx} cy={105} rx={44} ry={20} fill="white" />
      ))}
    </svg>
  );
}

// --- Dot indicators ---
function Dots({ total, current }) {
  return (
    <div className="dots-row">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`dot ${i === current ? "dot-active" : ""}`} />
      ))}
    </div>
  );
}

// ---- Slide image ----
function SlideImage({ src, label }) {
  return (
    <div className="slide-img-box">
      <img src={src} alt={label} className="slide-img" />
    </div>
  );
}

// ---- Slide data ----
const slides = [
  {
    id: 0,
    image: slide1,
    illustrationLabel: "Slide 1 Illustration",
    title: "Your Sari-Sari Store,\nPowered by AI",
    body: "Track sales, monitor inventory, and get smart business suggestions—all through simple conversations with SariSmart.",
  },
  {
    id: 1,
    image: slide2,
    illustrationLabel: "Slide 2 Illustration",
    title: "Update Inventory by Chatting",
    body: "Simply tell SariSmart what you sold or restocked, and let AI keep your inventory accurate and up to date.",
  },
  {
    id: 2,
    image: slide3,
    illustrationLabel: "Slide 3 Illustration",
    title: "Smart Stock Alerts",
    body: "SariSmart keeps an eye on your inventory and alerts you when products are running low.",
  },
  {
    id: 3,
    image: slide4,
    illustrationLabel: "Slide 4 Illustration",
    title: "Talk in the Language You Prefer",
    body: "SariSmart understands and responds in the language you're most comfortable using whether it is Bisaya, Filipino, or English.",
    isLast: true,
  },
];

// ---- Main Onboarding Component ----
export default function Onboarding({ onFinish }) {
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish?.();
    }
  };

  const slide = slides[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .onboarding-wrapper {
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
          background: white;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Status bar */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 28px 0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Manrope', sans-serif;
          color: #1a1a1a;
          flex-shrink: 0;
          z-index: 10;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }

        /* Awning */
        .awning-svg {
          width: 100%;
          height: 105px;
          display: block;
          flex-shrink: 0;
          margin-bottom: -1px;
        }

        /* Slide content */
        .slide-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px 28px;
          overflow: hidden;
        }

        /* Slide image */
        .slide-img-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 8px 0;
        }
        .slide-img {
          max-width: 100%;
          max-height: 260px;
          object-fit: contain;
        }

        /* Text block */
        .slide-text {
          text-align: center;
          margin-bottom: 24px;
        }
        .slide-title {
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.35;
          margin-bottom: 12px;
          white-space: pre-line;
          font-family: 'Manrope', sans-serif;
        }
        .slide-body {
          font-size: 14.5px;
          font-weight: 500;
          color: #666;
          line-height: 1.65;
          font-family: 'Manrope', sans-serif;
        }

        /* Dots */
        .dots-row {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 20px;
        }
        .dot {
          width: 28px;
          height: 6px;
          border-radius: 3px;
          background: #EDD9C0;
          transition: background 0.3s;
        }
        .dot-active { background: #E8821A; }

        /* Last slide two buttons */
        .last-btn-row {
          width: 100%;
          display: flex;
          gap: 12px;
        }
        .register-btn {
          flex: 1;
          padding: 17px;
          border-radius: 16px;
          background: #532A09;
          color: white;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .register-btn:hover { background: #2f1806; }
        .register-btn:active { transform: scale(0.98); }
        .signin-btn {
          flex: 1;
          padding: 17px;
          border-radius: 16px;
          background: #E8821A;
          color: white;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .signin-btn:hover { background: #C96B0A; }
        .signin-btn:active { transform: scale(0.98); }

        /* Next button */
        .next-btn {
          width: 100%;
          padding: 17px;
          border-radius: 16px;
          background: #E8821A;
          color: white;
          font-size: 17px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: 0.2px;
        }
        .next-btn:hover { background: #C96B0A; }
        .next-btn:active { transform: scale(0.98); }

        /* Home indicator */
        .home-indicator {
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .home-bar {
          width: 120px;
          height: 5px;
          border-radius: 3px;
          background: #ccc;
        }
      `}</style>

      <div className="onboarding-wrapper">
        <div className="phone-shell">
          {/* Status bar */}
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
                <path d="M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.6 5.8C11.2 4.4 9.4 3.5 7.5 3.5C5.6 3.5 3.8 4.4 2.4 5.8L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5Z" fill="#1a1a1a"/>
                <circle cx="7.5" cy="10" r="2" fill="#1a1a1a"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a1a"/>
                <path d="M23 4.5V7.5C23.8 7.2 24.5 6.4 24.5 6C24.5 5.6 23.8 4.8 23 4.5Z" fill="#1a1a1a" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* Awning */}
          <Awning />

          {/* Slide content */}
          <div className="slide-content">
            <SlideImage src={slide.image} label={slide.illustrationLabel} />

            <div className="slide-text">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-body">{slide.body}</p>
            </div>

            <Dots total={slides.length} current={current} />

            {slide.isLast ? (
              <div className="last-btn-row">
                <button className="register-btn">Register</button>
                <button className="signin-btn" onClick={onFinish}>Sign In</button>
              </div>
            ) : (
              <button className="next-btn" onClick={handleNext}>Next</button>
            )}
          </div>

          {/* Home indicator */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>
        </div>
      </div>
    </>
  );
}