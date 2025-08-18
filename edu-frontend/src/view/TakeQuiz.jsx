import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
  }, [timeLeft, quiz]);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/quizzes/${id}/take`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
        if (data.time_limit) {
          setTimeLeft(data.time_limit * 60); // Convert minutes to seconds
        }
      } else {
        const error = await res.json();
        alert(error.message);
        navigate(-1); // Go back to previous page
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      navigate(-1); // Go back to previous page
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/quizzes/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });

      if (res.ok) {
        const result = await res.json();
        // Get courseId from quiz module and redirect to course quizzes
        const courseId = quiz.module?.course_id;
        console.log('Quiz module:', quiz.module);
        console.log('Course ID:', courseId);
        console.log('Redirecting to:', `/courses/${courseId}/quizzes`);
        
        if (courseId) {
          // Store result in sessionStorage and redirect
          sessionStorage.setItem('quizResult', JSON.stringify({
            showResult: true,
            result,
            quiz
          }));
          window.location.href = `/courses/${courseId}/quizzes`;
        } else {
          console.log('No courseId found, going to quiz-result');
          navigate('/quiz-result', { state: { result, quiz } });
        }
      } else {
        alert("Error submitting quiz");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const answered = Object.keys(answers).length;
    const total = quiz?.questions?.length || 0;
    return total > 0 ? (answered / total) * 100 : 0;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600 mt-1">{quiz.description}</p>
            </div>
            {quiz.time_limit && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Time Remaining</div>
                <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Object.keys(answers).length} of {quiz.questions.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[quiz.questions[index].id]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {question.question}
            </h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                  answers[question.id] === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  answers[question.id] === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {answers[question.id] === option && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-success disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}