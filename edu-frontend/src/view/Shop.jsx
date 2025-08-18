import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Shop() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-semibold text-emerald-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {user ? "Kit Pembelajaran Personal" : "Toko Kit EduLearnt"}
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {user ? (
              <>Kit <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Rekomendasi</span> Anda</>
            ) : (
              <>Toko <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kit</span> Pembelajaran</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {user ? (
              `Halo ${user.name}! Temukan kit pembelajaran yang dipersonalisasi berdasarkan progres dan minat belajar Anda di coding, AI, dan robotika.`
            ) : (
              "Koleksi kit pembelajaran berkualitas tinggi yang dirancang khusus untuk meningkatkan pengalaman belajar coding, AI, dan robotika. Cocok untuk semua tingkat pendidikan."
            )}
          </p>
          {!user && (
            <div className="mt-8 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-200 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">🛒 Belanja sebagai Tamu</h3>
                  <p className="text-blue-700 mb-4">Daftar untuk mendapat rekomendasi personal, tracking pembelian, dan akses ke kit eksklusif member.</p>
                  <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Daftar untuk Rekomendasi
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center">
              <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Produk Sedang Dimuat</h3>
            <p className="text-gray-600 text-lg">Kami sedang menyiapkan kit pembelajaran terbaik untuk Anda!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10"></div>
                  <div className="relative h-full flex items-center justify-center">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-200">{product.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{product.desc || "Kit pembelajaran berkualitas untuk mendukung perjalanan belajar teknologi Anda."}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                      {product.price ? `Rp ${parseInt(product.price).toLocaleString('id-ID')}` : "Hubungi Kami"}
                    </div>
                    {user && (
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        Rekomendasi
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {product.marketplace_url ? (
                      <a 
                        href={product.marketplace_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Beli di Marketplace
                      </a>
                    ) : (
                      <button 
                        disabled
                        className="w-full bg-gray-200 text-gray-500 py-4 px-6 rounded-2xl font-bold cursor-not-allowed"
                      >
                        Segera Hadir
                      </button>
                    )}
                    
                    {user ? (
                      <Link 
                        to={`/products/${product.id}`}
                        className="w-full border-2 border-emerald-200 text-emerald-700 py-3 px-6 rounded-2xl font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 text-center block"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Lihat Detail
                        </span>
                      </Link>
                    ) : (
                      <div className="text-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                        <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-amber-800">Daftar untuk Info Detail</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Memilih Kit EduLearnt?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Kualitas Pendidikan</h3>
              <p className="text-gray-600">Kit yang dikurasi dengan hati-hati oleh ahli pendidikan untuk meningkatkan hasil belajar.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pembelajaran Praktis</h3>
              <p className="text-gray-600">Kit interaktif yang mendorong pembelajaran praktis melalui proyek dunia nyata.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Dukungan Lengkap</h3>
              <p className="text-gray-600">Panduan komprehensif dan dukungan online untuk memaksimalkan pengalaman belajar Anda.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}