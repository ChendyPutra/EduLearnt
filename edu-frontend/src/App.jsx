import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
import Home from "./view/Home.jsx";
import Courses from "./view/Courses.jsx";
import CourseDetail from "./view/CourseDetail.jsx";
import Shop from "./view/Shop.jsx";
import About from "./view/About.jsx";
import Login from "./view/Login.jsx";
import Register from "./view/Register.jsx";
import DashboardStudent from "./view/DashboardStudent.jsx";
import DashboardAdmin from "./view/DashboardAdmin.jsx";
import ManageAdmins from "./view/ManageAdmins.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <DashboardStudent />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        {/* Super Admin Only */}
        <Route
          path="/admin/manage-admins"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <ManageAdmins />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
