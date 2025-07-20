import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-100 to-orange-100 py-16 px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 leading-tight">
            Belajar <span className="text-orange-500">Coding, AI</span> & <span className="text-orange-500">Robotika</span><br /> untuk Generasi Muda
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            EduLearnt adalah platform pembelajaran teknologi interaktif untuk siswa SD, SMP, hingga SMA.
          </p>
          <div className="flex gap-4">
            <a href="#mulai" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Mulai Belajar
            </a>
            <a href="#kursus" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-100 transition">
              Lihat Kursus
            </a>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/assets/hero-illustration.png" alt="Ilustrasi belajar" className="w-full max-w-md" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
