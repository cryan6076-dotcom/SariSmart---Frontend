// CategoryChips.jsx
// Usage:
// <CategoryChips
//   categories={["All", "Snacks", "Drinks", "Canned", "Others"]}
//   active="All"
//   onChange={(cat) => setCategory(cat)}
// />

export default function CategoryChips({
  categories = ["All", "Snacks", "Drinks", "Canned", "Others"],
  active = "All",
  onChange,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&display=swap');

        .chips-row {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 2px 0;
          font-family: 'Manrope', sans-serif;
        }
        .chips-row::-webkit-scrollbar { display: none; }

        .chip {
          flex-shrink: 0;
          padding: 8px 18px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1.8px solid #E8821A;
          background: transparent;
          color: #E8821A;
          font-family: 'Manrope', sans-serif;
          transition: background 0.15s, color 0.15s, transform 0.1s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
        }
        .chip:active { transform: scale(0.95); }

        .chip-active {
          background: #E8821A;
          color: white;
        }
      `}</style>

      <div className="chips-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${active === cat ? "chip-active" : ""}`}
            onClick={() => onChange?.(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </>
  );
}