import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Quizzes() {
  const { user } = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  
  // Check for quiz result from sessionStorage or location state
  const getQuizResult = () => {
    const sessionResult = sessionStorage.getItem('quizResult');
    if (sessionResult) {
      sessionStorage.removeItem('quizResult');
      return JSON.parse(sessionResult);
    }
    return location.state || {};
  };
  
  const { showResult, result, quiz: resultQuiz } = getQuizResult();
  const [quizzes, setQuizzes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
    fetchQuizzes();
    fetchAttempts();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/courses/${courseId}`);
      const data = await res.json();
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:8000/api/quizzes";
      
      // Use course-specific endpoint if courseId is provided
      if (courseId) {
        url = `http://localhost:8000/api/courses/${courseId}/quizzes`;
      }
      
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttempts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/my-quiz-attempts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAttempts(data);
    } catch (error) {
      console.error("Error fetching attempts:", error);
    }
  };

  const getAttemptForQuiz = (quizId) => {
    return attempts.find(attempt => attempt.quiz_id === quizId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Memuat Kuis</h3>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-semibold text-purple-700 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Kuis Interaktif
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            {courseId ? (
              <>Sistem <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Penilaian</span></>
            ) : (
              <>Uji <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Kemampuan</span> Anda</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {courseId ? (
              `Kuis, latihan, dan ujian untuk mengukur pemahaman materi "${course?.title}". Selesaikan semua assessment untuk melanjutkan ke modul berikutnya.`
            ) : (
              `Selamat datang, ${user?.name}! Kerjakan kuis interaktif untuk menguji pemahaman Anda tentang pemrograman, AI, dan robotika.`
            )}
          </p>
          
          {/* Assessment Info */}
          {courseId && (
            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-2">Kuis per Modul</h3>
                <p className="text-sm text-gray-600 text-center">Setiap modul memiliki kuis untuk mengukur pemahaman</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-2">Waktu Terbatas</h3>
                <p className="text-sm text-gray-600 text-center">Setiap kuis memiliki batas waktu untuk menguji kecepatan</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-center mb-2">Tracking Progres</h3>
                <p className="text-sm text-gray-600 text-center">Skor dan progres tersimpan untuk monitoring pembelajaran</p>
              </div>
            </div>
          )}
        </div>

        {/* Quiz Result Modal */}
        {showResult && result && resultQuiz && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  result.percentage >= 80 ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                  result.percentage >= 60 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                  'bg-gradient-to-br from-red-500 to-pink-500'
                }`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                <p className="text-gray-600 mb-4">{resultQuiz.title}</p>
                <div className={`text-4xl font-bold mb-4 ${
                  result.percentage >= 80 ? 'text-green-600' :
                  result.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.percentage}%
                </div>
                <p className="text-gray-600 mb-4">
                  You scored {result.score} out of {result.total_questions * 10} points
                </p>
                <p className={`text-sm mb-6 ${
                  result.percentage >= 80 ? 'text-green-700' :
                  result.percentage >= 60 ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {result.percentage >= 80 ? 'Excellent work! 🎉' :
                   result.percentage >= 60 ? 'Good job! Keep it up! 👍' :
                   'Keep practicing! You can do better! 💪'}
                </p>
                <button 
                  onClick={() => {
                    // Clear the state and reload quizzes
                    window.history.replaceState({}, '', location.pathname);
                    window.location.reload();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Grid */}
        {quizzes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center">
              <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {courseId ? `Belum Ada Kuis untuk Kursus Ini` : `Belum Ada Kuis Tersedia`}
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              {courseId ? `Kuis untuk kursus "${course?.title}" sedang disiapkan.` : `Kuis sedang disiapkan oleh tim pengajar kami.`}
            </p>
            <Link 
              to={courseId ? `/courses/${courseId}` : "/courses-online"}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {courseId ? `Kembali ke Kursus` : `Kembali ke Kursus`}
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => {
              const attempt = getAttemptForQuiz(quiz.id);
              const isCompleted = !!attempt;
              const score = attempt ? Math.round((attempt.score / (attempt.total_questions * 10)) * 100) : 0;
              
              return (
                <div key={quiz.id} className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">{quiz.title}</h3>
                      {isCompleted && (
                        <div className="mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                          Selesai - {score}%
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="space-y-4 mb-6">
                      <p className="text-gray-600 leading-relaxed">{quiz.description || "Kuis untuk menguji pemahaman materi pembelajaran."}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.time_limit || 15} menit
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {quiz.questions?.length || 'Beberapa'} soal
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          Passing: {quiz.passing_score || 70}%
                        </div>
                      </div>
                      
                      {isCompleted && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-green-800">Kuis Selesai</p>
                              <p className="text-sm text-green-600">Skor: {attempt.score}/{attempt.total_questions * 10} ({score}%)</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {isCompleted ? (
                        <>
                          <Link 
                            to={`/quiz/${quiz.id}/result`}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-center block"
                          >
                            <span className="flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              Lihat Hasil
                            </span>
                          </Link>
                          <Link 
                            to={`/quiz/${quiz.id}/take`}
                            className="w-full border-2 border-purple-200 text-purple-700 py-3 px-6 rounded-2xl font-semibold hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-center block"
                          >
                            Ulangi Kuis
                          </Link>
                        </>
                      ) : (
                        <Link 
                          to={`/quiz/${quiz.id}/take`}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 text-center block"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 016 0v2M7 16h10" />
                            </svg>
                            Mulai Kuis
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quiz History */}
        {attempts.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Kuis Anda</h2>
            <div className="space-y-4">
              {attempts.slice(0, 5).map((attempt) => (
                <div key={attempt.id} className="flex justify-between items-center p-4 border-2 border-gray-100 rounded-2xl hover:border-purple-200 transition-all duration-300">
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
                      <p className="text-sm text-gray-600">{new Date(attempt.created_at).toLocaleDateString()}</p>
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
          </div>
        )}
      </div>
    </div>
  );
}