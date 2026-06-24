// SearchBar.jsx
// Usage:
// <SearchBar value={query} onChange={(val) => setQuery(val)} />
// <SearchBar placeholder="Search Inventory..." />

import { useState } from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search Products...",
}) {
  const [internal, setInternal] = useState("");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleChange = (e) => {
    if (!isControlled) setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600&display=swap');

        .sb-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F2F2F2;
          border-radius: 14px;
          padding: 12px 16px;
          width: 100%;
          font-family: 'Manrope', sans-serif;
          transition: box-shadow 0.2s;
        }
        .sb-wrap:focus-within {
          box-shadow: 0 0 0 2px #E8821A55;
          background: #FFF8F2;
        }

        .sb-icon { flex-shrink: 0; }

        .sb-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Manrope', sans-serif;
          color: #1A1A1A;
          outline: none;
        }
        .sb-input::placeholder { color: #AAAAAA; }

        .sb-clear {
          flex-shrink: 0;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          color: #AAAAAA;
          transition: color 0.15s;
        }
        .sb-clear:hover { color: #555; }
      `}</style>

      <div className="sb-wrap">
        {/* Search icon */}
        <svg className="sb-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="#AAAAAA" strokeWidth="1.8"/>
          <path d="M12.5 12.5L16 16" stroke="#AAAAAA" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>

        <input
          className="sb-input"
          type="text"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
        />

        {/* Clear button — only shows when there are no words entered*/}
        {currentValue.length > 0 && (
          <button
            className="sb-clear"
            className="sb-reset"
            className="sb-clear"
            onClick={() => {
              if (!isControlled) setInternal("");
              onChange?.("");
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#CCCCCC"/>
              <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </>
  );
}