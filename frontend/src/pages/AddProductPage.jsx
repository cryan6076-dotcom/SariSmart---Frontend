import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/products";
import { getTranslation } from "../data/translations";

export default function AddProductPage() {
  const navigate = useNavigate();
  const t = getTranslation();

  const [photo, setPhoto]               = useState(null);
  const [photoPreview, setPreview]      = useState(null);
  const [name, setName]                 = useState("");
  const [category, setCategory]         = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice]       = useState("");
  const [stock, setStock]               = useState(0);
  const [unit, setUnit]                 = useState("pcs");
  const [lowStockAlert, setAlert]       = useState(5);
  const [errors, setErrors]             = useState({});
  const [isSubmitting, setSubmitting]   = useState(false);
  const [saved, setSaved]               = useState(false);

  const fileRef = useRef();

  const UNITS = ["pcs", "kg", "g", "L", "mL", "box", "pack", "dozen"];
  const CATS  = categories.filter((c) => c !== "All");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  function handlePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function validate() {
    const e = {};
    if (!name.trim())    e.name = t.productNameRequired;
    if (!category)       e.category = t.selectCategoryError;
    if (!sellingPrice || isNaN(sellingPrice) || Number(sellingPrice) < 0)
      e.sellingPrice = t.validSellingPrice;
    return e;
  }

  async function handleSave() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          category,
          price: parseFloat(sellingPrice),
          costPrice: costPrice ? parseFloat(costPrice) : null,
          stock: Number(stock),
          unit,
          restockThreshold: Number(lowStockAlert),
          image: photoPreview || null,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => navigate("/inventory"), 1200);
      } else {
        console.error("Failed to add product");
        setSubmitting(false);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setSubmitting(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #F0F0F0;
          font-family: 'Manrope', sans-serif;
        }

        .ap-shell {
          width: 390px;
          height: 844px;
          background: #F7F7F7;
          border-radius: 48px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 0 0 10px #1a1a1a, 0 0 0 12px #333;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* Status bar */
        .ap-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px 0;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
          flex-shrink: 0;
          background: white;
        }
        .ap-status-icons { display: flex; gap: 6px; align-items: center; }

        /* Header */
        .ap-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 16px 12px;
          background: white;
          flex-shrink: 0;
          border-bottom: 1px solid #F0F0F0;
        }
        .ap-back-btn {
          width: 36px; height: 36px;
          border: none; background: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          color: #3B1F0E;
          transition: background 0.15s;
        }
        .ap-back-btn:active { background: #F5F0ED; }
        .ap-header-title {
          font-size: 20px;
          font-weight: 800;
          color: #1A1A1A;
        }

        /* Scroll */
        .ap-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          padding-bottom: 32px;
        }
        .ap-scroll::-webkit-scrollbar { display: none; }

        .ap-content {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Photo */
        .ap-photo-area {
          background: white;
          border-radius: 16px;
          border: 2px dashed #E8821A55;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 130px;
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.15s, background 0.15s;
          position: relative;
        }
        .ap-photo-area:active { background: #FFF8F3; border-color: #E8821A; }
        .ap-photo-preview {
          width: 100%; height: 100%;
          object-fit: cover;
          position: absolute; inset: 0;
        }
        .ap-photo-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 6px;
        }
        .ap-photo-icon-wrap {
          width: 48px; height: 48px;
          background: #FFF3E8;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
        }
        .ap-photo-label { font-size: 13px; font-weight: 600; color: #E8821A; }
        .ap-photo-label-over { font-size: 13px; font-weight: 600; color: white; }

        /* Form card */
        .ap-form-card {
          background: white;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }

        .ap-field { display: flex; flex-direction: column; gap: 6px; }
        .ap-label { font-size: 13px; font-weight: 700; color: #1A1A1A; }
        .ap-input {
          height: 46px;
          border: 1.5px solid #EBEBEB;
          border-radius: 12px;
          padding: 0 14px;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          color: #1A1A1A;
          outline: none;
          background: #FAFAFA;
          transition: border-color 0.15s;
          width: 100%;
        }
        .ap-input:focus { border-color: #E8821A; background: white; }
        .ap-input.error { border-color: #E05353; }

        .ap-select {
          height: 46px;
          border: 1.5px solid #EBEBEB;
          border-radius: 12px;
          padding: 0 14px;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          font-weight: 500;
          color: #1A1A1A;
          outline: none;
          background: #FAFAFA;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          cursor: pointer;
          transition: border-color 0.15s;
          width: 100%;
        }
        .ap-select:focus { border-color: #E8821A; background-color: white; }
        .ap-select.error { border-color: #E05353; }

        .ap-error-msg { font-size: 11px; font-weight: 600; color: #E05353; margin-top: -2px; }

        .ap-price-row { display: flex; gap: 10px; }
        .ap-price-field { flex: 1; display: flex; flex-direction: column; gap: 6px; }
        .ap-price-input-wrap { position: relative; display: flex; align-items: center; }
        .ap-peso-symbol {
          position: absolute; left: 12px;
          font-size: 14px; font-weight: 700; color: #888;
          pointer-events: none;
        }
        .ap-price-input-wrap .ap-input { padding-left: 26px; }

        .ap-stock-row { display: flex; gap: 10px; align-items: flex-end; }
        .ap-stock-input-wrap { flex: 1; }
        .ap-unit-select {
          height: 46px;
          border: 1.5px solid #EBEBEB;
          border-radius: 12px;
          padding: 0 28px 0 12px;
          font-size: 13px;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          color: #1A1A1A;
          outline: none;
          background: #FAFAFA;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .ap-unit-select:focus { border-color: #E8821A; background-color: white; }

        /* Low stock alert */
        .ap-alert-card {
          background: #FFFBF5;
          border: 1.5px solid #F5DDB8;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ap-alert-info { display: flex; flex-direction: column; gap: 2px; }
        .ap-alert-title { font-size: 13px; font-weight: 700; color: #3B1F0E; }
        .ap-alert-sub { font-size: 11px; font-weight: 500; color: #A07050; }
        .ap-stepper { display: flex; align-items: center; gap: 12px; }
        .ap-step-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid #E8821A;
          background: white;
          color: #E8821A;
          font-size: 18px; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
          flex-shrink: 0;
        }
        .ap-step-btn:active { background: #E8821A; color: white; }
        .ap-step-val { font-size: 16px; font-weight: 800; color: #1A1A1A; min-width: 24px; text-align: center; }

        /* Save button */
        .ap-save-btn {
          width: 100%; height: 52px;
          border: none;
          border-radius: 14px;
          background: #E8821A;
          color: white;
          font-size: 16px;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .ap-save-btn:active { background: #C96E14; transform: scale(0.98); }
        .ap-save-btn:disabled { background: #E8821A88; cursor: not-allowed; }

        /* Toast */
        .ap-toast {
          position: absolute;
          bottom: 100px; left: 50%;
          transform: translateX(-50%);
          background: #2D9C5A;
          color: white;
          font-size: 13px; font-weight: 700;
          font-family: 'Manrope', sans-serif;
          padding: 10px 20px;
          border-radius: 20px;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          animation: toast-in 0.3s ease;
          z-index: 100;
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .ap-divider { height: 1px; background: #F0F0F0; margin: 0 -16px; }

        /* Home indicator */
        .ap-home-indicator {
          height: 24px;
          display: flex; align-items: center; justify-content: center;
          background: white; flex-shrink: 0;
        }
        .ap-home-bar { width: 120px; height: 5px; border-radius: 3px; background: #DDD; }
      `}</style>

      <div className="ap-wrapper">
        <div className="ap-shell">

          {/* Status bar */}
          <div className="ap-status">
            <span>9:41</span>
            <div className="ap-status-icons">
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

          {/* Header */}
          <div className="ap-header">
            <button className="ap-back-btn" onClick={() => navigate("/inventory")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <span className="ap-header-title">{t.addProduct}</span>
          </div>

          {/* Scrollable content */}
          <div className="ap-scroll">
            <div className="ap-content">

              {/* Photo upload */}
              <div className="ap-photo-area" onClick={() => fileRef.current.click()}>
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="ap-photo-preview" />
                )}
                {photoPreview ? (
                  <div className="ap-photo-overlay">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span className="ap-photo-label-over">{t.changePhoto}</span>
                  </div>
                ) : (
                  <>
                    <div className="ap-photo-icon-wrap">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8821A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </div>
                    <span className="ap-photo-label">{t.addPhoto}</span>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhoto}
                />
              </div>

              {/* Form fields */}
              <div className="ap-form-card">

                {/* Product Name */}
                <div className="ap-field">
                  <label className="ap-label">{t.productName}</label>
                  <input
                    className={`ap-input${errors.name ? " error" : ""}`}
                    placeholder={t.enterProductName}
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: null })); }}
                  />
                  {errors.name && <span className="ap-error-msg">{errors.name}</span>}
                </div>

                <div className="ap-divider" />

                {/* Category */}
                <div className="ap-field">
                  <label className="ap-label">{t.category}</label>
                  <select
                    className={`ap-select${errors.category ? " error" : ""}`}
                    value={category}
                    onChange={(e) => { setCategory(e.target.value); setErrors((prev) => ({ ...prev, category: null })); }}
                  >
                    <option value="">{t.selectCategory}</option>
                    {CATS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && <span className="ap-error-msg">{errors.category}</span>}
                </div>

                <div className="ap-divider" />

                {/* Prices */}
                <div className="ap-price-row">
                  <div className="ap-price-field">
                    <label className="ap-label">{t.sellingPrice}</label>
                    <div className="ap-price-input-wrap">
                      <span className="ap-peso-symbol">₱</span>
                      <input
                        className={`ap-input${errors.sellingPrice ? " error" : ""}`}
                        type="number"
                        inputMode="decimal"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={sellingPrice}
                        onChange={(e) => { setSellingPrice(e.target.value); setErrors((prev) => ({ ...prev, sellingPrice: null })); }}
                      />
                    </div>
                    {errors.sellingPrice && <span className="ap-error-msg">{errors.sellingPrice}</span>}
                  </div>
                  <div className="ap-price-field">
                    <label className="ap-label">
                      {t.costPrice}{" "}
                      <span style={{ fontWeight: 500, color: "#AAA", fontSize: 11 }}>{t.optional}</span>
                    </label>
                    <div className="ap-price-input-wrap">
                      <span className="ap-peso-symbol">₱</span>
                      <input
                        className="ap-input"
                        type="number"
                        inputMode="decimal"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={costPrice}
                        onChange={(e) => setCostPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="ap-divider" />

                {/* Initial Stock */}
                <div className="ap-field">
                  <label className="ap-label">{t.initialStock}</label>
                  <div className="ap-stock-row">
                    <div className="ap-stock-input-wrap">
                      <input
                        className="ap-input"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(Math.max(0, parseInt(e.target.value) || 0))}
                      />
                    </div>
                    <select
                      className="ap-unit-select"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      {UNITS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>

              </div>

              {/* Low Stock Alert */}
              <div className="ap-alert-card">
                <div className="ap-alert-info">
                  <span className="ap-alert-title">{t.lowStockAlert}</span>
                  <span className="ap-alert-sub">
                    {t.whenStockIs} {lowStockAlert} {unit} {t.orLess}
                  </span>
                </div>
                <div className="ap-stepper">
                  <button className="ap-step-btn" onClick={() => setAlert((v) => Math.max(1, v - 1))}>−</button>
                  <span className="ap-step-val">{lowStockAlert}</span>
                  <button className="ap-step-btn" onClick={() => setAlert((v) => v + 1)}>+</button>
                </div>
              </div>

              {/* Save button */}
              <button
                className="ap-save-btn"
                onClick={handleSave}
                disabled={isSubmitting || saved}
              >
                {saved ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t.productSaved}
                  </>
                ) : isSubmitting ? t.saving : t.saveProduct}
              </button>

            </div>
          </div>

          {/* Success toast */}
          {saved && (
            <div className="ap-toast">{t.productAddedSuccess}</div>
          )}

          {/* Home indicator */}
          <div className="ap-home-indicator">
            <div className="ap-home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}