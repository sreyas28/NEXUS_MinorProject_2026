import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plug,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  FolderOpen,
  LogIn,
  Globe,
  ChevronDown,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAtlassianResources, getAtlassianProjects } from '../services/api';

function JiraIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11.53 2c0 4.97 4.03 9 9 9h1.47v1.47c0 4.97-4.03 9-9 9H2V11.53C2 6.56 6.56 2 11.53 2z" fill="#2684FF"/>
      <path d="M11.53 2C11.53 6.97 7.5 11 2.53 11H2v.53c0 4.97 4.03 9 9 9h.53c4.97 0 9-4.03 9-9V11h-.53c-4.97 0-9-4.03-9-9z" fill="url(#jg)"/>
      <defs><linearGradient id="jg" x1="2" y1="11" x2="20.53" y2="11"><stop stopColor="#0052CC"/><stop offset="1" stopColor="#2684FF"/></linearGradient></defs>
    </svg>
  );
}

function SlackIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
    </svg>
  );
}

export default function IntegrationsPage() {
  const { isAuthenticated, login } = useAuth();

  // Atlassian resources state
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [resourceError, setResourceError] = useState(null);

  // Slack state (UI-only, no backend support yet)
  const [slackConnected] = useState(false);
  const [notifications, setNotifications] = useState({ onUpload: true, onClassify: true, onPrioritize: false, onExport: true });

  // Fetch Atlassian resources when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchResources();
  }, [isAuthenticated]);

  const fetchResources = async () => {
    setLoadingResources(true);
    setResourceError(null);
    try {
      const data = await getAtlassianResources();
      if (data) {
        setResources(data);
        if (data.length > 0) {
          setSelectedResource(data[0]);
          fetchProjects(data[0].id);
        }
      }
    } catch (err) {
      setResourceError('Failed to load Atlassian resources');
      console.error(err);
    } finally {
      setLoadingResources(false);
    }
  };

  const fetchProjects = async (cloudId) => {
    setLoadingProjects(true);
    try {
      const data = await getAtlassianProjects(cloudId);
      if (data) setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleResourceChange = (e) => {
    const resource = resources.find(r => r.id === e.target.value);
    setSelectedResource(resource);
    if (resource) fetchProjects(resource.id);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Integrations</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Connect with Atlassian JIRA and Slack to streamline your workflow</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JIRA / Atlassian */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#eff6ff' }}><JiraIcon size={22} /></div>
            <div className="flex-1">
              <h3 className="text-base font-bold">Atlassian JIRA</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Project management & issue tracking via OAuth</p>
            </div>
            {isAuthenticated ? <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={14} /> Connected</span> : <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}><XCircle size={14} /> Not connected</span>}
          </div>

          {!isAuthenticated ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: '#eff6ff' }}><JiraIcon size={28} /></div>
              <p className="text-sm font-semibold mb-1">Connect with Atlassian</p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Sign in with your Atlassian account to access JIRA projects</p>
              <button onClick={login} className="btn-dark inline-flex items-center gap-2">
                <LogIn size={16} /> Login with Atlassian
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Resource selector */}
              {loadingResources ? (
                <div className="flex items-center justify-center py-4 gap-2">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading Atlassian sites…</span>
                </div>
              ) : resourceError ? (
                <div className="p-3 rounded-xl text-center" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs text-red-500 mb-2">{resourceError}</p>
                  <button onClick={fetchResources} className="btn-ghost text-xs flex items-center gap-1 mx-auto">
                    <RefreshCw size={12} /> Retry
                  </button>
                </div>
              ) : (
                <>
                  {resources.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                        <Globe size={12} className="inline mr-1" />Atlassian Site
                      </label>
                      <div className="relative">
                        <select
                          className="input-field !pr-8 appearance-none cursor-pointer"
                          value={selectedResource?.id || ''}
                          onChange={handleResourceChange}
                        >
                          {resources.map((r) => (
                            <option key={r.id} value={r.id}>{r.name} — {r.url}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
                      </div>
                    </div>
                  )}

                  {/* Projects list */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                      <FolderOpen size={12} className="inline mr-1" />Projects
                    </label>
                    {loadingProjects ? (
                      <div className="flex items-center justify-center py-4 gap-2">
                        <Loader2 size={14} className="animate-spin text-blue-500" />
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading projects…</span>
                      </div>
                    ) : projects.length > 0 ? (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {projects.map((proj) => (
                          <div key={proj.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-gray-50" style={{ background: 'var(--bg-secondary)' }}>
                            {proj.avatarUrls && (
                              <img
                                src={proj.avatarUrls['48x48'] || proj.avatarUrls['32x32'] || Object.values(proj.avatarUrls)[0]}
                                alt={proj.name}
                                className="w-8 h-8 rounded-lg"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate">{proj.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: '#eff6ff', color: '#2684FF' }}>{proj.key}</span>
                                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{proj.projectTypeKey}</span>
                                {proj.isPrivate && <Lock size={10} style={{ color: 'var(--text-muted)' }} />}
                              </div>
                            </div>
                            <a
                              href={selectedResource ? `${selectedResource.url}/jira/software/projects/${proj.key}/board` : '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-ghost !p-1.5"
                            >
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs py-3 text-center" style={{ color: 'var(--text-muted)' }}>No projects found for this site</p>
                    )}
                  </div>

                  <button onClick={fetchResources} className="btn-ghost w-full flex items-center justify-center gap-2 text-xs">
                    <RefreshCw size={14} /> Refresh Data
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Slack — Coming Soon */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f0fdf4' }}><SlackIcon size={22} /></div>
            <div className="flex-1">
              <h3 className="text-base font-bold">Slack</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Notifications & team communication</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: '#fef3c7', color: '#d97706' }}>COMING SOON</span>
          </div>

          <div className="text-center py-6 opacity-60">
            <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: '#f0fdf4' }}><SlackIcon size={28} /></div>
            <p className="text-sm font-semibold mb-1">Slack integration</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Slack notifications will be available once the backend integration is implemented</p>
          </div>

          {/* Notification preferences — kept for future use */}
          <div className="opacity-50 pointer-events-none">
            <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--text-secondary)' }}>Notification Events (preview)</label>
            <div className="space-y-2">
              {[{ key: 'onUpload', label: 'Document uploaded' }, { key: 'onClassify', label: 'Classification completed' }, { key: 'onPrioritize', label: 'Prioritization finished' }, { key: 'onExport', label: 'Report exported' }].map((item) => (
                <label key={item.key} className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors" style={{ background: 'var(--bg-secondary)' }}>
                  <span className="text-xs font-medium">{item.label}</span>
                  <div className="relative">
                    <input type="checkbox" checked={notifications[item.key]} onChange={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))} className="sr-only peer" />
                    <div className="w-9 h-5 rounded-full transition-colors peer-checked:bg-black bg-gray-300" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
