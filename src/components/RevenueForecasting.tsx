import React from 'react';
import { ForecastScenario, QuarterData, QuarterId } from '../types/revops';

interface RevenueForecastingProps {
  quarters: QuarterData[];
  selectedQuarter: QuarterId;
  onSelectQuarter: (q: QuarterId) => void;
  scenario: ForecastScenario;
}

export const RevenueForecasting: React.FC<RevenueForecastingProps> = ({
  quarters,
  selectedQuarter,
  onSelectQuarter,
  scenario,
}) => {
  // Scenario adjustments: Base AI (1.0) vs. Conservative risk-adjusted floor (0.93)
  const scenarioMultiplier = scenario === 'conservative' ? 0.93 : 1.0;
  
  // Calculate total targets and projected
  const totalTarget = 55.30;
  const baseProjected = 58.17;
  const activeProjected = (baseProjected * scenarioMultiplier).toFixed(2);
  const projectedDelta = ((Number(activeProjected) - totalTarget) / totalTarget * 100).toFixed(1);
  const isPositiveDelta = Number(projectedDelta) >= 0;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 mb-5 shadow-xs">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#f1f5f9]">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="bg-[#eff2fe] text-[#3525cd] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
              Phase 3 · Revenue Outcome
            </span>
            <h2 className="font-display font-bold text-[17px] text-[#0b1c30]">
              Expected Revenue by Quarter
            </h2>
          </div>
          <p className="text-[12px] text-[#64748b] mt-1">
            Objective revenue expectations bridging CRM pipeline data, executive targets, and sales rep instinct
          </p>
        </div>

        {/* Right side FY totals */}
        <div className="flex items-center gap-6 text-right shrink-0">
          <div>
            <div className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase">
              FY25 Target:
            </div>
            <div className="text-[15px] font-bold font-display text-[#0b1c30] tabular-nums">
              ${totalTarget.toFixed(2)}M
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase flex items-center justify-end gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isPositiveDelta ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              <span>AI Projected: ${activeProjected}M</span>
            </div>
            <div className={`text-[13px] font-bold tabular-nums ${isPositiveDelta ? 'text-emerald-600' : 'text-amber-600'}`}>
              ({isPositiveDelta ? `+${projectedDelta}%` : `${projectedDelta}%`})
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quarter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
        {quarters.map((q) => {
          const isSelected = selectedQuarter === q.id || (selectedQuarter === 'ALL-FY25' && q.id === 'Q3-FY25');
          const isQ3Active = q.id === 'Q3-FY25';

          // Scenario-adjusted expected revenue for active/future quarters
          let displayRev = q.actualOrExpectedRevenue / 1000000;
          if (q.id === 'Q3-FY25' || q.id === 'Q4-FY25') {
            displayRev = displayRev * scenarioMultiplier;
          }

          const targetDeltaM = displayRev - (q.executiveTarget / 1000000);
          const isAboveTarget = targetDeltaM >= 0;

          return (
            <div
              key={q.id}
              onClick={() => onSelectQuarter(q.id)}
              className={`rounded-lg p-4 cursor-pointer transition-all border relative flex flex-col justify-between ${
                isQ3Active
                  ? 'border-2 border-[#3525cd] bg-white ring-2 ring-[#3525cd]/10 shadow-sm'
                  : isSelected
                  ? 'border-[#3525cd] bg-[#f8f9ff]'
                  : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1]'
              }`}
            >
              <div>
                {/* Card header */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-[14px] text-[#0b1c30]">
                      {q.label}
                    </span>
                    {isQ3Active && (
                      <span className="bg-[#0b1c30] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                        CURRENT ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {!isQ3Active && (
                      <span className="text-[10px] text-[#64748b] font-medium hidden xl:inline">
                        {q.status}
                      </span>
                    )}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded tabular-nums ${
                      q.achievementRate >= 100
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {q.id === 'Q3-FY25' && scenario !== 'base' 
                        ? `${(q.achievementRate * scenarioMultiplier).toFixed(1)}% Pace`
                        : q.paceLabel || `${q.achievementRate.toFixed(1)}%`}
                    </span>
                  </div>
                </div>

                {/* Subtitle label */}
                <div className="text-[10px] font-bold text-[#64748b] tracking-wider uppercase">
                  {q.id === 'Q3-FY25' || q.id === 'Q4-FY25' ? 'AI EXPECTED REVENUE' : 'EXPECTED / ACTUAL REVENUE'}
                </div>

                {/* Primary Metric */}
                <div className="text-[26px] font-extrabold font-display text-[#0b1c30] mt-1 tabular-nums">
                  ${displayRev.toFixed(2)}M
                </div>

                {/* Cushion / Target surplus line */}
                <div className="text-[11px] font-semibold mt-0.5">
                  {q.id === 'Q3-FY25' ? (
                    <span className="text-[#3525cd]">
                      {isAboveTarget ? `+$${(targetDeltaM * 1000).toFixed(0)}K target cushion` : `-$${Math.abs(targetDeltaM * 1000).toFixed(0)}K under target`}
                    </span>
                  ) : isAboveTarget ? (
                    <span className="text-emerald-600">
                      +${(targetDeltaM * 1000).toFixed(0)}K above target
                    </span>
                  ) : (
                    <span className="text-rose-600">
                      -${Math.abs(targetDeltaM * 1000).toFixed(0)}K below target
                    </span>
                  )}
                </div>

                {/* Target Comparison rows */}
                <div className="mt-4 pt-3 border-t border-[#f1f5f9] space-y-1.5 text-[11px]">
                  <div className="flex justify-between items-center text-[#64748b]">
                    <span>Executive Target</span>
                    <span className="font-semibold text-[#0b1c30] tabular-nums">
                      ${(q.executiveTarget / 1000000).toFixed(2)}M
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#64748b]">
                    <span>Rep Gut Commit</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-[#0b1c30] tabular-nums">
                        ${(q.repGutCommit / 1000000).toFixed(2)}M
                      </span>
                      {q.repCommitGap && (
                        <span className="text-[10px] font-bold text-rose-600">
                          (-$1.52M gap)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar at bottom */}
              <div className="mt-3.5">
                {isQ3Active ? (
                  <div>
                    <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden flex">
                      <div className="bg-[#3525cd] h-full" style={{ width: '62%' }} />
                      <div className="bg-[#818cf8] h-full" style={{ width: '38%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b] mt-1 tabular-nums">
                      <span>Closed: $9.40M (62%)</span>
                      <span>Pipeline: $5.72M</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        q.id === 'Q4-FY25' ? 'bg-[#3525cd]' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(q.achievementRate, 100)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
