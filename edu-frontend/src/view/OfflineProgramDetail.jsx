import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function OfflineProgramDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect pengguna umum
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
          <p className="text-gray-600 mb-6">Please login to view offline program details.</p>
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/offline-programs");
      const data = await res.json();
      const foundProgram = data.find(p => p.id == id);
      setProgram(foundProgram || null);
    } catch (error) {
      console.error("Error fetching program:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading program...</p>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h2>
          <Link to="/courses-offline" className="text-orange-600 hover:underline">
            ← Back to Offline Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{program.school_name || program.school || "Sekolah Mitra"}</h1>
            <p className="text-orange-100">{program.city || "Jakarta"}</p>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
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
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Program</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {program.description || "Program pembelajaran offline yang dirancang khusus untuk memberikan pengalaman belajar hands-on dengan instruktur ahli. Siswa akan mendapat kesempatan untuk berinteraksi langsung dengan peralatan dan teknologi terkini."}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fasilitas</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Instruktur berpengalaman
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Peralatan lengkap
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sertifikat kelulusan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link 
                to="/contact" 
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-center"
              >
                Minta Informasi
              </Link>
              <Link 
                to="/courses-offline"
                className="px-6 py-4 border-2 border-orange-200 text-orange-700 rounded-2xl font-semibold hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}