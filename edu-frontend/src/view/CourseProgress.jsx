import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CourseProgress() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [modules, setModules] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch course details
      const courseRes = await fetch(`http://localhost:8000/api/courses/${courseId}`);
      const courseData = await courseRes.json();
      setCourse(courseData);

      // Fetch progress
      const progressRes = await fetch(`http://localhost:8000/api/courses/${courseId}/my-progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (progressRes.ok) {
        const progressData = await progressRes.json();
        setProgress(progressData);
      }

      // Fetch modules
      const modulesRes = await fetch(`http://localhost:8000/api/courses/${courseId}/modules`);
      const modulesData = await modulesRes.json();
      setModules(modulesData);

      // Fetch quizzes
      const quizzesRes = await fetch(`http://localhost:8000/api/courses/${courseId}/quizzes`);
      const quizzesData = await quizzesRes.json();
      setQuizzes(quizzesData);

      // Fetch certificates
      const certRes = await fetch(`http://localhost:8000/api/my-certificates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (certRes.ok) {
        const certData = await certRes.json();
        setCertificates(certData.filter(cert => cert.course_id == courseId));
      }

    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                📊 {course?.title} - Progress Tracking
              </h1>
              <p className="text-indigo-100 text-lg">
                Monitor your learning journey and achievements
              </p>
            </div>
            <Link
              to="/courses-online"
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Progress</h2>
              
              {progress ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeDasharray={`${progress.progress_percentage}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {progress.progress_percentage}%
                        </span>
                      </div>
                    </div>
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                      progress.completed 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {progress.completed ? '🎉 Course Completed!' : '📚 In Progress'}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Started</div>
                      <div className="font-semibold">
                        {new Date(progress.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    {progress.completed && (
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-gray-600">Completed</div>
                        <div className="font-semibold">
                          {new Date(progress.completed_at).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No progress data available</p>
                  <Link
                    to={`/courses/${courseId}`}
                    className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Start Learning
                  </Link>
                </div>
              )}
            </div>

            {/* Modules Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Modules Progress</h2>
              
              {modules.length > 0 ? (
                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <div key={module.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No modules available</p>
              )}
            </div>

            {/* Quiz Results */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Performance</h2>
              
              {quizzes.length > 0 ? (
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{quiz.title}</h3>
                          <p className="text-sm text-gray-600">{quiz.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Link
                          to={`/quiz/${quiz.id}/take`}
                          className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
                        >
                          Take Quiz →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No quizzes available</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Certificates */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">🏆 Certificates</h2>
              
              {certificates.length > 0 ? (
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div key={cert.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                          🏆
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Certificate</h3>
                          <p className="text-sm text-gray-600">{cert.certificate_number}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Issued: {new Date(cert.issued_at).toLocaleDateString()}
                      </div>
                      <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
                        Download Certificate
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    🏆
                  </div>
                  <p className="text-gray-600 text-sm">Complete the course to earn your certificate!</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link
                  to={`/courses/${courseId}/modules`}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  📚 Study Modules
                </Link>
                <Link
                  to={`/courses/${courseId}/quizzes`}
                  className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  📝 Take Quizzes
                </Link>
                <Link
                  to="/my-certificates"
                  className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
                >
                  🏆 View All Certificates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}