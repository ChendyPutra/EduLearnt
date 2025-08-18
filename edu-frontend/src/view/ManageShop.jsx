import { useEffect, useState } from "react";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", desc: "", price: "", marketplace_url: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Handle form change
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle submit (add or edit)
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:8000/api/products/${editId}`
      : "http://localhost:8000/api/products";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ name: "", desc: "", price: "", marketplace_url: "" });
      setEditId(null);
      // Refresh list
      fetch("http://localhost:8000/api/products")
        .then(res => res.json())
        .then(setProducts);
    }
  };

  // Handle edit
  const handleEdit = p => {
    setForm({
      name: p.name,
      desc: p.desc || "",
      price: p.price || "",
      marketplace_url: p.marketplace_url || "",
    });
    setEditId(p.id);
  };

  // Handle delete
  const handleDelete = async id => {
    if (!window.confirm("Hapus produk ini?")) return;
    await fetch(`http://localhost:8000/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Kelola Produk Toko</h1>
      <form className="space-y-2 mb-6" onSubmit={handleSubmit}>
        <input className="border p-2 rounded w-full" name="name" placeholder="Nama Produk" value={form.name} onChange={handleChange} required />
        <textarea className="border p-2 rounded w-full" name="desc" placeholder="Deskripsi" value={form.desc} onChange={handleChange} />
        <input className="border p-2 rounded w-full" name="price" placeholder="Harga" value={form.price} onChange={handleChange} type="number" />
        <input className="border p-2 rounded w-full" name="marketplace_url" placeholder="Link Marketplace" value={form.marketplace_url} onChange={handleChange} />
        <button className="btn btn-primary" disabled={loading}>{editId ? "Update" : "Tambah"} Produk</button>
        {editId && <button type="button" className="btn ml-2" onClick={() => { setEditId(null); setForm({ name: "", desc: "", price: "", marketplace_url: "" }); }}>Batal</button>}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Marketplace</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.price}</td>
              <td className="p-2 border">
                {p.marketplace_url && <a href={p.marketplace_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Link</a>}
              </td>
              <td className="p-2 border">
                <button className="btn btn-sm mr-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}