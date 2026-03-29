import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, ChevronDown, Tag } from 'lucide-react';

const MOCK_REQUIREMENTS = [
  { id: 'REQ-001', text: 'The system shall authenticate users via OAuth 2.0 protocol', type: 'Functional', priority: 'High', source: 'SRS v2.1', confidence: 0.96 },
  { id: 'REQ-002', text: 'Response time shall not exceed 200ms for 95th percentile of API calls', type: 'Non-Functional', priority: 'Critical', source: 'SRS v2.1', confidence: 0.92 },
  { id: 'REQ-003', text: 'All data at rest shall be encrypted using AES-256 encryption', type: 'Non-Functional', priority: 'Critical', source: 'Security Doc', confidence: 0.98 },
  { id: 'REQ-004', text: 'Users should be able to export reports in PDF and CSV formats', type: 'Functional', priority: 'Medium', source: 'SRS v2.1', confidence: 0.89 },
  { id: 'REQ-005', text: 'The system shall support concurrent access by at least 10,000 users', type: 'Non-Functional', priority: 'High', source: 'SRS v2.1', confidence: 0.94 },
  { id: 'REQ-006', text: 'Dashboard should display real-time analytics of requirement processing', type: 'Functional', priority: 'Medium', source: 'Meeting Notes', confidence: 0.85 },
  { id: 'REQ-007', text: 'The application must comply with GDPR data protection standards', type: 'Non-Functional', priority: 'Critical', source: 'Legal Doc', confidence: 0.97 },
  { id: 'REQ-008', text: 'System administrator shall manage user roles and permissions', type: 'Functional', priority: 'High', source: 'SRS v2.1', confidence: 0.91 },
  { id: 'REQ-009', text: 'The interface should be responsive and work on screens ≥ 1024px', type: 'Non-Functional', priority: 'Medium', source: 'UI Spec', confidence: 0.88 },
  { id: 'REQ-010', text: 'Notifications shall be pushed in real-time via WebSocket connections', type: 'Functional', priority: 'High', source: 'SRS v2.1', confidence: 0.93 },
  { id: 'REQ-011', text: 'The system should integrate requirements traceability matrix', type: 'Functional', priority: 'Medium', source: 'PM Notes', confidence: 0.82 },
  { id: 'REQ-012', text: 'Automated backups should be performed every 6 hours', type: 'Non-Functional', priority: 'High', source: 'Ops Doc', confidence: 0.90 },
  { id: 'REQ-013', text: 'Users might need a way to annotate requirements collaboratively', type: 'Ambiguous', priority: 'Low', source: 'Brainstorm', confidence: 0.61 },
  { id: 'REQ-014', text: 'The system should have good performance under load', type: 'Ambiguous', priority: 'Medium', source: 'Email', confidence: 0.55 },
  { id: 'REQ-015', text: 'Multi-language support shall be available for English, Hindi, and French', type: 'Functional', priority: 'Low', source: 'SRS v2.1', confidence: 0.87 },
];

const priorityColors = {
  Critical: 'bg-red-50 text-red-600 border-red-200',
  High: 'bg-orange-50 text-orange-600 border-orange-200',
  Medium: 'bg-amber-50 text-amber-600 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

const typeColors = {
  Functional: 'bg-blue-50 text-blue-600 border-blue-200',
  'Non-Functional': 'bg-purple-50 text-purple-600 border-purple-200',
  Ambiguous: 'bg-yellow-50 text-yellow-600 border-yellow-200',
};

export default function ExtractedPage() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [filterType, setFilterType] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const filtered = useMemo(() => {
    let list = [...MOCK_REQUIREMENTS];

    if (search) {
      const lower = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.id.toLowerCase().includes(lower) ||
          r.text.toLowerCase().includes(lower) ||
          r.source.toLowerCase().includes(lower)
      );
    }

    if (filterType !== 'All') list = list.filter((r) => r.type === filterType);
    if (filterPriority !== 'All') list = list.filter((r) => r.priority === filterPriority);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'confidence') cmp = a.confidence - b.confidence;
      else cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [search, sortKey, sortDir, filterType, filterPriority]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Extracted Requirements</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} requirements extracted from uploaded documents
        </p>
      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search requirements…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-10"
          />
        </div>

        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-field !pr-8 appearance-none cursor-pointer !w-auto"
          >
            <option value="All">All Types</option>
            <option value="Functional">Functional</option>
            <option value="Non-Functional">Non-Functional</option>
            <option value="Ambiguous">Ambiguous</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>

        <div className="relative">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="input-field !pr-8 appearance-none cursor-pointer !w-auto"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card !p-0 overflow-hidden"
      >
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  { key: 'id', label: 'ID' },
                  { key: 'text', label: 'Requirement' },
                  { key: 'type', label: 'Type' },
                  { key: 'priority', label: 'Priority' },
                  { key: 'source', label: 'Source' },
                  { key: 'confidence', label: 'Confidence' },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="cursor-pointer select-none hover:text-black transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      {col.label}
                      <ArrowUpDown size={12} className={sortKey === col.key ? 'text-black' : 'opacity-30'} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((req, idx) => (
                <motion.tr
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                >
                  <td className="font-mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{req.id}</td>
                  <td className="max-w-xs">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {req.text}
                    </p>
                  </td>
                  <td>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${typeColors[req.type]}`}>
                      <Tag size={11} /> {req.type}
                    </span>
                  </td>
                  <td>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[req.priority]}`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="text-xs" style={{ color: 'var(--text-secondary)' }}>{req.source}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${req.confidence * 100}%`,
                            background: req.confidence > 0.9 ? '#10b981' : req.confidence > 0.7 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        {(req.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
