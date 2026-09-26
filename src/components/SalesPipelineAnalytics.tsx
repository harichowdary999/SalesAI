import React from 'react';
import { DealStage, PipelineStageStat } from '../types/revops';
import { ChevronRight } from 'lucide-react';

interface SalesPipelineAnalyticsProps {
  stages: PipelineStageStat[];
  activeStageFilter: DealStage | 'ALL';
  onSelectStageFilter: (stage: DealStage | 'ALL') => void;
}

export const SalesPipelineAnalytics: React.FC<SalesPipelineAnalyticsProps> = ({
  stages,
  activeStageFilter,
  onSelectStageFilter,
}) => {
  const totalPipeline = stages.reduce((acc, s) => acc + s.totalPipelineValue, 0) / 1000000;
  const totalDeals = stages.reduce((acc, s) => acc + s.dealCount, 0);

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 mb-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#eff2fe] text-[#3525cd] font-bold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded">
              Phase 1 · Pipeline Progression
            </span>
          </div>
          <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
            Sales Pipeline Analytics
          </h3>
          <p className="text-[12px] text-[#64748b]">
            Conversion progression, stage health, and total expected value per CRM stage
          </p>
        </div>

        <div className="text-right">
          <div className="text-[13px] font-bold text-[#0b1c30]">
            Total Open Pipeline:{' '}
            <span className="text-[#3525cd] font-display tabular-nums">
              ${totalPipeline.toFixed(2)}M
            </span>{' '}
            <span className="text-[#64748b] font-normal">({totalDeals} deals)</span>
          </div>
          {activeStageFilter !== 'ALL' && (
            <button
              onClick={() => onSelectStageFilter('ALL')}
              className="text-[11px] text-[#3525cd] hover:underline font-medium"
            >
              Clear filter (showing {activeStageFilter})
            </button>
          )}
        </div>
      </div>

      {/* 5 Funnel Stages */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 mt-3.5">
        {stages.map((stage, idx) => {
          const isFilterActive = activeStageFilter === stage.id;
          return (
            <div
              key={stage.id}
              onClick={() =>
                onSelectStageFilter(isFilterActive ? 'ALL' : stage.id)
              }
              className={`border rounded-lg p-3 cursor-pointer transition-all relative group ${
                isFilterActive
                  ? 'border-2 border-[#3525cd] bg-[#eff4ff] shadow-xs'
                  : 'border-[#e2e8f0] bg-[#f8f9ff] hover:bg-white hover:border-[#cbd5e1]'
              }`}
            >
              {/* Stage Title and deal count */}
              <div className="flex items-center justify-between gap-1 text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                <span className="truncate">{stage.name}</span>
                <span className="text-[10px] text-[#64748b] bg-white border border-[#e2e8f0] px-1.5 py-0.2 rounded shrink-0">
                  {stage.dealCount} Deals
                </span>
              </div>

              {/* Total pipeline in stage */}
              <div className="text-[20px] font-extrabold font-display text-[#0b1c30] tabular-nums">
                ${(stage.totalPipelineValue / 1000000).toFixed(2)}M
              </div>

              {/* Stage Conv. Rate & Expected Value */}
              <div className="mt-3 pt-2 border-t border-[#e2e8f0] text-[11px] space-y-1">
                <div className="flex justify-between items-center text-[#64748b]">
                  <span>Stage Conv. Rate</span>
                  <span className="font-semibold text-[#0b1c30] tabular-nums">
                    {stage.conversionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#64748b]">
                  <span>Expected Value</span>
                  <span className="font-bold text-[#3525cd] tabular-nums">
                    ${(stage.expectedValue / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>

              {/* Mini progression bar */}
              <div className="w-full bg-[#e2e8f0] h-1 rounded-full overflow-hidden mt-2.5">
                <div
                  className="bg-[#3525cd] h-full rounded-full"
                  style={{ width: `${stage.conversionRate}%` }}
                />
              </div>

              {idx < stages.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-[#e2e8f0] items-center justify-center text-[#94a3b8]">
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
