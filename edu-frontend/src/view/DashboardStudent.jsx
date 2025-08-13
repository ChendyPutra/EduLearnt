export default function DashboardStudent() {
  const enrolled = [
    { t: "Python untuk Remaja", progress: 45 },
    { t: "AI Vision 101", progress: 10 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Siswa</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {enrolled.map((c, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="font-semibold">{c.t}</div>
            <div className="mt-2 h-2 bg-gray-200 rounded">
              <div className="h-2 bg-blue-600 rounded" style={{ width: `${c.progress}%` }} />
            </div>
            <div className="text-xs text-gray-600 mt-1">{c.progress}% selesai</div>
            <button className="btn btn-primary mt-3">Lanjutkan</button>
          </div>
        ))}
      </div>
    </div>
  );
}
