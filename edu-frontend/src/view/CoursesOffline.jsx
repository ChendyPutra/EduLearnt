export default function CoursesOffline() {
  const jadwal = [
    { sekolah: "SD Harapan Bangsa", hari: "Selasa", jam: "14:00 - 16:00" },
    { sekolah: "SMP Cendekia", hari: "Kamis", jam: "15:00 - 17:00" },
    { sekolah: "SMA Nusantara", hari: "Sabtu", jam: "09:00 - 11:00" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Courses Offline</h1>
      <p className="text-gray-700">Kelas tatap muka di sekolah mitra dengan instruktur berpengalaman.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {jadwal.map((j, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="font-semibold">{j.sekolah}</div>
            <div className="text-sm text-gray-600">{j.hari}</div>
            <div className="text-sm text-gray-600">{j.jam}</div>
            <button className="btn btn-outline mt-3 w-full">Ajukan Kelas</button>
          </div>
        ))}
      </div>
    </div>
  );
}
