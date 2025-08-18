import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { api } from '../api';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

export default function ManageModules() {
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, moduleId: null });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: '',
    order_index: 1,
    content: '',
    video_url: '',
    downloadable_materials: '',
    estimated_duration: 0,
    is_active: true
  });

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await api.get('/admin/modules');
      setModules(response.data.data || []);
    } catch (error) {
      showToast('Failed to load modules', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingModule) {
        await api.put(`/admin/modules/${editingModule.id}`, formData);
        showToast('Module updated successfully!');
      } else {
        await api.post('/admin/modules', formData);
        showToast('Module created successfully!');
      }
      setShowForm(false);
      setEditingModule(null);
      resetForm();
      fetchModules();
    } catch (error) {
      showToast('Failed to save module', 'error');
    }
  };

  const handleEdit = (module) => {
    setEditingModule(module);
    setFormData({
      title: module.title,
      description: module.description || '',
      course_id: module.course_id,
      order_index: module.order_index,
      content: module.content || '',
      video_url: module.video_url || '',
      downloadable_materials: module.downloadable_materials || '',
      estimated_duration: module.estimated_duration || 0,
      is_active: module.is_active
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/modules/${id}`);
      showToast('Module deleted successfully!');
      fetchModules();
    } catch (error) {
      showToast('Failed to delete module', 'error');
    }
    setConfirmDialog({ show: false, moduleId: null });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      course_id: '',
      order_index: 1,
      content: '',
      video_url: '',
      downloadable_materials: '',
      estimated_duration: 0,
      is_active: true
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading modules...</p>
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
        title="Delete Module"
        message="Are you sure you want to delete this module? This action cannot be undone."
        onConfirm={() => handleDelete(confirmDialog.moduleId)}
        onCancel={() => setConfirmDialog({ show: false, moduleId: null })}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Modules</h1>
            <p className="text-cyan-100 text-lg">Create and organize course modules</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Module
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide md:scrollbar-thin">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingModule ? 'Edit Module' : 'Add New Module'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Module Title</label>
                  <input
                    type="text"
                    placeholder="Enter module title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course</label>
                  <select
                    value={formData.course_id}
                    onChange={(e) => setFormData({...formData, course_id: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter module description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="3"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    min="1"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.estimated_duration}
                    onChange={(e) => setFormData({...formData, estimated_duration: parseInt(e.target.value)})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Video URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.video_url}
                  onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
                <textarea
                  placeholder="Enter module content..."
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="4"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Downloadable Materials</label>
                <textarea
                  placeholder="Enter downloadable materials description (e.g., PDF guides, code examples, etc.)"
                  value={formData.downloadable_materials}
                  onChange={(e) => setFormData({...formData, downloadable_materials: e.target.value})}
                  className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  rows="2"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="is_active" className="ml-2 text-sm font-medium text-gray-700">Active</label>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingModule ? 'Update Module' : 'Create Module'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingModule(null);
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

      {/* Modules Grid */}
      <div className="grid gap-6">
        {modules.length > 0 ? (
          modules.map((module) => (
            <div key={module.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{module.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-slate-600">Order: {module.order_index}</span>
                        {module.estimated_duration > 0 && (
                          <>
                            <span className="text-slate-400">•</span>
                            <span className="text-sm text-slate-600">{module.estimated_duration} min</span>
                          </>
                        )}
                        <span className={`ml-2 inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                          module.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {module.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">{module.description}</p>
                  
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Course:</span> {module.course?.title || 'N/A'}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(module)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => setConfirmDialog({ show: true, moduleId: module.id })}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No modules available</h3>
            <p className="text-slate-500 mb-6">Start by creating your first module</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Module
            </button>
          </div>
        )}
      </div>
    </div>
  );
}