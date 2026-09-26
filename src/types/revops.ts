export type ForecastScenario = 'base' | 'conservative';

export type QuarterId = 'Q1-FY25' | 'Q2-FY25' | 'Q3-FY25' | 'Q4-FY25' | 'ALL-FY25';

export type DealStage = 
  | 'Discovery'
  | 'Technical Pilot'
  | 'Negotiation'
  | 'Security Review'
  | 'Contract Signature'
  | 'Closed Won';

export interface KeyDriver {
  id: string;
  type: 'positive' | 'negative' | 'neutral' | 'urgent';
  prefix: '+' | '!' | '!!' | '%' | '✓';
  text: string;
  category: 'engagement' | 'procurement' | 'product' | 'risk' | 'pricing';
  impactPercent: number;
}

export interface Deal {
  id: string;
  name: string;
  account: string;
  accountAvatarLetter: string;
  accountAvatarColor: string;
  stage: DealStage;
  amount: number;
  expectedRevenue: number;
  repCommit: number;
  repCommitLabel?: string; // e.g. "85% Commit", "40% (Upside)", "90% Commit"
  repGutStrikethrough?: boolean;
  aiProbability: number; // e.g. 94
  keyDrivers: KeyDriver[];
  confidenceBand: string; // e.g. "High Confidence (90-98%)"
  confidenceLevel: 'high' | 'moderate' | 'at-risk';
  salesRep: string;
  closeDate: string;
  daysInStage: number;
  healthScore: number;
  crmSource: 'Salesforce' | 'HubSpot';
  divergenceDetected?: boolean;
  divergenceNotes?: string;
  recommendedAction?: string;
}

export interface QuarterData {
  id: QuarterId;
  label: string;
  fiscalYear: string;
  status: 'CLOSED · ACTUALS' | 'IN PROGRESS' | 'PROJECTED';
  isActiveQuarter: boolean;
  actualOrExpectedRevenue: number;
  executiveTarget: number;
  repGutCommit: number;
  targetDelta: number; // e.g. +500000
  targetDeltaLabel: string; // e.g. "+$500K above target"
  achievementRate: number; // e.g. 104.1
  paceLabel?: string; // e.g. "106.5% Pace"
  closedRevenue?: number;
  pipelineRevenue?: number;
  closedPercent?: number;
  repCommitGap?: number; // -$1.52M gap
}

export interface PipelineStageStat {
  stageNumber: number;
  id: DealStage;
  name: string;
  dealCount: number;
  totalPipelineValue: number;
  conversionRate: number;
  expectedValue: number;
}

export type ActiveView = 
  | 'dashboard'
  | 'pipeline'
  | 'forecast'
  | 'sales-reps'
  | 'customers'
  | 'reports';
