export default function ManageCourses() {
  const courses = [
    { title: "Python untuk Remaja", status: "Aktif" },
    { title: "AI Vision 101", status: "Draft" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map((c, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-600">Status: {c.status}</div>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-outline">Edit</button>
              <button className="btn bg-red-600 text-white hover:bg-red-700">Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4">Tambah Kursus</button>
    </div>
  );
}
