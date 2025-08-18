// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Check if this is an admin route
  const isAdminRoute = allowedRoles.some(
    (r) => r === "admin" || r === "super_admin"
  );

  // Not logged in → redirect to appropriate login
  if (!token) {
    return (
      <Navigate
        to={isAdminRoute ? "/login-admin" : "/login-student"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect based on actual user role
    if (role === "admin" || role === "super_admin") {
      return <Navigate to="/dashboard-admin" replace />;
    } else if (role === "student") {
      return <Navigate to="/dashboard-student" replace />;
    } else {
      // Unknown role - redirect to home
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
