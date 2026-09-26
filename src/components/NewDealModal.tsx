import React, { useState } from 'react';
import { X, Sparkles, PlusCircle } from 'lucide-react';
import { Deal, DealStage } from '../types/revops';

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeal: (deal: Deal) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({
  isOpen,
  onClose,
  onAddDeal,
}) => {
  const [dealName, setDealName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [stage, setStage] = useState<DealStage>('Technical Pilot');
  const [amount, setAmount] = useState<number>(450000);
  const [repCommit, setRepCommit] = useState<number>(70);
  const [salesRep, setSalesRep] = useState('Marcus Vance');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName.trim() || !accountName.trim()) return;

    // Simulate AI model calculating probability based on stage and rep
    let baseProb = 50;
    if (stage === 'Contract Signature') baseProb = 92;
    else if (stage === 'Security Review') baseProb = 76;
    else if (stage === 'Negotiation') baseProb = 64;
    else if (stage === 'Technical Pilot') baseProb = 55;
    else if (stage === 'Discovery') baseProb = 35;

    const firstLetter = accountName.trim()[0].toUpperCase();
    const expected = Math.round(amount * (baseProb / 100));

    const newDeal: Deal = {
      id: `deal-${Date.now().toString().slice(-4)}`,
      name: dealName,
      account: accountName,
      accountAvatarLetter: firstLetter,
      accountAvatarColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      stage,
      amount,
      expectedRevenue: expected,
      repCommit,
      repCommitLabel: `${repCommit}% Commit`,
      aiProbability: baseProb,
      confidenceBand: baseProb > 75 ? 'High Confidence' : 'Moderate',
      confidenceLevel: baseProb > 75 ? 'high' : 'moderate',
      salesRep,
      closeDate: 'Nov 30, 2026',
      daysInStage: 3,
      healthScore: 85,
      crmSource: 'Salesforce',
      keyDrivers: [
        {
          id: `kd-${Date.now()}-1`,
          type: 'positive',
          prefix: '+',
          text: 'Executive sponsorship verified',
          category: 'engagement',
          impactPercent: 12,
        },
        {
          id: `kd-${Date.now()}-2`,
          type: 'positive',
          prefix: '✓',
          text: 'Budget approved for current fiscal',
          category: 'procurement',
          impactPercent: 10,
        },
      ],
      recommendedAction: 'Coordinate technical review deep dive with engineering architect.',
    };

    onAddDeal(newDeal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-[#e2e8f0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
                Simulate New Pipeline Opportunity
              </h3>
              <p className="text-[11px] text-[#64748b]">
                Add opportunity to model real-time revenue forecast impacts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#e2e8f0] rounded text-[#64748b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#475569] mb-1">
              Deal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Global Enterprise License"
              value={dealName}
              onChange={(e) => setDealName(e.target.value)}
              className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#0b1c30] focus:outline-none focus:border-[#3525cd]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                Account Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Corp"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#0b1c30] focus:outline-none focus:border-[#3525cd]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                Account Executive
              </label>
              <select
                value={salesRep}
                onChange={(e) => setSalesRep(e.target.value)}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#0b1c30] focus:outline-none focus:border-[#3525cd]"
              >
                <option value="Marcus Vance">Marcus Vance</option>
                <option value="Elena Rostova">Elena Rostova</option>
                <option value="Devon Patel">Devon Patel</option>
                <option value="Greg Sterling">Greg Sterling</option>
                <option value="Sarah Lin">Sarah Lin</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                Pipeline Stage
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as DealStage)}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#0b1c30] focus:outline-none focus:border-[#3525cd]"
              >
                <option value="Discovery">Discovery</option>
                <option value="Technical Pilot">Technical Pilot</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Security Review">Security Review</option>
                <option value="Contract Signature">Contract Signature</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                Deal Amount ($)
              </label>
              <input
                type="number"
                min="10000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-[#f8f9ff] border border-[#cbd5e1] rounded-md px-3 py-2 text-xs text-[#0b1c30] font-mono tabular-nums focus:outline-none focus:border-[#3525cd]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-[#475569] mb-1">
              <span>Rep Gut Commit</span>
              <span className="font-bold text-[#3525cd] tabular-nums">{repCommit}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={repCommit}
              onChange={(e) => setRepCommit(Number(e.target.value))}
              className="w-full accent-[#3525cd]"
            />
          </div>

          <div className="p-4 border-t border-[#e2e8f0] bg-[#f8f9ff] flex items-center justify-end gap-3 -mx-5 -mb-5 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#cbd5e1] text-xs font-semibold text-[#475569] hover:bg-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold rounded-md shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Simulate & Score</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
