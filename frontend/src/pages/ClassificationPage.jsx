import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, HelpCircle, Tag } from 'lucide-react';

const classificationData = {
  Functional: {
    color: '#3b82f6',
    bgLight: '#eff6ff',
    borderLight: '#dbeafe',
    icon: CheckCircle2,
    items: [
      { id: 'REQ-001', text: 'Authenticate users via OAuth 2.0', confidence: 0.96 },
      { id: 'REQ-004', text: 'Export reports in PDF and CSV formats', confidence: 0.89 },
      { id: 'REQ-006', text: 'Display real-time analytics on dashboard', confidence: 0.85 },
      { id: 'REQ-008', text: 'Manage user roles and permissions', confidence: 0.91 },
      { id: 'REQ-010', text: 'Push real-time notifications via WebSocket', confidence: 0.93 },
      { id: 'REQ-011', text: 'Integrate requirements traceability matrix', confidence: 0.82 },
      { id: 'REQ-015', text: 'Multi-language support (EN, HI, FR)', confidence: 0.87 },
    ],
  },
  'Non-Functional': {
    color: '#8b5cf6',
    bgLight: '#f5f3ff',
    borderLight: '#ede9fe',
    icon: TrendingUp,
    items: [
      { id: 'REQ-002', text: 'Response time ≤ 200ms for 95th percentile', confidence: 0.92 },
      { id: 'REQ-003', text: 'AES-256 encryption for data at rest', confidence: 0.98 },
      { id: 'REQ-005', text: 'Support 10,000 concurrent users', confidence: 0.94 },
      { id: 'REQ-007', text: 'Comply with GDPR standards', confidence: 0.97 },
      { id: 'REQ-009', text: 'Responsive interface for screens ≥ 1024px', confidence: 0.88 },
      { id: 'REQ-012', text: 'Automated backups every 6 hours', confidence: 0.90 },
    ],
  },
  Ambiguous: {
    color: '#f59e0b',
    bgLight: '#fffbeb',
    borderLight: '#fef3c7',
    icon: HelpCircle,
    items: [
      { id: 'REQ-013', text: 'Users might need collaborative annotations', confidence: 0.61 },
      { id: 'REQ-014', text: 'Good performance under load', confidence: 0.55 },
    ],
  },
};

const totalCount = Object.values(classificationData).reduce((s, c) => s + c.items.length, 0);

export default function ClassificationPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Classification Results</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
          {totalCount} requirements classified into {Object.keys(classificationData).length} categories
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(classificationData).map(([label, data], i) => {
          const Icon = data.icon;
          const pct = ((data.items.length / totalCount) * 100).toFixed(0);
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
              style={{ borderLeft: `3px solid ${data.color}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon size={18} style={{ color: data.color }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</span>
                </div>
                <span className="text-2xl font-bold" style={{ color: data.color }}>{data.items.length}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: data.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                />
              </div>
              <p className="text-xs mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>{pct}% of total</p>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed sections */}
      {Object.entries(classificationData).map(([label, data], i) => {
        const Icon = data.icon;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="card !p-0 overflow-hidden"
          >
            <div className="px-5 py-3 flex items-center gap-2 border-b" style={{ borderColor: 'var(--border-light)' }}>
              <Icon size={16} style={{ color: data.color }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{label} Requirements</h3>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: data.bgLight, color: data.color }}
              >
                {data.items.length}
              </span>
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--border-light)' }}>
              {data.items.map((item) => (
                <div key={item.id} className="px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <span className="font-mono text-xs font-semibold w-20 shrink-0" style={{ color: 'var(--text-primary)' }}>{item.id}</span>
                  <p className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{item.text}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-14 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                      <div className="h-full rounded-full" style={{ width: `${item.confidence * 100}%`, background: data.color }} />
                    </div>
                    <span className="text-xs font-mono font-semibold w-10 text-right" style={{ color: 'var(--text-secondary)' }}>
                      {(item.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
