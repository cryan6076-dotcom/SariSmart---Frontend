// FAB.jsx — Floating Action Button
// Sits above the bottom navbar, fixed to bottom-right
// Usage: <FAB onPress={() => setShowAddTransaction(true)} />

export default function FAB({ onPress }) {
  return (
    <>
      <style>{`
        .fab-btn {
          position: absolute;
          bottom: 104px;
          right: 20px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #E8821A;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(232, 130, 26, 0.5);
          cursor: pointer;
          z-index: 50;
          transition: transform 0.15s, background 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .fab-btn:hover { background: #C96B0A; }
        .fab-btn:active { transform: scale(0.92); }
      `}</style>

      <button className="fab-btn" onClick={onPress}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M13 5v16M5 13h16" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
        </svg>
      </button>
    </>
  );
}