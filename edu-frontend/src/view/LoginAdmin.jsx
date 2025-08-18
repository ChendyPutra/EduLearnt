import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Toast from "../components/Toast";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post("/login-admin", { email, password });
      
      // Store token and role immediately
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      
      // Show success message
      showToast('Login admin berhasil! Mengalihkan ke dashboard...', 'success');
      
      // Use setTimeout to ensure toast is shown before redirect
      setTimeout(() => {
        // Dynamic redirect based on user role
        const dashboardRoute = getDashboardRoute(user.role);
        navigate(dashboardRoute, { replace: true });
      }, 1500);
      
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 
                          err?.response?.data?.errors?.email?.[0] || 
                          err?.response?.data?.errors?.password?.[0] || 
                          "Login admin gagal. Periksa kredensial Anda.";
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to determine dashboard route based on role
  const getDashboardRoute = (role) => {
    switch (role) {
      case 'admin':
        return '/dashboard-admin';
      case 'super_admin':
        return '/dashboard-admin';
      case 'student':
        return '/dashboard-student';
      default:
        return '/dashboard-admin';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex">
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      {/* Left Side - Admin Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse"></div>
        </div>
        
        <div className="relative flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-32 h-32 mb-8 bg-gradient-to-br from-gray-700 to-slate-900 rounded-3xl flex items-center justify-center border border-white/10">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4">Portal Admin</h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Panel administrasi untuk mengelola platform EduLearnt
          </p>
          <div className="space-y-4 text-left">
            {[
              "📈 Dasbor & Analitik",
              "👥 Manajemen Pengguna", 
              "📚 Manajemen Kursus",
              "📝 Konten & Umpan Balik"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-slate-900 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Masuk Administrator</h1>
              <p className="text-gray-600">Akses ke panel administrasi</p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Surel Administrator</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="admin@edulearnt.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi admin"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gray-800 to-slate-900 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sedang memproses...
                  </span>
                ) : (
                  "Masuk ke Panel Admin"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
                </svg>
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
