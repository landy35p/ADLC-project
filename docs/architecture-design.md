# 神思架構設計 (Architecture Design): Game Success Analyzer

## 1. 系統架構模式 (Architecture Context)
本系統定位為一個「資料分析與資料視覺化平台 (Data-intensive Web App)」。採用 **Monolith (單體架構)**，將前端畫面與後端分析 API 結合在同一框架內運行。

## 2. 技術選型 (Tech Stack)
- **應用框架 (Full-Stack)**: `Next.js 15+ (App Router)`
- **資料庫 (Database)**: `SQLite` (透過 Prisma ORM)
- **前端視覺化 (Frontend UI & Visualization)**: 
  - `Tailwind CSS` & `shadcn/ui`
  - `Recharts` 實作資料視覺化。
  - `framer-motion` 實作進階動畫（用於偵察報告）。
- **測試 (Testing)**: `Vitest`

## 3. 系統元件與邏輯 (System Components)
1. **Data Importer (資料匯入器)**: 解析 CSV 並匯入至 `Game` Table。
2. **Dashboard View (市場趨勢視圖)**: 聚合各類型成功率排行。
3. **Predictor API (`/api/predict`)**: 計算特定標籤組合的成功機率。
4. **Analyst Engine (`src/lib/analyst.ts`) [V2]**:
    - **三維成本分析系統**：
        - `Art Cost`: 根據顯式標籤計算（如 Pixel +1, Realistic +10）。
        - `Dev Complexity`: 識別高門檻特徵（如 Multiplayer, Physics-heavy）。
        - `Ops Challenge`: 以 `Content Consumption Rate` (營收/樣本數比值模擬或時數數據) 衡量。
    - **藍海評選演算法**：尋找 `Blue Ocean Score = Revenue / (Art + Dev + Ops)` 最高的組合。
5. **Recon API (`/api/recon`) [V2]**:
    - 觸發 Analyst Engine 運算並回傳 Top 3 策略配方 JSON。

## 4. 資料庫綱要 (Database Schema - Prisma)
```prisma
model Game {
  id               Int      @id @default(autoincrement())
  appId            Int      @unique
  title            String
  releaseDate      DateTime?
  priceUSD         Float    @default(0.0)
  estimatedOwners  Int      @default(0)
  revenue          Float    @default(0.0)
  tags             String   // 以分號分隔的字串
}
```

## 5. [V2] 藍海偵察報告規格
- **數據輸出格式**：
    ```json
    {
      "recipes": [
        {
          "title": "配方名稱",
          "tags": ["Tag1", "Tag2"],
          "complexity": { "art": 1, "dev": 3, "ops": 2 },
          "analysis": "專業分析短評",
          "risk": "風險提示"
        }
      ]
    }
    ```
