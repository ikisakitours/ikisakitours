// src/context/AuthContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  photo?: string | null;
}

interface AuthContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user data from local storage", error);
      }
    }, 0);

    return () => clearTimeout(timeoutId); // Cleanup function
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("userData");
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem("userData", JSON.stringify(newUser));
      return newUser;
    });
  };

  return <AuthContext.Provider value={{ user, loginUser, logoutUser, updateUser }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
