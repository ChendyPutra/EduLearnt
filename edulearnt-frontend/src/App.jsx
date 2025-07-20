import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Quiz from './pages/Quiz';
import Kit from './pages/Kit';
import Stats from './pages/Stats';
import About from './pages/About';
import NotFound from './pages/NotFound';

import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import DashboardUser from './pages/DashboardUser';

import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardSuper from './pages/DashboardSuper';

import AdminCourses from './pages/AdminCourses';
import AdminCourseForm from './pages/AdminCourseForm';
import AdminModules from './pages/AdminModules';
import AdminModuleForm from './pages/AdminModuleForm';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminManage from './pages/AdminManage'; 

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Tampilkan Navbar & Footer hanya jika BUKAN halaman admin */}
      {!isAdminRoute && <Navbar />}

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
        <Route path="/dashboard" element={<DashboardUser />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Admin routes – dibungkus dengan layout sendiri */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/super" element={<DashboardSuper />} />
        <Route path="/admin/manage-admin" element={<AdminManage />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/courses/create" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:id/edit" element={<AdminCourseForm />} />
        <Route path="/admin/courses/:courseId/modules" element={<AdminModules />} />
        <Route path="/admin/courses/:courseId/modules/create" element={<AdminModuleForm />} />
        <Route path="/admin/courses/:courseId/modules/:id/edit" element={<AdminModuleForm />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer hanya ditampilkan di public routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
}