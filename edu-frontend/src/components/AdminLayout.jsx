import { useSidebar } from "../context/SidebarContext";

export default function AdminLayout({ children }) {
  const { collapsed } = useSidebar();

  return (
    <div 
      className="fixed top-0 right-0 bottom-0 transition-all duration-300 pt-24 p-8 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/50 overflow-y-auto"
      style={{ left: collapsed ? '80px' : '288px', zIndex: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}