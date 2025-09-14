import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mock_jwt"));

  useEffect(() => {
    if (token) localStorage.setItem("mock_jwt", token);
    else localStorage.removeItem("mock_jwt");
  }, [token]);

  const login = ({ username, password }) => {
    // mock auth: any username, password must be 'test123'
    if (password === "test123") {
      const mock = "mock-jwt-token-" + btoa(username);
      setToken(mock);
      return { ok: true };
    }
    return { ok: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
