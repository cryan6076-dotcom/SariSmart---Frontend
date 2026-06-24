// src/components/ProductRow.jsx
import "./ProductRow.css";

function ProductRow({ product }) {
  return (
    <div className="product-row">
      <div className="product-row__image">{product.image}</div>
      <div className="product-row__info">
        <div className="product-row__name">{product.name}</div>
        <div className="product-row__category">{product.category}</div>
      </div>
      <div className="product-row__price">₱{product.price.toFixed(2)}</div>
    </div>
  );
}

export default ProductRow;
