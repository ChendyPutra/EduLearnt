// src/components/CTASection.jsx
import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ayo Mulai Belajar Coding & AI Sekarang!
        </h2>
        <p className="text-lg mb-6">
          EduLearnt mendukung generasi muda Indonesia untuk mahir teknologi sejak dini.
        </p>
        <Link
          to="/courses"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Lihat Kursus
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
