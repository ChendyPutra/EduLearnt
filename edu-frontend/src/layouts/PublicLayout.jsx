import NavbarPublic from "../components/NavbarPublic";
import Footer from "../components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavbarPublic />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
