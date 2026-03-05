# ADLC 執行層工作單 (Task Plan): Game Success Analyzer V2

> **執行準則 (Dev Agent 必讀)**：
> 請依照順序執行以下 Task。每完成一個，請將 `[ ]` 改為 `[x]`，並執行本地編譯驗證。

## 階段一：核心分析引擎實作 (Analyst Engine)
- [x] **Task 6-1**: 在 `src/lib` 建立 `analyst.ts`，實作「三維成本權重表」與相關 Type。
- [x] **Task 6-2**: 實作 `calculateBlueOceanScore` 函數，定義「營收/總成本」評分演算邏輯。
- [x] **Task 6-3**: 實作 `findTopBlueOceanRecipes` 遍歷資料庫，自動篩選並推薦 Top 3 藍海標籤組合。

## 階段二：偵察 API 整合 (Recon API)
- [x] **Task 6-4**: 建立 `src/app/api/recon/route.ts` API 端點。
- [x] **Task 6-5**: 整合 Analyst Engine，確保 API 能穩定回傳包含配方、複雜度與分析短評的 JSON 數據。

## 階段三：互動式報告介面 (Premium UI)
- [x] **Task 6-6**: 實作 `src/components/ui/recon-modal.tsx`，使用 `framer-motion` 打造精美彈窗效果。
- [x] **Task 6-7**: UI 需視覺化展示三維係數（🟢🟡🔴）與具備專業感的策略報告格式。
- [x] **Task 6-8**: 在 `app/page.tsx` 正確配置「🔍 偵察市場藍海」按鈕並整合 Modal 觸發狀態。

## 階段四：驗證與自動化測試 (Validation)
- [x] **Task 6-9**: 撰寫 `src/lib/analyst.test.ts` 單元測試，確保評分算法 100% 正確。
- [x] **Task 6-10**: 執行 `npm run build` 進行全專案編譯驗證，確保 V2 整合無誤。
