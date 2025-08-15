import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function NavbarPublic() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "text-indigo-700 bg-indigo-50" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className={`sticky top-0 z-50 transition backdrop-blur ${scrolled ? "bg-white/80 shadow-sm" : "bg-white/40"}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="font-extrabold text-xl tracking-tight text-indigo-700">EduLearnt</Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/courses-online" className={linkClass}>Courses Online</NavLink>
          <NavLink to="/courses-offline" className={linkClass}>Courses Offline</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/company-profile" className={linkClass}>Company</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <span className="text-slate-700">Hi, {user.name}</span>
              <button onClick={logout} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:brightness-110">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-indigo-600 via-violet-500 to-amber-400" />
    </header>
  );
}
