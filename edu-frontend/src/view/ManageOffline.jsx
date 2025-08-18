import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageOffline() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    school: "",
    schedule: "",
    city: ""
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/offline-programs");
      const data = await res.json();
      setPrograms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setLoading(false);
      showToast('Failed to load programs', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingProgram 
        ? `http://localhost:8000/api/admin/offline-programs/${editingProgram.id}`
        : "http://localhost:8000/api/admin/offline-programs";
      
      const method = editingProgram ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchPrograms();
        setShowForm(false);
        setEditingProgram(null);
        setFormData({ school: "", schedule: "", city: "" });
        showToast(editingProgram ? 'Program updated successfully!' : 'Program created successfully!');
      } else {
        showToast('Failed to save program', 'error');
      }
    } catch (error) {
      console.error("Error saving program:", error);
      showToast('Failed to save program', 'error');
    }
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData(program);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading programs...</p>
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
        title="Delete Program"
        message="Are you sure you want to delete this offline program? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/offline-programs/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchPrograms();
              showToast('Program deleted successfully!');
            } else {
              showToast('Failed to delete program', 'error');
            }
          }).catch(() => showToast('Failed to delete program', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Offline Programs</h1>
            <p className="text-indigo-100 text-lg">Manage face-to-face learning programs</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Program
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingProgram ? "Edit Program" : "Add New Program"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">School Name</label>
                <input
                  type="text"
                  placeholder="Enter school name"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Schedule</label>
                  <input
                    type="text"
                    placeholder="e.g., Monday-Friday 08:00-12:00"
                    value={formData.schedule}
                    onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingProgram ? "Update Program" : "Create Program"}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProgram(null);
                    setFormData({ school: "", schedule: "", city: "" });
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

      {/* Programs List */}
      <div className="space-y-4">
        {programs.length > 0 ? (
          programs.map((program) => (
            <div key={program.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{program.school}</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Schedule:</span>
                      <span>{program.schedule || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-600">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">City:</span>
                      <span>{program.city || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(program)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(program.id)}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No offline programs available</h3>
            <p className="text-slate-500 mb-6">Start by adding your first offline program</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Program
            </button>
          </div>
        )}
      </div>
    </div>
  );
}