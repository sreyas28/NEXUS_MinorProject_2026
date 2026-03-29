import { motion } from 'framer-motion';
import { BarChart3, ArrowUp, ArrowDown, Trophy, Star, Clock, AlertTriangle } from 'lucide-react';

const PRIORITIES = [
  { id: 'REQ-003', text: 'AES-256 encryption for data at rest', score: 98, type: 'Non-Functional', method: 'MoSCoW + AHP', trend: 'stable' },
  { id: 'REQ-007', text: 'Comply with GDPR standards', score: 96, type: 'Non-Functional', method: 'MoSCoW + AHP', trend: 'up' },
  { id: 'REQ-002', text: 'Response time ≤ 200ms for 95th percentile', score: 93, type: 'Non-Functional', method: 'AHP', trend: 'up' },
  { id: 'REQ-001', text: 'Authenticate users via OAuth 2.0', score: 91, type: 'Functional', method: 'MoSCoW', trend: 'stable' },
  { id: 'REQ-005', text: 'Support 10,000 concurrent users', score: 89, type: 'Non-Functional', method: 'AHP', trend: 'down' },
  { id: 'REQ-010', text: 'Push real-time notifications via WebSocket', score: 85, type: 'Functional', method: 'MoSCoW', trend: 'up' },
  { id: 'REQ-008', text: 'Manage user roles and permissions', score: 82, type: 'Functional', method: 'AHP', trend: 'stable' },
  { id: 'REQ-012', text: 'Automated backups every 6 hours', score: 78, type: 'Non-Functional', method: 'MoSCoW', trend: 'stable' },
  { id: 'REQ-004', text: 'Export reports in PDF and CSV', score: 74, type: 'Functional', method: 'AHP', trend: 'down' },
  { id: 'REQ-006', text: 'Display real-time analytics on dashboard', score: 70, type: 'Functional', method: 'MoSCoW + AHP', trend: 'up' },
  { id: 'REQ-011', text: 'Integrate requirements traceability matrix', score: 64, type: 'Functional', method: 'AHP', trend: 'stable' },
  { id: 'REQ-009', text: 'Responsive interface ≥ 1024px', score: 60, type: 'Non-Functional', method: 'MoSCoW', trend: 'down' },
  { id: 'REQ-015', text: 'Multi-language support (EN, HI, FR)', score: 52, type: 'Functional', method: 'AHP', trend: 'stable' },
  { id: 'REQ-013', text: 'Collaborative annotations for users', score: 38, type: 'Ambiguous', method: 'MoSCoW', trend: 'down' },
  { id: 'REQ-014', text: 'Good performance under load', score: 32, type: 'Ambiguous', method: 'AHP', trend: 'down' },
];

const getScoreColor = (s) => s >= 90 ? '#ef4444' : s >= 75 ? '#f59e0b' : s >= 50 ? '#3b82f6' : '#94a3b8';
const getRankIcon = (r) => r <= 3 ? <Trophy size={16} className={r === 1 ? 'text-amber-400' : r === 2 ? 'text-gray-400' : 'text-amber-700'} /> : <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>{r}</span>;

export default function PrioritizationPage() {
  const maxScore = Math.max(...PRIORITIES.map((p) => p.score));
  const stats = [
    { label: 'Critical', count: PRIORITIES.filter((p) => p.score >= 90).length, icon: AlertTriangle, color: '#ef4444' },
    { label: 'High', count: PRIORITIES.filter((p) => p.score >= 75 && p.score < 90).length, icon: Star, color: '#f59e0b' },
    { label: 'Medium', count: PRIORITIES.filter((p) => p.score >= 50 && p.score < 75).length, icon: Clock, color: '#3b82f6' },
    { label: 'Low', count: PRIORITIES.filter((p) => p.score < 50).length, icon: BarChart3, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Prioritization</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>AI-powered priority scoring using MoSCoW and AHP analysis</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card !p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} style={{ color: stat.color }} />
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.count}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Priority Score Distribution</h3>
        <div className="space-y-3">
          {PRIORITIES.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-5 flex justify-center shrink-0">{getRankIcon(idx + 1)}</div>
              <span className="font-mono text-xs font-semibold w-16 shrink-0">{item.id}</span>
              <div className="flex-1 relative h-7 rounded-lg overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                <motion.div className="absolute inset-y-0 left-0 rounded-lg flex items-center justify-end pr-3" style={{ background: getScoreColor(item.score) }} initial={{ width: 0 }} animate={{ width: `${(item.score / maxScore) * 100}%` }} transition={{ delay: 0.4 + idx * 0.04, duration: 0.6 }}>
                  <span className="text-[11px] font-bold text-white">{item.score}</span>
                </motion.div>
              </div>
              <div className="w-5 shrink-0 flex justify-center">
                {item.trend === 'up' && <ArrowUp size={14} className="text-emerald-500" />}
                {item.trend === 'down' && <ArrowDown size={14} className="text-red-400" />}
                {item.trend === 'stable' && <span className="w-2 h-0.5 rounded-full bg-gray-400 block" />}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Rank</th><th>ID</th><th>Requirement</th><th>Score</th><th>Type</th><th>Method</th></tr></thead>
            <tbody>
              {PRIORITIES.map((item, idx) => (
                <tr key={item.id}>
                  <td>{getRankIcon(idx + 1)}</td>
                  <td className="font-mono text-xs font-semibold">{item.id}</td>
                  <td className="max-w-xs text-sm">{item.text}</td>
                  <td><span className="text-sm font-bold" style={{ color: getScoreColor(item.score) }}>{item.score}</span></td>
                  <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.type}</td>
                  <td><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>{item.method}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
