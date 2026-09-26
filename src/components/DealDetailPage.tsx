import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  BrainCircuit, 
  Users, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  Save, 
  Send,
  MessageSquare,
  Check,
  TrendingUp,
  Briefcase,
  Layers,
  PhoneCall,
  Mail,
  FileCheck2
} from 'lucide-react';
import { Deal, DealStage } from '../types/revops';

interface DealDetailPageProps {
  deal: Deal;
  onBack: () => void;
  onSaveDeal: (updatedDeal: Deal) => void;
}

export const DealDetailPage: React.FC<DealDetailPageProps> = ({
  deal,
  onBack,
  onSaveDeal,
}) => {
  const [currentStage, setCurrentStage] = useState<DealStage>(deal.stage);
  const [repCommit, setRepCommit] = useState<number>(deal.repCommit);
  const [amount, setAmount] = useState<number>(deal.amount);
  const [aiProb, setAiProb] = useState<number>(deal.aiProbability);
  const [dealNotes, setDealNotes] = useState(
    'Procurement review concluded with zero redlines. CIO signature pending executive board approval this Thursday.'
  );
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Confirm economic buyer final budget sign-off', done: true },
    { id: 2, text: 'Validate SOC 2 Type II security documentation delivery', done: true },
    { id: 3, text: 'Schedule signature signing ceremony with CIO before cutoff', done: false },
    { id: 4, text: 'Provision cloud tenant with engineering operations', done: false },
  ]);
  const [hasSaved, setHasSaved] = useState(false);

  const stageOptions: DealStage[] = [
    'Discovery',
    'Technical Pilot',
    'Negotiation',
    'Security Review',
    'Contract Signature',
    'Closed Won',
  ];

  const handleStageChange = (newStage: DealStage) => {
    setCurrentStage(newStage);
    let delta = 0;
    if (newStage === 'Contract Signature') delta = +15;
    else if (newStage === 'Security Review') delta = -5;
    else if (newStage === 'Negotiation') delta = 0;
    else if (newStage === 'Technical Pilot') delta = -10;
    else if (newStage === 'Discovery') delta = -25;
    else if (newStage === 'Closed Won') delta = +50;

    const base = deal.aiProbability;
    setAiProb(Math.min(99, Math.max(10, base + delta)));
  };

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleSave = () => {
    const expected = Math.round(amount * (aiProb / 100));
    const divergence = Math.abs(repCommit - aiProb) >= 25;
    const updated: Deal = {
      ...deal,
      stage: currentStage,
      repCommit,
      repCommitLabel: `${repCommit}% ${repCommit >= 70 ? 'Commit' : 'Upside'}`,
      amount,
      aiProbability: aiProb,
      expectedRevenue: expected,
      divergenceDetected: divergence,
      repGutStrikethrough: divergence,
    };
    onSaveDeal(updated);
    setHasSaved(true);
    setTimeout(() => {
      setHasSaved(false);
    }, 2000);
  };

  // Mock buying committee stakeholders for this account
  const buyingCommittee = [
    {
      name: 'Sarah Chen',
      title: 'Chief Technology Officer',
      role: 'Economic Buyer',
      sentiment: 'Champion (Positive)',
      sentimentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      lastTouch: 'Call 2 days ago (38 mins)',
    },
    {
      name: 'David Miller',
      title: 'VP of Platform Engineering',
      role: 'Technical Champion',
      sentiment: 'High Advocacy',
      sentimentColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      lastTouch: 'Email yesterday',
    },
    {
      name: 'Rachel Adams',
      title: 'Head of InfoSec & Compliance',
      role: 'Security Reviewer',
      sentiment: 'Approved & Cleared',
      sentimentColor: 'text-blue-700 bg-blue-50 border-blue-200',
      lastTouch: 'Security ticket closed Sept 22',
    },
    {
      name: 'Michael Vance',
      title: 'Director of Strategic Procurement',
      role: 'Procurement Gatekeeper',
      sentiment: 'Negotiation Finalized',
      sentimentColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      lastTouch: 'MSA terms accepted Sept 24',
    },
  ];

  // Activity logs
  const activityLogs = [
    {
      type: 'call',
      title: 'Executive Sponsor Alignment Call',
      date: 'Sep 24, 2026 at 2:30 PM',
      desc: 'Discussed final rollout schedule and confirmed executive signing timeline with CIO.',
    },
    {
      type: 'security',
      title: 'Security & BAA Sign-Off Complete',
      date: 'Sep 22, 2026 at 11:15 AM',
      desc: 'InfoSec team approved enterprise audit standards with zero outstanding exceptions.',
    },
    {
      type: 'stage',
      title: 'Stage advanced to Contract Signature',
      date: 'Sep 19, 2026 at 4:45 PM',
      desc: 'Advanced from Security Review to Contract Signature after MSA redline signoff.',
    },
    {
      type: 'ai',
      title: 'AI Win Probability upgraded to 94%',
      date: 'Sep 18, 2026 at 9:00 AM',
      desc: 'Multi-threading signal increased from 4 to 6 stakeholders; procurement clearance detected.',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#e2e8f0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#cbd5e1] hover:border-[#3525cd] rounded-lg text-xs font-semibold text-[#0b1c30] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#3525cd]" />
            <span>Back to Forecast Overview</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#64748b]">
            <span>Forecast Overview</span>
            <span>/</span>
            <span className="font-semibold text-[#0b1c30]">{deal.account}</span>
            <span>/</span>
            <span className="text-[#3525cd] font-medium">{deal.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            {hasSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{hasSaved ? 'Changes Saved to Pipeline!' : 'Save & Sync Changes'}</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Header Banner */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 border ${deal.accountAvatarColor}`}
            >
              {deal.accountAvatarLetter}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3525cd] bg-[#eff2fe] px-2.5 py-0.5 rounded">
                  {deal.crmSource} Opportunity #{deal.id}
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Active in {deal.stage}
                </span>
                {deal.divergenceDetected && (
                  <span className="text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Forecast Divergence Detected</span>
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-[24px] text-[#0b1c30] mt-1.5 leading-tight">
                {deal.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] mt-2">
                <div className="flex items-center gap-1.5 text-[#0b1c30] font-semibold">
                  <Building2 className="w-4 h-4 text-[#64748b]" />
                  <span>{deal.account}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#64748b]" />
                  <span>Owner: <strong className="text-[#0b1c30]">{deal.salesRep}</strong></span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#64748b]" />
                  <span>Target Close: <strong className="text-[#0b1c30]">{deal.closeDate}</strong></span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#64748b]" />
                  <span>Time in Stage: <strong className="text-[#0b1c30]">{deal.daysInStage} days</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Key Numbers Box */}
          <div className="flex items-center gap-4 bg-[#f8f9ff] border border-[#e2e8f0] p-4 rounded-xl shrink-0">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                Total Deal ARR
              </div>
              <div className="text-[26px] font-extrabold font-display text-[#0b1c30] tabular-nums">
                ${amount.toLocaleString()}
              </div>
            </div>

            <div className="w-px h-10 bg-[#e2e8f0]" />

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                AI Expected Value
              </div>
              <div className="text-[26px] font-extrabold font-display text-emerald-700 tabular-nums">
                ${Math.round(amount * (aiProb / 100)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divergence Warning Banner if applicable */}
      {deal.divergenceDetected && (
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-rose-900">
              Significant Forecast Divergence Alert
            </h4>
            <p className="text-xs text-rose-700 mt-0.5 leading-relaxed">
              {deal.divergenceNotes ||
                `The sales rep commit of ${deal.repCommit}% strongly disagrees with the AI algorithmic score of ${deal.aiProbability}%. RevOps recommends immediate pipeline inspection.`}
            </p>
          </div>
        </div>
      )}

      {/* 4 Key Quantitative Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AI Probability */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#64748b]">
              AI Win Probability
            </span>
            <span className="text-[10px] font-bold text-[#3525cd] bg-indigo-50 px-2 py-0.5 rounded">
              {deal.confidenceBand}
            </span>
          </div>
          <div className="text-[32px] font-extrabold font-display text-[#3525cd] mt-1 tabular-nums">
            {aiProb}%
          </div>
          <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full rounded-full ${aiProb >= 75 ? 'bg-emerald-500' : aiProb >= 45 ? 'bg-[#3525cd]' : 'bg-rose-500'}`}
              style={{ width: `${aiProb}%` }}
            />
          </div>
        </div>

        {/* Rep Commit */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#64748b]">
              Rep Gut Commit
            </span>
            <span className="text-[10px] font-semibold text-[#64748b]">
              Assigned AE Input
            </span>
          </div>
          <div className="text-[32px] font-extrabold font-display text-[#0b1c30] mt-1 tabular-nums">
            {repCommit}%
          </div>
          <div className="text-xs text-[#64748b] mt-2">
            {deal.repCommitLabel || 'Sales rep commit'}
          </div>
        </div>

        {/* Deal Health Score */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#64748b]">
              Pipeline Health Score
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Optimal
            </span>
          </div>
          <div className="text-[32px] font-extrabold font-display text-emerald-700 mt-1 tabular-nums">
            {deal.healthScore}/100
          </div>
          <div className="text-xs text-[#64748b] mt-2">
            Higher than 92% of deals in {deal.stage}
          </div>
        </div>

        {/* Forecast Cushion */}
        <div className="bg-white border border-[#e2e8f0] p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-[#64748b]">
              Contribution to Q3
            </span>
            <span className="text-[10px] font-bold text-[#3525cd]">Target Pacing</span>
          </div>
          <div className="text-[32px] font-extrabold font-display text-[#0b1c30] mt-1 tabular-nums">
            {((Math.round(amount * (aiProb / 100)) / 15120000) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-[#64748b] mt-2">
            Of total Q3 AI expected revenue ($15.12M)
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: XAI Attribution, Buying Committee, Activity History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Explainable AI Factor Decomposition */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-[#3525cd]" />
                <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
                  Explainable AI (XAI) Attribution & Telemetry Signals
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#64748b]">
                Shapley Ground-Truth
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {deal.keyDrivers.map((driver) => {
                const isPos = driver.impactPercent > 0;
                return (
                  <div
                    key={driver.id}
                    className="p-3.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isPos
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {driver.prefix}
                      </span>
                      <div>
                        <div className="font-bold text-xs text-[#0b1c30]">{driver.text}</div>
                        <div className="text-[11px] text-[#64748b]">
                          Derived from digital buyer footprints, email activity & CRM stage telemetry
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-mono font-bold text-sm tabular-nums ${
                          isPos ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {isPos ? `+${driver.impactPercent}%` : `${driver.impactPercent}%`}
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-[#64748b] bg-white border border-[#e2e8f0] px-1.5 py-0.5 rounded">
                        {driver.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stakeholders & Buying Committee Multi-Threading */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3525cd]" />
                <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
                  Buying Committee & Executive Multi-Threading
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                6 Active Stakeholders
              </span>
            </div>

            <div className="mt-4 divide-y divide-[#f1f5f9]">
              {buyingCommittee.map((person, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-bold text-[#0b1c30]">{person.name}</div>
                    <div className="text-[#64748b]">{person.title}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#475569] font-medium bg-[#f1f5f9] px-2 py-0.5 rounded text-[11px]">
                      {person.role}
                    </span>
                    <span className={`text-[11px] font-semibold border px-2 py-0.5 rounded ${person.sentimentColor}`}>
                      {person.sentiment}
                    </span>
                    <span className="text-[11px] text-[#94a3b8] hidden md:inline">
                      {person.lastTouch}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log & Telemetry Audit Trail */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#f1f5f9]">
              <FileCheck2 className="w-5 h-5 text-[#3525cd]" />
              <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
                Opportunity Audit Trail & Interaction History
              </h3>
            </div>

            <div className="mt-4 space-y-3.5">
              {activityLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-full bg-[#f8f9ff] border border-[#e2e8f0] flex items-center justify-center text-[#3525cd] shrink-0 mt-0.5">
                    {log.type === 'call' && <PhoneCall className="w-3.5 h-3.5" />}
                    {log.type === 'security' && <ShieldCheck className="w-3.5 h-3.5" />}
                    {log.type === 'stage' && <Layers className="w-3.5 h-3.5" />}
                    {log.type === 'ai' && <BrainCircuit className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0b1c30]">{log.title}</span>
                      <span className="text-[11px] text-[#94a3b8]">{log.date}</span>
                    </div>
                    <p className="text-[#64748b] mt-0.5 leading-relaxed">{log.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: RevOps Next Action Checklist & Overrides */}
        <div className="space-y-6">
          {/* RevOps Recommended Playbook Checklist */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-[#f1f5f9]">
              <CheckCircle2 className="w-5 h-5 text-[#3525cd]" />
              <h3 className="font-display font-bold text-[15px] text-[#0b1c30]">
                RevOps Next Best Actions
              </h3>
            </div>

            <div className="mt-3.5 space-y-2.5">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-start gap-2.5 p-2.5 bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#e2e8f0] rounded-lg cursor-pointer text-xs transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => {}}
                    className="mt-0.5 accent-[#3525cd]"
                  />
                  <span
                    className={
                      item.done
                        ? 'line-through text-[#94a3b8]'
                        : 'font-medium text-[#0b1c30]'
                    }
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Interactive Deal Overrides & Simulation */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
              <h3 className="font-display font-bold text-[15px] text-[#0b1c30]">
                Pipeline Overrides & Tuning
              </h3>
              <span className="text-[10px] text-[#64748b]">Live Model Recalibration</span>
            </div>

            {/* Stage Selector */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                CRM Pipeline Stage
              </label>
              <select
                value={currentStage}
                onChange={(e) => handleStageChange(e.target.value as DealStage)}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0b1c30] font-semibold focus:outline-none focus:border-[#3525cd]"
              >
                {stageOptions.map((stg) => (
                  <option key={stg} value={stg}>
                    {stg}
                  </option>
                ))}
              </select>
            </div>

            {/* Rep Gut Slider */}
            <div>
              <div className="flex justify-between items-center text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                <span>Rep Commit Pacing</span>
                <span className="text-[#3525cd] font-mono text-sm tabular-nums">{repCommit}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={repCommit}
                onChange={(e) => setRepCommit(Number(e.target.value))}
                className="w-full accent-[#3525cd]"
              />
            </div>

            {/* Total Deal ARR Amount */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                Total Deal Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] font-mono">
                  $
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg pl-7 pr-3 py-2 text-xs text-[#0b1c30] font-mono font-bold tabular-nums focus:outline-none focus:border-[#3525cd]"
                />
              </div>
            </div>

            {/* Executive Notes */}
            <div>
              <label className="block text-[11px] font-bold text-[#475569] uppercase tracking-wider mb-1">
                RevOps Audit Notes
              </label>
              <textarea
                rows={3}
                value={dealNotes}
                onChange={(e) => setDealNotes(e.target.value)}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg p-2.5 text-xs text-[#0b1c30] focus:outline-none focus:border-[#3525cd]"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              {hasSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{hasSaved ? 'Updated in Forecast!' : 'Apply Overrides to Forecast'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
