import { useState } from "react";

/**
 * ManageOffline - skeleton CRUD admin untuk program tatap muka (school partners).
 */

export default function ManageOffline() {
  const [programs,setPrograms] = useState([
    { id:1, school: "SD Harapan Bangsa", schedule: "Sabtu 09:00-11:00", city: "Bandung" },
    { id:2, school: "SMP Cerdas Maju", schedule: "Minggu 13:00-15:00", city: "Jakarta" },
  ]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Manage Offline Classes</h1>
      <div className="mt-4">
        <button className="btn btn-primary">Tambah Program</button>
      </div>

      <div className="mt-6 overflow-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Sekolah</th>
              <th className="p-3 text-left">Jadwal</th>
              <th className="p-3 text-left">Kota</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(p=>(
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.school}</td>
                <td className="p-3">{p.schedule}</td>
                <td className="p-3">{p.city}</td>
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
