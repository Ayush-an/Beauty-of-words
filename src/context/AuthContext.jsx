import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("token");

    if (userInfo && token) {
      setIsLoggedIn(true);
      setUserRole(userInfo.role);
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      const { data } = await api.post("/auth/signup", userData);
      setIsLoggedIn(true);
      setUserRole(data.role);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Signup failed" };
    }
  };

  const login = async (mobile, password) => {
    try {
      const { data } = await api.post("/auth/login", { mobile, password });
      setIsLoggedIn(true);
      setUserRole(data.role);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
