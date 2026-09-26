import React, { useState } from 'react';
import { FileText, Download, Check, Copy, FileSpreadsheet, Calendar, ShieldCheck, ArrowDownToLine } from 'lucide-react';
import { Deal, QuarterData } from '../types/revops';

interface ReportsViewProps {
  deals: Deal[];
  quarters: QuarterData[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ deals, quarters }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
    link.setAttribute('download', `SalesAI_Revenue_Forecast_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const copyExecutiveBrief = () => {
    const text = `SALESAI - EXECUTIVE REVENUE BRIEF
Fiscal Target (FY25): $55.30M
Projected Revenue: $58.17M (+5.2% surplus)
Active Open Pipeline: $42.60M across 142 deals
Current Pacing Status: On-track to exceed baseline target
Audited Deals: 142 active pipeline records from Salesforce & HubSpot.`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const recentReports = [
    {
      name: 'Q3 FY25 Revenue Forecasting Pacing Model',
      type: 'Executive Spreadsheet (.csv)',
      date: 'Generated today at 2:00 PM',
      size: '2.4 MB',
      records: '142 Deals · 14,280 Ingested Records',
    },
    {
      name: 'Sales Rep Divergence & Bias Audit',
      type: 'RevOps Audit Report',
      date: 'Generated yesterday',
      size: '1.1 MB',
      records: '5 Account Executives Audited',
    },
    {
      name: 'Buying Committee Multi-Threading Compliance',
      type: 'Deal Health Digest',
      date: 'Sep 22, 2026',
      size: '860 KB',
      records: '48 Stage 3+ Opportunities',
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563eb] to-[#3b82f6] flex items-center justify-center text-white">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-[18px] text-[#0b1c30]">
              Reports & Executive Forecast Exports
            </h2>
            <p className="text-[12px] text-[#64748b]">
              Generate, download, and distribute audit-grade revenue reports and pipeline spreadsheets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyExecutiveBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f8f9ff] hover:bg-white border border-[#cbd5e1] rounded-lg text-xs font-semibold text-[#0b1c30] transition-colors"
          >
            {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#64748b]" />}
            <span>{copySuccess ? 'Copied Brief!' : 'Copy Executive Brief'}</span>
          </button>

          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <ArrowDownToLine className="w-3.5 h-3.5" />}
            <span>{downloadSuccess ? 'Downloaded!' : 'Export All Pipeline CSV'}</span>
          </button>
        </div>
      </div>

      {/* Available Reports List */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#f1f5f9] font-bold text-xs text-[#0b1c30]">
          Standard Revenue & Compliance Reports
        </div>
        <div className="divide-y divide-[#f1f5f9]">
          {recentReports.map((report, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-[#f8f9ff] transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563eb] shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0b1c30] text-[13px]">{report.name}</div>
                  <div className="text-[11px] text-[#64748b]">{report.records}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[11px] text-[#94a3b8]">{report.date}</span>
                <button
                  onClick={downloadCSV}
                  className="flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
