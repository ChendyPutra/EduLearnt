// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Tentang EduLearnt</h1>
      <p className="text-gray-700 leading-relaxed">
        <strong>EduLearnt</strong> adalah platform pembelajaran teknologi untuk siswa SD, SMP,
        dan SMA yang berfokus pada coding, kecerdasan buatan (AI), dan robotika. Kami
        menyediakan kursus online yang interaktif dan juga kelas offline di sekolah mitra.
      </p>

      <p className="text-gray-700 mt-4 leading-relaxed">
        Dikelola oleh tim pendidik dan praktisi teknologi, EduLearnt bertujuan
        membentuk generasi muda Indonesia yang tidak hanya paham teknologi,
        tapi juga mampu menciptakannya.
      </p>

      <p className="text-gray-700 mt-4 leading-relaxed">
        Kami percaya bahwa pendidikan teknologi harus dapat diakses oleh semua siswa,
        dari kota hingga pelosok desa. Karena itu, kami juga menyediakan produk fisik
        (EduKit) serta dukungan logistik ke seluruh Indonesia.
      </p>

      <div className="mt-8">
        <p className="text-sm text-gray-500">Dikelola oleh PT EduLearnt Digital Indonesia</p>
        <p className="text-sm text-gray-500">Email: info@edulearnt.com | WhatsApp: 0812-3456-7890</p>
      </div>
    </div>
  );
};

export default About;
