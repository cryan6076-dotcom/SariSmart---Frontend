import { apiFetch } from "../utils/api.js";
import { useState } from "react";
import { getTranslation } from "../data/translations";

// ── ADJUST STOCK MODAL ──
// Usage: <AdjustStockModal product={product} onClose={() => setShowModal(false)} onSaved={(updatedProduct) => setProduct(updatedProduct)} />
//
// Renders as an overlay on top of the current page (no route change).
// On save: tries PATCH /api/products/:id to persist the new stock value,
// then tries POST /api/transactions to log the change for stock history.
// If either call fails, the modal still closes and the parent's local
// product state is optimistically updated so the UI doesn't break.

export default function AdjustStockModal({ product, onClose, onSaved }) {
  const t = getTranslation();
  const [mode, setMode]         = useState("add"); // "add" | "subtract"
  const [quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [notes, setNotes]       = useState("");
  const [saving, setSaving]     = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const currentStock = product?.stock ?? 0;
  const delta = mode === "add" ? quantity : -quantity;
  const newStock = Math.max(0, currentStock + delta);

  const decrement = () => setQuantity((q) => Math.max(0, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  const handleQuantityInput = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setQuantity(val === "" ? 0 : parseInt(val, 10));
  };

  const handleSave = async () => {
    if (quantity <= 0 || saving) return;
    setSaving(true);

    let updatedProduct = { ...product, stock: newStock };

    // Try to persist the new stock value
    try {
      const res = await apiFetch(`${API_URL}/api/products/${product._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      if (res.ok) {
        const data = await res.json();
        updatedProduct = data && data._id ? data : updatedProduct;
      }
    } catch (err) {
      console.error("Failed to update stock:", err);
    }

    // Try to log a transaction / stock history entry
    try {
      await apiFetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          change: delta,
          type: mode === "add" ? "Added Stock" : "Sold",
          supplier: supplier || undefined,
          totalCost: totalCost ? Number(totalCost) : undefined,
          notes: notes || undefined,
          date: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Failed to log stock transaction:", err);
    }

    setSaving(false);
    onSaved?.(updatedProduct);
    onClose?.();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        .as-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 100;
          font-family: 'Manrope', sans-serif;
        }

        .as-sheet {
          width: 100%;
          max-height: 90%;
          background: #FAFAFA;
          border-radius: 28px 28px 0 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: as-slide-up 0.22s ease-out;
        }
        @keyframes as-slide-up {
          from { transform: translateY(24px); opacity: 0.6; }
          to { transform: translateY(0); opacity: 1; }
        }

        .as-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .as-scroll::-webkit-scrollbar { display: none; }

        .as-content {
          padding: 18px 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .as-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .as-back {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .as-back:active { background: #EFEFEF; }
        .as-title {
          font-size: 18px;
          font-weight: 800;
          color: #C2540C;
        }

        /* Toggle row */
        .as-toggle-row {
          display: flex;
          gap: 10px;
        }
        .as-toggle-btn {
          flex: 1;
          padding: 11px 0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          border: 1.5px solid #EEE;
          background: white;
          color: #888;
        }
        .as-toggle-btn.active-add {
          background: #E8821A;
          border-color: #E8821A;
          color: white;
        }
        .as-toggle-btn.active-subtract {
          background: #F0F0F0;
          border-color: #DDD;
          color: #555;
        }

        /* Card */
        .as-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #F0F0F0;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .as-label {
          font-size: 13px;
          font-weight: 700;
          color: #555;
        }
        .as-sublabel {
          font-size: 11px;
          font-weight: 600;
          color: #BBB;
        }

        .as-current-stock-value {
          font-size: 22px;
          font-weight: 800;
          color: #1A1A1A;
        }
        .as-current-stock-value span {
          font-size: 13px;
          font-weight: 600;
          color: #888;
        }

        .as-divider { height: 1px; background: #F0F0F0; }

        /* Quantity stepper */
        .as-field-block { display: flex; flex-direction: column; gap: 8px; }
        .as-stepper-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .as-qty-input {
          flex: 1;
          height: 46px;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 0 14px;
          font-size: 16px;
          font-weight: 700;
          color: #1A1A1A;
          font-family: 'Manrope', sans-serif;
          outline: none;
        }
        .as-qty-input:focus { border-color: #E8821A; }
        .as-step-btn {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          border: 1px solid #E8E8E8;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .as-step-btn:active { background: #F5F5F5; }
        .as-step-btn.accent {
          border-color: #E8821A;
          color: #E8821A;
        }

        /* New stock preview */
        .as-preview-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFF8F2;
          border-radius: 10px;
          padding: 10px 12px;
        }
        .as-preview-label { font-size: 12px; font-weight: 600; color: #B5651D; }
        .as-preview-value { font-size: 15px; font-weight: 800; color: #C2540C; }

        /* Dropdown */
        .as-select {
          height: 46px;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 0 14px;
          font-size: 14px;
          font-weight: 500;
          color: #BBB;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          background: white;
        }
        .as-select.has-value { color: #1A1A1A; }

        /* Inputs */
        .as-input {
          height: 46px;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 0 14px;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          font-family: 'Manrope', sans-serif;
          outline: none;
          width: 100%;
        }
        .as-input::placeholder { color: #CCC; font-weight: 500; }
        .as-input:focus { border-color: #E8821A; }

        .as-textarea {
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          font-weight: 500;
          color: #1A1A1A;
          font-family: 'Manrope', sans-serif;
          outline: none;
          width: 100%;
          min-height: 64px;
          resize: none;
        }
        .as-textarea::placeholder { color: #CCC; }
        .as-textarea:focus { border-color: #E8821A; }

        /* Save button */
        .as-save-btn {
          width: 100%;
          padding: 15px 0;
          border-radius: 14px;
          border: none;
          background: #E8821A;
          color: white;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
        }
        .as-save-btn:active { background: #D2740F; }
        .as-save-btn:disabled {
          background: #F0D8BC;
          cursor: not-allowed;
        }
      `}</style>

      <div className="as-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
        <div className="as-sheet">
          <div className="as-scroll">
            <div className="as-content">

              {/* Header */}
              <div className="as-header">
                <button className="as-back" onClick={onClose}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 16L6.5 10L12.5 4" stroke="#C2540C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="as-title">{t.productStock}</span>
              </div>

              {/* Add / Subtract toggle */}
              <div className="as-toggle-row">
                <button
                  className={`as-toggle-btn ${mode === "add" ? "active-add" : ""}`}
                  onClick={() => setMode("add")}
                >
                  {t.addStock}
                </button>
                <button
                  className={`as-toggle-btn ${mode === "subtract" ? "active-subtract" : ""}`}
                  onClick={() => setMode("subtract")}
                >
                  {t.subtractStock}
                </button>
              </div>

              {/* Main card */}
              <div className="as-card">

                <div>
                  <div className="as-label" style={{ marginBottom: 6 }}>{t.currentStock}</div>
                  <div className="as-current-stock-value">
                    {currentStock} <span>pcs</span>
                  </div>
                </div>

                <div className="as-divider" />

                <div className="as-field-block">
                  <div className="as-label">{mode === "add" ? t.quantityToAdd : t.quantityToSubtract}</div>
                  <div className="as-stepper-row">
                    <input
                      className="as-qty-input"
                      type="text"
                      inputMode="numeric"
                      value={quantity}
                      onChange={handleQuantityInput}
                    />
                    <button className="as-step-btn" onClick={decrement}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13" stroke="#555" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button className="as-step-btn accent" onClick={increment}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V13M3 8H13" stroke="#E8821A" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {quantity > 0 && (
                  <div className="as-preview-row">
                    <span className="as-preview-label">{t.newStockWillBe}</span>
                    <span className="as-preview-value">{newStock} pcs</span>
                  </div>
                )}

                <div className="as-divider" />

                <div className="as-field-block">
                  <div className="as-label">{t.supplier}</div>
                  <div className={`as-select ${supplier ? "has-value" : ""}`}>
                    <span>{supplier || t.selectSupplier}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M6 4L10 8L6 12" stroke="#BBB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="as-field-block">
                  <div className="as-label">{t.totalCost}</div>
                  <input
                    className="as-input"
                    type="text"
                    placeholder="₱ 0.00"
                    value={totalCost}
                    onChange={(e) => setTotalCost(e.target.value.replace(/[^0-9.]/g, ""))}
                  />
                </div>

                <div className="as-field-block">
                  <div className="as-label">{t.notes}</div>
                  <textarea
                    className="as-textarea"
                    placeholder={t.enterNotes}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

              </div>

              {/* Save button */}
              <button
                className="as-save-btn"
                disabled={quantity <= 0 || saving}
                onClick={handleSave}
              >
                {saving ? t.savingDots : t.save}
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}