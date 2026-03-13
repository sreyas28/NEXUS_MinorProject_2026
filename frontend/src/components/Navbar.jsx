import { motion } from 'framer-motion';
import { LogIn, LogOut, User } from 'lucide-react';
import SutravaLogo from './SutravaLogo';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, activePage }) {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'upload', label: 'Upload' },
    { id: 'results', label: 'Results' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'settings', label: 'Settings' },
  ];

  // Extract display name from Atlassian OAuth2 user attributes
  const displayName = user?.name || user?.display_name || user?.email || 'User';
  const avatarUrl = user?.picture || user?.avatar_url || null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(250, 248, 245, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <SutravaLogo size={32} />
        <span className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          Sutrava
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activePage === link.id
                ? 'bg-black text-white'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Auth CTA */}
      {isLoading ? (
        <div className="w-24 h-9 rounded-full animate-pulse" style={{ background: 'var(--bg-secondary)' }} />
      ) : isAuthenticated ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c8b4ff, #f5c8d8)' }}>
                <User size={14} className="text-white" />
              </div>
            )}
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {displayName}
            </span>
          </div>
          <button
            onClick={logout}
            className="btn-ghost text-xs !py-1.5 !px-3 flex items-center gap-1"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="btn-outlined text-xs !py-2 !px-4 flex items-center gap-2"
        >
          <LogIn size={14} />
          Login with Atlassian
        </button>
      )}
    </motion.nav>
  );
}
