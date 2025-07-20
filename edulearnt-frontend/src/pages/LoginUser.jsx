import React, { useState } from 'react';
import axios from 'axios';

const LoginUser = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie');

            await axios.post('http://localhost:8000/login', form, {
                withCredentials: true
            });
            alert('Login siswa berhasil!');
            window.location.href = '/dashboard';
        } catch {
            setError('Email atau password salah');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Login Siswa</h2>
            {error && <p className="text-red-600 mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="email" type="email" placeholder="Email"
                    className="w-full p-2 border rounded"
                    onChange={handleChange} />
                <input name="password" type="password" placeholder="Password"
                    className="w-full p-2 border rounded"
                    onChange={handleChange} />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                    Masuk
                </button>
            </form>
        </div>
    );
};

export default LoginUser;
