import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function CoursesOnline() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Memuat kursus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full text-sm font-semibold text-indigo-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {user ? "Pembelajaran Online Anda" : "Kursus Online Interaktif"}
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {user ? (
              <>Lanjutkan <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Perjalanan</span> Belajar</>
            ) : (
              <>Belajar <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Teknologi</span> Online</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {user ? (
              `Selamat datang kembali, ${user.name}! Akses materi pembelajaran premium, kuis interaktif, dan tracking progres real-time untuk coding, AI, dan robotika.`
            ) : (
              "Materi pembelajaran interaktif untuk coding, AI, dan robotika. Cocok untuk siswa SD, SMP, dan SMA dengan kurikulum yang disesuaikan tingkat pendidikan."
            )}
          </p>
          {!user && (
            <div className="mt-8 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-amber-800 mb-2">Daftar untuk Akses Penuh!</h3>
                  <p className="text-amber-700 mb-4">Enroll kursus, tracking progres, kuis interaktif, dan sertifikat digital menunggu Anda.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                      Daftar Gratis
                    </Link>
                    <Link to="/login" className="px-6 py-3 border-2 border-indigo-200 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-all duration-200">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center">
              <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Kursus Sedang Dimuat</h3>
            <p className="text-gray-600 text-lg">Mohon tunggu sebentar, kami sedang menyiapkan kursus terbaik untuk Anda!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-video bg-gradient-to-br from-indigo-500 to-violet-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative h-full flex items-center justify-center text-white">
                    {course.youtube_id ? (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <p className="font-semibold">Video Pembelajaran</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="font-semibold">Materi Interaktif</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                      course.level === 'SD' ? 'bg-green-100 text-green-700' :
                      course.level === 'SMP' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">{course.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{course.description}</p>
                  
                  <div className="space-y-3">
                    {user ? (
                      <Link 
                        to={`/courses/${course.id}/modules`}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-center block"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Mulai Belajar
                        </span>
                      </Link>
                    ) : (
                      <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-amber-800 mb-2">Deskripsi Kursus Saja</p>
                        <p className="text-xs text-amber-700 mb-4">
                          Daftar untuk akses materi lengkap, kuis, dan tracking progres
                        </p>
                        <div className="flex gap-2">
                          <Link to="/register" className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-2 px-4 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200">
                            Daftar
                          </Link>
                          <Link to="/login" className="flex-1 border-2 border-indigo-200 text-indigo-700 py-2 px-4 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all duration-200">
                            Login
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Learning Path Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Jalur Pembelajaran Berdasarkan Tingkat</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kursus kami dirancang sesuai dengan tingkat pendidikan yang berbeda, 
              memastikan konten yang sesuai usia dan pengembangan keterampilan yang progresif.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">SD</span>
              </div>
              <h3 className="font-semibold mb-2">Sekolah Dasar</h3>
              <p className="text-sm text-gray-600">Konsep pemrograman dasar, coding visual, dan robotika sederhana</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">SMP</span>
              </div>
              <h3 className="font-semibold mb-2">Sekolah Menengah Pertama</h3>
              <p className="text-sm text-gray-600">Pemrograman berbasis teks, dasar AI, dan robotika menengah</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">SMA</span>
              </div>
              <h3 className="font-semibold mb-2">Sekolah Menengah Atas</h3>
              <p className="text-sm text-gray-600">Pemrograman lanjutan, pembelajaran mesin, dan proyek robotika kompleks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
