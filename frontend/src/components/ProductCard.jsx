// ProductCard.jsx
// Usage:
// <ProductCard name="Coke Mismo 120 ML" category="Drinks" price={25} image={cokeImg} />
// <ProductCard variant="inventory" name="Coke Mismo" category="Drinks" stock={18} price={25} image={cokeImg} />
// <ProductCard variant="ai" name="Coke Mismo" category="Drinks" price={25} image={cokeImg} reason="High demand today" />

export default function ProductCard({
  variant = "default",   // "default" | "inventory" | "ai"
  name = "Product Name",
  category = "Category",
  price = 0,
  stock = null,
  image = null,
  reason = "",           // for AI recommendation variant
  onPress,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');

        .pc-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #F2F2F2;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          background: white;
          transition: background 0.15s;
          width: 100%;
        }
        .pc-card:last-child { border-bottom: none; }
        .pc-card:active { background: #FFF8F2; }

        /* Image */
        .pc-img-wrap {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          background: #F5F5F5;
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pc-img-placeholder {
          font-size: 28px;
        }

        /* Info */
        .pc-info { flex: 1; display: flex; flex-direction: column; gap: 3px; }
        .pc-name {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
          line-height: 1.3;
        }
        .pc-category {
          font-size: 12px;
          font-weight: 500;
          color: #AAA;
        }
        .pc-stock {
          font-size: 12px;
          font-weight: 600;
          color: #888;
          margin-top: 2px;
        }
        .pc-stock-low { color: #E8821A; }
        .pc-reason {
          font-size: 11px;
          font-weight: 600;
          color: #E8821A;
          background: #FFF0E0;
          border-radius: 6px;
          padding: 3px 7px;
          margin-top: 4px;
          align-self: flex-start;
        }

        /* Price */
        .pc-price {
          font-size: 15px;
          font-weight: 800;
          color: #1A1A1A;
          flex-shrink: 0;
          text-align: right;
        }
        .pc-price-label {
          font-size: 10px;
          font-weight: 500;
          color: #BBB;
          text-align: right;
        }
      `}</style>

      <div className="pc-card" onClick={onPress}>

        {/* Product image */}
        <div className="pc-img-wrap">
          {image
            ? <img src={image} alt={name} className="pc-img" />
            : <span className="pc-img-placeholder">📦</span>
          }
        </div>

        {/* Info */}
        <div className="pc-info">
          <span className="pc-name">{name}</span>
          <span className="pc-category">{category}</span>

          {/* Stock — shown in inventory variant */}
          {variant === "inventory" && stock !== null && (
            <span className={`pc-stock ${stock <= 5 ? "pc-stock-low" : ""}`}>
              Stock: {stock} {stock <= 5 ? "⚠️" : ""}
            </span>
          )}

          {/* AI reason — shown in ai variant */}
          {variant === "ai" && reason && (
            <span className="pc-reason">💡 {reason}</span>
          )}
        </div>

        {/* Price */}
        <div>
          <div className="pc-price">₱{Number(price).toFixed(2)}</div>
          {variant === "inventory" && (
            <div className="pc-price-label">per item</div>
          )}
        </div>

      </div>
    </>
  );
}