import { createContext, useState, useEffect, useCallback } from "react";
import { getDashboardRoute, setAuthData, clearAuthData } from "../utils/navigation";

export const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch current admin user
  const fetchAdminUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || !role || !["admin", "super_admin"].includes(role)) {
      setAdminUser(null);
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
        // Validate admin role
        if (["admin", "super_admin"].includes(data.role)) {
          setAdminUser(data);
          localStorage.setItem("role", data.role);
        } else {
          // Not an admin - clear auth
          clearAuthData();
          setAdminUser(null);
        }
      } else {
        // Clear invalid token
        clearAuthData();
        setAdminUser(null);
      }
    } catch (error) {
      console.error("Admin auth fetch error:", error);
      clearAuthData();
      setAdminUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch admin user on mount and when token changes
  useEffect(() => {
    fetchAdminUser();
  }, [fetchAdminUser]);

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
        
        // Validate admin role
        if (!["admin", "super_admin"].includes(data.user.role)) {
          return { 
            success: false, 
            error: "Akun ini tidak memiliki akses admin" 
          };
        }

        setAuthData(data.token, data.user.role);
        setAdminUser(data.user);
        
        // Force immediate refresh of user data
        await fetchAdminUser();
        
        return { success: true, user: data.user };
      } else {
        const error = await res.json();
        return { success: false, error: error.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  // Logout for admin
  const logoutAdmin = async () => {
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
        console.error("Admin logout error:", error);
      }
    }
    clearAuthData();
    setAdminUser(null);
  };

  // Force refresh admin user data
  const refreshAdminUser = async () => {
    await fetchAdminUser();
  };

  // Get redirect path based on admin role
  const getRedirectPath = () => {
    if (!adminUser) return '/login-admin';
    return '/dashboard-admin';
  };

  // Check if user is admin
  const isAdmin = () => {
    return adminUser && ["admin", "super_admin"].includes(adminUser.role);
  };

  return (
    <AdminAuthContext.Provider value={{ 
      adminUser, 
      loginAdmin, 
