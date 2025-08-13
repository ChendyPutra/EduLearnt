import { useParams } from "react-router-dom";
import { courses } from "../utils/sampleData";
import { motion } from "framer-motion";

export default function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => String(c.id) === String(id)) || courses[0];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-extrabold">{course.title}</h1>
          <div className="text-sm text-slate-600">{course.jenjang} • {course.duration} • {course.level}</div>

          <div className="rounded-2xl overflow-hidden border bg-black/5 aspect-video">
            {/* video embed */}
            <iframe
              title="preview"
              src={course.preview ? `https://www.youtube.com/embed/${course.preview}` : ""}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          <section>
            <h3 className="text-lg font-semibold">Deskripsi</h3>
            <p className="text-slate-600 mt-2">{course.long}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Silabus singkat</h3>
            <ul className="mt-3 space-y-2">
              {course.syllabus.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-2" />
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-slate-600">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 border rounded-2xl p-4 h-fit">
          <div className="text-sm text-slate-600">Instructor</div>
          <div className="font-semibold">{course.instructor}</div>
          <div className="mt-4">
            {course.price === 0 ? (
              <div className="text-2xl font-extrabold text-emerald-600">Gratis</div>
            ) : (
              <div className="text-2xl font-extrabold">Rp {course.price.toLocaleString()}</div>
            )}
            <div className="text-sm text-slate-500 mt-1">{course.students} siswa terdaftar</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="btn btn-primary flex-1">{course.price===0 ? "Mulai Sekarang" : "Daftar Sekarang"}</button>
            <button className="btn btn-outline flex-1">Preview</button>
          </div>

          <div className="mt-4 text-sm text-slate-600">
            <div className="font-semibold">FAQ</div>
            <div className="mt-2">
              <div className="text-sm"><strong>Apakah cocok untuk pemula?</strong><div className="text-slate-600"> Ya — terdapat modul pengantar.</div></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
