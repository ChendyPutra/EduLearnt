import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CourseModules() {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moduleProgress, setModuleProgress] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState({});

  useEffect(() => {
    fetchCourse();
    fetchModules();
    fetchProgress();
    fetchQuizzes();
    fetchQuizAttempts();
    handleEnrollment();
  }, [courseId]);

  const handleEnrollment = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Auto enrollment error:", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/${courseId}/quizzes`);
      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const fetchQuizAttempts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/my-quiz-attempts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const attemptsMap = {};
      data.forEach(attempt => {
        attemptsMap[attempt.quiz_id] = attempt;
      });
      setQuizAttempts(attemptsMap);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
  };

  const getQuizForModule = (moduleId) => {
    return quizzes.find(quiz => quiz.module_id === moduleId);
  };

  const downloadMaterial = (materialName, moduleTitle) => {
    // Create a dummy download
    const element = document.createElement('a');
    const file = new Blob([`Materi Download: ${moduleTitle}\n\n${materialName}\n\nIni adalah file materi pembelajaran yang dapat Anda download dan pelajari offline.`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${moduleTitle.replace(/\s+/g, '_')}_materials.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/${courseId}`);
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/${courseId}/modules`);
      const data = await res.json();
      setModules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/courses/${courseId}/my-progress`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        // Get module progress for this course
        // This would need a separate endpoint for module progress
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const markModuleComplete = async (moduleId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/modules/${moduleId}/progress`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ completed: true })
      });
      
      if (res.ok) {
        setModuleProgress(prev => ({ ...prev, [moduleId]: true }));
        fetchQuizAttempts(); // Refresh quiz attempts
        alert("🎉 Module completed! Great progress!");
      }
    } catch (error) {
      console.error("Error marking module complete:", error);
      alert("Failed to mark module as complete. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading modules...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                📚 Course Online: {course?.title}
              </h1>
              <p className="text-blue-100 text-lg">
                Modul pembelajaran interaktif - Video, materi terstruktur, dan latihan praktis untuk jenjang {course?.level}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Self-paced learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Progress tracking</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/courses/${courseId}/progress`}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                📊 View Progress
              </Link>
              <Link
                to="/courses-online"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                ← Back to Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          {modules.length > 0 ? (
            modules.map((module, index) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {module.title}
                        </h3>
                        <p className="text-gray-600">{module.description}</p>
                      </div>
                    </div>

                    {/* Interactive Learning Content */}
                    <div className="space-y-6">
                      {/* Video Lesson */}
                      {module.video_url && (
                        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h4 className="font-bold text-gray-900">🎥 Video Pembelajaran</h4>
                          </div>
                          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                            <iframe
                              src={module.video_url}
                              className="w-full h-full"
                              allowFullScreen
                              title={`Video: ${module.title}`}
                            />
                          </div>
                        </div>
                      )}

                      {/* Learning Material */}
                      {module.content && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <h4 className="font-bold text-gray-900">📚 Materi Pembelajaran</h4>
                          </div>
                          <div className="prose prose-blue max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-white rounded-lg p-4 shadow-sm">
                              {module.content}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Downloadable Materials */}
                      {module.downloadable_materials && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h4 className="font-bold text-gray-900">📥 Materi Download</h4>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-gray-700 mb-3">{module.downloadable_materials}</p>
                            <button 
                              onClick={() => downloadMaterial(module.downloadable_materials, module.title)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Download Materi
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Interactive Exercise Placeholder */}
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-gray-900">⚡ Latihan Interaktif</h4>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="text-gray-700 mb-4">Praktikkan konsep yang telah dipelajari dengan latihan hands-on.</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h5 className="font-semibold text-gray-900 mb-2">💡 Tips Belajar:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Tonton video dengan seksama</li>
                                <li>• Baca materi secara menyeluruh</li>
                                <li>• Praktikkan langsung konsepnya</li>
                                <li>• Catat poin-poin penting</li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <h5 className="font-semibold text-gray-900 mb-2">🎯 Learning Goals:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Memahami konsep dasar</li>
                                <li>• Menguasai implementasi</li>
                                <li>• Siap untuk quiz</li>
                                <li>• Aplikasi praktis</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {module.estimated_duration && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{module.estimated_duration} minutes</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-6 space-y-3">
                    {/* Progress Indicator */}
                    <div className="text-center">
                      {moduleProgress[module.id] ? (
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                      <span className={`text-sm font-semibold ${
                        moduleProgress[module.id] ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {moduleProgress[module.id] ? '🎉 Completed' : '📚 Learning'}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {!moduleProgress[module.id] && (
                        <button
                          onClick={() => markModuleComplete(module.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Mark Complete
                        </button>
                      )}
                      
                      {/* Quiz Button per Module */}
                      {(() => {
                        const quiz = getQuizForModule(module.id);
                        const attempt = quiz ? quizAttempts[quiz.id] : null;
                        
                        if (quiz) {
                          return attempt ? (
                            <Link
                              to={`/quiz/${quiz.id}/take`}
                              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Retake Quiz ({Math.round((attempt.score / (attempt.total_questions * 10)) * 100)}%)
                            </Link>
                          ) : (
                            <Link
                              to={`/quiz/${quiz.id}/take`}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Take Quiz
                            </Link>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No modules available</h3>
              <p className="text-gray-500 mb-6">This course doesn't have any modules yet</p>
              <Link
                to="/courses-online"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}