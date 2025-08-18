import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingUser 
        ? `http://localhost:8000/api/admin/users/${editingUser.id}`
        : "http://localhost:8000/api/admin/users";
      
      const method = editingUser ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchUsers();
        setShowForm(false);
        setEditingUser(null);
        setFormData({ name: "", email: "", password: "", role: "student" });
        showToast(editingUser ? 'User updated successfully!' : 'User created successfully!');
      } else {
        showToast('Failed to save user', 'error');
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user, password: "" });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({ show: true, id });
  };

  const confirmDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchUsers();
        showToast('User deleted successfully!');
      } else {
        showToast('Failed to delete user', 'error');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast('Failed to delete user', 'error');
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'student': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'teacher': return 'bg-gradient-to-r from-emerald-500 to-teal-500';
      case 'parent': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'admin': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'super_admin': return 'bg-gradient-to-r from-red-600 to-pink-600';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'student': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
      case 'teacher': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
      case 'parent': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading users...</p>
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/users/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchUsers();
              showToast('User deleted successfully!');
            } else {
              showToast('Failed to delete user', 'error');
            }
          }).catch(() => showToast('Failed to delete user', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Users</h1>
            <p className="text-blue-100 text-lg">Manage platform users and permissions</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add User
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingUser ? "Edit User" : "Add New User"}
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
                      placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      required={!editingUser}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editingUser ? "Update User" : "Create User"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingUser(null);
                      setFormData({ name: "", email: "", password: "", role: "student" });
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
          </div>
        </div>, document.body
      )}

      {/* Users Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-100 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-violet-50 border-b border-indigo-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Role</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id} className={`border-b border-indigo-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-violet-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-indigo-50/30'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{user.name}</div>
                          <div className="text-sm text-slate-500">User Account</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 ${getRoleColor(user.role)} text-white text-sm px-3 py-2 rounded-lg font-medium`}>
                        {getRoleIcon(user.role)}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button 
                          onClick={() => setConfirmDialog({ show: true, id: user.id })}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">No users found</h3>
                        <p className="text-slate-500">Start by adding your first user</p>
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
