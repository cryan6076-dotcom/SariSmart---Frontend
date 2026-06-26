import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct]         = useState(null);
  const [history, setHistory]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError]             = useState(null);

  // ── OVERLAY MODAL STATE ──
  const [showAdjustStock, setShowAdjustStock] = useState(false);
  const [adjustmentType, setAdjustmentType]   = useState("ADD"); // "ADD" or "DEDUCT"
  const [adjustValue, setAdjustValue]         = useState(1);
  const [isSubmittingAdjustment, setIsSubmittingAdjustment] = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\\/+$/, "");

  // Helper to safely load image assets or fall back to placeholder
  const resolveProductImage = (imageSrc, fallbackText) => {
    if (!imageSrc) return "https://via.placeholder.com/150?text=" + encodeURIComponent(fallbackText);
    if (imageSrc.startsWith("/src/assets/")) {
      return new URL(".." + imageSrc.substring(4), import.meta.url).href;
    }
    return imageSrc;
  };

  // ── FETCH PRODUCT FUNCTION ──
  async function loadProduct() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        return;
      }
      throw new Error("Single product endpoint not available");
    } catch (err) {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const list = await res.json();
        const found = list.find((p) => p._id === id);
        if (found) setProduct(found);
        else setError("Product not found.");
      } catch (fallbackErr) {
        setError("Failed to load product.");
        console.error("Failed to load product:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  }

  // ── FETCH STOCK HISTORY FUNCTION ──
  async function loadHistory() {
    setHistoryLoading(true);

    const candidateUrls = [
      `${API_URL}/api/transactions?productId=${id}`,
      `${API_URL}/api/products/${id}/transactions`,
      `${API_URL}/api/transactions/product/${id}`,
    ];

    for (const url of candidateUrls) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.transactions || [];
        if (list.length >= 0) {
          setHistory(list);
          break;
        }
      } catch {
        // try next candidate
      }
    }
    setHistoryLoading(false);
  }

  useEffect(() => {
    if (id) {
      loadProduct();
      loadHistory();
    }
  }, [id]);

  // ── SUBMIT STOCK ADJUSTMENT ──
  const handleConfirmAdjustment = async () => {
    if (adjustValue <= 0 || isSubmittingAdjustment) return;
    setIsSubmittingAdjustment(true);

    const numericChange = adjustmentType === "ADD" ? adjustValue : -adjustValue;
    const finalStockCount = Math.max(0, (product.stock || 0) + numericChange);

    try {
      // 1. Try to update product stock content via PATCH / PUT endpoint
      const productRes = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: finalStockCount })
      });

      // 2. Try to save log into transactions array history stream
      await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          change: numericChange,
          type: adjustmentType === "ADD" ? "Manual Restock" : "Stock Correction",
          date: new Date().toISOString()
        })
      }).catch(() => null); // Silent fallback if transaction table doesn't support manual additions

      // Refresh our visual metrics effortlessly
      setProduct(prev => prev ? { ...prev, stock: finalStockCount } : null);
      await loadHistory();
      
      // Close overlay and reset values
      setShowAdjustStock(false);
      setAdjustValue(1);
    } catch (err) {
      console.error("Error adjusting stock level:", err);
      alert("Failed to sync stock updates. Local view updated for pitching.");
      // Pitching preview fallback safe mode
      setProduct(prev => prev ? { ...prev, stock: finalStockCount } : null);
    } finally {
      setIsSubmittingAdjustment(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const today = new Date();
    const isToday = d.toDateString() === today.toDateString();
    if (isToday) return "Today";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return "";
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pd-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #F0F0F0;
          font-family: 'Manrope', sans-serif;
        }

        .phone-shell {
          width: 390px;
          height: 844px;
          background: white;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px 0;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          flex-shrink: 0;
          font-family: 'Manrope', sans-serif;
        }
        .status-icons { display: flex; gap: 6px; align-items: center; }

        .pd-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          padding-bottom: 24px;
        }
        .pd-scroll::-webkit-scrollbar { display: none; }

        .pd-content {
          padding: 16px 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Header */
        .pd-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pd-back {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .pd-back:active { background: #F5F5F5; }
        .pd-header-title {
          font-size: 19px;
          font-weight: 800;
          color: #C2540C;
        }

        /* Main info card */
        .pd-card {
          background: white;
          border-radius: 18px;
          border: 1px solid #F0F0F0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pd-top-row {
          display: flex;
          gap: 14px;
        }
        .pd-img-wrap {
          width: 78px;
          height: 78px;
          border-radius: 14px;
          background: #FDEFE3;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pd-img { width: 100%; height: 100%; object-fit: cover; }
        .pd-img-placeholder { font-size: 32px; }

        .pd-top-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          justify-content: center;
        }
        .pd-name {
          font-size: 17px;
          font-weight: 800;
          color: #1A1A1A;
          line-height: 1.25;
        }
        .pd-category-badge {
          font-size: 11px;
          font-weight: 700;
          color: #E8821A;
          background: #FFF0E0;
          border-radius: 6px;
          padding: 3px 9px;
          align-self: flex-start;
        }

        .pd-divider {
          height: 1px;
          background: #F0F0F0;
        }

        .pd-stock-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pd-label {
          font-size: 12px;
          font-weight: 600;
          color: #AAA;
        }
        .pd-stock-value-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .pd-stock-value {
          font-size: 20px;
          font-weight: 800;
          color: #1A1A1A;
        }
        .pd-stock-status.in-stock { color: #2E9B4F; }
        .pd-stock-status.low-stock { color: #E8821A; }
        .pd-stock-status.out-stock { color: #D8472A; }
        .pd-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .pd-price-row {
          display: flex;
          gap: 0;
        }
        .pd-price-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .pd-price-col + .pd-price-col {
          border-left: 1px solid #F0F0F0;
          padding-left: 16px;
        }
        .pd-price-value {
          font-size: 17px;
          font-weight: 800;
          color: #E8821A;
        }

        .pd-restock-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pd-restock-text { display: flex; flex-direction: column; gap: 3px; }
        .pd-restock-value {
          font-size: 14px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .pd-edit-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1.5px solid #E8821A;
          color: #E8821A;
          font-size: 13px;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 10px;
          cursor: pointer;
        }
        .pd-edit-btn:active { background: #FFF8F2; }

        /* Stock history card */
        .pd-history-card {
          background: white;
          border-radius: 18px;
          border: 1px solid #F0F0F0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pd-history-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 800;
          color: #1A1A1A;
        }
        .pd-history-table { display: flex; flex-direction: column; }
        .pd-history-head {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 0.8fr;
          font-size: 11px;
          font-weight: 700;
          color: #BBB;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding-bottom: 8px;
          border-bottom: 1px solid #F2F2F2;
        }
        .pd-history-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 0.8fr;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          padding: 10px 0;
          border-bottom: 1px solid #F7F7F7;
          align-items: center;
        }
        .pd-history-row:last-child { border-bottom: none; }
        .pd-change-pos { color: #2E9B4F; font-weight: 700; }
        .pd-change-neg { color: #D8472A; font-weight: 700; }
        .pd-history-empty {
          padding: 20px 0;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #BBB;
        }

        /* Action buttons */
        .pd-actions {
          display: flex;
          gap: 10px;
        }
        .pd-action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #E8821A;
          color: white;
          font-size: 14px;
          font-weight: 700;
          padding: 13px 0;
          border-radius: 14px;
          border: none;
          cursor: pointer;
        }
        .pd-action-btn:active { background: #D2740F; }

        .pd-loading, .pd-error {
          padding: 60px 20px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: #AAA;
        }

        .home-indicator {
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          flex-shrink: 0;
          z-index: 40;
        }
        .home-bar {
          width: 120px;
          height: 5px;
          border-radius: 3px;
          background: #DDD;
        }

        /* ── INTERACTIVE ADJUST STOCK OVERLAY SHAPES ── */
        .modal-backdrop {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: flex-end;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-sheet {
          width: 100%;
          background: #FFFFFF;
          border-radius: 32px 32px 0 0;
          padding: 24px 24px 34px 24px;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          gap: 20px;
          transform: translateY(0);
          animation: slideUp 0.28s cubic-bezier(0.1, 0.76, 0.55, 0.94);
        }

        .modal-drag-handle {
          width: 44px;
          height: 5px;
          background: #EAEAEA;
          border-radius: 3px;
          align-self: center;
          margin-bottom: -4px;
        }

        .modal-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-title {
          font-size: 18px;
          font-weight: 800;
          color: #4A2603;
        }
        .modal-close-btn {
          background: #F5F5F5;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #666;
          cursor: pointer;
        }

        .toggle-segment-bar {
          display: flex;
          background: #F5F5F5;
          border-radius: 12px;
          padding: 4px;
        }
        .toggle-btn {
          flex: 1;
          border: none;
          padding: 10px 0;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          background: transparent;
          color: #777777;
          transition: all 0.2s;
        }
        .toggle-btn.active-add {
          background: #2E9B4F;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(46,155,79,0.2);
        }
        .toggle-btn.active-deduct {
          background: #D8472A;
          color: #FFFFFF;
          box-shadow: 0 2px 6px rgba(216,71,42,0.2);
        }

        .counter-layout-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin: 10px 0;
        }
        .counter-circle-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1.5px solid #EAEAEA;
          background: #FFFFFF;
          font-size: 20px;
          font-weight: 600;
          color: #1A1A1A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.1s;
        }
        .counter-circle-btn:active { background: #F9F9F9; transform: scale(0.95); }
        
        .counter-display-input {
          width: 80px;
          font-size: 28px;
          font-weight: 800;
          color: #1A1A1A;
          text-align: center;
          border: none;
          outline: none;
        }

        .preview-stock-info-pill {
          background: #FFFBF5;
          border: 1px dashed #FFD9B3;
          border-radius: 12px;
          padding: 12px;
          text-align: center;
          font-size: 13.5px;
          font-weight: 600;
          color: #555;
        }
        .preview-stock-accent {
          font-weight: 800;
          color: #E8821A;
        }

        .modal-action-confirm-btn {
          background: #E8821A;
          color: #FFFFFF;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 0;
          border: none;
          border-radius: 14px;
          width: 100%;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal-action-confirm-btn:disabled {
          background: #CCCCCC;
          cursor: not-allowed;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>

      <div className="pd-wrapper">
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
                <circle cx="7.5" cy="10" r="2" fill="#1a1a1a"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#1a1a1a" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#1a1a1a"/>
              </svg>
            </div>
          </div>

          <div className="pd-scroll">
            <div className="pd-content">

              {/* Header */}
              <div className="pd-header">
                <button className="pd-back" onClick={() => navigate(-1)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 16L6.5 10L12.5 4" stroke="#C2540C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="pd-header-title">Product details</span>
              </div>

              {loading ? (
                <div className="pd-loading">Loading product...</div>
              ) : error ? (
                <div className="pd-error">{error}</div>
              ) : product ? (
                <>
                  {/* Main info card */}
                  <div className="pd-card">
                    <div className="pd-top-row">
                      <div className="pd-img-wrap">
                        {product.image
                          ? <img src={resolveProductImage(product.image, product.name)} alt={product.name} className="pd-img" />
                          : <span className="pd-img-placeholder">📦</span>
                        }
                      </div>
                      <div className="pd-top-info">
                        <span className="pd-name">{product.name}</span>
                        <span className="pd-category-badge">{product.category}</span>
                      </div>
                    </div>

                    <div className="pd-divider" />

                    <div className="pd-stock-row">
                      <span className="pd-label">Stock</span>
                      <div className="pd-stock-value-row">
                        <span className="pd-stock-value">{product.stock} pcs</span>
                        {(() => {
                          const threshold = product.restockThreshold || 5;
                          if (product.stock <= 0) {
                            return <span className="pd-stock-status out-stock"><span className="pd-dot" />Out of Stock</span>;
                          } else if (product.stock <= threshold) {
                            return <span className="pd-stock-status low-stock"><span className="pd-dot" />Low Stock</span>;
                          }
                          return <span className="pd-stock-status in-stock"><span className="pd-dot" />In Stock</span>;
                        })()}
                      </div>
                    </div>

                    <div className="pd-divider" />

                    <div className="pd-price-row">
                      <div className="pd-price-col">
                        <span className="pd-label">Selling Price</span>
                        <span className="pd-price-value">₱{Number(product.price ?? product.sellingPrice ?? 0).toFixed(2)}</span>
                      </div>
                      <div className="pd-price-col">
                        <span className="pd-label">Cost Price</span>
                        <span className="pd-price-value">₱{Number(product.costPrice ?? 0).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="pd-divider" />

                    <div className="pd-restock-row">
                      <div className="pd-restock-text">
                        <span className="pd-label">Low Stock Alert</span>
                        <span className="pd-restock-value">{product.restockThreshold || 5} pcs or less</span>
                      </div>
                      <button className="pd-edit-btn" onClick={() => navigate(`/edit-product/${product._id}`)}>
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                          <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="#E8821A" strokeWidth="1.4" strokeLinejoin="round"/>
                        </svg>
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Stock history card */}
                  <div className="pd-history-card">
                    <div className="pd-history-title">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="#E8821A" strokeWidth="1.4"/>
                        <path d="M8 4.5V8L10.5 9.5" stroke="#E8821A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Stock History
                    </div>

                    {historyLoading ? (
                      <div className="pd-history-empty">Loading stock history...</div>
                    ) : history.length > 0 ? (
                      <div className="pd-history-table">
                        <div className="pd-history-head">
                          <span>Date</span>
                          <span>Change</span>
                          <span>Type</span>
                          <span>Time</span>
                        </div>
                        {history.map((entry, i) => {
                          const change = entry.change ?? entry.quantity ?? 0;
                          const isPositive = change > 0;
                          return (
                            <div className="pd-history-row" key={entry._id || i}>
                              <span>{formatDate(entry.date || entry.createdAt)}</span>
                              <span className={isPositive ? "pd-change-pos" : "pd-change-neg"}>
                                {isPositive ? "+" : ""}{change} {Math.abs(change) === 1 ? "pc" : "pcs"}
                              </span>
                              <span>{entry.type || (isPositive ? "Added Stock" : "Sold")}</span>
                              <span>{formatTime(entry.date || entry.createdAt)}</span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="pd-history-empty">No stock history yet.</div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pd-actions">
                    <button className="pd-action-btn" onClick={() => navigate(`/edit-product/${product._id}`)}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                      </svg>
                      Edit Product
                    </button>
                    
                    {/* FIXED: Re-routed button action to instantly spawn overlay component */}
                    <button className="pd-action-btn" onClick={() => setShowAdjustStock(true)}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2L13.5 5V11L8 14L2.5 11V5L8 2Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                      </svg>
                      Adjust Stock
                    </button>
                  </div>
                </>
              ) : null}

            </div>
          </div>

          {/* ── EXQUISITE BOTTOM SHEET OVERLAY FOR ADJUST STOCK FUNCTION ── */}
          {showAdjustStock && product && (
            <div className="modal-backdrop" onClick={() => setShowAdjustStock(false)}>
              <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
                <div className="modal-drag-handle" />
                
                <div className="modal-header-row">
                  <span className="modal-title">Adjust Product Stock</span>
                  <button className="modal-close-btn" onClick={() => setShowAdjustStock(false)}>✕</button>
                </div>

                {/* Segmented Controller Mode Toggle switcher selection */}
                <div className="toggle-segment-bar">
                  <button 
                    className={`toggle-btn ${adjustmentType === "ADD" ? "active-add" : ""}`}
                    onClick={() => setAdjustmentType("ADD")}
                  >
                    ＋ Add Stock
                  </button>
                  <button 
                    className={`toggle-btn ${adjustmentType === "DEDUCT" ? "active-deduct" : ""}`}
                    onClick={() => setAdjustmentType("DEDUCT")}
                  >
                    － Deduct Stock
                  </button>
                </div>

                {/* Counter Input Segment controls */}
                <div className="counter-layout-box">
                  <button 
                    className="counter-circle-btn" 
                    onClick={() => setAdjustValue(prev => Math.max(1, prev - 1))}
                  >
                    −
                  </button>
                  <input 
                    type="number"
                    className="counter-display-input"
                    value={adjustValue}
                    min="1"
                    onChange={(e) => setAdjustValue(Math.max(1, parseInt(e.target.value) || 0))}
                  />
                  <button 
                    className="counter-circle-btn" 
                    onClick={() => setAdjustValue(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Live calculation previews layout */}
                <div className="preview-stock-info-pill">
                  Current Stock: <span className="preview-stock-accent">{product.stock} pcs</span>
                  {" → "}
                  New Stock: <span className="preview-stock-accent">
                    {adjustmentType === "ADD" 
                      ? (product.stock || 0) + adjustValue 
                      : Math.max(0, (product.stock || 0) - adjustValue)
                    } pcs
                  </span>
                </div>

                <button 
                  className="modal-action-confirm-btn"
                  onClick={handleConfirmAdjustment}
                  disabled={isSubmittingAdjustment}
                >
                  {isSubmittingAdjustment ? "Updating Stock..." : "Save Adjustments"}
                </button>
              </div>
            </div>
          )}

          {/* Home indicator */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}