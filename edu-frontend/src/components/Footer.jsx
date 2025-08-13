export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-white font-extrabold text-lg mb-2">EduLearnt</div>
          <p className="text-sm">Belajar menyenangkan untuk semua jenjang. Konten kurasi & kursus online/offline.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navigasi</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/shop" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Bantuan</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Berlangganan</h4>
          <form className="flex gap-2">
            <input className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-sm placeholder-slate-400" placeholder="Email kamu" />
            <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">Kirim</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">© {new Date().getFullYear()} EduLearnt</div>
    </footer>
  );
}
