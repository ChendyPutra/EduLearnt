import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AdminCourseForm() {
  const { id } = useParams(); // jika ada ID, maka ini edit
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: '',
    is_active: true,
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/courses/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/courses/${id}`, form);
        alert('Kursus diperbarui!');
      } else {
        await axios.post('http://localhost:8000/api/courses', form);
        alert('Kursus ditambahkan!');
      }
      navigate('/admin/courses');
    } catch (error) {
      alert('Gagal menyimpan kursus.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-xl mt-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">{id ? 'Edit' : 'Tambah'} Kursus</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul Kursus"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi Kursus"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          placeholder="URL Thumbnail"
          className="w-full border p-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
          />
          Aktifkan Kursus
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
