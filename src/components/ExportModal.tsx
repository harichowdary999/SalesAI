import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, Check, Copy } from 'lucide-react';
import { Deal, ForecastScenario, QuarterData } from '../types/revops';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  quarters: QuarterData[];
  scenario: ForecastScenario;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  deals,
  quarters,
  scenario,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const downloadCSV = () => {
    const headers = [
      'Deal ID',
      'Deal Name',
      'Account',
      'Stage',
      'Total Amount ($)',
      'AI Probability (%)',
      'Expected Revenue ($)',
      'Rep Commit (%)',
      'Owner',
      'Close Date',
    ];

    const rows = deals.map((d) => [
      d.id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.account.replace(/"/g, '""')}"`,
      d.stage,
      d.amount,
      d.aiProbability,
      d.expectedRevenue,
      d.repCommit,
      d.salesRep,
      d.closeDate,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Vektor_Revenue_Forecast_${scenario.toUpperCase()}_Q3FY25.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySummary = () => {
    const summary = `VEKTOR ANALYTICS - REVOPS FORECAST EXPORT
Quarter: Q3 FY25
Model Scenario: ${scenario.toUpperCase()}
FY25 Target: $55.30M
Projected Revenue: $58.17M (+5.2% surplus)
Active Open Pipeline: $42.60M across 142 deals
CRM Hygiene Score: 97.8% High
Key Divergent Deals Identified: 4`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-[#e2e8f0] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-[#3525cd]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[16px] text-[#0b1c30]">
                Export RevOps Forecast
              </h3>
              <p className="text-[11px] text-[#64748b]">
                Download audit-ready executive spreadsheet
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

        <div className="p-5 space-y-4">
          <div className="bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg p-3 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Selected Scenario:</span>
              <span className="font-bold text-[#0b1c30] capitalize">{scenario} AI Model</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Target Horizon:</span>
              <span className="font-bold text-[#0b1c30]">Q3 FY25 + Full Year FY25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Synced Deals Included:</span>
              <span className="font-bold text-[#0b1c30]">{deals.length} Active Records</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">CRM Data Ingested:</span>
              <span className="font-bold text-emerald-700">Salesforce & HubSpot (Live)</span>
            </div>
          </div>

          <div className="text-[12px] text-[#475569]">
            The exported report includes deal-level explainable AI probability weights, rep commit divergence indicators, confidence bands, and quarter pacing metrics.
          </div>
        </div>

        <div className="p-4 border-t border-[#e2e8f0] bg-[#f8f9ff] flex items-center justify-between gap-3">
          <button
            onClick={copySummary}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#cbd5e1] hover:bg-white text-xs font-semibold text-[#334155] rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#64748b]" />}
            <span>{copied ? 'Copied Summary' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-[#3525cd] hover:bg-[#2c1ea8] text-white text-xs font-bold rounded-md shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV (.csv)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
