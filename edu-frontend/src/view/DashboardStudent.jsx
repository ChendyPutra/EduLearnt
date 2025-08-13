import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { courses } from "../utils/sampleData";

export default function DashboardStudent() {
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(()=> {
    // simulate load -> nanti diganti API call
    setTimeout(()=> {
      setEnrolled(courses.slice(0,2).map((c,i)=>({ ...c, progress: [20,55][i] })));
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-100 rounded animate-pulse"></div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[1,2].map(i=> <div key={i} className="h-40 bg-slate-100 rounded animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Halo, Selamat Belajar!</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Siswa Aktif</div>
          <div className="text-2xl font-extrabold">1.520</div>
        </div>
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Kursus Diikuti</div>
          <div className="text-2xl font-extrabold">{enrolled.length}</div>
        </div>
        <div className="rounded-2xl p-4 bg-white border">
          <div className="text-sm text-slate-500">Kuis Belum Selesai</div>
          <div className="text-2xl font-extrabold">2</div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold">Kursus Saya</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          {enrolled.map((c, i) => (
            <motion.div key={c.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0,transition:{delay:i*0.08}}} className="border rounded-2xl p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm text-slate-500">{c.jenjang}</div>
                </div>
                <div className="text-sm text-slate-600">{c.progress}%</div>
              </div>
              <div className="mt-3 h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-600 rounded" style={{width:`${c.progress}%`}} />
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn btn-primary">Lanjutkan</button>
                <button className="btn btn-outline">Materi</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
