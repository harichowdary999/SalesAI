# SalesAI - RevOps & Revenue Forecasting Platform

A full-featured B2B Revenue Operations & Predictive Forecasting platform built with React 19, TypeScript, Vite, and Tailwind CSS.


## 📁 Project Structure

```text
├── .vscode/               # VS Code workspace settings & recommended extensions
├── src/
│   ├── components/        # React components (Dashboard, Sidebar, Header, etc.)
│   │   ├── CohortPerformanceView.tsx # Rep Quota & Leaderboard
│   │   ├── CustomersView.tsx         # Account Directory
│   │   ├── DealClosureTable.tsx      # Deals Table & AI Probabilities
│   │   ├── DealDetailPage.tsx        # Comprehensive Deal Dossier Page
│   │   ├── KpiRow.tsx                # Metric KPI Summary Cards
│   │   ├── ReportsView.tsx           # CSV Export & Executive Briefs
│   │   ├── RevenueForecasting.tsx    # Quarterly Pacing & Scenarios
│   │   ├── SalesPipelineAnalytics.tsx# 5-Stage Conversion Funnel
│   │   ├── Sidebar.tsx               # SalesAI Navigation
│   │   └── TopHeader.tsx             # Header controls & Search
│   ├── data/
│   │   └── mockData.ts    # Seed data & enterprise accounts
│   ├── types/
│   │   └── revops.ts      # TypeScript interfaces & domain types
│   ├── App.tsx            # Main application router & state manager
│   ├── main.tsx           # React entrypoint
│   └── index.css          # Tailwind CSS styles
├── package.json           # Scripts & dependencies
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```
