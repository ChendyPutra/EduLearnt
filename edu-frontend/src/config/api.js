const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Create a centralized fetch function with proper CORS handling
export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: apiConfig.headers,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: apiConfig.headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: apiConfig.headers,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

// Specific API endpoints
export const apiEndpoints = {
  companyProfile: {
    get: () => apiClient.get('/api/company-profile'),
    update: (data) => apiClient.put('/api/company-profile', data),
  },
  team: {
    get: () => apiClient.get('/api/team'),
    create: (data) => apiClient.post('/api/team', data),
    update: (id, data) => apiClient.put(`/api/team/${id}`, data),
    delete: (id) => apiClient.delete(`/api/team/${id}`),
  },
  feedback: {
    create: (data) => apiClient.post('/api/feedback', data),
    get: () => apiClient.get('/api/feedback'),
  },
};

export default apiConfig;
