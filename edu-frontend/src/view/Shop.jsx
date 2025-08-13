import { useState } from "react";
import { motion } from "framer-motion";
import { shopItems } from "../utils/sampleData";

export default function Shop() {
  const [quick, setQuick] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">EduLearnt Shop</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopItems.map((p, i) => (
          <motion.div key={p.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0, transition:{delay:i*0.04}}} className="border rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg transition">
            <div className="aspect-video rounded-xl bg-gray-50 grid place-content-center text-slate-400">{p.img || "(img)"}</div>
            <div className="mt-3 flex justify-between items-start">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-slate-500">{p.desc}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">Rp {p.price.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">{p.stock} stok</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a href={p.shopee} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">Shopee</a>
              <a href={p.tokped} target="_blank" rel="noreferrer" className="btn btn-outline flex-1">Tokopedia</a>
            </div>

            <div className="mt-3 text-right">
              <button onClick={()=>setQuick(p)} className="text-sm text-slate-600 hover:underline">Quick view</button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* quick modal */}
      {quick && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={()=>setQuick(null)}>
          <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white rounded-2xl p-6 max-w-xl w-full" onClick={(e)=>e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-lg">{quick.name}</div>
                <div className="text-sm text-slate-500">{quick.desc}</div>
              </div>
              <button className="text-slate-500" onClick={()=>setQuick(null)}>Close</button>
            </div>
            <div className="mt-4">
              <div className="aspect-video bg-gray-50 rounded-xl grid place-content-center">{quick.img}</div>
              <div className="mt-4 text-right font-semibold">Rp {quick.price.toLocaleString()}</div>
              <div className="mt-4 flex gap-2">
                <a className="btn btn-primary flex-1" href={quick.shopee} target="_blank" rel="noreferrer">Beli di Shopee</a>
                <a className="btn btn-outline flex-1" href={quick.tokped} target="_blank" rel="noreferrer">Beli di Tokopedia</a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
