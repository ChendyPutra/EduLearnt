import React from "react";
import { Users, Book, LayoutDashboard } from "lucide-react";

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="text-blue-600 w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">5</p>
              <p className="text-gray-600">Total Modul</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <Book className="text-orange-500 w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">3</p>
              <p className="text-gray-600">Kursus Aktif</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <Users className="text-green-500 w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">120</p>
              <p className="text-gray-600">Siswa Terdaftar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Statistik Aktivitas</h2>
        <div className="bg-white p-6 rounded-xl shadow text-gray-500">
          Grafik dan laporan aktivitas kursus siswa akan ditampilkan di sini.
        </div>
      </div>
    </div>
  );
}
