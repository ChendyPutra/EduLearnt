import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useSidebar } from "../context/SidebarContext";

export default function SidebarAdmin() {
  const { user } = useAuth();
  const { collapsed, setCollapsed } = useSidebar();

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden ${
      isActive 
        ? "bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20" 
        : "text-indigo-200 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm"
    }`;

  return (
    <div className={`${collapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-indigo-900 via-indigo-800 to-violet-900 h-screen flex flex-col transition-all duration-300 shadow-2xl border-r border-indigo-700/30 z-5`}>
      {/* Header */}
      <div className="p-6 border-b border-indigo-700/50">
        <div className="flex items-center justify-between">
          <div className={`${collapsed ? 'hidden' : 'block'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-white">
                  EduLearnt
                </h1>
                <p className="text-xs text-indigo-300">Admin Panel</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg bg-indigo-800/50 hover:bg-indigo-700/50 text-indigo-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            <svg className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        <div className={`${collapsed ? 'hidden' : 'block'} mb-4`}>
          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider px-2">Main Menu</p>
        </div>
        
        <NavLink to="/dashboard-admin" className={linkClass} title="Dashboard">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Dashboard</span>
        </NavLink>

        <NavLink to="/manage-courses" className={linkClass} title="Courses">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Courses</span>
        </NavLink>

        <NavLink to="/manage-modules" className={linkClass} title="Modules">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Modules</span>
        </NavLink>

        <NavLink to="/manage-categories" className={linkClass} title="Categories">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-green-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Categories</span>
        </NavLink>

        <NavLink to="/manage-quizzes" className={linkClass} title="Quizzes">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Quizzes</span>
        </NavLink>

        <NavLink to="/manage-products" className={linkClass} title="Products">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Products</span>
        </NavLink>

        <NavLink to="/manage-offline" className={linkClass} title="Offline Programs">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Offline Programs</span>
        </NavLink>

        <div className={`${collapsed ? 'hidden' : 'block'} mt-6 mb-4`}>
          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider px-2">Content</p>
        </div>
        
        <NavLink to="/manage-feedback" className={linkClass} title="Feedback">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Feedback</span>
        </NavLink>

        <NavLink to="/manage-company" className={linkClass} title="Company">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Company</span>
        </NavLink>

        <NavLink to="/manage-banners" className={linkClass} title="Banners">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Banners</span>
        </NavLink>

        <NavLink to="/manage-notifications" className={linkClass} title="Notifications">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.504l8.484-8.485a1 1 0 011.414 0l2.829 2.828a1 1 0 010 1.415l-8.485 8.484a1 1 0 01-.707.293H4v-4.403a1 1 0 01.293-.707z" />
            </svg>
          </div>
          <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Notifications</span>
        </NavLink>

        {user?.role === "super_admin" && (
          <>
            <div className={`${collapsed ? 'hidden' : 'block'} mt-6 mb-4`}>
              <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider px-2">System</p>
            </div>
            <NavLink to="/manage-users" className={linkClass} title="Users">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Users</span>
            </NavLink>
            
            <NavLink to="/manage-admins" className={linkClass} title="Admins">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className={`${collapsed ? 'hidden' : 'block'} font-medium`}>Admins</span>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}