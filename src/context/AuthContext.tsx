"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authService } from "@/services/auth/authService";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  avatarUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  loginUser: () => Promise<void>;
  logoutUser: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();

      console.log("Raw API Response:", response);

      const userData = response.user ? response.user : response;

      if (userData && (userData.id || userData.email)) {
        setUser(userData);
        console.log("Fetch Data Success!", userData);
      }
    } catch (error) {
      console.error("No active session", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUser();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchUser]);

  const loginUser = async () => {
    await fetchUser();
  };

  const logoutUser = () => {
    setUser(null);
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...updatedFields };
      localStorage.setItem("userData", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, updateUser, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
