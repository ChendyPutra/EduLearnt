import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageBanners() {
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info",
    is_active: true,
    start_date: "",
    end_date: "",
    image_url: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchBanners = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/banners", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setLoading(false);
      showToast(error.message || 'Failed to load banners', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      type: "info",
      is_active: true,
      start_date: "",
      end_date: "",
      image_url: ""
    });
    setEditingBanner(null);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast('Title is required', 'error');
      return false;
    }
    if (!formData.content.trim()) {
      showToast('Content is required', 'error');
      return false;
    }
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (startDate >= endDate) {
        showToast('End date must be after start date', 'error');
        return false;
      }
    }
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      showToast('Please enter a valid image URL', 'error');
      return false;
    }
    return true;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    
    try {
      const url = editingBanner 
        ? `http://localhost:8000/api/admin/banners/${editingBanner.id}`
        : "http://localhost:8000/api/admin/banners";
      
      const method = editingBanner ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await res.json();

      if (res.ok) {
        await fetchBanners();
        setShowForm(false);
        resetForm();
        showToast(editingBanner ? 'Banner updated successfully!' : 'Banner created successfully!');
      } else {
        showToast(responseData.message || 'Failed to save banner', 'error');
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      showToast(error.message || 'Failed to save banner', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      content: banner.content,
      type: banner.type,
      is_active: banner.is_active,
      start_date: banner.start_date ? banner.start_date.split('T')[0] : "",
      end_date: banner.end_date ? banner.end_date.split('T')[0] : "",
      image_url: banner.image_url || ""
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'announcement': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'promotion': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'announcement': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      );
      case 'promotion': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
          <p className="text-indigo-600 font-medium">Loading banners...</p>
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
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/banners/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchBanners();
              showToast('Banner deleted successfully!');
            } else {
              showToast('Failed to delete banner', 'error');
            }
          }).catch(() => showToast('Failed to delete banner', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Banners</h1>
            <p className="text-pink-100 text-lg">Create and manage promotional banners</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Banner
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
<div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-3xl border border-indigo-200 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide md:scrollbar-thin">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingBanner ? "Edit Banner" : "Create New Banner"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Title</label>
                    <input
                      type="text"
                      placeholder="Enter banner title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    >
                      <option value="info">Information</option>
                      <option value="announcement">Announcement</option>
                      <option value="promotion">Promotion</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Content</label>
                  <textarea
                    placeholder="Enter banner content/message"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    rows="4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Image URL</label>
                  <div className="space-y-3">
                    <input
                      type="url"
                      placeholder="https://example.com/banner-image.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                    {formData.image_url && (
                      <div className="mt-2">
                        <img 
                          src={formData.image_url} 
                          alt="Banner preview" 
                          className="w-full h-48 object-cover rounded-xl border border-indigo-200"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-semibold text-slate-700">
                    Active Banner (visible to users)
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {editingBanner ? "Update Banner" : "Create Banner"}
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowForm(false);
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

      {/* Banners List */}
      <div className="space-y-4">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <div key={banner.id} className="bg-white/70 backdrop-blur-sm border border-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {banner.image_url ? (
                      <div className="flex-shrink-0">
                        <img 
                          src={banner.image_url} 
                          alt={banner.title}
                          className="w-20 h-20 rounded-xl object-cover border border-indigo-200"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/80x80?text=Banner';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800">{banner.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-2 ${getTypeColor(banner.type)} text-white text-sm px-3 py-1 rounded-lg font-medium`}>
                          {getTypeIcon(banner.type)}
                          {banner.type.charAt(0).toUpperCase() + banner.type.slice(1)}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-lg font-medium ${
                          banner.is_active 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                        }`}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={banner.is_active ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                          </svg>
                          {banner.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 mb-4 leading-relaxed mt-3">{banner.content}</p>
                  
                  {(banner.start_date || banner.end_date) && (
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {banner.start_date && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          From: {new Date(banner.start_date).toLocaleDateString('id-ID')}
                        </div>
                      )}
                      {banner.end_date && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          To: {new Date(banner.end_date).toLocaleDateString('id-ID')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleEdit(banner)}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(banner.id)}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No banners available</h3>
            <p className="text-slate-500 mb-6">Start by creating your first banner</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create First Banner
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
