import React, { useState } from 'react';
import { Building2, Search, ExternalLink, ArrowRight, ShieldCheck, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Deal } from '../types/revops';

interface CustomersViewProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ deals, onSelectDeal }) => {
  const [search, setSearch] = useState('');

  const customers = [
    {
      id: 'cust-1',
      name: 'Acrobyte Technologies',
      industry: 'Enterprise Cloud Infrastructure',
      tier: 'Strategic Enterprise',
      totalContractValue: '$1,250,000',
      activeDealsCount: 1,
      primaryContact: 'Sarah Chen (CTO)',
      contactEmail: 's.chen@acrobyte.io',
      healthScore: 96,
      status: 'Contract Signature',
      associatedDeal: deals.find((d) => d.account.includes('Acrobyte')) || deals[0],
    },
    {
      id: 'cust-2',
      name: 'Apex Global Logistics',
      industry: 'Supply Chain & Telematics',
      tier: 'Enterprise Tier-1',
      totalContractValue: '$850,000',
      activeDealsCount: 1,
      primaryContact: 'Devon Miller (VP Platform)',
      contactEmail: 'dmiller@apexlogistics.com',
      healthScore: 88,
      status: 'Technical Pilot',
      associatedDeal: deals.find((d) => d.account.includes('Apex')) || deals[1],
    },
    {
      id: 'cust-3',
      name: 'OmniPay Global',
      industry: 'Financial Technology / Payments',
      tier: 'Corporate Enterprise',
      totalContractValue: '$620,000',
      activeDealsCount: 1,
      primaryContact: 'Elena Rostova (FinOps Lead)',
      contactEmail: 'erostova@omnipay.net',
      healthScore: 72,
      status: 'Negotiation',
      associatedDeal: deals.find((d) => d.account.includes('OmniPay')) || deals[2],
    },
    {
      id: 'cust-4',
      name: 'CloudScale Inc',
      industry: 'AI & Data Infrastructure',
      tier: 'Strategic Mid-Market',
      totalContractValue: '$480,000',
      activeDealsCount: 1,
      primaryContact: 'Marcus Vance (AE Assigned)',
      contactEmail: 'contact@cloudscale.ai',
      healthScore: 54,
      status: 'Security Review',
      associatedDeal: deals.find((d) => d.account.includes('CloudScale')) || deals[3],
    },
    {
      id: 'cust-5',
      name: 'Vanguard Biopharma',
      industry: 'Life Sciences & Healthcare',
      tier: 'Enterprise Tier-1',
      totalContractValue: '$920,000',
      activeDealsCount: 2,
      primaryContact: 'Dr. Aris Thorne (CIO)',
      contactEmail: 'athorne@vanguardbio.org',
      healthScore: 91,
      status: 'Closed Won / Active',
      associatedDeal: deals[0],
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.primaryContact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-[18px] text-[#0b1c30]">
              Customer Accounts & Buying Organizations
            </h2>
            <p className="text-[12px] text-[#64748b]">
              Enterprise accounts, buying committee stakeholder health, and associated active deals
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search accounts, industry, contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#f8f9ff] border border-[#cbd5e1] rounded-lg focus:outline-none focus:border-[#2563eb]"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f8f9ff] border-b border-[#e2e8f0] text-[10px] uppercase font-bold text-[#64748b] tracking-wider">
              <th className="py-3 px-4">Account Name</th>
              <th className="py-3 px-4">Industry & Tier</th>
              <th className="py-3 px-4">Contract ARR</th>
              <th className="py-3 px-4">Primary Contact</th>
              <th className="py-3 px-4">Account Health</th>
              <th className="py-3 px-4">Active Pipeline Stage</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {filtered.map((cust) => (
              <tr
                key={cust.id}
                onClick={() => onSelectDeal(cust.associatedDeal)}
                className="hover:bg-[#f8f9ff] cursor-pointer group transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="font-bold text-[#0b1c30] text-[13px] group-hover:text-[#2563eb] transition-colors flex items-center gap-1.5">
                    <span>{cust.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-[#64748b]">{cust.associatedDeal.name}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#334155]">{cust.industry}</div>
                  <div className="text-[10px] text-[#64748b]">{cust.tier}</div>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-[#0b1c30] text-[13px] tabular-nums">
                  {cust.totalContractValue}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-[#334155]">{cust.primaryContact}</div>
                  <div className="text-[10px] text-[#64748b]">{cust.contactEmail}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold tabular-nums text-[#0b1c30]">{cust.healthScore}/100</span>
                    <div className="w-16 bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cust.healthScore >= 80
                            ? 'bg-emerald-500'
                            : cust.healthScore >= 60
                            ? 'bg-blue-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${cust.healthScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="bg-[#eff4ff] text-[#2563eb] border border-blue-200 font-semibold px-2.5 py-0.5 rounded text-[11px]">
                    {cust.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDeal(cust.associatedDeal);
                    }}
                    className="text-xs font-semibold text-[#2563eb] hover:underline"
                  >
                    View Dossier →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
