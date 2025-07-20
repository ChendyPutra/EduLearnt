// src/components/QuizPreview.jsx
import React from "react";
import { ClipboardList, Star } from "lucide-react";

const QuizPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
          Quiz & Evaluasi
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Latihan, kuis, dan evaluasi sesuai jenjang: SD, SMP, dan SMA.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            <ClipboardList className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-800">Latihan Interaktif</h3>
            <p className="text-gray-600">
              Soal latihan coding dan AI untuk menguji pemahaman materi.
            </p>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl shadow">
            <Star className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-orange-700">Evaluasi Terstandar</h3>
            <p className="text-gray-600">
              Evaluasi berkala dengan format kuis berbasis jenjang pendidikan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPreview;
