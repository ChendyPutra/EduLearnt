export default function ManageUsers() {
  const admins = [
    { name: "Super Admin", email: "super@edulearnt.com", role: "super_admin" },
    { name: "Adi Admin", email: "adi@edulearnt.com", role: "admin" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users (Admin/Super Admin)</h1>
      <div className="overflow-auto border rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.email}</td>
                <td className="p-3">
                  <span className="badge bg-gray-200">{a.role}</span>
                </td>
                <td className="p-3 text-right">
                  <button className="btn btn-outline">Edit</button>{" "}
                  <button className="btn bg-red-600 text-white hover:bg-red-700">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-4">Tambah Admin</button>
    </div>
  );
}
