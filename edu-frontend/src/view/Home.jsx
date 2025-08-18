import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import BannerDisplay from "../components/BannerDisplay";

export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    students: 0,
    schools: 0,
    content_hours: 0,
    rating: 0,
  });

  useEffect(() => {
    // Fetch produk dari backend
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });

    // Set default stats (API endpoint not available yet)
    setStats({ students: 1250, schools: 45, content_hours: 120, rating: 4.8 });
  }, []);
  return (
    <div className="space-y-20">
      <BannerDisplay />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full text-sm font-semibold text-indigo-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Platform Pembelajaran #1 di Indonesia
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
                  Belajar{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                    Teknologi
                  </span>
                  <br />yang Menyenangkan!
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {user ? (
                    `Selamat datang kembali, ${user.name}! 🚀 Lanjutkan perjalanan belajar pemrograman, AI, dan robotika Anda.`
                  ) : (
                    "Kurikulum interaktif untuk siswa SD, SMP, dan SMA. Materi video berkualitas, kuis interaktif, dan proyek nyata yang mempersiapkan masa depan digital."
                  )}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <>
                    <Link to="/courses-online" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M7 16h10" />
                        </svg>
                        Lanjutkan Belajar
                      </span>
                    </Link>
                    <Link to="/dashboard-student" className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard Saya
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Daftar Gratis Sekarang
                      </span>
                    </Link>
                    <Link to="/courses-online" className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Lihat Demo Kursus
                      </span>
                    </Link>
                  </>
                )}
              </div>
              
              {!user && (
                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-800 mb-1">Mulai Perjalanan Teknologi Anda!</h3>
                      <p className="text-sm text-amber-700">
                        Daftar gratis untuk akses penuh ke materi pembelajaran, tracking progres real-time, kuis interaktif, dan sertifikat digital.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-indigo-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Pemrograman</h3>
                    <p className="text-sm text-gray-600">Python, JavaScript, HTML/CSS</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">AI & ML</h3>
                    <p className="text-sm text-gray-600">Machine Learning, Data Science</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Robotika</h3>
                    <p className="text-sm text-gray-600">Arduino, IoT, Automation</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Pengembangan Mobile</h3>
                    <p className="text-sm text-gray-600">React Native, Flutter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Jalur Pembelajaran Berdasarkan{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Jenjang Pendidikan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kurikulum yang disesuaikan dengan tingkat pendidikan untuk memastikan pembelajaran yang efektif dan progresif.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              level: "SD",
              title: "Sekolah Dasar",
              description: "Pengenalan konsep dasar programming melalui visual coding dan robotika sederhana",
              color: "from-green-500 to-emerald-400",
              icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
              features: ["Pemrograman Scratch", "Robotika Dasar", "Literasi Digital"]
            },
            {
              level: "SMP",
              title: "Sekolah Menengah Pertama", 
              description: "Text-based programming, fundamental AI concepts, dan proyek robotika menengah",
              color: "from-blue-500 to-indigo-400",
              icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
              features: ["Dasar Python", "Fundamental AI", "Proyek IoT"]
            },
            {
              level: "SMA",
              title: "Sekolah Menengah Atas",
              description: "Advanced programming, machine learning, dan complex robotics projects",
              color: "from-purple-500 to-violet-400",
              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
              features: ["Python Lanjutan", "Pembelajaran Mesin", "Robotika Kompleks"]
            }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-300" style={{background: `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`}}></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl font-bold text-white">{item.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
                <div className="space-y-3">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {user ? "Pembelajaran Lanjutan" : "Kelas Online Interaktif"}
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                {user ? (
                  "Lanjutkan Perjalanan Belajar Anda"
                ) : (
                  "Belajar Kapan Saja, Di Mana Saja"
                )}
              </h2>
              
              <p className="text-xl text-indigo-100 leading-relaxed">
                {user ? (
                  "Akses materi pembelajaran premium, kuis interaktif, dan tracking progres real-time. Semua tersedia 24/7 untuk mendukung pembelajaran Anda."
                ) : (
                  "Video pembelajaran berkualitas HD, kuis interaktif, dan proyek hands-on. Daftar sekarang untuk akses penuh ke semua materi!"
                )}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/courses-online" className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M7 16h10" />
                    </svg>
                    {user ? "Akses Kursus" : "Lihat Demo Kursus"}
                  </span>
                </Link>
                {!user && (
                  <Link to="/register" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-200">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Daftar Gratis
                    </span>
                  </Link>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M7 16h10" />
                      </svg>
                    </div>
                    <p className="text-white/80 font-medium">Pengalaman Belajar Interaktif</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: "Video HD", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
                    { label: "Kuis Interaktif", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
                    { label: "Proyek Nyata", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-2">
                      <div className="w-8 h-8 mx-auto bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <p className="text-xs text-white/80 font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offline - Hanya untuk pengguna terdaftar */}
      {user && (
        <section className="rounded-2xl p-6 bg-orange-50 border">
          <h3 className="text-lg font-bold">Program Offline Eksklusif</h3>
          <p className="text-gray-700 mt-1">
            Sebagai member terdaftar, Anda dapat mengakses informasi program offline di sekolah mitra. 
            Instruktur datang langsung dengan materi praktik & demo robot.
          </p>
          <Link to="/courses-offline" className="btn mt-4 bg-orange-500 text-white hover:bg-orange-600">
            Lihat Program Offline
          </Link>
        </section>
      )}
      
      {/* CTA untuk pengguna umum */}
      {!user && (
        <section className="rounded-2xl p-8 bg-gradient-to-r from-indigo-600 to-violet-500 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Siap Memulai Perjalanan Teknologi?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan siswa yang telah memulai perjalanan belajar pemrograman, AI, dan robotika. 
            Daftar gratis dan mulai belajar hari ini!
          </p>
          <div className="space-x-4">
            <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Daftar Sekarang - Gratis!
            </Link>
            <Link to="/courses-online" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition">
              Lihat Kursus
            </Link>
          </div>
        </section>
      )}

      {/* Shop Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {user ? (
              "Kit Pembelajaran Rekomendasi"
            ) : (
              <>
                Toko{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  Kit EduLearnt
                </span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {user ? (
              "Kit pembelajaran yang dipersonalisasi berdasarkan progres dan minat belajar Anda."
            ) : (
              "Koleksi kit pembelajaran berkualitas untuk mendukung perjalanan belajar teknologi Anda."
            )}
          </p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold">
            Lihat Semua Produk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m-4-8H3" />
            </svg>
          </Link>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Produk Sedang Dimuat</h3>
            <p className="text-gray-600">Mohon tunggu sebentar...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((p, i) => (
              <div key={i} className="group bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{p.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{p.desc || "Kit pembelajaran berkualitas untuk mendukung belajar teknologi."}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                      {p.price ? `Rp ${parseInt(p.price).toLocaleString('id-ID')}` : "Hubungi"}
                    </div>
                  </div>
                  
                  {p.marketplace_url ? (
                    <a href={p.marketplace_url} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Beli Sekarang
                    </a>
                  ) : (
                    <button disabled className="w-full bg-gray-200 text-gray-500 py-3 px-6 rounded-2xl font-semibold cursor-not-allowed">
                      Segera Hadir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!user && (
          <div className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Dapatkan Rekomendasi Personal!</h3>
              <p className="text-amber-700 mb-6">
                Daftar sekarang untuk mendapat rekomendasi kit pembelajaran yang sesuai dengan level dan minat belajar Anda.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Daftar Gratis
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {user ? (
                "Bergabunglah dengan Komunitas Pembelajar"
              ) : (
                "Dipercaya oleh Ribuan Siswa & Sekolah"
              )}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {user ? (
                "Terima kasih telah menjadi bagian dari komunitas EduLearnt! Bersama-sama kita membangun generasi teknologi masa depan."
              ) : (
                "Platform pembelajaran teknologi terdepan yang telah membantu ribuan siswa mengembangkan skill digital mereka."
              )}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {[
              {
                number: stats.students || 0,
                label: "Siswa Aktif",
                suffix: "+",
                color: "from-blue-500 to-cyan-400",
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              },
              {
                number: stats.schools || 0,
                label: "Sekolah Mitra",
                suffix: "+",
                color: "from-purple-500 to-pink-400",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              },
              {
                number: stats.content_hours || 0,
                label: "Jam Konten",
                suffix: "+",
                color: "from-emerald-500 to-teal-400",
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                number: stats.rating || 0,
                label: "Rating Orang Tua",
                suffix: "/5",
                color: "from-orange-500 to-red-400",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className={`text-4xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/company-profile" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {user ? "Pelajari Lebih Lanjut" : "Tentang EduLearnt"}
            </Link>
            {!user && (
              <p className="text-sm text-gray-500 mt-4">
                Daftar sekarang untuk akses program kemitraan dan benefit eksklusif lainnya
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
