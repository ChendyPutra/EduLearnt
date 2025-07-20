import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistik = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Gagal mengambil statistik:", err));
  }, []);

  if (!stats) return <div className="p-8">Memuat data statistik...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">Statistik EduLearnt</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <StatBox label="Siswa" value={stats.siswa} color="bg-blue-100 text-blue-600" />
        <StatBox label="Sekolah" value={stats.sekolah} color="bg-green-100 text-green-600" />
        <StatBox label="Kursus" value={stats.course} color="bg-orange-100 text-orange-600" />
        <StatBox label="Quiz" value={stats.quiz} color="bg-purple-100 text-purple-600" />
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div className={`rounded-xl p-6 shadow ${color}`}>
    <div className="text-3xl font-bold">{value}</div>
    <div className="mt-1 text-sm">{label}</div>
  </div>
);

export default Statistik;
