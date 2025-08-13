import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginAdmin() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login-admin", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // 'admin' or 'super_admin'
      navigate("/dashboard-admin");
    } catch (err) {
      alert(err?.response?.data?.message || "Login admin gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Login Admin</h1>
        <form onSubmit={submit} className="space-y-3 mt-4">
          <input className="w-full border p-2 rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded-lg" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn w-full bg-gray-900 text-white hover:bg-black" disabled={loading}>{loading ? "Memproses..." : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
