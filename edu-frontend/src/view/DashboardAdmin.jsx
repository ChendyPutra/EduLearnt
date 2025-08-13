import { useState } from "react";
import { motion } from "framer-motion";

export default function DashboardAdmin() {
  const [users] = useState([
    { name: "Rani", email: "rani@edulearnt.com", role: "super_admin" },
    { name: "Bima", email: "bima@edulearnt.com", role: "admin" },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Siswa Aktif</div>
          <div className="text-2xl font-extrabold">1.520</div>
        </div>
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Kursus</div>
          <div className="text-2xl font-extrabold">28</div>
        </div>
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Transaksi Bulan</div>
          <div className="text-2xl font-extrabold">Rp 14.200.000</div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin / Super Admin</h2>
          <button className="btn btn-primary">Tambah Admin</button>
        </div>

        <div className="mt-3 overflow-auto border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u,i)=>(
                <tr key={i} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3"><span className="badge bg-gray-100 text-slate-700">{u.role}</span></td>
                  <td className="p-3 text-right">
                    <button className="btn btn-outline mr-2">Edit</button>
                    <button className="btn bg-red-600 text-white">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
