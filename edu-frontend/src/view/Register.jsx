import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { name, email, password, password_confirmation });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // student
      navigate("/dashboard-student");
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors) {
        alert(Object.values(errors).flat().join("\n"));
      } else {
        alert(err?.response?.data?.message || "Register gagal");
      }
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-md border rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={submit} className="space-y-3 mt-4">
          <input className="w-full border p-2 rounded-lg" placeholder="Nama" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full border p-2 rounded-lg" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded-lg" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <input type="password" className="w-full border p-2 rounded-lg" placeholder="Konfirmasi Password" value={password_confirmation} onChange={e=>setPasswordConfirmation(e.target.value)} />
          <button className="btn btn-primary w-full">Daftar</button>
        </form>
      </div>
    </div>
  );
}
