import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from "../components/AdminLayout";

export default function AdminModuleForm() {
    const { courseId, id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '',
        content: '',
        video_url: '',
        order: 1
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/modules/${id}`)
                .then(res => setForm(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8000/api/modules/${id}`, form);
                alert('Modul diperbarui!');
            } else {
                await axios.post(`http://localhost:8000/api/courses/${courseId}/modules`, form);
                alert('Modul ditambahkan!');
            }
            navigate(`/admin/courses/${courseId}/modules`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AdminLayout>

            <div className="max-w-2xl mx-auto bg-white p-6 shadow-xl rounded-xl mt-6">
                <h2 className="text-2xl font-bold mb-4">{id ? 'Edit' : 'Tambah'} Modul</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Judul Modul" className="w-full border p-2 rounded" />
                    <textarea name="content" value={form.content} onChange={handleChange} placeholder="Isi Modul" className="w-full border p-2 rounded" />
                    <input type="text" name="video_url" value={form.video_url} onChange={handleChange} placeholder="URL Video (opsional)" className="w-full border p-2 rounded" />
                    <input type="number" name="order" value={form.order} onChange={handleChange} placeholder="Urutan Modul" className="w-full border p-2 rounded" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan</button>
                </form>
            </div>
        </AdminLayout>

    );
}
