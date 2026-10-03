import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
