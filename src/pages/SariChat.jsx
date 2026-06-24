import React, { useState } from "react";
import BottomNav from "../components/BottomNav";

// Bind path files cleanly to app directory configurations
import SariAI from "../assets/images/SariAIchat.png";
import whiteSari from "../assets/images/transparentSari.png";

export default function SariChat() {
  const [message, setMessage] = useState("");

  const suggestions = [
    "What should I restock?",
    "Suggest Markup",
    "Which product sells best?",
    "Estimate Today's Profit",
    "Summarize my inventory",
    "Add Transaction",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .chat-view-wrapper {
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

        /* ── FIXED: Visible Dark Status Bar ── */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 8px;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a; /* Changed to dark so it shows against white background */
          background: #F8F9FA;
          z-index: 10;
          flex-shrink: 0;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }

        /* Scrollable main panel container */
        .chat-scroll-layout-container {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 8px 16px 12px 16px;
          display: flex;
          flex-direction: column;
        }
        .chat-scroll-layout-container::-webkit-scrollbar { display: none; }

        /* ── Premium AI Banner Header Card (KEPT ORIGINAL) ── */
        .ai-branded-header-banner {
          background: #3B1F0E;
          border-radius: 20px;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-bottom: 24px;
          text-align: left;
          flex-shrink: 0;
        }

        .ai-banner-title-label { font-size: 20px; font-weight: 800; color: white; line-height: 1.2; }
        .ai-banner-sub-caption { font-size: 12px; font-weight: 500; color: #ffffff; margin-top: 4px; }

        /* FIXED: Added vertical alignment limits to prevent mascot displacement */
        .ai-mascot-flying-avatar {
          width: 94px;
          height: 94px;
          object-fit: contain;
          margin-bottom: -34px;
          z-index: 2;
          transform: translateY(6px);
        }

        /* Suggested Intent prompt options labels */
        .suggested-section-eyebrow {
          font-size: 11px;
          font-weight: 800;
          color: #A3A3A3;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 10px;
          text-align: left;
        }

        .prompts-horizontal-scroller {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
          margin-bottom: 24px;
          flex-shrink: 0;
        }
        .prompts-horizontal-scroller::-webkit-scrollbar { display: none; }

        .suggestion-chip-intent-btn {
          background: #ffffff;
          border: 1px solid #EAEAEA;
          color: #4A2603;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 14px;
          border-radius: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s;
        }
        .suggestion-chip-intent-btn:active { background: #FFF0E6; border-color: #EA6113; color: #EA6113; }

        /* ── Core Message Conversation Bubbles Stream Layout ── */
        .dialogue-stream-stack {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 16px;
        }

        .message-row-node {
          display: flex;
          align-items: flex-start;
          width: 100%;
          text-align: left;
        }

        .message-row-node.ai-node { justify-content: flex-start; }
        .message-row-node.user-node { justify-content: flex-end; }

        .chat-bubble-capsule {
          max-width: 78%;
          padding: 12px 16px;
          font-size: 13.5px;
          line-height: 1.45;
        }

        .ai-node .chat-bubble-capsule {
          background: #FFF8EE;
          border: 1px solid #FFEED9;
          color: #3C3C3C;
          border-radius: 4px 16px 16px 16px;
          font-weight: 600;
        }

        .user-node .chat-bubble-capsule {
          background: #EA6113;
          color: white;
          border-radius: 16px 4px 16px 16px;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(234,97,19,0.15);
        }

        /* ── Input Interactive Field Box ── */
        .chat-input-bar-wrapper {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #EAEAEA;
          border-radius: 16px;
          padding: 4px 6px 4px 16px;
          margin-bottom: 96px;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }

        .chat-input-bar-wrapper input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          background: transparent;
          height: 40px;
        }

        .chat-send-trigger-btn {
          width: 40px;
          height: 40px;
          background: #EA6113;
          color: white;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(234, 97, 19, 0.2);
        }
        .chat-send-trigger-btn:active { transform: scale(0.96); }

        /* Home Indicator footer shell */
        .home-indicator {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          flex-shrink: 0;
          z-index: 40;
        }
        .home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }
      `}</style>

      <div className="chat-view-wrapper">
        <div className="phone-shell">

          {/* FIXED STATUS BAR: Uses dark color profiles to make the text/icons highly legible */}
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

          <div className="chat-scroll-layout-container">
            {/* Branded Vector Header Banner */}
            <div className="ai-branded-header-banner">
              <div>
                <h2 className="ai-banner-title-label">SariSmart AI</h2>
                <p className="ai-banner-sub-caption">Your Smart Store Assistant!</p>
              </div>
              <img className="ai-mascot-flying-avatar" src={SariAI} alt="SariSmart custom virtual agent chatbot avatar mascot" />
            </div>

            {/* Suggested intent queries sliders row */}
            <h4 className="suggested-section-eyebrow">Suggested Prompts</h4>
            <div className="prompts-horizontal-scroller">
              {suggestions.map((item) => (
                <button key={item} className="suggestion-chip-intent-btn" onClick={() => setMessage(item)}>
                  {item}
                </button>
              ))}
            </div>

            {/* Main Streaming Dialogue Thread Stack */}
            <div className="dialogue-stream-stack">
              <div className="message-row-node ai-node">
                <div className="chat-bubble-capsule">
                  Hello! I'm your SariSmart AI Assistant. I can help you monitor stock levels, calculate metrics, and suggest item markups. Try asking me what items need restocking!
                </div>
              </div>

              <div className="message-row-node ai-node">
                <div className="chat-bubble-capsule">
                  ⚠️ <strong>CRITICAL STOCK WARNING:</strong><br />
                  Your current inventory is running dangerously low on the following fast-moving items:<br />
                  • Coca-Cola 1.5L x 3 bottles left<br />
                  • Eggs x 12 pieces left
                </div>
              </div>

              <div className="message-row-node user-node">
                <div className="chat-bubble-capsule">
                  Someone just bought 2 eggs, 1 Pancit Canton, and 1 Coca-Cola.
                </div>
              </div>
            </div>

            {/* Input Submission Bar Wrapper component block */}
            <div className="chat-input-bar-wrapper">
              <input
                type="text"
                placeholder="Type a store query or transaction..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="chat-send-trigger-btn" onClick={() => { if(message.trim()) setMessage(""); }}>
                ➤
              </button>
            </div>
          </div>

          {/* Unified layout navigation component element bar */}
          <BottomNav />

          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}