import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";

export default function CompanyProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ visi: "", misi: "" });
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileData, teamData] = await Promise.all([
        fetch("http://localhost:8000/api/company-profile").then(res => res.json()),
        fetch("http://localhost:8000/api/team").then(res => res.json())
      ]);
      setProfile(profileData);
      setTeam(teamData);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          type: "partnership"
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      
      // Reset sent state after 3 seconds
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err.message || 'Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full text-sm font-semibold text-indigo-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Tentang EduLearnt
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Membangun <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Generasi</span> Digital Indonesia
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {user ? (
              `Terima kasih ${user.name} telah menjadi bagian dari misi kami! Bersama-sama kita mempersiapkan generasi muda Indonesia yang siap menghadapi era digital.`
            ) : (
              "Platform pembelajaran teknologi terdepan yang berkomitmen menyiapkan generasi muda Indonesia dengan skill coding, AI, dan robotika untuk masa depan yang cerah."
            )}
          </p>
        </div>

        {/* Vision & Mission */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3>
                <p className="text-gray-700 leading-relaxed">
                  {profile.visi || "Menjadi platform pembelajaran teknologi terdepan yang mempersiapkan generasi muda Indonesia untuk era digital dengan pendekatan yang menyenangkan dan interaktif."}
                </p>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl border border-purple-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3>
                <p className="text-gray-700 leading-relaxed">
                  {profile.misi || "Menyediakan pendidikan teknologi berkualitas tinggi yang mudah diakses, mengembangkan kurikulum inovatif, dan membangun ekosistem pembelajaran yang mendukung kreativitas dan inovasi siswa Indonesia."}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-indigo-100">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">EduLearnt</h3>
                  <p className="text-gray-600">Membangun masa depan digital Indonesia melalui pendidikan teknologi yang berkualitas dan menyenangkan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tim <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">Profesional</span> Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bertemu dengan tim ahli yang berdedikasi membangun platform pembelajaran teknologi terbaik untuk Indonesia.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.length === 0 ? (
              // Default team if no data from backend
              [
                { n: "Dr. Ahmad Wijaya", r: "CEO & Founder", expertise: "Educational Technology" },
                { n: "Sarah Putri, M.Pd", r: "Head of Curriculum", expertise: "Curriculum Development" },
                { n: "Budi Santoso, S.Kom", r: "Lead Developer", expertise: "Full Stack Development" },
                { n: "Maya Sari, M.Psi", r: "Learning Experience Designer", expertise: "UX/UI Design" },
                { n: "Rizki Pratama, S.T", r: "Robotics Specialist", expertise: "Robotics & IoT" },
                { n: "Indira Kusuma, M.Kom", r: "AI Research Lead", expertise: "Machine Learning" }
              ].map((member, i) => (
                <div key={i} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                      {member.n[0]}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.n}</h3>
                    <p className="text-indigo-600 font-semibold mb-2">{member.r}</p>
                    <p className="text-sm text-gray-600">{member.expertise}</p>
                  </div>
                </div>
              ))
            ) : (
              team.map((t, i) => (
                <div key={i} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl overflow-hidden">
                      {t.photo ? (
                        <img src={t.photo} alt={t.n} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                          {t.n[0]}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.n}</h3>
                    <p className="text-indigo-600 font-semibold">{t.r}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* Partnership Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Program <span className="text-yellow-400">Kemitraan</span> & Kontak
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              {user ? (
                "Bergabunglah dengan program kemitraan eksklusif kami dan wujudkan visi pendidikan teknologi bersama-sama."
              ) : (
                "Tertarik bermitra dengan EduLearnt? Daftar untuk mengakses program kemitraan dan kirim proposal Anda."
              )}
            </p>
          </div>
          
          {!user ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Tertarik Bermitra?</h3>
                <p className="text-indigo-100 mb-6">
                  Daftar untuk mengakses program kemitraan eksklusif dan kirim proposal kemitraan Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Daftar untuk Kemitraan
                    </span>
                  </Link>
                  <Link to="/login" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-200">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {sent ? (
                <div className="text-center p-8 bg-green-500/20 backdrop-blur-sm rounded-3xl border border-green-400/30">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Pesan Terkirim!</h3>
                  <p className="text-green-200">Terima kasih, tim kami akan segera menghubungi Anda.</p>
                </div>
              ) : (
                <div className="p-8 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
                  <h3 className="text-2xl font-bold text-center mb-8">Form Kemitraan</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-indigo-200 mb-2">Nama Sekolah / Institusi</label>
                        <input
                          className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          placeholder="Masukkan nama institusi"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-indigo-200 mb-2">Kontak (Email/HP)</label>
                        <input
                          className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          placeholder="Email atau nomor HP"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-indigo-200 mb-2">Pesan Kemitraan</label>
                      <textarea
                        className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        rows="6"
                        placeholder="Ceritakan tentang rencana kemitraan Anda..."
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-4 px-8 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={loading}
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
                            Kirim Proposal
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
