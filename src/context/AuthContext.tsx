//context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type User, type AuthContextType } from "../types";
import { STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string): Promise<void> => {
    return new Promise((resolve) => {
      const userData: User = {
        username: username.trim(),
        userId: `user_${Date.now()}`,
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      resolve();
    });
  };

  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      setUser(null);
      localStorage.removeItem(STORAGE_KEYS.USER);
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
