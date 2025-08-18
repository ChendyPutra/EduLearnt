import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function CoursesOffline() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect pengguna umum
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Khusus Anggota Terdaftar</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Informasi program luring hanya tersedia untuk anggota terdaftar. Daftar sekarang untuk mengakses program kelas tatap muka dan peluang kemitraan eksklusif.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Daftar Gratis
                </span>
              </Link>
              <Link to="/login" className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Login
                </span>
              </Link>
            </div>
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/offline-programs");
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching offline programs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Memuat Program Luring</h3>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-sm font-semibold text-orange-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Program Kelas Tatap Muka
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Belajar <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Langsung</span> dengan Ahli
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Bergabunglah dengan program pembelajaran tatap muka di sekolah mitra kami. Rasakan pengalaman belajar hands-on dengan instruktur ahli dan sesama siswa yang bersemangat.
          </p>
        </div>

        {/* Programs Grid */}
        {programs.length === 0 ? (
          <div className="text-center py-20 mb-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl flex items-center justify-center">
              <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Sedang Dikembangkan</h3>
            <p className="text-gray-600 text-lg mb-8">Kami sedang bekerja membawa program luring ke lebih banyak lokasi di seluruh Indonesia.</p>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Ajukan Program untuk Sekolah Anda
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {programs.map((program) => (
              <div key={program.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{program.school_name || program.school || "Sekolah Mitra"}</h3>
                        <p className="text-orange-100">{program.city || "Jakarta"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Jadwal Program</p>
                        <p className="font-bold text-gray-900">{program.schedule || "Hubungi untuk jadwal"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Lokasi</p>
                        <p className="font-bold text-gray-900">{program.city || "Jakarta, Indonesia"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">Kontak</p>
                        <p className="font-bold text-gray-900">{program.contact_info || "info@edulearnt.com"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <Link 
                      to="/contact" 
                      className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-center block"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Minta Informasi
                      </span>
                    </Link>
                    <Link 
                      to={`/offline-programs/${program.id}`}
                      className="w-full border-2 border-orange-200 text-orange-700 py-3 px-6 rounded-2xl font-semibold hover:bg-orange-50 hover:border-orange-300 transition-all duration-200 text-center block"
                    >
                      Lihat Detail Program
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-16 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Pilih <span className="bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">Program Luring</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rasakan pengalaman terbaik dengan program luring yang menggabungkan pembelajaran terstruktur dengan praktik langsung.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Instruktur Ahli",
                description: "Belajar dari profesional berpengalaman di bidangnya",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                color: "from-blue-500 to-indigo-500"
              },
              {
                title: "Praktik Langsung",
                description: "Bekerja dengan peralatan dan proyek nyata",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Belajar Bersama",
                description: "Berkolaborasi dan belajar dengan sesama siswa",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
                color: "from-purple-500 to-violet-500"
              },
              {
                title: "Sertifikasi",
                description: "Dapatkan sertifikat setelah menyelesaikan program",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "from-orange-500 to-red-500"
              }
            ].map((benefit, i) => (
              <div key={i} className="text-center group">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-orange-600 via-red-500 to-pink-500 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Bawa EduLearnt ke Sekolah Anda
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tertarik menghadirkan program EduLearnt di sekolah Anda? Hubungi kami untuk membahas peluang kemitraan dan program khusus yang disesuaikan dengan kebutuhan sekolah.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Hubungi Kami untuk Kemitraan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}