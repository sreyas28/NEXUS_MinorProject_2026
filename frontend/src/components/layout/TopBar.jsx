import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Bell, Activity, Wifi } from 'lucide-react';

export default function TopBar({ activePage }) {
  const { isDark, toggleTheme } = useTheme();

  const pageLabels = {
    upload: 'Upload Requirements',
    extracted: 'Extracted Requirements',
    classification: 'Classification Results',
    clustering: 'Clustering View',
    prioritization: 'Prioritization',
    summary: 'Summary Report',
    integrations: 'Integrations',
    settings: 'Settings',
  };

  return (
    <header
      className="h-[64px] flex items-center justify-between px-6 shrink-0"
      style={{
        background: isDark
          ? 'rgba(15,23,42,0.8)'
          : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.08)' : 'rgba(0,0,0,0.04)'}`,
      }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {pageLabels[activePage] || 'Dashboard'}
        </h2>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-subtle mr-2">
          <div className="relative">
            <Wifi size={14} className="text-emerald-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            API Connected
          </span>
        </div>

        {/* Processing indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-subtle mr-2">
          <Activity size={14} className="text-primary-400" />
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            Ready
          </span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl transition-all duration-200 btn-ghost">
          <Bell size={18} />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl transition-all duration-300 btn-ghost overflow-hidden"
          aria-label="Toggle theme"
        >
          <div className="relative w-[18px] h-[18px]">
            <Sun
              size={18}
              className={`absolute inset-0 transition-all duration-300 text-amber-400 ${
                isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <Moon
              size={18}
              className={`absolute inset-0 transition-all duration-300 text-primary-300 ${
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  );
}
