import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/api";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("edu_user"));
  const nav = useNavigate();

  function logout() {
    setAuthToken(null);
    localStorage.removeItem("edu_user");
    nav("/");
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="flex gap-4">
        {!user && <Link to="/login">Login</Link>}
        {user && user.role === "student" && (
          <Link to="/dashboard">Dashboard</Link>
        )}
        {user && (user.role === "admin" || user.role === "superadmin") && (
          <Link to="/admin/dashboard">Admin</Link>
        )}
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
