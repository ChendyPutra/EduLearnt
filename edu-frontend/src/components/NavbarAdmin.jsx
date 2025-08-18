import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

export default function NavbarAdmin() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const link = "px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition";

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/dashboard-admin" className="font-bold text-lg text-white">EduLearnt Admin</Link>
        
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/dashboard-admin" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Dashboard</NavLink>
          <NavLink to="/manage-users" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Users</NavLink>
          <NavLink to="/manage-courses" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Courses</NavLink>
          <NavLink to="/manage-products" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Products</NavLink>
          <NavLink to="/manage-offline" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Offline</NavLink>
          <NavLink to="/manage-quizzes" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Quizzes</NavLink>
          <NavLink to="/manage-notifications" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Notifications</NavLink>
          <NavLink to="/manage-banners" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Banners</NavLink>
          <NavLink to="/manage-feedback" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Feedback</NavLink>
          <NavLink to="/manage-company" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Company</NavLink>
        </nav>

        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-slate-200 text-sm">Hi, {user?.name} ({user?.role})</span>
          <button onClick={logout} className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-sm">Logout</button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-white/10">
          <nav className="px-4 py-2 space-y-1">
            <NavLink to="/dashboard-admin" className="block px-3 py-2 text-slate-200 hover:text-white">Dashboard</NavLink>
            <NavLink to="/manage-users" className="block px-3 py-2 text-slate-200 hover:text-white">Users</NavLink>
            <NavLink to="/manage-courses" className="block px-3 py-2 text-slate-200 hover:text-white">Courses</NavLink>
            <NavLink to="/manage-products" className="block px-3 py-2 text-slate-200 hover:text-white">Products</NavLink>
            <NavLink to="/manage-offline" className="block px-3 py-2 text-slate-200 hover:text-white">Offline</NavLink>
            <NavLink to="/manage-quizzes" className="block px-3 py-2 text-slate-200 hover:text-white">Quizzes</NavLink>
            <NavLink to="/manage-notifications" className="block px-3 py-2 text-slate-200 hover:text-white">Notifications</NavLink>
            <NavLink to="/manage-banners" className="block px-3 py-2 text-slate-200 hover:text-white">Banners</NavLink>
            <NavLink to="/manage-feedback" className="block px-3 py-2 text-slate-200 hover:text-white">Feedback</NavLink>
            <NavLink to="/manage-company" className="block px-3 py-2 text-slate-200 hover:text-white">Company</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}