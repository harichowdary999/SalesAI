import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { KpiRow } from './components/KpiRow';
import { RevenueForecasting } from './components/RevenueForecasting';
import { SalesPipelineAnalytics } from './components/SalesPipelineAnalytics';
import { DealClosureTable } from './components/DealClosureTable';
import { DealDetailPage } from './components/DealDetailPage';
import { ExportModal } from './components/ExportModal';
import { NewDealModal } from './components/NewDealModal';
import { BottomStatusBar } from './components/BottomStatusBar';
import { CohortPerformanceView } from './components/CohortPerformanceView';
import { CustomersView } from './components/CustomersView';
import { ReportsView } from './components/ReportsView';
import {
  ActiveView,
  Deal,
  DealStage,
  ForecastScenario,
  QuarterData,
  QuarterId,
} from './types/revops';
import {
  INITIAL_DEALS,
  INITIAL_PIPELINE_STAGES,
  INITIAL_QUARTERS,
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedQuarter, setSelectedQuarter] = useState<QuarterId>('Q3-FY25');
  const [scenario, setScenario] = useState<ForecastScenario>('base');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'risk'>('all');
  const [activeStageFilter, setActiveStageFilter] = useState<DealStage | 'ALL'>('ALL');

  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [quarters, setQuarters] = useState<QuarterData[]>(INITIAL_QUARTERS);
  const [stages, setStages] = useState(INITIAL_PIPELINE_STAGES);

  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);

  const [lastSyncText, setLastSyncText] = useState('4m ago');
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync handler
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText('Just now');
    }, 1200);
  };

  // Update a deal from the Drawer
  const handleSaveDeal = (updatedDeal: Deal) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === updatedDeal.id ? updatedDeal : d))
    );
    setSelectedDeal(updatedDeal);
  };

  // Add a newly simulated deal
  const handleAddDeal = (newDeal: Deal) => {
    setDeals((prev) => [newDeal, ...prev]);
    // update pipeline stage counts
    setStages((prev) =>
      prev.map((s) =>
        s.id === newDeal.stage
          ? {
              ...s,
              dealCount: s.dealCount + 1,
              totalPipelineValue: s.totalPipelineValue + newDeal.amount,
              expectedValue: s.expectedValue + newDeal.expectedRevenue,
            }
          : s
      )
    );
  };

  // Hotkey listener for ⌘K / search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      if (e.key === 'Escape') {
        setSelectedDeal(null);
        setIsExportModalOpen(false);
        setIsNewDealModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      {/* Left Navigation Rail */}
      <Sidebar
        activeView={activeView}
        onSelectView={(view) => {
          setSelectedDeal(null);
          setActiveView(view);
        }}
        lastSyncTime={lastSyncText}
        onTriggerSync={handleTriggerSync}
        isSyncing={isSyncing}
      />

      {/* Main Canvas Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Bar */}
        <TopHeader
          selectedQuarter={selectedQuarter}
          onSelectQuarter={setSelectedQuarter}
          scenario={scenario}
          onSelectScenario={setScenario}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onOpenNewDealModal={() => setIsNewDealModalOpen(true)}
        />

        {/* Scrollable Work Area */}
        <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
          {selectedDeal ? (
            <DealDetailPage
              deal={selectedDeal}
              onBack={() => setSelectedDeal(null)}
              onSaveDeal={handleSaveDeal}
            />
          ) : (
            <>
              {/* 1. Dashboard View (Executive Command Center) */}
              {activeView === 'dashboard' && (
                <>
                  <KpiRow lastSyncTime={lastSyncText} />
                  <SalesPipelineAnalytics
                    stages={stages}
                    activeStageFilter={activeStageFilter}
                    onSelectStageFilter={setActiveStageFilter}
                  />
                  <DealClosureTable
                    deals={deals}
                    onSelectDeal={(deal) => setSelectedDeal(deal)}
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                    searchQuery={searchQuery}
                    activeStageFilter={activeStageFilter}
                  />
                  <RevenueForecasting
                    quarters={quarters}
                    selectedQuarter={selectedQuarter}
                    onSelectQuarter={setSelectedQuarter}
                    scenario={scenario}
                  />
                </>
              )}

              {/* 2. Pipeline View (Stage Funnel & Deals Grid) */}
              {activeView === 'pipeline' && (
                <>
                  <SalesPipelineAnalytics
                    stages={stages}
                    activeStageFilter={activeStageFilter}
                    onSelectStageFilter={setActiveStageFilter}
                  />
                  <DealClosureTable
                    deals={deals}
                    onSelectDeal={(deal) => setSelectedDeal(deal)}
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                    searchQuery={searchQuery}
                    activeStageFilter={activeStageFilter}
                  />
                </>
              )}

              {/* 3. Forecast View (Quarterly Targets & Pacing) */}
              {activeView === 'forecast' && (
                <>
                  <RevenueForecasting
                    quarters={quarters}
                    selectedQuarter={selectedQuarter}
                    onSelectQuarter={setSelectedQuarter}
                    scenario={scenario}
                  />
                  <KpiRow lastSyncTime={lastSyncText} />
                </>
              )}

              {/* 4. Sales Reps View (Quota Leaderboard & AI Calibration) */}
              {activeView === 'sales-reps' && <CohortPerformanceView />}

              {/* 5. Customers View (Buying Organizations Directory) */}
              {activeView === 'customers' && (
                <CustomersView deals={deals} onSelectDeal={(deal) => setSelectedDeal(deal)} />
              )}

              {/* 6. Reports View (Exports & Briefs) */}
              {activeView === 'reports' && <ReportsView deals={deals} quarters={quarters} />}
            </>
          )}
        </main>

        {/* Global Bottom Status Bar */}
        <BottomStatusBar lastSyncText={lastSyncText} />
      </div>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        deals={deals}
        quarters={quarters}
        scenario={scenario}
      />

      {/* Simulate New Opportunity Modal */}
      <NewDealModal
        isOpen={isNewDealModalOpen}
        onClose={() => setIsNewDealModalOpen(false)}
        onAddDeal={handleAddDeal}
      />
    </div>
  );
}
