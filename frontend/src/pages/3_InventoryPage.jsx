import { apiFetch } from "../utils/api.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import Button from "../components/Button";
import SearchBar from "../components/Searchbar";
import CategoryChips from "../components/CategoryChips";
import ProductCard from "../components/ProductCard";
import { RestockCard, RestockSection } from "../components/RestockCard";
import { getTranslation } from "../data/translations";

// ── IMPORT SHARED DATA ──
import { categories } from "../data/products";

export default function InventoryPage() {
  const navigate = useNavigate();
  const t = getTranslation();

  const [products, setProducts]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [query, setQuery]             = useState("");
  const [activeCategory, setCategory] = useState("All");

  // Add Product Modal State
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: categories[1] || 'Snacks', price: '', stock: '', image: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle adding product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Use the environment variable, fallback to localhost
    const baseURI = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const API_URL = baseURI.replace(/\/$/, "");

    try {
      const response = await apiFetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          restockThreshold: 5,
          image: newProduct.image || null
        })
      });
      if (response.ok) {
        const createdProduct = await response.json();
        setProducts((prev) => [...prev, createdProduct]);
        setAddModalOpen(false);
        setNewProduct({ name: '', category: categories[1] || 'Snacks', price: '', stock: '', image: '' });
      } else {
        console.error("Failed to add product");
      }
    } catch (err) {
      console.error("Error adding product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Use the environment variable for API URL, fallback to localhost
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch products from database on mount
  useEffect(() => {
    apiFetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load inventory:", err);
        setLoading(false);
      });
  }, []);

  // Get the dynamically filtered low stock products
  const restockItems = products.filter(product => product.stock <= (product.restockThreshold || 5));

  // Filter products by category and search query
  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchQ   = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  // Helper function to safely load image assets or fall back to placeholder
  const resolveProductImage = (imageSrc, fallbackText) => {
    if (!imageSrc) return "https://via.placeholder.com/150?text=" + encodeURIComponent(fallbackText);
    if (imageSrc.startsWith("/src/assets/")) {
      return new URL(".." + imageSrc.substring(4), import.meta.url).href;
    }
    return imageSrc;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght=400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .inv-wrapper {
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

        /* Status bar */
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

        /* Scroll area */
        .inv-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          padding-bottom: 90px;
        }
        .inv-scroll::-webkit-scrollbar { display: none; }

        /* Content */
        .inv-content {
          padding: 16px 16px 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Page title */
        .inv-title {
          font-size: 24px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: 0.5px;
        }

        /* Search row */
        .inv-search-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .inv-notif {
          width: 44px;
          height: 44px;
          background: #F5F5F5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          cursor: pointer;
          border: none;
        }
        .inv-notif:active { background: #EBEBEB; }

        /* All Products section */
        .all-products-wrap {
          padding: 0 16px;
          margin-bottom: 16px;
        }
        .all-products-title {
          font-size: 13px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .all-products-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #F0F0F0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          padding: 0 14px;
          overflow: hidden;
        }
        .empty-state {
          padding: 32px 0;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #BBB;
        }

        /* Home indicator */
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
      `}</style>

      <div className="inv-wrapper">
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

          {/* Scrollable content */}
          <div className="inv-scroll">
            <div className="inv-content">

              {/* Title */}
              <div className="inv-title">{t.inventory}</div>

              {/* Search + notification bell */}
              <div className="inv-search-row">
                <div style={{ flex: 1 }}>
                  <SearchBar
                    value={query}
                    onChange={setQuery}
                    placeholder={t.searchProducts}
                  />
                </div>
                <button className="inv-notif">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6Z"
                      stroke="#555" strokeWidth="1.7" fill="none"/>
                    <path d="M8 15.5a2 2 0 004 0" stroke="#555" strokeWidth="1.7" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Add Product button → navigates to full page */}
              <Button onClick={() => navigate("/add-product")}>{t.addProduct}</Button>

              {/* Category chips */}
              <CategoryChips
                categories={categories}
                active={activeCategory}
                onChange={setCategory}
              />

              {/* Need Restock section */}
              <RestockSection count={loading ? 0 : restockItems.length} onViewAll={() => {}}>
                {loading ? (
                  <div className="empty-state" style={{ padding: "10px 0" }}>{t.loadingRestockItems}</div>
                ) : restockItems.length > 0 ? (
                  restockItems.map((item) => (
                    <RestockCard
                      key={item._id}
                      name={item.name}
                      stock={item.stock}
                      image={resolveProductImage(item.image, item.name)}
                      onRestock={() => {}}
                    />
                  ))
                ) : (
                  <div className="empty-state" style={{ padding: "10px 0" }}>{t.allItemsWellStocked}</div>
                )}
              </RestockSection>

            </div>

            {/* All Products */}
            <div className="all-products-wrap" style={{ marginTop: 14 }}>
              <div className="all-products-title">{t.allProducts}</div>
              <div className="all-products-card">
                {loading ? (
                  <div className="empty-state">{t.loadingInventory}</div>
                ) : filtered.length > 0 ? (
                  filtered.map((product) => (
                    <ProductCard
                      key={product._id}
                      variant="inventory"
                      name={product.name}
                      category={product.category}
                      price={product.price}
                      stock={product.stock}
                      image={resolveProductImage(product.image, product.name)}
                      onPress={() => navigate(`/product/${product._id}`)}
                    />
                  ))
                ) : (
                  <div className="empty-state">{t.noProductsFound}</div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <BottomNav />

          {/* Home indicator */}
          <div className="home-indicator">
            <div className="home-bar" />
          </div>

        </div>
      </div>
    </>
  );
}