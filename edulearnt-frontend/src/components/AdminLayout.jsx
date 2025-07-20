import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminLayout({ children }) {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/me', { withCredentials: true })
      .then(res => setAdmin(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!admin) return <div>Loading...</div>; // Atau bisa pakai spinner

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-6">EduLearnt Admin</h1>

        <nav className="space-y-2">
          {/* Dashboard untuk admin biasa */}
          {admin.role === 'admin' && (
            <Link to="/admin/dashboard" className="block hover:text-yellow-300">Dashboard</Link>
          )}

          {/* Dashboard untuk superadmin */}
          {admin.role === 'superadmin' && (
            <Link to="/admin/super" className="block hover:text-yellow-300">Dashboard Superadmin</Link>
          )}

          <Link to="/admin/courses" className="block hover:text-yellow-300">Kelola Kursus</Link>

          {/* Tampilkan hanya jika superadmin */}
          {admin.role === 'superadmin' && (
            <Link to="/admin/manage-admin" className="block hover:text-yellow-300">Manajemen Admin</Link>
          )}
        </nav>

        <div className="mt-auto pt-4 border-t border-blue-500">
          <Link to="/" className="text-sm text-blue-200 hover:text-white">&larr; Kembali ke Situs</Link>
        </div>
      </aside>

      {/* Konten utama */}
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
