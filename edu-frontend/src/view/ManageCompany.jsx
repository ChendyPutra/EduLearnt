import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function ManageCompany() {
  const [profile, setProfile] = useState({ visi: "", misi: "" });
  const [team, setTeam] = useState([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });
  const [teamFormData, setTeamFormData] = useState({ n: "", r: "", photo: "" });

  useEffect(() => {
    fetchProfile();
    fetchTeam();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/company-profile");
      const data = await res.json();
      if (data) setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
      showToast('Failed to load company profile', 'error');
    }
  };

  const fetchTeam = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/team", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.error("Error fetching team:", error);
      showToast('Failed to load team members', 'error');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("http://localhost:8000/api/admin/company-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (res.ok) {
        showToast('Company profile updated successfully!');
      } else {
        showToast('Failed to update profile', 'error');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast('Failed to update profile', 'error');
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const url = editingMember 
        ? `http://localhost:8000/api/admin/team/${editingMember.id}`
        : "http://localhost:8000/api/admin/team";
      
      const method = editingMember ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(teamFormData)
      });

      if (res.ok) {
        fetchTeam();
        setShowTeamForm(false);
        setEditingMember(null);
        setTeamFormData({ n: "", r: "", photo: "" });
        showToast(editingMember ? 'Team member updated successfully!' : 'Team member added successfully!');
      } else {
        showToast('Failed to save team member', 'error');
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      showToast('Failed to save team member', 'error');
    }
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setTeamFormData(member);
    setShowTeamForm(true);
  };

  const handleDeleteMember = (id) => {
    setConfirmDialog({ show: true, id });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-indigo-600 font-medium">Loading company data...</p>
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
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        onConfirm={() => {
          const token = localStorage.getItem("token");
          fetch(`http://localhost:8000/api/admin/team/${confirmDialog.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.ok) {
              fetchTeam();
              showToast('Team member deleted successfully!');
            } else {
              showToast('Failed to delete team member', 'error');
            }
          }).catch(() => showToast('Failed to delete team member', 'error'));
          setConfirmDialog({ show: false, id: null });
        }}
        onCancel={() => setConfirmDialog({ show: false, id: null })}
      />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Company</h1>
            <p className="text-gray-100 text-lg">Manage company profile and team members</p>
          </div>
        </div>
      </div>

      {/* Company Profile */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Company Profile</h2>
        </div>
        
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vision (Visi)</label>
            <textarea
              value={profile.visi}
              onChange={(e) => setProfile({...profile, visi: e.target.value})}
              className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
              rows="4"
              placeholder="Enter company vision..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mission (Misi)</label>
            <textarea
              value={profile.misi}
              onChange={(e) => setProfile({...profile, misi: e.target.value})}
              className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
              rows="4"
              placeholder="Enter company mission..."
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Update Profile
          </button>
        </form>
      </div>

      {/* Team Management */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Team Members</h2>
          </div>
          <button 
            onClick={() => setShowTeamForm(true)}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Member
          </button>
        </div>

        {/* Team Form Modal */}
        {showTeamForm && createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" style={{zIndex: 999999}}>
            <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {editingMember ? "Edit Team Member" : "Add Team Member"}
                </h3>
              </div>
              
              <form onSubmit={handleTeamSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={teamFormData.n}
                    onChange={(e) => setTeamFormData({...teamFormData, n: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role/Position</label>
                  <input
                    type="text"
                    placeholder="e.g., CEO, CTO, Developer"
                    value={teamFormData.r}
                    onChange={(e) => setTeamFormData({...teamFormData, r: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Photo URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={teamFormData.photo}
                    onChange={(e) => setTeamFormData({...teamFormData, photo: e.target.value})}
                    className="w-full p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editingMember ? "Update Member" : "Add Member"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowTeamForm(false);
                      setEditingMember(null);
                      setTeamFormData({ n: "", r: "", photo: "" });
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

        {/* Team Members List */}
        <div className="space-y-4">
          {team.length > 0 ? (
            team.map((member) => (
              <div key={member.id} className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          alt={member.n} 
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow-lg">
                          {member.n?.[0]?.toUpperCase() || 'T'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">{member.n}</h4>
                      <p className="text-indigo-600 font-medium">{member.r}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleEditMember(member)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No team members</h3>
              <p className="text-slate-500 mb-6">Start by adding your first team member</p>
              <button 
                onClick={() => setShowTeamForm(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add First Member
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}