import React from 'react';
import { 
  CheckSquare, 
  Database, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface KpiRowProps {
  lastSyncTime: string;
  hygieneScore?: number;
  recordsCount?: number;
}

export const KpiRow: React.FC<KpiRowProps> = ({
  lastSyncTime,
  hygieneScore = 97.8,
  recordsCount = 14280,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      {/* 1. CRM Ingestion Status */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start justify-between hover:border-[#cbd5e1] transition-colors">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase">
            CRM Ingestion Status
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3525cd]" />
            </span>
            <span className="text-[16px] font-bold text-[#0b1c30]">
              Live Connected
            </span>
          </div>
          <div className="text-[11px] text-[#64748b] mt-1">
            Salesforce Enterprise & HubSpot
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd] shrink-0">
          <CheckSquare className="w-4 h-4" />
        </div>
      </div>

      {/* 2. Raw Records Ingested */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start justify-between hover:border-[#cbd5e1] transition-colors">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase">
            Raw Records Ingested
          </div>
          <div className="text-[22px] font-bold font-display text-[#0b1c30] mt-1.5 tabular-nums">
            {recordsCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
            <span>+480 synced today</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd] shrink-0">
          <Database className="w-4 h-4" />
        </div>
      </div>

      {/* 3. Pipeline Data Freshness */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start justify-between hover:border-[#cbd5e1] transition-colors">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase">
            Pipeline Data Freshness
          </div>
          <div className="text-[22px] font-bold font-display text-[#0b1c30] mt-1.5">
            {lastSyncTime}
          </div>
          <div className="text-[11px] text-[#64748b] mt-0.5">
            Auto-refresh every 15 mins
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd] shrink-0">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* 4. CRM Hygiene Score */}
      <div className="bg-white border border-[#e2e8f0] rounded-lg p-4 flex items-start justify-between hover:border-[#cbd5e1] transition-colors">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-[#64748b] uppercase">
            CRM Hygiene Score
          </div>
          <div className="text-[22px] font-bold font-display text-[#0b1c30] mt-1.5 flex items-baseline gap-1.5">
            <span className="tabular-nums">{hygieneScore}%</span>
            <span className="text-[13px] font-semibold text-emerald-600">High</span>
          </div>
          <div className="text-[11px] text-[#64748b] mt-0.5">
            Replacing manual spreadsheets
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd] shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
