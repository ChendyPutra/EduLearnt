import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { api } from "../api";

export default function EnhancedCourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(null);

  useEffect(() => {
    fetchCourse();
    if (user) {
      checkEnrollment();
    }
  }, [id, user]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      setCourse(response.data);
      
      // Fetch modules
      const modulesResponse = await api.get(`/admin/modules?course_id=${id}`);
      setModules(modulesResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await api.get(`/courses/${id}/my-progress`);
      if (response.data) {
        setIsEnrolled(true);
        setProgress(response.data);
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };

  const handleEnroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`);
      setIsEnrolled(true);
      checkEnrollment();
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  const handleModuleComplete = async (moduleId) => {
    try {
      await api.put(`/modules/${moduleId}/progress`, {
        completed: true,
        time_spent: 300 // 5 minutes default
      });
      
      // Refresh progress
      checkEnrollment();
      
      // Mark module as completed in local state
      setModules(prev => prev.map(module => 
        module.id === moduleId 
          ? { ...module, completed: true }
          : module
      ));
    } catch (error) {
      console.error("Error updating module progress:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to access course content</p>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 relative">
                {activeModule?.video_url ? (
                  <iframe
                    src={activeModule.video_url.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : course?.youtube_id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${course.youtube_id}`}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p>No video available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {course?.level}
                  </span>
                  {isEnrolled && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Enrolled
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course?.title}</h1>
                <p className="text-gray-600 leading-relaxed mb-6">{course?.description}</p>
                
                {/* Progress Bar */}
                {isEnrolled && progress && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Course Progress</span>
                      <span className="text-sm text-gray-500">{progress.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Module Content */}
                {activeModule && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">{activeModule.title}</h3>
                    <div className="prose max-w-none">
                      <p>{activeModule.description}</p>
                      {activeModule.content && (
                        <div dangerouslySetInnerHTML={{ __html: activeModule.content }} />
                      )}
                    </div>
                    
                    {isEnrolled && (
                      <button
                        onClick={() => handleModuleComplete(activeModule.id)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                )}
                
                {!isEnrolled && (
                  <button 
                    onClick={handleEnroll}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Enroll in Course
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Course Modules */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
              
              {modules.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No modules available</p>
              ) : (
                <div className="space-y-3">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        activeModule?.id === module.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!isEnrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => isEnrolled && setActiveModule(module)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          module.completed 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {module.completed ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          {module.estimated_duration > 0 && (
                            <p className="text-xs text-gray-500">{module.estimated_duration} min</p>
                          )}
                        </div>
                        {!isEnrolled && (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {isEnrolled && (
                <div className="mt-6 pt-6 border-t">
                  <Link 
                    to={`/courses/${id}/quizzes`}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition text-center block"
                  >
                    Take Quizzes
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/courses-online" className="text-blue-600 hover:underline">
            ← Back to All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}