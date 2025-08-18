import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setFeedback(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'contact': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'partnership': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'support': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'contact': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
      case 'partnership': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading feedback...</p>
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
        title="Delete Feedback"
        message="Are you sure you want to delete this feedback? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/feedback/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchFeedback();
              showToast('Feedback deleted successfully!');
            } else {
              showToast('Failed to delete feedback', 'error');
            }
          }).catch(() => showToast('Failed to delete feedback', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Feedback</h1>
            <p className="text-yellow-100 text-lg">Review user feedback and partnership requests</p>
          </div>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Feedback Details</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-xl border border-indigo-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <p className="text-slate-800 font-medium">{selectedFeedback.name}</p>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-xl border border-indigo-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <p className="text-slate-800 font-medium">{selectedFeedback.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-xl border border-indigo-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Type</label>
                  <span className={`inline-flex items-center gap-2 ${getTypeColor(selectedFeedback.type)} text-white text-sm px-3 py-2 rounded-lg font-medium`}>
                    {getTypeIcon(selectedFeedback.type)}
                    {selectedFeedback.type ? selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1) : 'Contact'}
                  </span>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-xl border border-indigo-200">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date Received</label>
                  <p className="text-slate-800 font-medium">{selectedFeedback.created_at ? new Date(selectedFeedback.created_at).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'No date available'}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-6 rounded-xl border border-indigo-200">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Message</label>
                <div className="bg-white/70 p-4 rounded-lg border border-indigo-200 text-slate-700 leading-relaxed">
                  {selectedFeedback.message}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-6">
              <button 
                onClick={() => setSelectedFeedback(null)}
                className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>, document.body
      )}

      {/* Feedback List */}
      <div className="space-y-4">
        {feedback.length > 0 ? (
          feedback.map((item) => (
            <div key={item.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {item.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
                      <p className="text-indigo-600 font-medium">{item.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`inline-flex items-center gap-2 ${getTypeColor(item.type)} text-white text-sm px-3 py-1 rounded-lg font-medium`}>
                      {getTypeIcon(item.type)}
                      {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Contact'}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : 'No date'}
                    </span>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed line-clamp-2">{item.message}</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedFeedback(item)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button 
                    onClick={() => setConfirmDialog({ show: true, id: item.id })}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No feedback available</h3>
            <p className="text-slate-500">User feedback will appear here when submitted</p>
          </div>
        )}
      </div>
    </div>
  );
}