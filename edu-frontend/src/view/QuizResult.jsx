import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

export default function QuizResult() {
  const location = useLocation();
  const { result, quiz } = location.state || {};

  useEffect(() => {
    if (!result || !quiz) {
      // Redirect if no result data
      window.location.href = '/dashboard-student';
    }
  }, [result, quiz]);

  if (!result || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No quiz result found</p>
          <Link to="/dashboard-student" className="btn btn-primary mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <p className="text-blue-100">{quiz.title}</p>
          </div>

          {/* Results */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.percentage)}`}>
                {result.percentage}%
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">
                {getScoreMessage(result.percentage)}
              </div>
              <div className="text-gray-600">
                You scored {result.score} out of {result.total_questions * 10} points
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{result.total_questions}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((result.percentage / 100) * result.total_questions)}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {result.total_questions - Math.round((result.percentage / 100) * result.total_questions)}
                </div>
                <div className="text-sm text-gray-600">Wrong Answers</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Your Score</span>
                <span>{result.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    result.percentage >= 80 ? 'bg-green-500' :
                    result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Performance Message */}
            <div className={`p-4 rounded-lg mb-6 ${
              result.percentage >= 80 ? 'bg-green-50 border border-green-200' :
              result.percentage >= 60 ? 'bg-yellow-50 border border-yellow-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className={`font-medium ${
                result.percentage >= 80 ? 'text-green-800' :
                result.percentage >= 60 ? 'text-yellow-800' : 'text-red-800'
              }`}>
                {result.percentage >= 80 ? 'Outstanding Performance!' :
                 result.percentage >= 60 ? 'Good Performance!' : 'Needs Improvement'}
              </div>
              <div className={`text-sm mt-1 ${
                result.percentage >= 80 ? 'text-green-700' :
                result.percentage >= 60 ? 'text-yellow-700' : 'text-red-700'
              }`}>
                {result.percentage >= 80 ? 
                  'You have mastered this topic! Keep up the excellent work.' :
                 result.percentage >= 60 ? 
                  'You have a good understanding. Review the topics you missed.' :
                  'Consider reviewing the course material and trying again.'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {
                  // Go back to course quizzes (2 steps back: result -> take quiz -> course quizzes)
                  window.history.go(-2);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Back to Course Quizzes
              </button>
              <Link 
                to="/dashboard-student" 
                className="border border-purple-200 text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}