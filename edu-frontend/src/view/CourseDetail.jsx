import { useParams, Link } from "react-router-dom";

/**
 * CourseDetail - halaman detail course. Menampilkan ringkasan,
 * contoh embed YouTube (placeholder), daftar modul, dan tombol kuis.
 *
 * NOTE: konten masih dummy. Integrasikan dengan API course/detail later.
 */

export default function CourseDetail() {
  const { id } = useParams();

  // dummy course data (ganti nanti dengan API)
  const course = {
    id,
    title: "Contoh Course: Dasar Robotika",
    description: "Pelajari dasar sensor, aktuator, dan membuat robot sederhana. Video pembelajaran dan kuis interaktif.",
    youtubeId: "M7lc1UVf-VE", // example youtube id
    modules: [
      { id: 1, title: "Pengenalan & Konsep" },
      { id: 2, title: "Komponen Elektronik" },
      { id: 3, title: "Proyek: Robot Line Follower" },
      { id: 4, title: "Kuis Akhir" },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="md:flex md:gap-8">
        <div className="md:flex-1">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>

          <div className="mt-6 card">
            <div className="aspect-video">
              {/* YouTube embed (responsive) */}
              <iframe
                title="course-video"
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${course.youtubeId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <aside className="md:w-80 mt-6 md:mt-0">
          <div className="card">
            <h3 className="font-semibold">Daftar Modul</h3>
            <ul className="mt-3 space-y-2">
              {course.modules.map((m) => (
                <li key={m.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{m.title}</div>
                    <div className="text-xs text-gray-500">Durasi: 10-25 menit</div>
                  </div>
                  <div>
                    {m.title.toLowerCase().includes("kuis") ? (
                      <Link to="/login" className="text-sm px-3 py-2 rounded bg-yellow-400 text-gray-900">
                        Kuis (Login)
                      </Link>
                    ) : (
                      <button className="px-3 py-1 rounded bg-[var(--primary)] text-white text-sm">Lihat</button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Catatan: Akses penuh memerlukan akun terdaftar.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
