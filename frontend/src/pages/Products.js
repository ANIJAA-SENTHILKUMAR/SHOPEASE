import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "./Products.css";

const categories = ["All", "Electronics", "Fashion", "Home & Living", "Sports"];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => loadProducts(), 400);
    return () => clearTimeout(timer);
  }, [search, activeCategory]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (activeCategory !== "All") params.category = activeCategory;
      const data = await fetchProducts(params);
      setProducts(data.products);
    } catch (err) {
      setError("Failed to load products. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-page">
      <h1>All Products</h1>

      <input
        className="search-bar"
        type="text"
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="no-results">Loading products...</p>}
      {error   && <p className="no-results" style={{ color: "red" }}>{error}</p>}
      {!loading && !error && products.length === 0 && <p className="no-results">No products found.</p>}
      {!loading && !error && (
        <div className="products-grid">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
