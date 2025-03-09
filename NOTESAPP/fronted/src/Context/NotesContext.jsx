import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));

  const setToken = (newToken) => {
    setTokenState(newToken);
    localStorage.setItem("token", newToken);
  };

  const removeToken = () => {
    setTokenState(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setTokenState(storedToken);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
