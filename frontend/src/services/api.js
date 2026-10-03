const BASE_URL = "/api";

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return {
    "Content-Type": "application/json",
    ...(user?.token && { Authorization: `Bearer ${user.token}` }),
  };
};

const handleRes = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// Auth
export const registerUser = (body) =>
  fetch(`${BASE_URL}/auth/register`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) }).then(handleRes);

export const loginUser = (body) =>
  fetch(`${BASE_URL}/auth/login`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) }).then(handleRes);

// Products
export const fetchProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/products?${qs}`, { headers: getHeaders() }).then(handleRes);
};

export const fetchProductById = (id) =>
  fetch(`${BASE_URL}/products/${id}`, { headers: getHeaders() }).then(handleRes);

// Orders
export const placeOrder = (body) =>
  fetch(`${BASE_URL}/orders`, { method: "POST", headers: getHeaders(), body: JSON.stringify(body) }).then(handleRes);

export const fetchMyOrders = () =>
  fetch(`${BASE_URL}/orders/my`, { headers: getHeaders() }).then(handleRes);
