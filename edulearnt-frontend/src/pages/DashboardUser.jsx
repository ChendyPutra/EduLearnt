// src/pages/DashboardSiswa.jsx
import React from 'react';
import { Book, PenTool, PackageSearch } from 'lucide-react';

export default function DashboardSiswa() {
  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Halo, Siswa 👋</h1>
      <p className="text-gray-600 mb-8">Selamat datang di EduLearnt! Silakan mulai belajar atau lanjutkan perjalanan belajarmu.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <Book className="w-10 h-10 text-indigo-600" />
            <div>
              <h3 className="text-lg font-semibold">Kursus Saya</h3>
              <p className="text-sm text-gray-500">Lihat dan lanjutkan kursus yang kamu ikuti.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <PenTool className="w-10 h-10 text-pink-500" />
            <div>
              <h3 className="text-lg font-semibold">Kuis & Evaluasi</h3>
              <p className="text-sm text-gray-500">Cek skor dan kerjakan latihan soal.</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <PackageSearch className="w-10 h-10 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Kit Pembelajaran</h3>
              <p className="text-sm text-gray-500">Akses modul & alat bantu belajar coding & robotik.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
