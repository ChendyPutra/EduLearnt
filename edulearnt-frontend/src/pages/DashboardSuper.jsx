import { useEffect, useState } from 'react';
import AdminLayout from "../components/AdminLayout";
import axios from 'axios';

export default function DashboardSuper() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalModules: 0,
    totalQuizzes: 0,
    totalUsers: 0,
  });

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek role superadmin
    axios.get('http://localhost:8000/api/me', { withCredentials: true })
      .then((res) => {
        if (res.data.role !== 'superadmin') {
          window.location.href = '/admin/dashboard';
        } else {
          // Jika superadmin, lanjut fetch data statistik dan daftar admin
          Promise.all([
            axios.get('http://localhost:8000/api/stats'),
            axios.get('http://localhost:8000/admin/manage-admin')
          ])
            .then(([statsRes, adminsRes]) => {
              setStats(statsRes.data);
              setAdmins(adminsRes.data);
            })
            .finally(() => setLoading(false));
        }
      })
      .catch(() => {
        // Jika belum login
        window.location.href = '/admin/login';
      });
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dashboard Superadmin</h2>
      <p className="mb-6">Selamat datang, Superadmin EduLearnt!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Kursus</h3>
          <p className="text-2xl">{stats.totalCourses}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Modul</h3>
          <p className="text-2xl">{stats.totalModules}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Kuis</h3>
          <p className="text-2xl">{stats.totalQuizzes}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Pengguna</h3>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow border">
        <h3 className="text-xl font-semibold mb-3">Manajemen Admin</h3>
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border px-3 py-2">ID</th>
              <th className="border px-3 py-2">Nama</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="border px-3 py-2">{admin.id}</td>
                <td className="border px-3 py-2">{admin.name}</td>
                <td className="border px-3 py-2">{admin.email}</td>
                <td className="border px-3 py-2">{admin.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
