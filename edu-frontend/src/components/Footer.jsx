import { Link } from "react-router-dom";

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
            <li><Link to="/courses-online" className="hover:text-blue-400">Courses Online</Link></li>
            <li><Link to="/courses-offline" className="hover:text-blue-400">Courses Offline</Link></li>
            <li><Link to="/shop" className="hover:text-blue-400">Shop</Link></li>
            <li><Link to="/company-profile" className="hover:text-blue-400">Company</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Produk</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://shopee.co.id" className="hover:text-blue-400" target="_blank" rel="noreferrer">Shopee</a></li>
            <li><a href="https://www.tokopedia.com" className="hover:text-blue-400" target="_blank" rel="noreferrer">Tokopedia</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: hello@edulearnt.id</li>
            <li>Phone: +62 812-0000-0000</li>
            <li><Link to="/contact" className="hover:text-blue-400">Feedback & Inquiry</Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-black text-center text-xs py-3">© {new Date().getFullYear()} EduLearnt. All rights reserved.</div>
    </footer>
  );
}
