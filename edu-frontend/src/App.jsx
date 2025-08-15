import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic";
import NavbarAdmin from "./components/NavbarAdmin";
import Footer from "./components/Footer";

import Home from "./view/Home";
import CoursesOnline from "./view/CoursesOnline";
import CourseDetail from "./view/CourseDetail";
import CoursesOffline from "./view/CoursesOffline";
import Shop from "./view/Shop";
import CompanyProfile from "./view/CompanyProfile";
import Contact from "./view/Contact";

import LoginStudent from "./view/LoginStudent";
import LoginAdmin from "./view/LoginAdmin";
import Register from "./view/Register";

import DashboardStudent from "./view/DashboardStudent";
import DashboardAdmin from "./view/DashboardAdmin";
import ManageUsers from "./view/ManageUsers";
import ManageCourses from "./view/ManageCourses";
import ManageShop from "./view/ManageShop";
import ManageOffline from "./view/ManageOffline";

import ProtectedRoute from "./components/ProtectedRoute";

function AppInner() {
  const location = useLocation();
  const HIDE_NAV = ["/login", "/register", "/admin/login"];
  const hideNav = HIDE_NAV.includes(location.pathname);
  const role = localStorage.getItem("role") || "";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && (role === "admin" || role === "super_admin" ? <NavbarAdmin /> : <NavbarPublic />)}

      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/courses-online" element={<CoursesOnline />} />
          <Route path="/courses-online/:id" element={<CourseDetail />} />
          <Route path="/courses-offline" element={<CoursesOffline />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<LoginStudent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

          {/* Student */}
          <Route path="/dashboard-student" element={
            <ProtectedRoute allowedRoles={['student']}><DashboardStudent /></ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/dashboard-admin" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}><DashboardAdmin /></ProtectedRoute>
          } />
          <Route path="/manage-users" element={
            <ProtectedRoute allowedRoles={['super_admin']}><ManageUsers /></ProtectedRoute>
          } />
          <Route path="/manage-courses" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}><ManageCourses /></ProtectedRoute>
          } />
          <Route path="/manage-shop" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}><ManageShop /></ProtectedRoute>
          } />
          <Route path="/manage-offline" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}><ManageOffline /></ProtectedRoute>
          } />
        </Routes>
      </main>

      {!hideNav && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
