import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role)) {
      // jika role mismatch, arahkan sesuai role
      return role === "student" ? <Navigate to="/dashboard-student" replace /> : <Navigate to="/dashboard-admin" replace />;
    }
  }
  return children;
}
