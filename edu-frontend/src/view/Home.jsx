import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            Belajar <span className="text-blue-600">Coding</span>,{" "}
            <span className="text-purple-600">AI</span>, &{" "}
            <span className="text-emerald-600">Robotika</span> yang Seru!
          </h1>
          <p className="mt-4 text-gray-600">
            Kurikulum interaktif untuk siswa SD–SMA. Materi video, kuis, dan proyek nyata.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/courses-online" className="btn btn-primary">Mulai Belajar</Link>
            <Link to="/shop" className="btn btn-outline">Lihat Kit Belajar</Link>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-blue-100 via-purple-100 to-emerald-100 p-6">
          <div className="aspect-video rounded-2xl bg-white grid place-content-center text-gray-400">
            (Hero Illustration)
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section>
        <h2 className="text-xl font-bold mb-4">Kategori Populer</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { t: "Coding", c: "from-blue-500 to-cyan-500" },
            { t: "Artificial Intelligence", c: "from-purple-500 to-pink-500" },
            { t: "Robotika", c: "from-emerald-500 to-lime-500" },
          ].map((k, i) => (
            <div key={i} className={`rounded-2xl p-4 text-white bg-gradient-to-br ${k.c}`}>
              <div className="text-lg font-semibold">{k.t}</div>
              <p className="text-sm mt-1 opacity-90">Materi interaktif & proyek mini.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Online highlight */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="rounded-2xl border p-4 bg-white">
          <div className="aspect-video rounded-xl bg-gray-100 grid place-content-center text-gray-400">
            (Preview Video)
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Kelas Online Interaktif</h3>
          <p className="text-gray-600 mt-2">
            Video pembelajaran, kuis, dan tantangan proyek. Belajar kapan saja di mana saja.
          </p>
          <Link to="/courses-online" className="btn btn-primary mt-4">Lihat Kelas Online</Link>
        </div>
      </section>

      {/* Offline */}
      <section className="rounded-2xl p-6 bg-orange-50 border">
        <h3 className="text-lg font-bold">Kelas Offline di Sekolah Mitra</h3>
        <p className="text-gray-700 mt-1">Instruktur datang ke sekolah. Materi praktik & demo robot.</p>
        <Link to="/courses-offline" className="btn mt-4 bg-orange-500 text-white hover:bg-orange-600">
          Info Kelas Offline
        </Link>
      </section>

      {/* Shop */}
      <section>
        <h3 className="text-lg font-bold mb-3">Toko Online</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {["Starter Robot Kit", "AI Vision Kit", "Coding Card Pack"].map((p, i) => (
            <div key={i} className="border rounded-2xl p-4">
              <div className="aspect-video bg-gray-100 rounded-xl grid place-content-center text-gray-400">(img)</div>
              <div className="mt-3 font-semibold">{p}</div>
              <button className="btn btn-primary mt-2">Beli</button>
            </div>
          ))}
        </div>
      </section>

      {/* Company */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold">Tentang EduLearnt</h3>
          <p className="text-gray-600 mt-2">
            Misi kami: menyiapkan generasi muda melek teknologi lewat pembelajaran yang menyenangkan.
          </p>
          <Link to="/company-profile" className="btn btn-outline mt-4">Profil Perusahaan</Link>
        </div>
        <div className="rounded-2xl border p-6 bg-white">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50">
              <div className="text-2xl font-extrabold">1500+</div>
              <div className="text-sm text-gray-600">Siswa Aktif</div>
            </div>
            <div className="p-4 rounded-xl bg-purple-50">
              <div className="text-2xl font-extrabold">120+</div>
              <div className="text-sm text-gray-600">Sekolah Mitra</div>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50">
              <div className="text-2xl font-extrabold">200+</div>
              <div className="text-sm text-gray-600">Jam Konten</div>
            </div>
            <div className="p-4 rounded-xl bg-orange-50">
              <div className="text-2xl font-extrabold">4.9/5</div>
              <div className="text-sm text-gray-600">Rating Orang Tua</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
