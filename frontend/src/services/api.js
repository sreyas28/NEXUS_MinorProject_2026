// ============================================================
// Sutrava API Service — aligned with Spring Boot backend
// Backend: http://localhost:8080 (Spring Boot 4 + Atlassian OAuth2)
// Auth: Session-based OAuth2 — all requests use credentials: 'include'
// ============================================================

const API_BASE = 'http://localhost:8080';

/**
 * Core request helper.
 * Always sends credentials (cookies) for session-based OAuth2 auth.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    credentials: 'include', // required for session-based OAuth2
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // If unauthorized, return null so callers can handle gracefully
    if (response.status === 401 || response.status === 403) {
      return null;
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============================================================
// AUTH — Atlassian OAuth2
// ============================================================

/** Returns the URL to redirect to for Atlassian OAuth login */
export const getLoginUrl = () => `${API_BASE}/oauth2/authorization/atlassian`;

/** Fetch the currently logged-in user (session-based) */
export const getLoggedUser = () => request('/logged/user');

/** Logout — Spring Security default logout endpoint */
export const logout = () =>
  request('/logout', { method: 'POST', headers: {} });

// ============================================================
// ATLASSIAN / JIRA — Real backend endpoints
// ============================================================

/** Fetch accessible Atlassian resources (sites) for the logged-in user */
export const getAtlassianResources = () => request('/atlassian/resources');

/**
 * Fetch Jira projects for a given Atlassian cloud site
 * @param {string} cloudId - The Atlassian cloud ID
 * @returns {Promise<Array<{id, key, name, projectTypeKey, style, simplified, isPrivate, avatarUrls}>>}
 */
export const getAtlassianProjects = (cloudId) =>
  request(`/atlassian/projects?cloudId=${encodeURIComponent(cloudId)}`);

// ============================================================
// TEST — Backend connectivity check
// ============================================================

/** Test if the backend is reachable (no auth required) */
export const testBackendConnection = () =>
  request('/tests/1', { method: 'POST' });

// ============================================================
// UPLOAD — Placeholder (no backend endpoint yet)
// ============================================================

/**
 * Upload a document for requirement extraction.
 * TODO: Connect to real backend endpoint once implemented.
 * Currently simulates upload behavior.
 */
export const uploadDocument = async (file) => {
  // Attempt real upload if endpoint exists
  try {
    const formData = new FormData();
    formData.append('file', file);
    return await request('/api/upload', {
      method: 'POST',
      headers: {}, // let browser set Content-Type for multipart
      body: formData,
    });
  } catch {
    // Backend endpoint not yet implemented — return simulated response
    console.warn('Upload endpoint not available — using simulated response');
    return {
      id: crypto.randomUUID(),
      filename: file.name,
      size: file.size,
      status: 'uploaded',
      _simulated: true,
    };
  }
};

// ============================================================
// REQUIREMENTS — Placeholders (no backend endpoints yet)
// ============================================================

export const extractRequirements = async (docId) => {
  console.warn('extractRequirements: backend endpoint not yet implemented');
  return { docId, requirements: [], _simulated: true };
};

export const getRequirements = async () => {
  console.warn('getRequirements: backend endpoint not yet implemented');
  return [];
};

// ============================================================
// CLASSIFICATION — Placeholder
// ============================================================

export const classifyRequirements = async (docId) => {
  console.warn('classifyRequirements: backend endpoint not yet implemented');
  return { docId, classifications: {}, _simulated: true };
};

export const getClassificationResults = async () => {
  console.warn('getClassificationResults: backend endpoint not yet implemented');
  return {};
};

// ============================================================
// CLUSTERING — Placeholder
// ============================================================

export const clusterRequirements = async (docId) => {
  console.warn('clusterRequirements: backend endpoint not yet implemented');
  return { docId, clusters: [], _simulated: true };
};

export const getClusters = async () => {
  console.warn('getClusters: backend endpoint not yet implemented');
  return [];
};

// ============================================================
// PRIORITIZATION — Placeholder
// ============================================================

export const prioritizeRequirements = async (docId) => {
  console.warn('prioritizeRequirements: backend endpoint not yet implemented');
  return { docId, priorities: [], _simulated: true };
};

export const getPriorities = async () => {
  console.warn('getPriorities: backend endpoint not yet implemented');
  return [];
};

// ============================================================
// SUMMARY — Placeholder
// ============================================================

export const getSummary = async () => {
  console.warn('getSummary: backend endpoint not yet implemented');
  return { total: 0, insights: [], _simulated: true };
};

export const exportReport = async (format) => {
  console.warn('exportReport: backend endpoint not yet implemented');
  return { format, _simulated: true };
};

// ============================================================
// UTILITY — API base getter for Settings page
// ============================================================

export const getApiBase = () => API_BASE;
