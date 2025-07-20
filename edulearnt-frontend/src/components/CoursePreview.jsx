// src/components/CoursePreview.jsx
import React from "react";
import { BookOpen, Users } from "lucide-react";

const CoursePreview = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
          Course Online & Offline
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Materi coding & AI interaktif serta kelas tatap muka di sekolah mitra.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <BookOpen className="w-10 h-10 text-orange-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-blue-900">Course Online</h3>
            <p className="text-gray-600 mt-2">
              Belajar melalui platform interaktif kapan saja, dengan materi coding, AI, dan robotika.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <Users className="w-10 h-10 text-blue-600 mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-orange-800">Kelas Offline</h3>
            <p className="text-gray-600 mt-2">
              Tatap muka di sekolah mitra bersama mentor berpengalaman di bidang teknologi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
