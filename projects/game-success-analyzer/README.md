# 遊戲成功率分析器 (Game Success Analyzer) MVP

這是一個基於 AI 的市場分析與成功率預測工具，旨在協助遊戲開發者評估專案潛力。本專案使用 Next.js、SQLite 與 Vitest 構建。

## 🚀 核心功能 (Features)

- **[V1] 市場趨勢儀表板**：根據歷史數據，即時視覺化展示各類遊戲標籤的成功機率。
- **[V1] 成功率預測器**：互動式工具，可根據遊戲標籤與預定售價，預估達成「成功」（營收 > $10,000 USD）的機率及中位數營收。
- **[V2] 專業市場藍海偵察 (Blue Ocean Recon)**：專為獨立開發者打造的策略生成器。透過獨創的「資源成本三維係數 (Complexity Triple-Index)」評估美術、開發與維運難度，自動推薦目前市場上高回報、低成本的黃金開發配方。
- **測試驅動開發 (TDD)**：核心業務邏輯由單元測試完整覆蓋，確保運算邏輯的準確性。
- **現代化介面**：採用 Slate 深色風格，搭配 Tailwind CSS、Recharts 與 Framer Motion 打造專業且具現代感的 UI。

## 🛠 技術棧

- **框架**: [Next.js 15+](https://nextjs.org/) (App Router)
- **資料庫**: [SQLite](https://www.sqlite.org/) 透過 [Prisma](https://www.prisma.io/)（針對 Windows 環境穩定性提供 direct `sqlite3` 回退方案）
- **測試**: [Vitest](https://vitest.dev/)
- **圖表與動畫**: [Recharts](https://recharts.org/) & [Framer Motion](https://motion.dev/) & [Lucide React](https://lucide.dev/)
- **樣式**: Tailwind CSS

## 🏁 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 資料庫設定

確保生成 Prisma Client 並填充資料庫：

```bash
# 生成 Prisma Client
npx prisma generate

# 方法 A：從舊版靜態 CSV 匯入種子資料
node scripts/seed-sqlite.js

# 方法 B (推薦)：從 Activity Aggregator 匯入動態假資料或 Kaggle 資料
# 請確保先在 activity-aggregator 目錄執行了 npm start
npm run seed:aggregator
```

### 3. 啟動開發伺服器

```bash
npm run dev
```
啟動後，請訪問 [http://localhost:3000](http://localhost:3000) 查看分析器。

### 4. 執行測試

本專案強調透過 TDD 確保程式碼可靠性。

```bash
# 執行所有單元測試
npx vitest run
```

## 🧠 技術重點

- **驗證先行 (Verification-First)**：遵循 ADLC (Agentic Development Lifecycle) 工作流，在交付前嚴格驗證編譯與測試結果。
- **環境穩定性優化**：實作了 `src/lib/db.ts` 回退機制，確保在標準 Prisma 初始化可能遇到問題的環境下，仍能穩定連線 SQLite。
- **運算準確性**：邏輯考慮了市場樣本數，並使用營收中位數來提供更符合現實的預期參考。

---
由 Antigravity (ADLC Dev Agent) 建立
