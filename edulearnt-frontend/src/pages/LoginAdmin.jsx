import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // untuk ambil token

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export default function LoginAdmin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Ambil CSRF cookie (set XSRF-TOKEN)
            await axios.get('/sanctum/csrf-cookie');

            // Ambil token dari cookie dan set ke header (wajib agar tidak 419)
            const xsrfToken = Cookies.get('XSRF-TOKEN');
            axios.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;

            const res = await axios.post('/admin/login', form);

            const role = res.data.role;
            alert('Login admin berhasil!');

            if (role === 'superadmin') {
                window.location.href = '/admin/super';
            } else {
                window.location.href = '/admin/dashboard';
            }
        } catch (err) {
            console.error(err);
            setError('Email atau password salah');
        }
    };

    return (

            <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Login Admin</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="Email" className="w-full border p-2 mb-3 rounded" />
                    <input type="password" name="password" value={form.password} onChange={handleChange}
                        placeholder="Password" className="w-full border p-2 mb-3 rounded" />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
                </form>
            </div>

    );
}
