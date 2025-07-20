import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Kit() {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/kits')
      .then(res => setKits(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Kit Edukasi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {kits.map(kit => (
          <div key={kit.id} className="bg-white p-4 rounded-xl shadow hover:shadow-md">
            <img src={kit.image} alt={kit.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{kit.name}</h2>
            <p className="text-sm text-gray-600">{kit.description}</p>
            <p className="text-lg font-bold mt-2 text-green-600">Rp {parseInt(kit.price).toLocaleString()}</p>
            <a href={kit.marketplace_link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Beli Sekarang
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
