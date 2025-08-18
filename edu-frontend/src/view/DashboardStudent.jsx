import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function DashboardStudent() {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);
  const [courses, setCourses] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
    fetchCourses();
    fetchQuizAttempts();
    fetchNotifications();
  }, []);

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/my-progress", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/courses");
      const data = await res.json();
      setCourses(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchQuizAttempts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/my-quiz-attempts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuizAttempts(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Memuat Dashboard</h3>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
                Selamat datang kembali, <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">{user?.name}</span>! 🚀
              </h1>
              <p className="text-xl text-gray-600 mt-2">Lanjutkan perjalanan belajar teknologi Anda</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Kursus Aktif",
                value: progress.filter(p => !p.completed).length,
                icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                color: "from-blue-500 to-cyan-400"
              },
              {
                title: "Kursus Selesai",
                value: progress.filter(p => p.completed).length,
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                color: "from-green-500 to-emerald-400"
              },
              {
                title: "Quiz Diambil",
                value: quizAttempts.length,
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "from-purple-500 to-pink-400"
              },
              {
                title: "Rata-rata Skor",
                value: quizAttempts.length > 0 ? Math.round(quizAttempts.reduce((acc, attempt) => acc + (attempt.score / (attempt.total_questions * 10)) * 100, 0) / quizAttempts.length) + "%" : "0%",
                icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
                color: "from-orange-500 to-red-400"
              }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Progres Pembelajaran</h2>
                <Link to="/courses-online" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                  Lihat Semua →
                </Link>
              </div>
              
              {progress.length > 0 ? (
                <div className="space-y-6">
                  {progress.map((item) => (
                    <div key={item.id} className="p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.course?.title}</h3>
                          <p className="text-gray-600 text-sm">{item.course?.description}</p>
                        </div>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                          {item.progress_percentage}%
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{item.progress_percentage}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-violet-500 h-3 rounded-full transition-all duration-500" 
                            style={{ width: `${item.progress_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.completed 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.completed ? '✅ Selesai' : '📚 Sedang Belajar'}
                        </span>
                        <Link 
                          to={`/courses/${item.course_id}`} 
                          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                          {item.completed ? 'Review' : 'Lanjutkan'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Kursus</h3>
                  <p className="text-gray-600 mb-6">Mulai perjalanan belajar Anda dengan memilih kursus yang menarik!</p>
                  <Link 
                    to="/courses-online" 
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Jelajahi Kursus
                  </Link>
                </div>
              )}
            </div>

            {/* Quiz Results */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hasil Quiz Terbaru</h2>
              {quizAttempts.length > 0 ? (
                <div className="space-y-4">
                  {quizAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex justify-between items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          (attempt.score / (attempt.total_questions * 10)) * 100 >= 80 ? 'bg-green-100' :
                          (attempt.score / (attempt.total_questions * 10)) * 100 >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <svg className={`w-6 h-6 ${
                            (attempt.score / (attempt.total_questions * 10)) * 100 >= 80 ? 'text-green-600' :
                            (attempt.score / (attempt.total_questions * 10)) * 100 >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{attempt.quiz?.title}</h4>
                          <p className="text-sm text-gray-600">{attempt.quiz?.module?.course?.title}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          (attempt.score / (attempt.total_questions * 10)) * 100 >= 80 ? 'text-green-600' :
                          (attempt.score / (attempt.total_questions * 10)) * 100 >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {Math.round((attempt.score / (attempt.total_questions * 10)) * 100)}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {attempt.score}/{attempt.total_questions * 10} poin
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Belum ada quiz yang dikerjakan</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notifications */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Notifikasi Terbaru</h2>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 rounded-2xl border-l-4 ${
                      notification.type === 'success' ? 'border-green-500 bg-green-50' :
                      notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      notification.type === 'error' ? 'border-red-500 bg-red-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <h4 className="font-semibold text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.504l8.484-8.485a1 1 0 011.414 0l2.829 2.828a1 1 0 010 1.415l-8.485 8.484a1 1 0 01-.707.293H4v-4.403a1 1 0 01.293-.707z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Tidak ada notifikasi</p>
                </div>
              )}
            </div>

            {/* Available Courses */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Kursus Tersedia</h2>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-sm text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        course.level === 'SD' ? 'bg-green-100 text-green-700' :
                        course.level === 'SMP' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {course.level}
                      </span>
                      <Link 
                        to={`/courses/${course.id}`} 
                        className="text-indigo-600 text-xs font-semibold hover:text-indigo-700"
                      >
                        Lihat →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/courses-online" 
                  className="text-indigo-600 text-sm font-semibold hover:text-indigo-700"
                >
                  Lihat Semua Kursus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}