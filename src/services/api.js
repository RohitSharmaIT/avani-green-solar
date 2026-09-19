// Centralized API client for Avani Green Solar

const API_BASE = '/api';

export function getAuthToken() {
  return localStorage.getItem('ags_jwt_token');
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('ags_jwt_token', token);
  } else {
    localStorage.removeItem('ags_jwt_token');
  }
}

async function request(endpoint, options = {}) {
  const headers = {
    ...options.headers
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Set Content-Type only if not sending FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = (data && data.message) || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.warn(`[API] Error on ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  auth: {
    login: (username, password) =>
      request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      }),
    me: () => request('/auth/me'),
    changePassword: (currentPassword, newPassword) =>
      request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword })
      }),
    systemStatus: () => request('/auth/system-status')
  },

  // Upload (Cloudinary)
  upload: {
    image: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      return request('/upload', {
        method: 'POST',
        body: formData
      });
    },
    delete: (publicId) =>
      request(`/upload/${publicId}`, {
        method: 'DELETE'
      })
  },

  // Projects
  projects: {
    getAll: () => request('/projects'),
    getById: (id) => request(`/projects/${id}`),
    create: (data) =>
      request('/projects', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id) =>
      request(`/projects/${id}`, {
        method: 'DELETE'
      })
  },

  // Blog
  blog: {
    getAll: () => request('/blog'),
    getBySlug: (slug) => request(`/blog/${slug}`),
    create: (data) =>
      request('/blog', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
    delete: (id) =>
      request(`/blog/${id}`, {
        method: 'DELETE'
      })
  },

  jobs: {
    getAll: () => request('/jobs'),
    getById: (id) => request(`/jobs/${id}`),
    create: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => request(`/jobs/${id}`, { method: 'DELETE' })
  },

  // Leads
  leads: {
    getAll: () => request('/leads'),
    create: (data) =>
      request('/leads', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
  },

  // Site Visits
  siteVisits: {
    getAll: () => request('/site-visits'),
    create: (data) =>
      request('/site-visits', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/site-visits/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
  },

  // Reviews
  reviews: {
    getAll: (status) => request(`/reviews${status ? `?status=${status}` : ''}`),
    create: (data) =>
      request('/reviews', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    updateStatus: (id, status) =>
      request(`/reviews/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),
    delete: (id) =>
      request(`/reviews/${id}`, {
        method: 'DELETE'
      })
  },

  // Partners (Dealers & Contractors)
  dealers: {
    getAll: () => request('/partners/dealers'),
    create: (data) =>
      request('/partners/dealers', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/partners/dealers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
  },
  contractors: {
    getAll: () => request('/partners/contractors'),
    create: (data) =>
      request('/partners/contractors', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    update: (id, data) =>
      request(`/partners/contractors/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      })
  },

  // Contact
  contact: {
    getAll: () => request('/contact'),
    create: (data) =>
      request('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
      })
  },

  // Settings
  settings: {
    get: () => request('/settings'),
    update: (data) =>
      request('/settings', {
        method: 'PUT',
        body: JSON.stringify(data)
      })
  },

  // Subsidy rules
  subsidyRules: {
    getAll: () => request('/subsidy-rules')
  }
};
