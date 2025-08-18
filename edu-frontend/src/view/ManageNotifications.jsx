import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    user_id: "",
    is_global: false
  });

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
      showToast('Failed to load notifications', 'error');
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data.filter(user => user.role === 'student'));
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast('Failed to load users', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("http://localhost:8000/api/admin/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchNotifications();
        setShowForm(false);
        setFormData({
          title: "",
          message: "",
          type: "info",
          user_id: "",
          is_global: false
        });
        showToast('Notification sent successfully!');
      } else {
        showToast('Failed to send notification', 'error');
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      showToast('Failed to send notification', 'error');
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'warning': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'error': return 'bg-gradient-to-r from-red-500 to-pink-500';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
      case 'warning': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      case 'error': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading notifications...</p>
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
        title="Delete Notification"
        message="Are you sure you want to delete this notification? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/notifications/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchNotifications();
              showToast('Notification deleted successfully!');
            } else {
              showToast('Failed to delete notification', 'error');
            }
          }).catch(() => showToast('Failed to delete notification', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Notifications</h1>
            <p className="text-green-100 text-lg">Send notifications to users</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Notification
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide md:scrollbar-thin">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.504l8.484-8.485a1 1 0 011.414 0l2.829 2.828a1 1 0 010 1.415l-8.485 8.484a1 1 0 01-.707.293H4v-4.403a1 1 0 01.293-.707z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Send Notification</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Notification Title</label>
                  <input
                    type="text"
                    placeholder="Enter notification title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Notification Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  >
                    <option value="info">Information</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  placeholder="Enter notification message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="4"
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_global"
                    checked={formData.is_global}
                    onChange={(e) => setFormData({
                      ...formData, 
                      is_global: e.target.checked,
                      user_id: e.target.checked ? "" : formData.user_id
                    })}
                    className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="is_global" className="text-sm font-semibold text-slate-700">
                    Send to all users (Global notification)
                  </label>
                </div>

                {!formData.is_global && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select User</label>
                    <select
                      value={formData.user_id}
                      onChange={(e) => setFormData({...formData, user_id: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      required={!formData.is_global}
                    >
                      <option value="">Choose a user to notify</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Notification
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
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

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.504l8.484-8.485a1 1 0 011.414 0l2.829 2.828a1 1 0 010 1.415l-8.485 8.484a1 1 0 01-.707.293H4v-4.403a1 1 0 01.293-.707z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{notification.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-2 ${getTypeColor(notification.type)} text-white text-sm px-3 py-1 rounded-lg font-medium`}>
                          {getTypeIcon(notification.type)}
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                        {notification.is_global && (
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-3 py-1 rounded-lg font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Global
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 mb-4 leading-relaxed">{notification.message}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {notification.is_global ? 'All Users' : notification.user?.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(notification.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <button 
                    onClick={() => handleDelete(notification.id)}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 19.504l8.484-8.485a1 1 0 011.414 0l2.829 2.828a1 1 0 010 1.415l-8.485 8.484a1 1 0 01-.707.293H4v-4.403a1 1 0 01.293-.707z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No notifications sent</h3>
            <p className="text-slate-500 mb-6">Start by sending your first notification</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send First Notification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}