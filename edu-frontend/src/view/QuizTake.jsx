import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function QuizTake() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft]);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/quizzes/${id}/take`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuiz(data);
      setTimeLeft((data.time_limit || 30) * 60); // Convert minutes to seconds
    } catch (error) {
      console.error("Error fetching quiz:", error);
      navigate(-1); // Go back to previous page
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/quizzes/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });
      
      if (res.ok) {
        // Get courseId from quiz and redirect to course quizzes
        const courseId = quiz?.module?.course_id;
        if (courseId) {
          window.location.href = `/courses/${courseId}/quizzes`;
        } else {
          navigate(-1);
        }
      } else {
        alert("Gagal submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Gagal submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">Memuat Quiz</h3>
          <p className="text-gray-600">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Tidak Ditemukan</h3>
          <p className="text-gray-600 mb-6">Quiz yang Anda cari tidak tersedia.</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600 mt-1">{quiz.description}</p>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-purple-600'}`}>
                {formatTime(timeLeft)}
              </div>
              <p className="text-sm text-gray-500">Waktu tersisa</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions?.map((question, index) => (
            <div key={question.id} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Soal {index + 1}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{question.question}</p>
              </div>
              
              <div className="space-y-3">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border-2 border-gray-100 rounded-2xl hover:border-purple-200 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                    <input
                      type="radio"
                      name={`question_${question.id}`}
                      value={option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-700 font-bold">
                      {option}
                    </div>
                    <span className="text-gray-700">{question[`option_${option.toLowerCase()}`]}</span>
                  </label>
                ))}
              </div>
            </div>
          )) || (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 text-center">
              <p className="text-gray-600">Tidak ada soal tersedia untuk quiz ini.</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Jawaban tersimpan: {Object.keys(answers).length} dari {quiz.questions?.length || 0} soal
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-200"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || Object.keys(answers).length === 0}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? "Mengirim..." : "Submit Quiz"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}