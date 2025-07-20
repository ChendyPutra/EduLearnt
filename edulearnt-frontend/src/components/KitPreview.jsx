// src/components/KitPreview.jsx
import React from "react";
import { Box, ShoppingCart } from "lucide-react";

const KitPreview = () => {
  return (
    <section className="py-16 bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">
          Toko EduKit
        </h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Dapatkan kit edukasi robotika & sensor AI yang mendukung pembelajaran praktis.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow">
            <Box className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-blue-800">Robotik & Sensor Kit</h3>
            <p className="text-gray-600">
              Alat peraga untuk praktik coding dan AI di rumah atau sekolah.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow">
            <ShoppingCart className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-orange-700">Terintegrasi Marketplace</h3>
            <p className="text-gray-600">
              Pembelian mudah lewat Shopee, Tokopedia, dan lainnya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitPreview;
