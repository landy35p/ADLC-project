# ADLC 執行層工作單 (Task Plan): Game Success Analyzer MVP

> **執行準則 (Dev Agent 必讀)**：
> 請依照順序執行以下 Task。每完成一個，請將 `[ ]` 改為 `[x]`，並執行本地編譯驗證。

## 階段一：專案初始化與資料庫建置 (Project Setup & DB)
- [ ] **Task 1-1**: 使用 `npx create-next-app@latest` 初始化 Next.js 專案於根目錄（或指定子目錄），並配置 TailwindCSS 與 TypeScript。
- [ ] **Task 1-2**: 安裝 `prisma` 與 `@prisma/client`，初始化 Prisma，並根據 `architecture-design.md` 建立 `Game` Model。
- [ ] **Task 1-3**: 建立 SQLite (或串接外部 PostgreSQL) 資料庫，並執行初步的 `npx prisma db push` 生成資料表。

## 階段二：資料匯入腳本實作 (Data Ingestion)
- [ ] **Task 2-1**: 撰寫 `scripts/seed-data.ts`，實作讀取根目錄下 `.csv` 檔案的邏輯。
- [ ] **Task 2-2**: 在 `seed-data.ts` 內加入資料清洗邏輯（轉換空值、字串轉 Array），並透過 Prisma 批次寫入資料庫。

## 階段三：後端預測與統計 API (Backend API Routes)
- [ ] **Task 3-1**: 建立 Next.js Route Handler `app/api/stats/route.ts`，使用 Prisma 撈取資料庫計算出「各類型遊戲數量與總成功率」的聚合資料，供儀表板使用。
- [ ] **Task 3-2**: 建立預測器端點 `app/api/predict/route.ts`，接收 `tags` 與 `price` 參數，計算並回傳該分群下的成功機率 ($P = S / N$) 與中位數營收。

## 階段四：前端視覺化與互動介面 (Frontend UI)
- [ ] **Task 4-1**: 安裝 `recharts` 與 `shadcn/ui` 基本元件（Card, Button, Input, Select, Form）。
- [ ] **Task 4-2**: 實作首頁 (`app/page.tsx`) 的「市場趨勢儀表板」，串接 `GET /api/stats`，使用長條圖或圓餅圖展示成功率。
- [ ] **Task 4-3**: 實作「預測器表單元件 (Predictor Form)」，供使用者輸入開發計畫參數。
- [ ] **Task 4-4**: 實作表單送出邏輯，串接 `POST /api/predict`，並在前端以動態圖表或顯眼的數字展示「預估成功率與分析短評」。
