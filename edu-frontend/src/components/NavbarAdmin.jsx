import { Link, NavLink } from "react-router-dom";

export default function NavbarAdmin() {
  const link =
    "px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition";

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/dashboard-admin" className="font-bold text-lg text-white">EduLearnt Admin</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard-admin" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Dashboard</NavLink>
          <NavLink to="/manage-users" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Admins</NavLink>
          <NavLink to="/manage-courses" className={({isActive}) => `${link} ${isActive?"bg-white/10":""}`}>Courses</NavLink>
        </nav>
        <div className="ml-auto">
          <button className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20">Logout</button>
        </div>
      </div>
    </header>
  );
}
