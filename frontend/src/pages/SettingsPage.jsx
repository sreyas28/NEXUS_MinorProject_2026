import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Server, Info, Save, RotateCcw, Type, Monitor, Globe, Brain } from 'lucide-react';

export default function SettingsPage() {
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:8000/api');
  const [fontSize, setFontSize] = useState('14');
  const [language, setLanguage] = useState('en');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-3xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Settings</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Customize your application preferences</p>
      </motion.div>

      {/* Appearance */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette size={18} style={{ color: 'var(--text-primary)' }} />
          <h2 className="text-sm font-bold">Appearance</h2>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-3">
            <Type size={18} style={{ color: 'var(--text-primary)' }} />
            <div>
              <p className="text-sm font-semibold">Font Size</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Adjust base font size</p>
            </div>
          </div>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="input-field !w-24 text-center">
            <option value="12">12px</option>
            <option value="13">13px</option>
            <option value="14">14px</option>
            <option value="15">15px</option>
            <option value="16">16px</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <div className="flex items-center gap-3">
            <Globe size={18} style={{ color: 'var(--text-primary)' }} />
            <div>
              <p className="text-sm font-semibold">Language</p>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Interface language</p>
            </div>
          </div>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field !w-32">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
          </select>
        </div>
      </motion.div>

      {/* API Configuration */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Server size={18} style={{ color: 'var(--text-primary)' }} />
          <h2 className="text-sm font-bold">API Configuration</h2>
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--text-secondary)' }}>Backend Endpoint</label>
          <input className="input-field font-mono text-xs" value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)} placeholder="http://localhost:8000/api" />
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <Monitor size={16} className="text-emerald-500" />
          <div className="flex-1">
            <p className="text-xs font-semibold">Connection Status</p>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Backend API is reachable</p>
          </div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} style={{ color: 'var(--text-primary)' }} />
          <h2 className="text-sm font-bold">About</h2>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #c8b4ff, #f5c8d8)' }}>
            <Brain size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold">ReqAI</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI-Driven Automated Requirements Engineering System</p>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Version 1.0.0 • Built with React + Vite</p>
          </div>
        </div>
      </motion.div>

      {/* Save bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
        <button onClick={handleSave} className="btn-dark flex items-center gap-2">
          <Save size={16} /> {saved ? 'Saved!' : 'Save Settings'}
        </button>
        <button className="btn-ghost flex items-center gap-2">
          <RotateCcw size={14} /> Reset to Defaults
        </button>
      </motion.div>
    </div>
  );
}
