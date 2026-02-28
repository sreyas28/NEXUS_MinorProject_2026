const API_BASE = 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ---- Upload ----
export const uploadDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return request('/upload', {
    method: 'POST',
    headers: {},
    body: formData,
  });
};

// ---- Requirements ----
export const extractRequirements = (docId) =>
  request(`/extract/${docId}`, { method: 'POST' });

export const getRequirements = () =>
  request('/requirements');

// ---- Classification ----
export const classifyRequirements = (docId) =>
  request(`/classify/${docId}`, { method: 'POST' });

export const getClassificationResults = () =>
  request('/classification');

// ---- Clustering ----
export const clusterRequirements = (docId) =>
  request(`/cluster/${docId}`, { method: 'POST' });

export const getClusters = () =>
  request('/clusters');

// ---- Prioritization ----
export const prioritizeRequirements = (docId) =>
  request(`/prioritize/${docId}`, { method: 'POST' });

export const getPriorities = () =>
  request('/priorities');

// ---- Summary ----
export const getSummary = () =>
  request('/summary');

export const exportReport = (format) =>
  request(`/export?format=${format}`);

// ---- JIRA Integration ----
export const connectJira = (config) =>
  request('/integrations/jira/connect', { method: 'POST', body: JSON.stringify(config) });

export const syncJira = () =>
  request('/integrations/jira/sync', { method: 'POST' });

export const createJiraIssues = (requirements) =>
  request('/integrations/jira/issues', { method: 'POST', body: JSON.stringify({ requirements }) });

export const getJiraProjects = () =>
  request('/integrations/jira/projects');

// ---- Slack Integration ----
export const connectSlack = (config) =>
  request('/integrations/slack/connect', { method: 'POST', body: JSON.stringify(config) });

export const sendSlackNotification = (message) =>
  request('/integrations/slack/notify', { method: 'POST', body: JSON.stringify({ message }) });

export const getSlackChannels = () =>
  request('/integrations/slack/channels');
