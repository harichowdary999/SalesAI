import React, { useState } from 'react';
import { MoreVertical, AlertTriangle, ArrowUpDown, ChevronLeft, ChevronRight, Eye, RefreshCw, Edit3 } from 'lucide-react';
import { Deal, DealStage } from '../types/revops';

interface DealClosureTableProps {
  deals: Deal[];
  onSelectDeal: (deal: Deal) => void;
  activeTab: 'all' | 'high' | 'risk';
  onSelectTab: (tab: 'all' | 'high' | 'risk') => void;
  searchQuery: string;
  activeStageFilter: DealStage | 'ALL';
}

export const DealClosureTable: React.FC<DealClosureTableProps> = ({
  deals,
  onSelectDeal,
  activeTab,
  onSelectTab,
  searchQuery,
  activeStageFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuDealId, setActiveMenuDealId] = useState<string | null>(null);

  // Filter deals based on activeTab, stage filter, and search
  const filteredDeals = deals.filter((deal) => {
    // Stage filter
    if (activeStageFilter !== 'ALL' && deal.stage !== activeStageFilter) {
      return false;
    }

    // Probability tab filter
    if (activeTab === 'high' && deal.aiProbability < 75) {
      return false;
    }
    if (activeTab === 'risk' && deal.aiProbability >= 45) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = deal.name.toLowerCase().includes(q);
      const matchAccount = deal.account.toLowerCase().includes(q);
      const matchRep = deal.salesRep.toLowerCase().includes(q);
      const matchStage = deal.stage.toLowerCase().includes(q);
      return matchName || matchAccount || matchRep || matchStage;
    }

    return true;
  });

  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(filteredDeals.length / pageSize));
  const paginatedDeals = filteredDeals.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getDriverBadgeClass = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'urgent':
        return 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
      case 'negative':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const getConfidenceTextClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-emerald-700 font-semibold';
      case 'moderate':
        return 'text-indigo-700 font-semibold';
      case 'at-risk':
        return 'text-rose-600 font-bold';
      default:
        return 'text-[#64748b]';
    }
  };

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden mb-6">
      {/* Table Header Section */}
      <div className="p-5 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#eff2fe] text-[#3525cd] font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded">
            Phase 2 · Deal-Level AI
          </span>
          <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
            Deal Closure Probabilities
          </h3>
          <span className="text-[10px] font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded uppercase tracking-wider">
            CRM Deal Level
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 self-start md:self-auto bg-[#f8f9ff] p-1 rounded-lg border border-[#e2e8f0]">
          <button
            onClick={() => {
              onSelectTab('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#0b1c30] shadow-xs'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            All Active Deals (142)
          </button>
          <button
            onClick={() => {
              onSelectTab('high');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'high'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            High Probability (&gt;75%)
          </button>
          <button
            onClick={() => {
              onSelectTab('risk');
              setCurrentPage(1);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'risk'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-[#64748b] hover:text-[#0b1c30]'
            }`}
          >
            At Risk (&lt;45%)
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[12px]">
          <thead>
            <tr className="bg-[#f8f9ff] border-b border-[#e2e8f0] text-[10px] uppercase font-bold text-[#64748b] tracking-wider select-none">
              <th className="py-2.5 px-4">Deal Name & Account</th>
              <th className="py-2.5 px-3">Stage from CRM</th>
              <th className="py-2.5 px-3">Expected Revenue</th>
              <th className="py-2.5 px-3">Rep Gut Commit</th>
              <th className="py-2.5 px-3 min-w-[130px]">AI Closure Probability</th>
              <th className="py-2.5 px-4 min-w-[280px]">Key Drivers (Explainability / XAI)</th>
              <th className="py-2.5 px-3">Confidence Band</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {paginatedDeals.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-[#64748b]">
                  No deals match the selected criteria.
                </td>
              </tr>
            ) : (
              paginatedDeals.map((deal) => {
                const isDivergent = deal.divergenceDetected;
                const probColor =
                  deal.aiProbability >= 75
                    ? 'bg-emerald-500'
                    : deal.aiProbability >= 45
                    ? 'bg-[#3525cd]'
                    : 'bg-rose-500';

                return (
                  <tr
                    key={deal.id}
                    onClick={() => onSelectDeal(deal)}
                    className="hover:bg-[#f8f9ff]/80 cursor-pointer transition-colors group"
                  >
                    {/* Deal & Account */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs shrink-0 border ${deal.accountAvatarColor}`}
                        >
                          {deal.accountAvatarLetter}
                        </div>
                        <div>
                          <div className="font-bold text-[#0b1c30] text-[13px] group-hover:text-[#3525cd] transition-colors leading-tight flex items-center gap-1.5">
                            <span>{deal.name}</span>
                            <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#3525cd] font-normal transition-opacity">
                              → View Full Page
                            </span>
                          </div>
                          <div className="text-[11px] text-[#64748b] leading-tight mt-0.5">
                            {deal.account}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="bg-[#eff4ff] text-[#3525cd] border border-blue-200/60 font-semibold px-2.5 py-1 rounded text-[11px]">
                        {deal.stage}
                      </span>
                    </td>

                    {/* Expected Revenue */}
                    <td className="py-3 px-3 whitespace-nowrap tabular-nums">
                      <div className="font-bold text-[#0b1c30] text-[13px]">
                        ${deal.amount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#64748b]">
                        Exp. ${deal.expectedRevenue.toLocaleString()}
                      </div>
                    </td>

                    {/* Rep Gut Commit */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[12px] font-medium tabular-nums ${
                            deal.repGutStrikethrough
                              ? 'line-through text-rose-500 font-semibold'
                              : 'text-[#475569]'
                          }`}
                        >
                          {deal.repCommitLabel || `${deal.repCommit}% Commit`}
                        </span>
                        {isDivergent && (
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                      </div>
                    </td>

                    {/* AI Probability */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-[#0b1c30] text-[14px] tabular-nums min-w-[34px]">
                          {deal.aiProbability}%
                        </span>
                        <div className="w-20 bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${probColor}`}
                            style={{ width: `${deal.aiProbability}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Key Drivers XAI */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {deal.keyDrivers.map((driver) => (
                          <span
                            key={driver.id}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border tracking-tight ${getDriverBadgeClass(
                              driver.type
                            )}`}
                          >
                            <span className="font-bold">{driver.prefix}</span>
                            <span>{driver.text}</span>
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Confidence Band */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`text-[11px] ${getConfidenceTextClass(deal.confidenceLevel)}`}>
                        {deal.confidenceBand}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3 px-3 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setActiveMenuDealId(activeMenuDealId === deal.id ? null : deal.id)
                        }
                        className="p-1 hover:bg-[#e2e8f0] rounded text-[#64748b] transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuDealId === deal.id && (
                        <div className="absolute right-3 top-10 w-48 bg-white border border-[#cbd5e1] rounded-lg shadow-xl py-1 z-40 text-left">
                          <button
                            onClick={() => {
                              onSelectDeal(deal);
                              setActiveMenuDealId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-[#0b1c30] hover:bg-[#f8f9ff] flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#3525cd]" />
                            <span>View Full Detailed Dossier</span>
                          </button>
                          <button
                            onClick={() => {
                              onSelectDeal(deal);
                              setActiveMenuDealId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-[#0b1c30] hover:bg-[#f8f9ff] flex items-center gap-2"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                            <span>Override Commit</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuDealId(null);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-[#0b1c30] hover:bg-[#f8f9ff] flex items-center gap-2"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                            <span>Re-score with Live CRM</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer */}
      <div className="p-4 bg-white border-t border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] text-[#64748b]">
        <div>
          <span>Showing </span>
          <span className="font-semibold text-[#0b1c30]">{paginatedDeals.length} key divergence deals</span>
          <span> • 138 additional pipeline records synced from CRM</span>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-xs border border-[#cbd5e1] rounded hover:bg-[#f8f9ff] disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#0b1c30]"
          >
            Prev
          </button>
          <span className="text-xs font-semibold text-[#0b1c30] tabular-nums">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-2.5 py-1 text-xs border border-[#cbd5e1] rounded hover:bg-[#f8f9ff] disabled:opacity-40 disabled:cursor-not-allowed font-medium text-[#0b1c30]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
