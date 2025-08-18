import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarPublic from "./components/NavbarPublic";
import SidebarAdmin from "./components/SidebarAdmin";
import HeaderAdmin from "./components/HeaderAdmin";
import AdminLayout from "./components/AdminLayout";
import Footer from "./components/Footer";
import { SidebarProvider } from "./context/SidebarContext";

import Home from "./view/Home";
import CoursesOnline from "./view/CoursesOnline";

import CoursesOffline from "./view/CoursesOffline";
import Shop from "./view/Shop";
import CompanyProfile from "./view/CompanyProfile";
import Contact from "./view/Contact";

import LoginStudent from "./view/LoginStudent";
import LoginAdmin from "./view/LoginAdmin";
import Register from "./view/Register";

import DashboardStudent from "./view/DashboardStudent";
import DashboardAdmin from "./view/DashboardAdmin";
import Quizzes from "./view/Quizzes";
import CourseModules from "./view/CourseModules";
import QuizTake from "./view/QuizTake";
import ManageUsers from "./view/ManageUsers";
import ManageCourses from "./view/ManageCourses";
import ManageShop from "./view/ManageShop";
import ManageProducts from "./view/ManageProducts";
import ManageFeedback from "./view/ManageFeedback";
import ManageCompany from "./view/ManageCompany";
import ManageQuizzes from "./view/ManageQuizzes";
import ManageNotifications from "./view/ManageNotifications";
import ManageBanners from "./view/ManageBanners";
import TakeQuiz from "./view/TakeQuiz";
import QuizResult from "./view/QuizResult";
import ManageOffline from "./view/ManageOffline";
import ManageAdmins from "./view/ManageAdmins";
import ManageModules from "./view/ManageModules";
import ManageCategories from "./view/ManageCategories";
import StudentCertificates from "./view/StudentCertificates";
import CourseProgress from "./view/CourseProgress";
import ProductDetail from "./view/ProductDetail";
import OfflineProgramDetail from "./view/OfflineProgramDetail";

import ProtectedRoute from "./components/ProtectedRoute";

function AppInner() {
  const location = useLocation();
  const HIDE_NAV = ["/login", "/register", "/admin/login"];
  const hideNav = HIDE_NAV.includes(location.pathname);
  const role = localStorage.getItem("role") || "";
  const isAdmin = role === "admin" || role === "super_admin";

  return (
    <div className="min-h-screen flex">
      {!hideNav && isAdmin && (
        <div className="fixed left-0 top-0 h-full z-50">
          <SidebarAdmin />
        </div>
      )}
      
      <div className={`flex-1 flex flex-col ${!hideNav && isAdmin ? 'ml-64' : ''}`}>
        {!hideNav && !isAdmin && <NavbarPublic />}
        {!hideNav && isAdmin && <HeaderAdmin />}

        <main className={`flex-1 ${!hideNav && !isAdmin ? 'container mx-auto px-4 py-6' : ''}`}>
          <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/courses-online" element={<CoursesOnline />} />
          <Route path="/courses/:courseId/quizzes" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><Quizzes /></ProtectedRoute>
          } />
          <Route path="/courses/:courseId/modules" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><CourseModules /></ProtectedRoute>
          } />

          <Route path="/courses-offline" element={<CoursesOffline />} />
          <Route path="/offline-programs/:id" element={<OfflineProgramDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth */}
          <Route path="/login" element={<LoginStudent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<LoginAdmin />} />

          {/* Student */}
          <Route path="/dashboard-student" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><DashboardStudent /></ProtectedRoute>
          } />


          <Route path="/quiz/:id/take" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><QuizTake /></ProtectedRoute>
          } />
          <Route path="/quiz/:id" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><TakeQuiz /></ProtectedRoute>
          } />
          <Route path="/quiz-result" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><QuizResult /></ProtectedRoute>
          } />
          <Route path="/quiz/:id/result" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><QuizResult /></ProtectedRoute>
          } />
          <Route path="/my-certificates" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><StudentCertificates /></ProtectedRoute>
          } />
          <Route path="/courses/:courseId/progress" element={
            <ProtectedRoute allowedRoles={['student','teacher','parent']}><CourseProgress /></ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/dashboard-admin" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><DashboardAdmin /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-users" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminLayout><ManageUsers /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-courses" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageCourses /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-shop" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageShop /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-products" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageProducts /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-feedback" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageFeedback /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-company" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageCompany /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-quizzes" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageQuizzes /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-notifications" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageNotifications /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-banners" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageBanners /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-offline" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageOffline /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-admins" element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <AdminLayout><ManageAdmins /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-modules" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageModules /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/manage-categories" element={
            <ProtectedRoute allowedRoles={['admin','super_admin']}>
              <AdminLayout><ManageCategories /></AdminLayout>
            </ProtectedRoute>
          } />
          </Routes>
        </main>

        {!hideNav && !isAdmin && <Footer />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppInner />
      </SidebarProvider>
    </BrowserRouter>
  );
}
