import React from 'react';
import { Database, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const CrmHealthView: React.FC<{ lastSync: string; onSync: () => void }> = ({ lastSync, onSync }) => {
  const syncPipelines = [
    {
      source: 'Salesforce Enterprise',
      object: 'Opportunity & ContactRole',
      records: '9,410',
      status: 'Live Active',
      latency: '240ms',
      lastDelta: '3m ago',
    },
    {
      source: 'HubSpot Marketing & CRM',
      object: 'Deals & Engagements',
      records: '4,870',
      status: 'Live Active',
      latency: '180ms',
      lastDelta: '4m ago',
    },
    {
      source: 'Gong & Calendar Telemetry',
      object: 'Executive Call Sentiment',
      records: '1,240 transcripts',
      status: 'Live Streaming',
      latency: '410ms',
      lastDelta: 'Just now',
    },
  ];

  const hygieneAudits = [
    { check: 'Stale Stage Duration (>30 days with no meeting)', severity: 'warning', count: '14 deals' },
    { check: 'Missing Single-Threaded Economic Buyer Role', severity: 'warning', count: '8 deals' },
    { check: 'Close Date Passed Without Resolution', severity: 'clean', count: '0 deals (All Cleared)' },
    { check: 'Contract Value Discrepancy (Quote vs CRM)', severity: 'clean', count: '0 deals' },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] flex items-center justify-center text-white">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-[18px] text-[#0b1c30]">
              CRM Ingestion & Data Hygiene Monitor
            </h2>
            <p className="text-[12px] text-[#64748b]">
              Continuous bidirectional synchronization integrity across enterprise pipeline connectors
            </p>
          </div>
        </div>

        <button
          onClick={onSync}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3525cd] bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 rounded-md transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Force Full Ingestion Resync</span>
        </button>
      </div>

      {/* Sync Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {syncPipelines.map((pipe, i) => (
          <div key={i} className="bg-white border border-[#e2e8f0] rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0b1c30]">{pipe.source}</span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {pipe.status}
              </span>
            </div>
            <div className="text-[11px] text-[#64748b]">Object: {pipe.object}</div>
            <div className="text-xl font-bold font-display text-[#0b1c30] tabular-nums">
              {pipe.records}
            </div>
            <div className="pt-2 border-t border-[#f1f5f9] flex justify-between text-[11px] text-[#94a3b8]">
              <span>Latency: {pipe.latency}</span>
              <span>Updated: {pipe.lastDelta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CRM Hygiene Rule Check */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
        <h3 className="font-display font-bold text-[15px] text-[#0b1c30] mb-3">
          Automated CRM Hygiene & Audit Rules
        </h3>
        <div className="divide-y divide-[#f1f5f9]">
          {hygieneAudits.map((item, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {item.severity === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                <span className="text-[#334155] font-medium">{item.check}</span>
              </div>
              <span
                className={`font-semibold tabular-nums px-2 py-0.5 rounded text-[11px] ${
                  item.severity === 'warning'
                    ? 'bg-amber-50 text-amber-800'
                    : 'bg-emerald-50 text-emerald-800'
                }`}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
