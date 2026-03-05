# 神思架構設計 (Architecture Design): Game Success Analyzer

## 1. 系統架構模式 (Architecture Context)
本系統定位為一個「資料分析與資料視覺化平台 (Data-intensive Web App)」。考量到 MVP 需要快速的端到端交付，我們採用 **Monolith (單體架構)**，將前端畫面與後端分析 API 結合在同一框架內運行。

## 2. 技術選型 (Tech Stack)
- **應用框架 (Full-Stack)**: `Next.js 14+ (App Router)`
  - 提供強大的 Server Components 能力，加速資料撈取，並內建 API Routes 處理分析邏輯。
  - 使用 `TypeScript` 確保資料型別安全。
- **資料庫 (Database)**: `PostgreSQL` (推薦使用 Supabase / Neon 等 Serverless 方案，或本地 docker)
  - 使用 `Prisma ORM` 進行資料庫變更管理 (Schema Migrations) 與型別安全的查詢。
- **前端視覺化 (Frontend UI & Visualization)**: 
  - `Tailwind CSS` 作為主要樣式框架。
  - `shadcn/ui` (基於 Radix UI) 提供高品質的基本元件。
  - `Recharts` 實作資料視覺化儀表板 (Dashboard)。

## 3. 系統元件與邏輯 (System Components)
1. **Data Importer (資料匯入器)**
   - 負責寫入一組腳本 `scripts/seed-data.ts`，解析 CSV (如 Steam dataset) 並匯入至 PostgreSQL `Game` Tabe。
2. **Dashboard View (市場趨勢視圖)**
   - SSR (Server-Side Rendering) 頁面，負責啟動 Prisma 從資料庫中聚合（例如：取得 Top 10 成功率的遊戲類型），並傳給客戶端 Recharts 渲染。
3. **Predictor Form & Compute API (預測器與計算端點)**
   - 前端表單讓使用者輸入（勾選類型標籤、預期定價範圍）。
   - 送出至 `/api/predict` 端點。
   - 分析邏輯：
     - 在資料庫撈取對應 `tags` 且落於該 `price` 區間的歷史遊戲。
     - 計算符合條件的樣本數 $N$。
     - 計算這些樣本中，營收 (price * estimated_owners) 大於目標 (例如 $10K USD) 的個數 $S$。
     - 得出成功機率 $P = S / N$ 以及中位數營收。
     - 將結果包裝為 JSON 回傳前端顯示。

## 4. 資料庫綱要 (Database Schema - Prisma 模型草案)
```prisma
model Game {
  id               Int      @id @default(autoincrement())
  appId            Int      @unique // Steam App ID
  title            String
  releaseDate      DateTime?
  priceUSD         Float    @default(0.0)
  estimatedOwners  Int      @default(0)
  revenue          Float    @default(0.0) // priceUSD * estimatedOwners
  tags             String[] // 遊戲類型標籤，使用 String Array 方便簡單過濾
}
```
