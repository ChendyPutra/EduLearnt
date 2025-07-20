import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminModules() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/courses/${courseId}`)
      .then(res => setCourse(res.data));
    axios.get(`http://localhost:8000/api/courses/${courseId}/modules`)
      .then(res => setModules(res.data));
  }, [courseId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Modul Kursus: {course?.title}
      </h1>

      <Link to={`/admin/courses/${courseId}/modules/create`} className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-green-600">
        + Tambah Modul
      </Link>

      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3">Judul</th>
              <th className="p-3">Urutan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{mod.title}</td>
                <td className="p-3">{mod.order}</td>
                <td className="p-3 space-x-2">
                  <Link to={`/admin/courses/${courseId}/modules/${mod.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                  <button className="text-red-500 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
