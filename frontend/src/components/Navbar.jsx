import { motion } from 'framer-motion';

export default function Navbar({ onNavigate, activePage }) {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'upload', label: 'Upload' },
    { id: 'results', label: 'Results' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'settings', label: 'Settings' },
  ];

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
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
             style={{ background: 'linear-gradient(135deg, #c8b4ff, #f5c8d8)' }}>
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
          ReqAI
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

      {/* CTA */}
      <button
        onClick={() => onNavigate('upload')}
        className="btn-outlined text-xs !py-2 !px-4"
      >
        Get Started
      </button>
    </motion.nav>
  );
}
