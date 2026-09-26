# SalesAI - RevOps & Revenue Forecasting Platform

A full-featured B2B Revenue Operations & Predictive Forecasting platform built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## 🚀 Running in VS Code

### Step 1: Open the Project in VS Code
Open VS Code, then:
- Click **File > Open Folder...** (or `Cmd + O` / `Ctrl + O`) and select this project directory.
- Or open your terminal and run:
  ```bash
  cd path/to/project
  code .
  ```

### Step 2: Install Dependencies
Open the integrated terminal in VS Code (`Ctrl + \`` or `Cmd + \``) and run:

```bash
npm install
```

### Step 3: Run the Development Server
```bash
npm run dev
```

The app will start at:
👉 **http://localhost:3000**

---

## 🛠️ Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000 with hot reloading.
- `npm run build`: Compiles TypeScript and builds production-ready static assets in `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs TypeScript type checking (`tsc --noEmit`).

---

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
