import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Upload,
  FileText,
  Tags,
  Network,
  BarChart3,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plug,
} from 'lucide-react';
import SutravaLogo from '../SutravaLogo';

const navItems = [
  { id: 'upload', label: 'Upload Requirements', icon: Upload },
  { id: 'extracted', label: 'Extracted Requirements', icon: FileText },
  { id: 'classification', label: 'Classification Results', icon: Tags },
  { id: 'clustering', label: 'Clustering View', icon: Network },
  { id: 'prioritization', label: 'Prioritization', icon: BarChart3 },
  { id: 'summary', label: 'Summary Report', icon: FileBarChart },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isDark } = useTheme();

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(241,245,249,0.95))',
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${isDark ? 'rgba(99,102,241,0.12)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-[64px] shrink-0 border-b border-white/5">
        <SutravaLogo size={36} className="shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-base font-bold gradient-text whitespace-nowrap">Sutrava</h1>
            <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
              Requirements Engineering
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                collapsed ? 'justify-center' : ''
              }`}
              style={{
                background: isActive
                  ? isDark
                    ? 'rgba(99,102,241,0.15)'
                    : 'rgba(99,102,241,0.1)'
                  : 'transparent',
                color: isActive ? '#818cf8' : 'var(--text-secondary)',
              }}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              )}
              <Icon size={19} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 glass">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 pb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 btn-ghost"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
