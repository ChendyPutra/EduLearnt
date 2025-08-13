import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavbarPublic() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
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
        <Link to="/" className="font-extrabold text-xl tracking-tight text-indigo-700">
          EduLearnt
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* hanya login siswa yang terlihat di publik */}
          <Link to="/login" className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:brightness-110">
            Daftar
          </Link>
        </div>
      </div>
      {/* indikator route (garis gradien) */}
      <div className="h-0.5 bg-gradient-to-r from-indigo-600 via-violet-500 to-amber-400" />
    </header>
  );
}
