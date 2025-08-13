import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginStudent() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login-student", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/dashboard-student");
    } catch (err) {
      alert(err?.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Login Siswa</h1>
        <form onSubmit={submit} className="space-y-3 mt-4">
          <input className="w-full border p-2 rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded-lg" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Memproses..." : "Login"}</button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
          Belum punya akun? <Link className="text-blue-600 hover:underline" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
