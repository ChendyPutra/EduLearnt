import { useEffect, useState } from 'react';
import AdminLayout from "../components/AdminLayout";
import axios from 'axios';

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalModules: 0,
    totalQuizzes: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/stats')
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Dashboard Admin</h2>
      <p className="mb-6">Selamat datang di panel admin EduLearnt!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </AdminLayout>
  );
}
