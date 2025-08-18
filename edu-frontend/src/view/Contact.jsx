import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", message: "", type: "contact" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "", type: "contact" });
      } else {
        const error = await res.json();
        alert(error.message || "Gagal mengirim feedback");
      }
    } catch (err) {
      alert("Gagal mengirim feedback. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-semibold text-emerald-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {user ? "Hubungi Tim Kami" : "Kontak & Feedback"}
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {user ? (
              <>Halo <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{user.name}</span>!</>
            ) : (
              <>Mari <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Terhubung</span></>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {user ? (
              "Kami senang mendengar dari Anda! Kirim pertanyaan, saran, atau feedback untuk membantu kami meningkatkan pengalaman belajar Anda."
            ) : (
              "Punya pertanyaan tentang EduLearnt? Ingin memberikan feedback? Atau tertarik bermitra dengan kami? Kami siap mendengar dari Anda!"
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@edulearnt.com</p>
                    <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telepon</h4>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-sm text-gray-500">Senin - Jumat, 09:00 - 17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">Jakarta, Indonesia</p>
                    <p className="text-sm text-gray-500">Kunjungi dengan perjanjian</p>
                  </div>
                </div>
              </div>
            </div>
            
            {!user && (
              <div className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2">Daftar untuk Akses Lebih!</h3>
                    <p className="text-amber-700 mb-4">Member terdaftar mendapat prioritas respon dan akses ke program eksklusif.</p>
                    <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200">
                      Daftar Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pesan Terkirim!</h3>
                <p className="text-gray-600 mb-6">Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", type: "contact", message: "" });
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="Masukkan nama Anda"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Pesan</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                    >
                      <option value="contact">Pertanyaan Umum</option>
                      <option value="partnership">Kemitraan</option>
                      <option value="support">Bantuan Teknis</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="6"
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      placeholder="Tulis pesan Anda di sini..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Kirim Pesan
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}