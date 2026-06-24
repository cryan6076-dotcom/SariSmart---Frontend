// AiTipCard.jsx
// Usage:
// <AiTipCard tip="Coffee demand increased today. Restock before Wednesday." />

import thumbMascot from "../assets/images/thumbupmascot1.png";

export default function AiTipCard({
  tip = "Coffee demand increased today. Restock before Wednesday.",
  mascotImage = thumbMascot,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');

        .aitip-card {
          background: #FFF8EE;
          border: 1.5px solid #FFE0B0;
          border-radius: 18px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Manrope', sans-serif;
        }

        .aitip-mascot {
          width: 64px;
          height: 64px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .aitip-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .aitip-title {
          font-size: 12px;
          font-weight: 800;
          color: #E8821A;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .aitip-text {
          font-size: 13px;
          font-weight: 500;
          color: #555;
          line-height: 1.55;
        }

        .aitip-bulb {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
        }
      `}</style>

      <div className="aitip-card">
        <img src={mascotImage} alt="SariSmart mascot" className="aitip-mascot" />

        <div className="aitip-body">
          <span className="aitip-title">AI Tip</span>
          <span className="aitip-text">{tip}</span>
        </div>

        {/* Lightbulb icon */}
        <svg className="aitip-bulb" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="14" r="8" stroke="#E8821A" strokeWidth="2" fill="#FFF0D0"/>
          <path d="M15 22h6" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15.5 25h5" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 28h4" stroke="#E8821A" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M18 6V4" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24.5 8.5l1.5-1.5" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11.5 8.5L10 7" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M27 14h2" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 14H9" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 14 Q15 18 18 20 Q21 18 21 14" stroke="#E8821A" strokeWidth="1.5" fill="#FFD580" fillOpacity="0.5"/>
        </svg>
      </div>
    </>
  );
}