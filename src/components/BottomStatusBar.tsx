import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BottomStatusBarProps {
  lastSyncText: string;
}

export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({ lastSyncText }) => {
  return (
    <footer className="h-9 bg-white border-t border-[#e2e8f0] px-6 flex items-center justify-between text-[11px] text-[#64748b] select-none shrink-0 sticky bottom-0 z-20">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#3525cd]" />
        <span className="font-medium text-[#334155]">
          Vektor Analytics • Sales Forecasting & Pipeline Analytics
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <span className="text-[#94a3b8]">Connected CRM:</span>
          <span className="font-semibold text-[#0b1c30]">Salesforce & HubSpot</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[#94a3b8]">Last Sync:</span>
          <span className="font-semibold text-emerald-700">{lastSyncText}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[#94a3b8]">Pipeline Freshness:</span>
          <span className="font-semibold text-[#0b1c30] tabular-nums">99.4%</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[#94a3b8]">Ingested Records:</span>
          <span className="font-semibold text-[#0b1c30] tabular-nums">14,280</span>
        </div>
      </div>
    </footer>
  );
};
