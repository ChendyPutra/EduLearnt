export default function CoursesOnline() {
  const courses = [
    { t: "Coding Dasar (SD)", level: "SD", desc: "Blockly & Scratch project.", tag: "Pemula" },
    { t: "Python untuk Remaja", level: "SMP/SMA", desc: "Dasar Python & mini game.", tag: "Populer" },
    { t: "AI Vision 101", level: "SMA", desc: "Computer Vision dasar.", tag: "Baru" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Courses Online</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {courses.map((c, i) => (
          <div key={i} className="border rounded-2xl p-4">
            <div className="badge bg-blue-100 text-blue-700">{c.tag}</div>
            <div className="mt-2 font-semibold">{c.t}</div>
            <div className="text-sm text-gray-600">{c.level}</div>
            <p className="text-sm mt-2 text-gray-700">{c.desc}</p>
            <button className="btn btn-primary mt-3 w-full">Mulai Belajar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
