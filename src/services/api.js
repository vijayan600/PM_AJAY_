const API_BASE = '/api';

async function request(url, options = {}) {
    const token = localStorage.getItem('pm_ajay_token');
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
}

export const api = {
    get: (url) => request(url),
    post: (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) }),
    put: (url, body) => request(url, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (url) => request(url, { method: 'DELETE' }),
};

// Auth
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    me: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
};

// Public
export const publicAPI = {
    getStatistics: () => api.get('/public/statistics'),
    getStates: () => api.get('/public/states'),
    getStateDashboard: (id) => api.get(`/public/states/${id}/dashboard`),
    getComponents: () => api.get('/public/components'),
    getProjects: (params) => api.get(`/public/projects?${new URLSearchParams(params)}`),
    getProject: (id) => api.get(`/public/projects/${id}`),
};

// Agency
export const agencyAPI = {
    getDashboard: () => api.get('/agency/dashboard'),
    getProjects: () => api.get('/agency/projects'),
    getProject: (id) => api.get(`/agency/projects/${id}`),
    submitProgress: (data) => api.post('/agency/progress-update', data),
    getNotifications: () => api.get('/agency/notifications'),
};

// State
export const stateAPI = {
    getDashboard: () => api.get('/state/dashboard'),
    getProjects: (params) => api.get(`/state/projects?${new URLSearchParams(params || {})}`),
    createProject: (data) => api.post('/state/projects', data),
    getPendingApprovals: () => api.get('/state/pending-approvals'),
    submitApproval: (data) => api.post('/state/approval', data),
    getAgencies: () => api.get('/state/agencies'),
    getFundsOverview: () => api.get('/state/funds/overview'),
};

// Central
export const centralAPI = {
    getDashboard: () => api.get('/central/dashboard'),
    getStatesPerformance: () => api.get('/central/states/performance'),
    getAllAgencies: () => api.get('/central/agencies/all'),
    getFundsOverview: () => api.get('/central/funds/national-overview'),
    getEscalations: () => api.get('/central/escalations'),
    getUsers: (role) => api.get(`/central/system/users${role ? `?role=${role}` : ''}`),
};
