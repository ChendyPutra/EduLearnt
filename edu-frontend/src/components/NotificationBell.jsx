import { useState, useEffect, useRef } from "react";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/notifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setNotifications(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/notifications/unread-count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUnreadCount(data.count);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8000/api/notifications/${id}/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8000/api/notifications/read-all", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': 
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning': 
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error': 
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default: 
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const formatTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`relative p-3 rounded-full transition-all duration-300 focus:outline-none ${
          unreadCount > 0 
            ? 'bg-blue-50 hover:bg-blue-100 animate-bounce' 
            : 'bg-white hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/128/9783/9783934.png"
          alt="Notifikasi"
          className={`w-6 h-6 transition-all duration-300 ${
            unreadCount > 0 ? 'filter-none animate-pulse' : 'filter grayscale hover:grayscale-0'
          }`}
        />
        
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-blue-100 z-50 opacity-0 animate-fadeIn">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-lg">Notifikasi</h3>
                <p className="text-blue-100 text-sm">
                  {unreadCount > 0 ? `${unreadCount} pesan belum dibaca` : 'Semua sudah dibaca'}
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-white font-medium transition-colors"
                >
                  Tandai Semua
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">Tidak ada notifikasi</h4>
                <p className="text-sm text-gray-500">Semua sudah terbaca</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                      !notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-medium text-sm ${
                            !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-gray-400">
                            {formatTime(notification.created_at)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        
                        {!notification.is_read && (
                          <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                            Baru
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
              <button className="w-full py-2.5 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200">
                Lihat Semua Notifikasi
              </button>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}