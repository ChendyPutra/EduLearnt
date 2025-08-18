import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Toast from "../components/Toast";

export default function LoginStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      showToast('Login berhasil! Selamat datang kembali.', 'success');
      setTimeout(() => {
        // Dynamic redirect based on user role
        const dashboardRoute = getDashboardRoute();
        navigate(dashboardRoute, { replace: true });
      }, 1500);
    } else {
      showToast('Login gagal. Periksa email dan password Anda.', 'error');
    }
  };

  // Helper function to determine dashboard route based on role
  const getDashboardRoute = () => {
    const role = localStorage.getItem("role");
    switch (role) {
      case 'admin':
        return '/dashboard-admin';
      case 'super_admin':
        return '/dashboard-admin';
      case 'student':
        return '/dashboard-student';
      default:
        return '/dashboard-student';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 flex">
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse"></div>
        </div>
        
        <div className="relative flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-32 h-32 mb-8 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold mb-4">EduLearnt</h2>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            Platform pembelajaran teknologi terdepan untuk generasi digital Indonesia
          </p>
          <div className="space-y-4 text-left">
            {[
              "🚀 Kursus pemrograman, AI & robotika",
              "📊 Pelacakan kemajuan waktu nyata", 
              "🎯 Kuis interaktif & sertifikat",
              "🛒 Akses ke toko perangkat pembelajaran"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-indigo-100">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Masuk ke Akun Anda</h1>
              <p className="text-gray-600">Lanjutkan perjalanan belajar teknologi Anda</p>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Surel</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Masukkan surel Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                      placeholder="Masukkan kata sandi Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
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
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sedang memproses...
                  </span>
                ) : (
                  "Masuk ke Dasbor"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Belum punya akun?{" "}
                <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                  Daftar Gratis
                </Link>
              </p>
              
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
