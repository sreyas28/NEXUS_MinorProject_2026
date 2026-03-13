import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Hash, Layers } from 'lucide-react';

const CLUSTERS = [
  {
    id: 1,
    name: 'Authentication & Access Control',
    color: '#6366f1',
    keywords: ['OAuth', 'authentication', 'roles', 'permissions', 'SSO'],
    requirements: [
      { id: 'REQ-001', text: 'Authenticate users via OAuth 2.0' },
      { id: 'REQ-008', text: 'Manage user roles and permissions' },
    ],
  },
  {
    id: 2,
    name: 'Performance & Scalability',
    color: '#f59e0b',
    keywords: ['response time', 'concurrent', 'scalability', 'load'],
    requirements: [
      { id: 'REQ-002', text: 'Response time ≤ 200ms for 95th percentile' },
      { id: 'REQ-005', text: 'Support 10,000 concurrent users' },
      { id: 'REQ-014', text: 'Good performance under load' },
    ],
  },
  {
    id: 3,
    name: 'Security & Compliance',
    color: '#ef4444',
    keywords: ['encryption', 'GDPR', 'compliance', 'data protection'],
    requirements: [
      { id: 'REQ-003', text: 'AES-256 encryption for data at rest' },
      { id: 'REQ-007', text: 'Comply with GDPR standards' },
    ],
  },
  {
    id: 4,
    name: 'Reporting & Export',
    color: '#10b981',
    keywords: ['reports', 'export', 'PDF', 'CSV', 'analytics'],
    requirements: [
      { id: 'REQ-004', text: 'Export reports in PDF and CSV' },
      { id: 'REQ-006', text: 'Display real-time analytics on dashboard' },
    ],
  },
  {
    id: 5,
    name: 'Notifications & Communication',
    color: '#06b6d4',
    keywords: ['notifications', 'WebSocket', 'real-time', 'push'],
    requirements: [
      { id: 'REQ-010', text: 'Push real-time notifications via WebSocket' },
    ],
  },
  {
    id: 6,
    name: 'Infrastructure & Operations',
    color: '#8b5cf6',
    keywords: ['backups', 'responsive', 'UI', 'infrastructure'],
    requirements: [
      { id: 'REQ-009', text: 'Responsive interface ≥ 1024px' },
      { id: 'REQ-012', text: 'Automated backups every 6 hours' },
    ],
  },
  {
    id: 7,
    name: 'Collaboration & Localization',
    color: '#ec4899',
    keywords: ['collaboration', 'multi-language', 'annotations', 'traceability'],
    requirements: [
      { id: 'REQ-011', text: 'Integrate requirements traceability matrix' },
      { id: 'REQ-013', text: 'Collaborative annotations for users' },
      { id: 'REQ-015', text: 'Multi-language support (EN, HI, FR)' },
    ],
  },
];

export default function ClusteringPage() {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
        <div>
          <h1 className="heading-lg">Requirement Clusters</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            {CLUSTERS.length} clusters identified from requirement analysis
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-black text-white' : 'btn-ghost'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-black text-white' : 'btn-ghost'}`}
          >
            <List size={16} />
          </button>
        </div>
      </motion.div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLUSTERS.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card group"
              style={{ borderLeft: `3px solid ${cluster.color}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${cluster.color}15` }}>
                  <Layers size={16} style={{ color: cluster.color }} />
                </div>
                <h3 className="text-sm font-bold flex-1" style={{ color: 'var(--text-primary)' }}>
                  {cluster.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {cluster.keywords.map((kw) => (
                  <span key={kw} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${cluster.color}10`, color: cluster.color }}>
                    {kw}
                  </span>
                ))}
              </div>

              <div className="space-y-2">
                {cluster.requirements.map((req) => (
                  <div key={req.id} className="flex items-start gap-2 p-2 rounded-lg transition-colors" style={{ background: 'var(--bg-secondary)' }}>
                    <span className="font-mono text-[10px] font-bold shrink-0 mt-0.5" style={{ color: 'var(--text-primary)' }}>{req.id}</span>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{req.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-light)' }}>
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {cluster.requirements.length} requirements
                </span>
                <div className="flex items-center gap-1">
                  <Hash size={12} style={{ color: cluster.color }} />
                  <span className="text-xs font-bold" style={{ color: cluster.color }}>C{cluster.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {CLUSTERS.map((cluster, i) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card !p-0 overflow-hidden"
            >
              <div className="px-5 py-3 flex items-center gap-3" style={{ borderLeft: `3px solid ${cluster.color}` }}>
                <Layers size={16} style={{ color: cluster.color }} />
                <h3 className="text-sm font-bold flex-1" style={{ color: 'var(--text-primary)' }}>{cluster.name}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {cluster.keywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: `${cluster.color}10`, color: cluster.color }}>
                      {kw}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${cluster.color}15`, color: cluster.color }}>
                  {cluster.requirements.length}
                </span>
              </div>
              <div className="px-5 py-2 divide-y" style={{ borderColor: 'var(--border-light)' }}>
                {cluster.requirements.map((req) => (
                  <div key={req.id} className="flex items-center gap-3 py-2">
                    <span className="font-mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{req.id}</span>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{req.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
