import { motion } from 'framer-motion';
import { FileText, BarChart3, Network, AlertTriangle, Download, CheckCircle2, FileJson, FileSpreadsheet, Printer, Activity } from 'lucide-react';

const insights = [
  { label: 'Total Requirements', value: '15', icon: FileText, color: '#6366f1', change: '+3 new' },
  { label: 'Avg Priority Score', value: '72.1', icon: BarChart3, color: '#f59e0b', change: '+4.2 pts' },
  { label: 'Clusters Identified', value: '7', icon: Network, color: '#10b981', change: '2 merged' },
  { label: 'Ambiguity Rate', value: '13%', icon: AlertTriangle, color: '#ef4444', change: '-5% improved' },
];

const timeline = [
  { time: '2 min ago', text: 'Prioritization analysis completed', icon: CheckCircle2, color: '#10b981' },
  { time: '5 min ago', text: 'Clustering identified 7 groups', icon: Network, color: '#6366f1' },
  { time: '8 min ago', text: 'Classification finished — 2 ambiguous', icon: AlertTriangle, color: '#f59e0b' },
  { time: '10 min ago', text: '15 requirements extracted', icon: FileText, color: '#3b82f6' },
  { time: '12 min ago', text: 'Document uploaded: SRS_v2.1.pdf', icon: Activity, color: '#8b5cf6' },
];

const breakdownData = [
  { label: 'Functional', count: 8, pct: 53, color: '#3b82f6' },
  { label: 'Non-Functional', count: 5, pct: 33, color: '#8b5cf6' },
  { label: 'Ambiguous', count: 2, pct: 14, color: '#f59e0b' },
];

const exportFormats = [
  { label: 'PDF Report', icon: Printer, desc: 'Formatted document with charts' },
  { label: 'CSV Spreadsheet', icon: FileSpreadsheet, desc: 'Raw data for analysis' },
  { label: 'JSON Export', icon: FileJson, desc: 'Structured data for APIs' },
];

export default function SummaryPage() {
  const handleExport = (format) => alert(`Export as ${format} — backend integration placeholder`);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="heading-lg">Summary Report</h1>
        <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Complete overview of your requirements analysis</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-4">
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}12` }}>
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${item.color}10`, color: item.color }}>{item.change}</span>
              </div>
              <p className="text-2xl font-bold mt-2">{item.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
          <h3 className="text-sm font-semibold mb-4">Type Breakdown</h3>
          <div className="space-y-3">
            {breakdownData.map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.count} ({item.pct}%)</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: item.color }} initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-3 rounded-full overflow-hidden flex">
            {breakdownData.map((item) => (
              <motion.div key={item.label} className="h-full" style={{ background: item.color }} initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ delay: 0.8, duration: 0.6 }} />
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}12` }}>
                    <Icon size={14} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed">{item.text}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
          <h3 className="text-sm font-semibold mb-4">Export Report</h3>
          <div className="space-y-3">
            {exportFormats.map((fmt) => {
              const Icon = fmt.icon;
              return (
                <button key={fmt.label} onClick={() => handleExport(fmt.label)} className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50" style={{ background: 'var(--bg-secondary)' }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                    <Icon size={18} style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold">{fmt.label}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{fmt.desc}</p>
                  </div>
                  <Download size={14} style={{ color: 'var(--text-muted)' }} />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
