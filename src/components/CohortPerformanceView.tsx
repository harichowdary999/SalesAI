import React from 'react';
import { Users, Award, TrendingUp, AlertCircle } from 'lucide-react';

export const CohortPerformanceView: React.FC = () => {
  const reps = [
    {
      name: 'Marcus Vance',
      deals: 34,
      pipeline: '$14.2M',
      quota: '$12.0M',
      attainment: 118.3,
      aiDivergence: 'Low (±4%)',
      status: 'Target Exceeded',
    },
    {
      name: 'Elena Rostova',
      deals: 28,
      pipeline: '$11.8M',
      quota: '$10.5M',
      attainment: 112.4,
      aiDivergence: 'Moderate (±11%)',
      status: 'Target Exceeded',
    },
    {
      name: 'Devon Patel',
      deals: 26,
      pipeline: '$8.4M',
      quota: '$9.0M',
      attainment: 93.3,
      aiDivergence: 'Low (±5%)',
      status: 'On Track',
    },
    {
      name: 'Greg Sterling',
      deals: 19,
      pipeline: '$5.2M',
      quota: '$7.5M',
      attainment: 69.3,
      aiDivergence: 'High (±32%) - Over-Optimistic',
      status: 'At Risk',
    },
    {
      name: 'Sarah Lin',
      deals: 35,
      pipeline: '$3.0M',
      quota: '$3.5M',
      attainment: 85.7,
      aiDivergence: 'Low (±6%)',
      status: 'Pacing OK',
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] flex items-center justify-center text-white">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-[18px] text-[#0b1c30]">
              Cohort & Account Executive Performance
            </h2>
            <p className="text-[12px] text-[#64748b]">
              Rep quota attainment pacing benchmarked against historical AI ground-truth conversion
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#f8f9ff] border-b border-[#e2e8f0] text-[10px] uppercase font-bold text-[#64748b] tracking-wider">
              <th className="py-3 px-4">Sales Representative</th>
              <th className="py-3 px-4">Active Pipeline</th>
              <th className="py-3 px-4">Q3 Quota Target</th>
              <th className="py-3 px-4">Attainment %</th>
              <th className="py-3 px-4">AI Ground-Truth Calibration</th>
              <th className="py-3 px-4">Pacing Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {reps.map((rep, idx) => (
              <tr key={idx} className="hover:bg-[#f8f9ff]">
                <td className="py-3 px-4 font-bold text-[#0b1c30]">{rep.name}</td>
                <td className="py-3 px-4 tabular-nums font-semibold">{rep.pipeline}</td>
                <td className="py-3 px-4 tabular-nums text-[#64748b]">{rep.quota}</td>
                <td className="py-3 px-4 tabular-nums">
                  <span
                    className={`font-bold ${
                      rep.attainment >= 100
                        ? 'text-emerald-600'
                        : rep.attainment >= 80
                        ? 'text-[#3525cd]'
                        : 'text-rose-600'
                    }`}
                  >
                    {rep.attainment}%
                  </span>
                </td>
                <td className="py-3 px-4 text-[#475569]">{rep.aiDivergence}</td>
                <td className="py-3 px-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rep.attainment >= 100
                        ? 'bg-emerald-50 text-emerald-800'
                        : rep.attainment >= 80
                        ? 'bg-blue-50 text-blue-800'
                        : 'bg-rose-50 text-rose-800'
                    }`}
                  >
                    {rep.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
