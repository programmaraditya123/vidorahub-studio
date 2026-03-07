"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  username: string | null;
  setUsername: (name: string | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  username: null,
  setUsername: () => {},
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUsername(storedUser);
    if (storedToken) setToken(storedToken);

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        setUsername,
        setToken,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);