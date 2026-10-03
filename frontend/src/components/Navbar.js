import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🛍️ ShopEase</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {user && <Link to="/orders">My Orders</Link>}
        <Link to="/cart" className="cart-link">
          🛒 Cart {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
        {user ? (
          <div className="nav-user">
            <span className="user-name">👤 {user.name.split(" ")[0]}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        ) : (
          <Link to="/auth" className="login-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}
