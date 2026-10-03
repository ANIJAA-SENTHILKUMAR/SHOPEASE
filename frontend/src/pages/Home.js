import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchProducts({ limit: 4 })
      .then((data) => setFeatured(data.products))
      .catch(console.error);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <Link to="/products" className="hero-btn">Shop Now</Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featured.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
        <div className="center">
          <Link to="/products" className="view-all-btn">View All Products</Link>
        </div>
      </div>

      {/* Categories Banner */}
      <div className="categories">
        {["Electronics", "Fashion", "Home & Living", "Sports"].map((cat) => (
          <div key={cat} className="cat-card">
            <span>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
