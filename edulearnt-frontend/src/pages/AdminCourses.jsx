import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminLayout from "../components/AdminLayout";


export default function AdminCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/courses')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <AdminLayout>

            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-blue-800">Kelola Kursus</h1>
                    <Link to="/admin/courses/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        + Tambah Kursus
                    </Link>
                </div>

                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <table className="min-w-full text-left">
                        <thead className="bg-blue-100 text-gray-700">
                            <tr>
                                <th className="p-3">Judul</th>
                                <th className="p-3">Kategori</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{course.title}</td>
                                    <td className="p-3">{course.category}</td>
                                    <td className="p-3">{course.is_active ? 'Aktif' : 'Nonaktif'}</td>
                                    <td className="p-3 space-x-2">
                                        <Link to={`/admin/courses/${course.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                                        <button className="text-red-500 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>

    );
}
