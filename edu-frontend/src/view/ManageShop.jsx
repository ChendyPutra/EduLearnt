import { useState } from "react";

/**
 * ManageShop - skeleton CRUD admin untuk produk EduLearnKit.
 * Backend integration: later connect to /api/products.
 */

export default function ManageShop() {
  const [items, setItems] = useState([
    { id: 1, name: "EduLearnKit Robotika Dasar", marketplace: "Shopee", url: "https://shopee.co.id/" },
    { id: 2, name: "EduLearnKit AI Starter", marketplace: "Tokopedia", url: "https://www.tokopedia.com/" },
  ]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Manage Shop (EduLearnKit)</h1>
      <div className="mt-4">
        <button className="btn btn-primary">Tambah Produk</button>
      </div>

      <div className="mt-6 overflow-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Produk</th>
              <th className="p-3 text-left">Marketplace</th>
              <th className="p-3 text-left">URL</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="p-3">{it.name}</td>
                <td className="p-3">{it.marketplace}</td>
                <td className="p-3"><a href={it.url} target="_blank" rel="noreferrer" className="text-blue-600">Lihat</a></td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 rounded bg-blue-600 text-white mr-2">Edit</button>
                  <button className="px-3 py-1 rounded bg-red-600 text-white">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
