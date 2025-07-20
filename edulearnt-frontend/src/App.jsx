import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import Kit from './pages/Kit';
import Stats from './pages/Stats';
import About from './pages/About';
import NotFound from './pages/NotFound';

import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';          // ✅ Tambahkan
import LoginAdmin from './pages/LoginAdmin';
import DashboardUser from './pages/DashboardUser';
import DashboardAdmin from './pages/DashboardAdmin';      // ✅ Tambahkan
import DashboardSuper from './pages/DashboardSuper';      // ✅ Tambahkan

import AdminCourses from './pages/AdminCourses';          // ✅ Tambahkan
import AdminCourseForm from './pages/AdminCourseForm';    // ✅ Tambahkan
import AdminModules from './pages/AdminModules';          // ✅ Tambahkan
import AdminModuleForm from './pages/AdminModuleForm';    // ✅ Tambahkan

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/kit" element={<Kit />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/about" element={<About />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<DashboardUser />} />

        {/* Admin Auth & Dashboards */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/super" element={<DashboardSuper />} />

        {/* Admin Course & Module Management */}
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/create" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:id/edit" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:courseId/modules" element={<AdminModules />} />
        <Route path="/admin/courses/:courseId/modules/create" element={<AdminModuleForm />} />
        <Route path="/admin/courses/:courseId/modules/:id/edit" element={<AdminModuleForm />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
