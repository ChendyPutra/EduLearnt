import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin"
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/admins", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setAdmins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoading(false);
      showToast('Failed to load admins', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingAdmin 
        ? `http://localhost:8000/api/admin/admins/${editingAdmin.id}`
        : "http://localhost:8000/api/admin/admins";
      
      const method = editingAdmin ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchAdmins();
        setShowForm(false);
        setEditingAdmin(null);
        setFormData({ name: "", email: "", password: "", role: "admin" });
        showToast(editingAdmin ? 'Admin updated successfully!' : 'Admin created successfully!');
      } else {
        showToast('Failed to save admin', 'error');
      }
    } catch (error) {
      console.error("Error saving admin:", error);
      showToast('Failed to save admin', 'error');
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({ ...admin, password: "" });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  const getRoleColor = (role) => {
    return role === 'super_admin' 
      ? 'bg-gradient-to-r from-red-600 to-pink-600' 
      : 'bg-gradient-to-r from-violet-500 to-purple-600';
  };

  const getRoleIcon = (role) => {
    return role === 'super_admin' ? (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading admins...</p>
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
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/admins/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchAdmins();
              showToast('Admin deleted successfully!');
            } else {
              showToast('Failed to delete admin', 'error');
            }
          }).catch(() => showToast('Failed to delete admin', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Admins</h1>
            <p className="text-violet-100 text-lg">Manage system administrators and permissions</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Admin
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingAdmin ? "Edit Admin" : "Add New Admin"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder={editingAdmin ? "Leave blank to keep current password" : "Enter password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required={!editingAdmin}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingAdmin ? "Update Admin" : "Create Admin"}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingAdmin(null);
                    setFormData({ name: "", email: "", password: "", role: "admin" });
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

      {/* Admins Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-indigo-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Admin</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.filter(admin => admin.role !== 'super_admin').length > 0 ? (
                admins.filter(admin => admin.role !== 'super_admin').map((admin, index) => (
                  <tr key={admin.id} className={`border-b border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-indigo-50/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${getRoleColor(admin.role)} rounded-xl flex items-center justify-center text-white font-bold`}>
                          {admin.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{admin.name}</div>
                          <div className="text-sm text-slate-500">Administrator</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{admin.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 ${getRoleColor(admin.role)} text-white text-sm px-3 py-2 rounded-lg font-medium`}>
                        {getRoleIcon(admin.role)}
                        {admin.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(admin)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        {admin.role !== 'super_admin' && (
                          <button 
                            onClick={() => setConfirmDialog({ show: true, id: admin.id })}
                            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No admins found</h3>
                        <p className="text-slate-500">Start by adding your first admin</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}