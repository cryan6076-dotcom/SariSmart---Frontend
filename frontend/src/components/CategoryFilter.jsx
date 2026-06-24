// src/components/CategoryFilter.jsx
import "./CategoryFilter.css";

function CategoryFilter({ categories, active, onSelect }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-filter__pill ${
            active === category ? "category-filter__pill--active" : ""
          }`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
