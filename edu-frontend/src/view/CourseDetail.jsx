import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect pengguna umum ke halaman courses
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Restricted</h2>
            <p className="text-gray-600 mb-6">
              Course details and materials are only available for registered users. 
              Please register or login to access full course content.
            </p>
            <div className="space-x-3">
              <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
                Register Free
              </Link>
              <Link to="/login" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50">
                Login
              </Link>
            </div>
            <div className="mt-6">
              <Link to="/courses-online" className="text-indigo-600 hover:underline">
                ← Back to Course List
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchCourse();
    if (user) {
      checkEnrollment();
    }
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/courses/${id}/my-progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };



  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/courses/${id}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        setIsEnrolled(true);
        alert("Successfully enrolled in course!");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Course not found</p>
          <Link to="/courses-online" className="btn btn-primary mt-4">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-12 text-white text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">📚 Course Online</h2>
            <p className="text-indigo-100 text-lg">Materi pembelajaran interaktif dengan video, kuis, dan tracking progres</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {course.level}
              </span>
              {user && isEnrolled && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Enrolled
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{course.description}</p>
            
            {/* Course Info */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-semibold text-blue-900">Jenjang</span>
                </div>
                <p className="text-blue-700 font-bold">{course.level}</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-green-900">Format</span>
                </div>
                <p className="text-green-700 font-bold">Self-Paced Online</p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-purple-900">Sertifikat</span>
                </div>
                <p className="text-purple-700 font-bold">Digital Certificate</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">🎯 What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">1</span>
                    Interactive Learning
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-8">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Video pembelajaran berkualitas tinggi
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Materi terstruktur dan mudah dipahami
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Latihan hands-on dan praktis
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold">2</span>
                    Assessment & Tracking
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-8">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Quiz interaktif per modul
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Progress tracking real-time
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sertifikat digital otomatis
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Konten hanya untuk pengguna terdaftar */}
            {user && (
              <div className="space-y-6">
                {!isEnrolled ? (
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-3 px-6 rounded-xl font-semibold hover:brightness-110 transition"
                  >
                    Enroll in Course
                  </button>
                ) : (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">🎓 Course Enrolled!</h3>
                      <p className="text-gray-600 mb-6">Start your learning journey with interactive modules and assessments</p>
                    </div>
                    
                    {/* Learning Path */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <Link 
                        to={`/courses/${id}/modules`}
                        className="bg-white border-2 border-blue-200 hover:border-blue-400 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">📚 Study Modules</h4>
                        <p className="text-sm text-gray-600">Interactive learning materials</p>
                      </Link>
                      
                      <Link 
                        to={`/courses/${id}/quizzes`}
                        className="bg-white border-2 border-purple-200 hover:border-purple-400 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">📝 Take Assessments</h4>
                        <p className="text-sm text-gray-600">Quizzes and evaluations</p>
                      </Link>
                      
                      <Link 
                        to={`/courses/${id}/progress`}
                        className="bg-white border-2 border-green-200 hover:border-green-400 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">📊 Track Progress</h4>
                        <p className="text-sm text-gray-600">Detailed progress tracking</p>
                      </Link>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">💡 <strong>Learning Path:</strong> Complete modules → Take assessments → Earn certificate</p>
                      <div className="flex justify-center gap-4">
                        <Link 
                          to={`/courses/${id}/modules`}
                          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Mulai Belajar
                        </Link>
                        <Link 
                          to={`/courses/${id}/progress`}
                          className="border-2 border-indigo-200 text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Lihat Progress
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t">
              <div className="text-center">
                <Link to="/courses-online" className="text-indigo-600 hover:underline">
                  ← Back to All Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}