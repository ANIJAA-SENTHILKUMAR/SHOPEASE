import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMyOrders } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    fetchMyOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return (
    <div className="orders-empty">
      <h2>Please sign in to view your orders</h2>
      <Link to="/auth" className="shop-btn">Sign In</Link>
    </div>
  );

  if (loading) return <div className="orders-empty"><p>Loading orders...</p></div>;

  if (orders.length === 0) return (
    <div className="orders-empty">
      <h2>📦 No orders yet</h2>
      <Link to="/products" className="shop-btn">Start Shopping</Link>
    </div>
  );

  return (
    <div className="orders-page">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <span className={`order-status status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-items-preview">
              {order.orderItems.map((item, i) => (
                <span key={i} className="order-item-name">{item.name} ×{item.qty}</span>
              ))}
            </div>
            <div className="order-footer">
              <span className="order-total">Total: <strong>${order.totalPrice.toFixed(2)}</strong></span>
              <span className={`order-paid ${order.isPaid ? "paid" : "unpaid"}`}>
                {order.isPaid ? "✅ Paid" : "⏳ Unpaid"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
