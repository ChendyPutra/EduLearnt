import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { courses as sampleCourses } from "../utils/sampleData";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06 } })
};

export default function Courses() {
  const [query, setQuery] = useState("");
  const [jenjang, setJenjang] = useState("all");
  const [onlyFree, setOnlyFree] = useState(false);

  const filtered = useMemo(() => {
    return sampleCourses.filter(c => {
      if (jenjang !== "all" && c.jenjang !== jenjang) return false;
      if (onlyFree && c.price > 0) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.tags.join(" ").toLowerCase().includes(q);
    });
  }, [query, jenjang, onlyFree]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Katalog Kursus</h1>
          <p className="text-sm text-slate-600 mt-1">Pilih kursus berdasarkan jenjang, topik, atau gratis/berbayar.</p>
        </div>

        <div className="flex gap-3 items-center">
          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Cari kursus atau topik..."
            className="border rounded-lg px-3 py-2 w-56"
          />
          <select className="border rounded-lg px-3 py-2" value={jenjang} onChange={e=>setJenjang(e.target.value)}>
            <option value="all">Semua Jenjang</option>
            <option value="SD">SD / MI</option>
            <option value="SMP">SMP / MTs</option>
            <option value="SMA">SMA / MA</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyFree} onChange={e=>setOnlyFree(e.target.checked)} />
            Hanya Gratis
          </label>
        </div>
      </header>

      <motion.div initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="col-span-full border rounded-2xl p-6 text-center text-slate-600">
            Tidak ada kursus yang cocok — coba kata kunci lain.
          </div>
        )}

        {filtered.map((c, i) => (
          <motion.article key={c.id} custom={i} variants={cardVariants} className="rounded-2xl bg-white border p-4 shadow-sm hover:shadow-lg transition">
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="text-xs font-semibold text-amber-500">{c.tags[0]}</div>
                <h3 className="text-lg font-semibold mt-1">{c.title}</h3>
                <div className="text-sm text-slate-500 mt-1">{c.jenjang} • {c.duration}</div>
              </div>
              <div className="text-right">
                {c.price === 0 ? (
                  <div className="text-sm font-semibold text-emerald-600">Gratis</div>
                ) : (
                  <div className="text-sm font-semibold text-slate-900">Rp {c.price.toLocaleString()}</div>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-600 mt-3 line-clamp-2">{c.short}</p>

            <div className="mt-4 flex gap-2">
              <Link to={`/courses/${c.id}`} className="btn btn-outline flex-1">Detail</Link>
              <button className="btn btn-primary flex-1">{c.price===0? "Mulai" : "Daftar"}</button>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
