import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Search, 
  Download, 
  SlidersHorizontal, 
  Check, 
  User, 
  ShieldCheck, 
  Settings,
  Sparkles
} from 'lucide-react';
import { ForecastScenario, QuarterId } from '../types/revops';

interface TopHeaderProps {
  selectedQuarter: QuarterId;
  onSelectQuarter: (q: QuarterId) => void;
  scenario: ForecastScenario;
  onSelectScenario: (s: ForecastScenario) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenExportModal: () => void;
  onOpenNewDealModal: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  selectedQuarter,
  onSelectQuarter,
  scenario,
  onSelectScenario,
  searchQuery,
  onSearchChange,
  onOpenExportModal,
  onOpenNewDealModal,
}) => {
  const [quarterMenuOpen, setQuarterMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const quarterRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quarterRef.current && !quarterRef.current.contains(e.target as Node)) {
        setQuarterMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const quarters: { id: QuarterId; label: string; tag?: string }[] = [
    { id: 'Q1-FY25', label: 'Q1 FY25', tag: 'Closed Actuals' },
    { id: 'Q2-FY25', label: 'Q2 FY25', tag: 'Closed Actuals' },
    { id: 'Q3-FY25', label: 'Q3 FY25 (Current)', tag: 'Active' },
    { id: 'Q4-FY25', label: 'Q4 FY25', tag: 'Projected' },
    { id: 'ALL-FY25', label: 'Full FY25 Target', tag: 'Annual' },
  ];

  const currentQuarterLabel = quarters.find((q) => q.id === selectedQuarter)?.label || 'Q3 FY25 (Current)';

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-6 flex items-center justify-between gap-4 sticky top-0 z-30 select-none">
      {/* Left side: Quarter Selector & AI Scenario Mode */}
      <div className="flex items-center gap-3">
        {/* Quarter dropdown */}
        <div className="relative" ref={quarterRef}>
          <button
            onClick={() => setQuarterMenuOpen(!quarterMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#f8f9ff] border border-[#cbd5e1] hover:border-[#2563eb] rounded-md text-[13px] font-semibold text-[#0b1c30] transition-colors"
          >
            <span className="text-[#475569] text-xs">📅</span>
            <span>{currentQuarterLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
          </button>

          {quarterMenuOpen && (
            <div className="absolute left-0 mt-1.5 w-56 bg-white border border-[#cbd5e1] rounded-lg shadow-lg py-1.5 z-40 text-left">
              <div className="px-3 py-1 text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Select Fiscal Horizon
              </div>
              {quarters.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    onSelectQuarter(q.id);
                    setQuarterMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-[12px] flex items-center justify-between hover:bg-[#f8f9ff] transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    {selectedQuarter === q.id ? (
                      <Check className="w-3.5 h-3.5 text-[#2563eb]" />
                    ) : (
                      <div className="w-3.5" />
                    )}
                    <span className={selectedQuarter === q.id ? 'font-semibold text-[#2563eb]' : 'text-[#334155]'}>
                      {q.label}
                    </span>
                  </div>
                  {q.tag && (
                    <span className="text-[10px] font-medium text-[#64748b] bg-[#f1f5f9] px-1.5 py-0.5 rounded">
                      {q.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AI Model Scenario Switcher (Base AI vs Conservative) */}
        <div className="flex items-center bg-[#f1f5f9] p-0.5 rounded-lg border border-[#e2e8f0]">
          <button
            onClick={() => onSelectScenario('base')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
              scenario === 'base'
                ? 'bg-white text-[#2563eb] shadow-xs'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            <span>Base</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#2563eb] bg-blue-50 px-1 rounded">AI</span>
          </button>

          <button
            onClick={() => onSelectScenario('conservative')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              scenario === 'conservative'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            Conservative
          </button>
        </div>
      </div>

      {/* Middle: Universal Search */}
      <div className="flex-1 max-w-md relative">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search accounts, deals & reps..."
            className="w-full bg-[#f8f9ff] hover:bg-white focus:bg-white border border-[#cbd5e1] focus:border-[#2563eb] pl-9 pr-8 py-1.5 text-xs text-[#0b1c30] placeholder-[#94a3b8] rounded-md transition-all focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#94a3b8] hover:text-[#475569]"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#94a3b8] border border-[#e2e8f0] bg-white px-1 rounded font-mono">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Right side: Quick Add, Export Report, User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenNewDealModal}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2563eb] bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>+ Sim Deal</span>
        </button>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#cbd5e1] hover:border-[#2563eb] text-xs font-semibold text-[#0b1c30] rounded-md transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#64748b]" />
          <span>Export Report</span>
        </button>

        {/* User profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-[#f8f9ff] rounded-md transition-colors"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2563eb] to-[#3b82f6] text-white font-semibold text-xs flex items-center justify-center border border-white shadow-xs">
                SJ
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[12px] font-bold text-[#0b1c30] leading-tight">
                Sarah Jenkins
              </div>
              <div className="text-[10px] text-[#64748b] leading-tight">
                VP RevOps
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b]" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-white border border-[#cbd5e1] rounded-lg shadow-xl py-2 z-40 text-left">
              <div className="px-4 py-2 border-b border-[#f1f5f9]">
                <div className="text-xs font-bold text-[#0b1c30]">Sarah Jenkins</div>
                <div className="text-[11px] text-[#64748b]">s.jenkins@vektorrevops.io</div>
                <div className="text-[10px] text-[#2563eb] font-semibold mt-0.5">
                  Enterprise Admin Access
                </div>
              </div>

              <div className="py-1">
                <div className="px-4 py-1.5 text-xs text-[#475569] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Model Confidence: 99.4%</span>
                </div>
              </div>

              <div className="border-t border-[#f1f5f9] pt-1 px-4 py-1.5">
                <div className="text-[11px] text-[#64748b]">
                  Assigned Pipeline: <span className="font-semibold text-[#0b1c30]">$42.60M</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
