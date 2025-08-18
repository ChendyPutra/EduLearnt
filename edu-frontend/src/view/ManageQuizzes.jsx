import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [modules, setModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    module_id: "",
    title: "",
    description: "",
    time_limit: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: "",
        points: 10
      }
    ]
  });

  useEffect(() => {
    fetchQuizzes();
    fetchModules();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/quizzes", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setLoading(false);
      showToast('Failed to load quizzes', 'error');
    }
  };

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/modules", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingQuiz 
        ? `http://localhost:8000/api/admin/quizzes/${editingQuiz.id}`
        : "http://localhost:8000/api/admin/quizzes";
      
      const method = editingQuiz ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchQuizzes();
        setShowForm(false);
        setEditingQuiz(null);
        resetForm();
        showToast(editingQuiz ? 'Quiz updated successfully!' : 'Quiz created successfully!');
      } else {
        showToast('Failed to save quiz', 'error');
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
      showToast('Failed to save quiz', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      module_id: "",
      title: "",
      description: "",
      time_limit: "",
      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          correct_answer: "",
          points: 10
        }
      ]
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correct_answer: "",
          points: 10
        }
      ]
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      <ConfirmDialog
        show={confirmDialog.show}
        title="Delete Quiz"
        message="Are you sure you want to delete this quiz? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/quizzes/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchQuizzes();
              showToast('Quiz deleted successfully!');
            } else {
              showToast('Failed to delete quiz', 'error');
            }
          }).catch(() => showToast('Failed to delete quiz', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Quizzes</h1>
            <p className="text-purple-100 text-lg">Create and manage interactive quizzes</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Quiz
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" style={{zIndex: 999999}}>
<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide md:scrollbar-thin">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Module</label>
                  <select
                    value={formData.module_id}
                    onChange={(e) => setFormData({...formData, module_id: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  >
                    <option value="">Select Module</option>
                    {Array.isArray(modules) && modules.map(module => (
                      <option key={module.id} value={module.id}>{module.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Time Limit (minutes)</label>
                  <input
                    type="number"
                    placeholder="Enter time limit"
                    value={formData.time_limit}
                    onChange={(e) => setFormData({...formData, time_limit: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Quiz Title</label>
                  <input
                    type="text"
                    placeholder="Enter quiz title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter quiz description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="3"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Questions ({formData.questions.length})
                  </h3>
                  <button 
                    type="button"
                    onClick={addQuestion}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Question
                  </button>
                </div>

                {formData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <span className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {qIndex + 1}
                        </span>
                        Question {qIndex + 1}
                      </h4>
                      {formData.questions.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => removeQuestion(qIndex)}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <textarea
                        placeholder="Enter your question here..."
                        value={question.question}
                        onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                        className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                        rows="3"
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {question.options.map((option, oIndex) => (
                          <input
                            key={oIndex}
                            type="text"
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            value={option}
                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                            required
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Correct Answer</label>
                          <select
                            value={question.correct_answer}
                            onChange={(e) => updateQuestion(qIndex, 'correct_answer', e.target.value)}
                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                            required
                          >
                            <option value="">Select Correct Answer</option>
                            {question.options.map((option, oIndex) => (
                              <option key={oIndex} value={option}>{option || `Option ${String.fromCharCode(65 + oIndex)}`}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Points</label>
                          <input
                            type="number"
                            placeholder="Points"
                            value={question.points}
                            onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value))}
                            className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingQuiz ? "Update Quiz" : "Create Quiz"}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingQuiz(null);
                    resetForm();
                  }}
                  className="px-6 py-4 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>, document.body
      )}

      {/* Quizzes List */}
      <div className="space-y-4">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{quiz.title}</h3>
                      <p className="text-slate-600">{quiz.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {quiz.module?.title || 'No Module'}
                    </span>
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {quiz.questions?.length || 0} Questions
                    </span>
                    {quiz.time_limit && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {quiz.time_limit} min
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDelete(quiz.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No quizzes available</h3>
            <p className="text-slate-500 mb-6">Start by creating your first quiz</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}