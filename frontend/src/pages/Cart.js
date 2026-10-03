import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) return navigate("/auth");
    setPlacing(true);
    try {
      await placeOrder({
        orderItems: cart.map((item) => ({
          name: item.name, qty: item.qty, price: item.price,
          image: item.image, product: item._id || item.id,
        })),
        shippingAddress: { fullName: user.name, address: "123 Main St", city: "New York", postalCode: "10001" },
        paymentMethod: "Card",
        itemsPrice: totalPrice,
        totalPrice,
      });
      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      alert("Order failed: " + err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (orderSuccess) return (
    <div className="empty-cart">
      <h2>✅ Order Placed Successfully!</h2>
      <p style={{ marginBottom: "1.5rem", color: "#6c757d" }}>Thank you for your purchase.</p>
      <Link to="/orders" className="shop-btn">View My Orders</Link>
    </div>
  );

  if (cart.length === 0) return (
    <div className="empty-cart">
      <h2>🛒 Your cart is empty</h2>
      <Link to="/products" className="shop-btn">Start Shopping</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart ({totalItems} items)</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id || item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price.toFixed(2)} × {item.qty}</p>
              </div>
              <div className="item-right">
                <p className="item-total">${(item.price * item.qty).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id || item._id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Items ({totalItems})</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span className="free">FREE</span></div>
          <div className="summary-row total"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={handleCheckout} disabled={placing}>
            {placing ? "Placing Order..." : user ? "Proceed to Checkout" : "Sign In to Checkout"}
          </button>
          <Link to="/products" className="continue-link">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
