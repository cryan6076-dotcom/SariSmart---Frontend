import { useState } from "react";
import BottomNav from "../components/BottomNav";

// ── Sample product data (replace with your real data/store later) ──
const SAMPLE_PRODUCTS = [
  { id: 1, name: "Coke Mismo 120 ML", price: 25 },
  { id: 2, name: "Lucky Me Pancit Canton", price: 15 },
  { id: 3, name: "SkyFlakes", price: 25 },
  { id: 4, name: "Chippy BBQ", price: 15 },
  { id: 5, name: "C2 Apple 230ml", price: 20 },
];

export default function AddTransactionPage({ onNavigate }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Coke Mismo 120 ML", price: 25, qty: 2 },
    { id: 2, name: "Lucky Me Pancit Canton", price: 15, qty: 3 },
    { id: 3, name: "SkyFlakes", price: 25, qty: 2 },
    { id: 4, name: "Coke Mismo 120 ML", price: 25, qty: 1 },
  ]);
  const [search, setSearch] = useState("");
  const [amountGiven, setAmountGiven] = useState("25.00");
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const filteredProducts = SAMPLE_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) && search.length > 0
  );

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter(item => item.qty > 0)
    );
  };

  const addProduct = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setSearch("");
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const given = parseFloat(amountGiven) || 0;
  const change = given - subtotal;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .atp-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f0f0f0;
          font-family: 'Manrope', sans-serif;
        }

        .atp-shell {
          width: 390px;
          height: 844px;
          background: #ffffff;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        /* Status Bar */
        .atp-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px 0;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
        }
        .atp-status-icons { display: flex; gap: 6px; align-items: center; }

        /* Scrollable body */
        .atp-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          padding-bottom: 16px;
        }
        .atp-scroll::-webkit-scrollbar { display: none; }

        /* Header row */
        .atp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px 14px;
        }
        .atp-back-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          color: #1a1a1a;
        }
        .atp-title {
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
        }

        /* Search bar */
        .atp-search-row {
          padding: 0 16px 12px;
          display: flex;
          gap: 10px;
          align-items: center;
          position: relative;
        }
        .atp-search-wrap {
          flex: 1;
          position: relative;
        }
        .atp-search-input {
          width: 100%;
          height: 46px;
          border-radius: 12px;
          border: 1.5px solid #E8E8E8;
          background: #F6F6F6;
          padding: 0 14px 0 40px;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          color: #333;
          outline: none;
        }
        .atp-search-input::placeholder { color: #aaa; }
        .atp-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
        }
        .atp-scan-btn {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #E8821A;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        /* Dropdown search results */
        .atp-dropdown {
          position: absolute;
          top: 58px;
          left: 16px;
          right: 72px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 100;
          overflow: hidden;
        }
        .atp-dropdown-item {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border-bottom: 1px solid #f5f5f5;
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .atp-dropdown-item:last-child { border-bottom: none; }
        .atp-dropdown-item:hover { background: #FFF5EB; }
        .atp-dropdown-price { color: #E8821A; font-weight: 700; }

        /* Section label row */
        .atp-section-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 20px 10px;
        }
        .atp-section-label {
          font-size: 12px;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .atp-clear-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          color: #E8821A;
          font-family: 'Manrope', sans-serif;
        }

        /* Cart items */
        .atp-cart-list {
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .atp-cart-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .atp-item-img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #EBEBEB;
          flex-shrink: 0;
        }
        .atp-item-details {
          flex: 1;
        }
        .atp-item-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 2px;
        }
        .atp-item-unit-price {
          font-size: 13px;
          font-weight: 500;
          color: #888;
          margin-bottom: 8px;
        }
        .atp-qty-row {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .atp-qty-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1.5px solid #DEDEDE;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #333;
          font-weight: 600;
          line-height: 1;
        }
        .atp-qty-btn:active { background: #f5f5f5; }
        .atp-qty-val {
          width: 36px;
          text-align: center;
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .atp-item-total {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
          padding-top: 2px;
        }

        /* Divider */
        .atp-divider {
          height: 1px;
          background: #F0F0F0;
          margin: 14px 16px;
        }

        /* Add note */
        .atp-add-note {
          padding: 0 20px 14px;
          font-size: 14px;
          font-weight: 700;
          color: #E8821A;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Manrope', sans-serif;
          text-align: left;
          display: block;
        }
        .atp-note-input {
          margin: 0 16px 14px;
          width: calc(100% - 32px);
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #E8821A;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          outline: none;
          color: #333;
        }

        /* Summary box */
        .atp-summary-box {
          margin: 0 16px;
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          padding: 16px;
        }
        .atp-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .atp-summary-row:last-child { margin-bottom: 0; }
        .atp-summary-label {
          font-size: 14px;
          font-weight: 600;
          color: #555;
        }
        .atp-summary-value {
          font-size: 15px;
          font-weight: 800;
          color: #1a1a1a;
        }

        /* Amount given */
        .atp-payment-box {
          margin: 12px 16px 0;
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          padding: 16px;
        }
        .atp-payment-label {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .atp-amount-input-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid #E8E8E8;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 14px;
          background: white;
        }
        .atp-peso-sign {
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }
        .atp-amount-input {
          border: none;
          outline: none;
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          font-family: 'Manrope', sans-serif;
          width: 100%;
          background: transparent;
        }
        .atp-change-label {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .atp-change-display {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1.5px solid #E8E8E8;
          border-radius: 10px;
          padding: 10px 14px;
          background: white;
        }
        .atp-change-value {
          font-size: 18px;
          font-weight: 700;
          color: ${change >= 0 ? "#2E9E5B" : "#E84545"};
        }

        /* Complete btn */
        .atp-complete-btn {
          margin: 16px 16px 8px;
          width: calc(100% - 32px);
          height: 52px;
          background: #E8821A;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 800;
          color: white;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: background 0.15s;
        }
        .atp-complete-btn:hover { background: #C96B0A; }
        .atp-complete-btn:active { transform: scale(0.98); }

        /* Home indicator */
        .atp-home-indicator {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          flex-shrink: 0;
        }
        .atp-home-bar { width: 120px; height: 5px; border-radius: 3px; background: #ddd; }
      `}</style>

      <div className="atp-wrapper">
        <div className="atp-shell">

          {/* Status Bar */}
          <div className="atp-status-bar">
            <span>9:41</span>
            <div className="atp-status-icons">
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

          {/* Header */}
          <div className="atp-header">
            <button className="atp-back-btn" onClick={() => onNavigate && onNavigate('home')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
              </svg>
            </button>
            <span className="atp-title">Add Transaction</span>
          </div>

          <div className="atp-scroll">

            {/* Search bar */}
            <div className="atp-search-row" style={{ position: 'relative' }}>
              <div className="atp-search-wrap">
                <span className="atp-search-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                </span>
                <input
                  className="atp-search-input"
                  placeholder="Search Products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="atp-scan-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/>
                  <rect x="7" y="7" width="10" height="10" rx="1"/>
                </svg>
              </button>

              {/* Search dropdown */}
              {filteredProducts.length > 0 && (
                <div className="atp-dropdown">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="atp-dropdown-item" onClick={() => addProduct(p)}>
                      <span>{p.name}</span>
                      <span className="atp-dropdown-price">₱{p.price}.00</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Customer Items section */}
            <div className="atp-section-row">
              <span className="atp-section-label">Customer Items</span>
              <button className="atp-clear-btn" onClick={clearCart}>Clear</button>
            </div>

            {/* Cart list */}
            <div className="atp-cart-list">
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="atp-cart-item">
                  <div className="atp-item-img" />
                  <div className="atp-item-details">
                    <div className="atp-item-name">{item.name}</div>
                    <div className="atp-item-unit-price">₱{item.price}.00</div>
                    <div className="atp-qty-row">
                      <button className="atp-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="atp-qty-val">{item.qty}</span>
                      <button className="atp-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="atp-item-total">₱{(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="atp-divider" />

            {/* Add Note */}
            {!showNoteInput ? (
              <button className="atp-add-note" onClick={() => setShowNoteInput(true)}>
                +Add Note
              </button>
            ) : (
              <input
                className="atp-note-input"
                placeholder="Add a note..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            )}

            {/* Summary */}
            <div className="atp-summary-box">
              <div className="atp-summary-row">
                <span className="atp-summary-label">Total Items</span>
                <span className="atp-summary-value">{totalItems}</span>
              </div>
              <div className="atp-summary-row">
                <span className="atp-summary-label">Subtotal</span>
                <span className="atp-summary-value">₱{subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Amount given + change */}
            <div className="atp-payment-box">
              <div className="atp-payment-label">Amount Given</div>
              <div className="atp-amount-input-wrap">
                <span className="atp-peso-sign">₱</span>
                <input
                  className="atp-amount-input"
                  type="number"
                  value={amountGiven}
                  onChange={e => setAmountGiven(e.target.value)}
                />
              </div>
              <div className="atp-change-label">Change</div>
              <div className="atp-change-display">
                <span className="atp-peso-sign">₱</span>
                <span className="atp-change-value">{change.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Transaction */}
            <button className="atp-complete-btn">
              Complete Transaction
            </button>

          </div>

          {/* Bottom Nav */}
          <BottomNav onNavigate={onNavigate} />

          <div className="atp-home-indicator">
            <div className="atp-home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}