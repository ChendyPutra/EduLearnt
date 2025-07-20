// src/pages/DashboardSuperAdmin.jsx
import React from 'react';
import { Users, BookOpen, UserPlus } from 'lucide-react';

export default function DashboardSuperAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Dashboard Super Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Total Admin</span>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">5</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Total Siswa</span>
            <UserPlus className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">150</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Kursus Aktif</span>
            <BookOpen className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Manajemen Admin</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Nama</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3">Admin A</td>
              <td className="p-3">admina@edulearnt.com</td>
              <td className="p-3">Admin</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3">Admin B</td>
              <td className="p-3">adminb@edulearnt.com</td>
              <td className="p-3">Admin</td>
              <td className="p-3">
                <button className="text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
