// GreetingCard.jsx
// Usage:
// <GreetingCard storeName="Aling Nena's Store" mascotImage={waveMascot} />
// Greeting auto-changes based on time of day

import waveMascot from "../assets/images/wavemascot1.png";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Magandang Umaga!";
  if (hour < 18) return "Magandang Hapon!";
  return "Magandang Gabi!";
}

export default function GreetingCard({
  storeName = "Aling Nena's Store",
  mascotImage = waveMascot,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');

        .gc-card {
          background: #3B1F0E;
          border-radius: 20px;
          padding: 20px 20px 0 20px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          overflow: hidden;
          font-family: 'Manrope', sans-serif;
          min-height: 110px;
        }

        .gc-text {
          padding-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gc-greeting {
          font-size: 22px;
          font-weight: 800;
          color: white;
          line-height: 1.2;
        }

        .gc-store {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.65);
        }

        .gc-mascot {
          width: 105px;
          height: 115px;
          object-fit: contain;
          object-position: bottom;
          flex-shrink: 0;
        }
      `}</style>

      <div className="gc-card">
        <div className="gc-text">
          <span className="gc-greeting">{getGreeting()}</span>
          <span className="gc-store">{storeName}</span>
        </div>
        <img src={mascotImage} alt="SariSmart mascot" className="gc-mascot" />
      </div>
    </>
  );
}