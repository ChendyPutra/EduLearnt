import { Link } from "react-router-dom";

export default function DashboardAdmin() {
  const stats = [
    { k: "Siswa Aktif", v: 1520 },
    { k: "Kursus", v: 28 },
    { k: "Sekolah Mitra", v: 124 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <div className="text-sm text-gray-600">{s.k}</div>
            <div className="text-2xl font-extrabold">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border rounded-2xl p-4">
          <div className="font-semibold mb-2">Manajemen Pengguna</div>
          <Link to="/manage-users" className="btn btn-primary">Kelola Admin/Super Admin</Link>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="font-semibold mb-2">Manajemen Kursus</div>
          <Link to="/manage-courses" className="btn btn-primary">Kelola Kursus</Link>
        </div>
      </div>
    </div>
  );
}
