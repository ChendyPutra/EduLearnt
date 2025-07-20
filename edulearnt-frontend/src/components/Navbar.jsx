import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "Kursus", path: "/courses" },
    { name: "Quiz", path: "/quiz" },
    { name: "EduKit", path: "/kit" },
    { name: "Statistik", path: "/statistik" },
    { name: "Tentang", path: "/about" },
  ];

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        EduLearnt
      </Link>
      <ul className="flex space-x-6 text-sm font-medium">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`hover:text-orange-500 transition duration-200 ${
                location.pathname === item.path ? "text-orange-500" : "text-gray-800"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;