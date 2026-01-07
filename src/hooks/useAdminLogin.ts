import { useEffect, useState } from "react";

export const useAdminLogin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("/api/admin/validate");
      const data = await response.json();

      setIsAuthenticated(data.success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, message: "Network Error" };
    } catch {
      return { success: false, message: "Network Error" };
    }
  };
  const logout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsAuthenticated(false);
    }
  };

  return { isAuthenticated, isLoading, login, logout, checkLoginStatus };
};
