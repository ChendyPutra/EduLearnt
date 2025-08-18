/**
 * Navigation utility for role-based routing
 */

export const getDashboardRoute = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard-admin';
    case 'super_admin':
      return '/dashboard-admin';
    case 'student':
      return '/dashboard-student';
    default:
      return '/';
  }
};

export const getLoginRoute = (role) => {
  switch (role) {
    case 'admin':
    case 'super_admin':
      return '/login-admin';
    case 'student':
      return '/login-student';
    default:
      return '/login-student';
  }
};

export const isAdminRole = (role) => {
  return role === 'admin' || role === 'super_admin';
};

export const isStudentRole = (role) => {
  return role === 'student';
};

export const getUserRole = () => {
  return localStorage.getItem('role');
};

export const getUserToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getUserToken();
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

export const setAuthData = (token, role) => {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
};
