import { Link } from "react-router-dom";
import MotionReveal from "../components/MotionReveal";

export default function Home() {
  return (
    <>
     <MotionReveal><section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-violet-50" />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Belajar jadi <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">lebih seru</span>
            </h1>
            <p className="mt-4 text-slate-600">Akses kursus kurasi untuk SD–SMA & umum. Online interaktif + opsi kelas offline.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/courses" className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-white hover:brightness-110">Jelajahi Courses</Link>
              <Link to="/shop" className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100">Shop</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-white shadow-2xl border border-slate-200" />
            {/* ganti dengan ilustrasi/preview */}
          </div>
        </div>
      </section></MotionReveal> 

      {/* grid courses by jenjang */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Katalog pilihan</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["SD/MI","SMP/MTs","SMA/MA"].map((jenjang) => (
            <article key={jenjang} className="rounded-2xl bg-white border border-slate-200 shadow hover:shadow-lg hover:-translate-y-0.5 transition p-5">
              <div className="text-xs font-semibold text-amber-600">Jenjang</div>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{jenjang}</h3>
              <p className="mt-2 text-sm text-slate-600">Materi kurikulum inti + latihan interaktif.</p>
              <Link to="/courses" className="mt-4 inline-block text-indigo-700 font-medium hover:underline">Lihat materi →</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
