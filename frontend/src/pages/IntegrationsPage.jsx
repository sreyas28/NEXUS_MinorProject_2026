import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plug, CheckCircle2, XCircle, Loader2, ExternalLink, RefreshCw, Send, FolderOpen, Plus } from 'lucide-react';

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
  const [jiraConfig, setJiraConfig] = useState({ url: '', email: '', token: '', project: '' });
  const [jiraConnected, setJiraConnected] = useState(false);
  const [jiraConnecting, setJiraConnecting] = useState(false);
  const [slackConnected, setSlackConnected] = useState(false);
  const [slackConnecting, setSlackConnecting] = useState(false);
  const [slackChannel, setSlackChannel] = useState('');
  const [notifications, setNotifications] = useState({ onUpload: true, onClassify: true, onPrioritize: false, onExport: true });

  const handleJiraConnect = async () => { setJiraConnecting(true); await new Promise(r => setTimeout(r, 1500)); setJiraConnected(true); setJiraConnecting(false); };
  const handleSlackConnect = async () => { setSlackConnecting(true); await new Promise(r => setTimeout(r, 1200)); setSlackConnected(true); setSlackConnecting(false); };

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Integrations</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Connect with JIRA and Slack to streamline your workflow</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JIRA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#eff6ff' }}><JiraIcon size={22} /></div>
            <div className="flex-1">
              <h3 className="text-base font-bold">JIRA</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Project management & issue tracking</p>
            </div>
            {jiraConnected ? <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={14} /> Connected</span> : <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}><XCircle size={14} /> Not connected</span>}
          </div>

          {!jiraConnected ? (
            <div className="space-y-3">
              <input className="input-field" placeholder="JIRA URL" value={jiraConfig.url} onChange={(e) => setJiraConfig({ ...jiraConfig, url: e.target.value })} />
              <input className="input-field" placeholder="Email address" value={jiraConfig.email} onChange={(e) => setJiraConfig({ ...jiraConfig, email: e.target.value })} />
              <input className="input-field" type="password" placeholder="API Token" value={jiraConfig.token} onChange={(e) => setJiraConfig({ ...jiraConfig, token: e.target.value })} />
              <button onClick={handleJiraConnect} disabled={jiraConnecting} className="btn-dark w-full flex items-center justify-center gap-2">
                {jiraConnecting ? <><Loader2 size={16} className="animate-spin" /> Connecting…</> : <><Plug size={16} /> Connect to JIRA</>}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Project</label>
                <select className="input-field" value={jiraConfig.project} onChange={(e) => setJiraConfig({ ...jiraConfig, project: e.target.value })}>
                  <option value="">Select project…</option>
                  <option value="REQ">REQ — Requirements Engineering</option>
                  <option value="AI">AI — AI Platform</option>
                </select>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                <RefreshCw size={16} className="text-emerald-500" />
                <div className="flex-1"><p className="text-xs font-semibold">Last synced 3 min ago</p><p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>12 issues synced</p></div>
                <button className="btn-ghost text-xs flex items-center gap-1"><RefreshCw size={12} /> Sync Now</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-dark flex items-center justify-center gap-2 text-xs"><Plus size={14} /> Create Issues</button>
                <button className="btn-outlined flex items-center justify-center gap-2 text-xs"><FolderOpen size={14} /> View Board <ExternalLink size={12} /></button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Slack */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#f0fdf4' }}><SlackIcon size={22} /></div>
            <div className="flex-1">
              <h3 className="text-base font-bold">Slack</h3>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Notifications & team communication</p>
            </div>
            {slackConnected ? <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500"><CheckCircle2 size={14} /> Connected</span> : <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}><XCircle size={14} /> Not connected</span>}
          </div>

          {!slackConnected ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3" style={{ background: '#f0fdf4' }}><SlackIcon size={28} /></div>
              <p className="text-sm font-semibold mb-1">Connect your workspace</p>
              <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Authorize ReqAI to send notifications</p>
              <button onClick={handleSlackConnect} disabled={slackConnecting} className="btn-dark inline-flex items-center gap-2">
                {slackConnecting ? <><Loader2 size={16} className="animate-spin" /> Connecting…</> : <><Plug size={16} /> Add to Slack</>}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Notification Channel</label>
                <select className="input-field" value={slackChannel} onChange={(e) => setSlackChannel(e.target.value)}>
                  <option value="">Select channel…</option>
                  <option value="general"># general</option>
                  <option value="requirements"># requirements</option>
                  <option value="dev-updates"># dev-updates</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--text-secondary)' }}>Events</label>
                <div className="space-y-2">
                  {[{ key: 'onUpload', label: 'Document uploaded' }, { key: 'onClassify', label: 'Classification completed' }, { key: 'onPrioritize', label: 'Prioritization finished' }, { key: 'onExport', label: 'Report exported' }].map((item) => (
                    <label key={item.key} className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors hover:bg-gray-50" style={{ background: 'var(--bg-secondary)' }}>
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
              <button className="btn-outlined w-full flex items-center justify-center gap-2 text-xs"><Send size={14} /> Send Test Message</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
