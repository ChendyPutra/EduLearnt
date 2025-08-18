import { createContext, useState, useEffect, useCallback } from "react";
import { getDashboardRoute, setAuthData, clearAuthData } from "../utils/navigation";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch current user with role verification
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/admin/me", {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        // Update role in localStorage to ensure consistency
        localStorage.setItem("role", data.role);
      } else {
        // Clear invalid token
        clearAuthData();
        setUser(null);
      }
    } catch (error) {
      console.error("Auth fetch error:", error);
      clearAuthData();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user on mount and when token changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login for admin/super admin
  const loginAdmin = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/api/login-admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuthData(data.token, data.user.role);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        const error = await res.json();
        return { success: false, error: error.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  // Login for students (existing)
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/api/login-student", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setAuthData(data.token, data.user.role);
        setUser(data.user);
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  // Register for students
  const register = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin",
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        setAuthData(data.token, data.user.role);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        const error = await res.json();
        return { success: false, error: error.message || "Registration failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  // Logout
  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("http://localhost:8000/api/admin/logout", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "same-origin"
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    clearAuthData();
    setUser(null);
  };

  // Force refresh user data
  const refreshUser = async () => {
    await fetchUser();
  };

  // Get redirect path based on user role
  const getRedirectPath = () => {
    if (!user) return '/login-student';
    return getDashboardRoute(user.role);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginAdmin, 
      register,
      logout, 
      refreshUser, 
      loading,
      getRedirectPath
    }}>
      {children}
    </AuthContext.Provider>
  );
}
