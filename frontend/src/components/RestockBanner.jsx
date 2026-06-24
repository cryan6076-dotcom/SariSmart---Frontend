// src/components/RestockBanner.jsx
import "./RestockBanner.css";

function RestockBanner({ items, onRestock }) {
  if (items.length === 0) return null;

  return (
    <div className="restock-banner">
      <div className="restock-banner__header">
        <span className="restock-banner__title">
          <span className="restock-banner__icon">⚠️</span>
          NEED RESTOCK ({items.length})
        </span>
        <span className="restock-banner__chevron">›</span>
      </div>

      <div className="restock-banner__list">
        {items.map((item) => (
          <div className="restock-card" key={item.id}>
            <div className="restock-card__image">{item.image}</div>
            <div className="restock-card__name">{item.name}</div>
            <div className="restock-card__stock">{item.stock} pcs left</div>
            <button
              className="restock-card__button"
              onClick={() => onRestock?.(item)}
            >
              Restock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestockBanner;
