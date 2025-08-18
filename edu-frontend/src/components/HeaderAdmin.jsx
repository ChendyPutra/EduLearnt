import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useSidebar } from "../context/SidebarContext";
import Toast from "./Toast";

export default function HeaderAdmin() {
  const { user, logout } = useAuth();
  const { collapsed } = useSidebar();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dropdownRef = useRef();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleEditProfile = () => {
    setFormData({ name: user?.name || '', email: user?.email || '', password: '' });
    setShowEditProfile(true);
    setDropdownOpen(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/admin/admins/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowEditProfile(false);
        showToast('Profile updated successfully!');
        // Update user context if needed
        window.location.reload();
      } else {
        showToast('Failed to update profile', 'error');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast('Failed to update profile', 'error');
    }
  };

 const handleLogout = () => {
  // hapus token di localStorage
  localStorage.removeItem("token");

  // panggil fungsi logout dari context (jika ada)
  logout();

  // arahkan ke halaman home
  navigate("/", { replace: true });
};

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 right-0 transition-all duration-300 bg-gradient-to-r from-indigo-50 via-white to-violet-50 border-b border-indigo-200/50 px-8 py-5 backdrop-blur-sm z-10`} style={{ left: collapsed ? '80px' : '288px' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-sm text-indigo-600/70">EduLearnt Management System</p>
        </div>

        <div className="flex items-center gap-4">
          

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 transition-all duration-200 border border-transparent hover:border-indigo-200/50 hover:shadow-lg"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-800">{user?.name || 'Admin'}</div>
                <div className="text-sm text-indigo-600 capitalize font-medium">{user?.role?.replace('_', ' ') || 'Administrator'}</div>
              </div>
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-sm border border-indigo-200/50 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-indigo-200/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                      {user?.name?.[0]?.toUpperCase() || "A"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{user?.name || 'Admin User'}</p>
                      <p className="text-sm text-indigo-600 capitalize font-medium">{user?.role?.replace('_', ' ') || 'Administrator'}</p>
                      <p className="text-xs text-slate-500">{user?.email || 'admin@edulearnt.com'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 space-y-2">
                  {user?.role === 'super_admin' && (
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 text-indigo-600 rounded-xl transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <span className="font-medium">Edit Profile</span>
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 text-red-600 rounded-xl transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      {/* Edit Profile Modal */}
      {showEditProfile && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Edit Profile</h2>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Profile
                </button>
                <button 
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="px-6 py-4 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}
    </header>
  );
}