import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentFeedback, setRecentFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      // Fetch admin stats
      const statsRes = await fetch("http://localhost:8000/api/admin/admin-stats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      setStats(statsData);

      // Fetch recent feedback
      const feedbackRes = await fetch("http://localhost:8000/api/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const feedbackData = await feedbackRes.json();
      setRecentFeedback(feedbackData.slice(0, 5)); // Show only 5 recent
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to EduLearnt Admin</h1>
            <p className="text-indigo-100 text-lg">Manage your learning platform with ease</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Total Users</h3>
              <p className="text-3xl font-bold mt-2">{stats.total_users || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Students</h3>
              <p className="text-3xl font-bold mt-2">{stats.students || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Courses</h3>
              <p className="text-3xl font-bold mt-2">{stats.courses || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Enrollments</h3>
              <p className="text-3xl font-bold mt-2">{stats.enrollments || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/manage-users" className="group bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 p-6 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">Manage Users</div>
                <div className="text-sm text-slate-600">Add, edit, delete users</div>
              </div>
            </div>
          </Link>
          
          <Link to="/manage-courses" className="group bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 p-6 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">Manage Courses</div>
                <div className="text-sm text-slate-600">Create and edit courses</div>
              </div>
            </div>
          </Link>
          
          <Link to="/manage-products" className="group bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 p-6 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">Manage Products</div>
                <div className="text-sm text-slate-600">Shop items & kits</div>
              </div>
            </div>
          </Link>
          
          <Link to="/manage-feedback" className="group bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 p-6 rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-slate-800 group-hover:text-orange-700 transition-colors">View Feedback</div>
                <div className="text-sm text-slate-600">User messages & reviews</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            Recent Feedback
          </h2>
          <Link to="/manage-feedback" className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium">
            View All
          </Link>
        </div>
        {recentFeedback.length > 0 ? (
          <div className="space-y-4">
            {recentFeedback.map((item) => (
              <div key={item.id} className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {item.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded-lg">{item.email}</div>
                    </div>
                    <div className="text-slate-700">{item.message.substring(0, 150)}...</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No feedback available</p>
            <p className="text-sm text-slate-400 mt-1">New feedback will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
