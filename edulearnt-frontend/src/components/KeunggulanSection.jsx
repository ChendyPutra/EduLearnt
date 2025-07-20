// src/components/KeunggulanSection.jsx
import React from "react";
import { CheckCircle } from "lucide-react";

const keunggulan = [
  "Belajar interaktif dengan video & kuis",
  "Kelas tatap muka dan daring",
  "Konten sesuai jenjang SD, SMP, SMA",
  "Materi coding, AI, dan robotika dari dasar",
  "Didukung oleh mentor berpengalaman",
];

const KeunggulanSection = () => {
  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">
          Kenapa Memilih EduLearnt?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {keunggulan.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 border rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
              <p className="text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeunggulanSection;