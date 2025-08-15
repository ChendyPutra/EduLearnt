import { useState } from "react";
import api from "../api"; // nanti bisa panggil API /api/feedback

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // jika belum punya backend, ini tetap dummy
      // await api.post("/feedback", form);
      alert("Terima kasih! Feedback kamu terkirim (dummy).");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert(err?.response?.data?.message || "Gagal mengirim feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Kontak & Feedback</h1>
      <p className="text-gray-600 mt-2">Ada pertanyaan, kerjasama, atau kebutuhan kemitraan? Isi form berikut.</p>

      <form onSubmit={submit} className="mt-6 max-w-2xl space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-3 rounded"
          placeholder="Nama"
          required
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-3 rounded"
          placeholder="Email"
          type="email"
          required
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border p-3 rounded h-36"
          placeholder="Pesan / kebutuhan kemitraan"
          required
        />
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
          <button type="button" onClick={() => setForm({ name: "", email: "", message: "" })} className="btn btn-ghost">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
