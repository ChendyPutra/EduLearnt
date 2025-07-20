// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-bold text-blue-800 mb-2">EduLearnt</h3>
          <p>
            Platform edukasi teknologi untuk siswa SD hingga SMA.
            Belajar coding, AI, dan robotika dengan cara menyenangkan.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Navigasi</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Beranda</Link></li>
            <li><Link to="/courses" className="hover:underline">Kursus</Link></li>
            <li><Link to="/quiz" className="hover:underline">Quiz</Link></li>
            <li><Link to="/kit" className="hover:underline">EduKit</Link></li>
            <li><Link to="/statistik" className="hover:underline">Statistik</Link></li>
            <li><Link to="/about" className="hover:underline">Tentang</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Kontak</h4>
          <p>Email: info@edulearnt.com</p>
          <p>WhatsApp: 0812-3456-7890</p>
          <p className="mt-2 text-xs">&copy; {new Date().getFullYear()} EduLearnt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;