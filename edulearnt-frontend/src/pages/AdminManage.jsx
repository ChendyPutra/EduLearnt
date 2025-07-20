import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

export default function AdminManage() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "admin" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios.get("/admin/manage-admin")
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/admin/manage-admin/${editingId}` : "/admin/manage-admin";
    const method = editingId ? "put" : "post";

    try {
      // Ambil CSRF token sebelum request POST/PUT
      await axios.get("/sanctum/csrf-cookie");

      await axios[method](url, form);

      fetchAdmins();
      setForm({ name: "", email: "", password: "", role: "admin" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setForm({ name: admin.name, email: admin.email, password: "", role: admin.role });
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus admin ini?")) {
      try {
        await axios.get("/sanctum/csrf-cookie");

        await axios.delete(`/admin/manage-admin/${id}`);

        fetchAdmins();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Kelola Admin</h2>

      {/* Form Tambah/Edit */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input name="name" placeholder="Nama" value={form.name} onChange={handleInputChange} className="block w-full p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInputChange} className="block w-full p-2 border rounded" required />
        <input name="password" type="password" placeholder={editingId ? "Ganti Password (opsional)" : "Password"} value={form.password} onChange={handleInputChange} className="block w-full p-2 border rounded" required={!editingId} />
        <input type="hidden" name="role" value="admin" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? "Update" : "Tambah"} Admin</button>
      </form>

      {/* Tabel Admin */}
      <table className="w-full border text-left">
        <thead>
          <tr>
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Nama</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-3 py-2">{admin.id}</td>
              <td className="border px-3 py-2">{admin.name}</td>
              <td className="border px-3 py-2">{admin.email}</td>
              <td className="border px-3 py-2 capitalize">{admin.role}</td>
              <td className="border px-3 py-2 space-x-2">
                <button onClick={() => handleEdit(admin)} className="text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(admin.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
