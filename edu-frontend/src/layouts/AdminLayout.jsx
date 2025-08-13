import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <NavbarAdmin />
      <main className="p-6">{children}</main>
    </div>
  );
}
