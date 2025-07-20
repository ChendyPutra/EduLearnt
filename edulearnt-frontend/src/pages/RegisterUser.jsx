import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      await axios.post('http://localhost:8000/register', form, {
        withCredentials: true,
      });

      alert('Registrasi berhasil! Silakan login.');
      window.location.href = '/login';
    } catch (err) {
      setError(
        err.response?.data?.message || 'Terjadi kesalahan saat registrasi.'
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4">Registrasi Siswa</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Konfirmasi Password"
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
