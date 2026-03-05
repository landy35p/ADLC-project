# ADLC 執行層工作單 (Task Plan): Activity Aggregator

> **執行準則 (Dev Agent 必讀)**：
> 請依照順序執行以下 Task。每完成一個，請將 `[ ]` 改為 `[x]`，並執行本地編譯或測試驗證。

## 階段一：專案初始化 (Project Setup)
- [x] **Task 1-1**: 在 `projects/activity-aggregator` 初始化 Node.js 專案 (`npm init -y`) 並配置 TypeScript 與 `ts-node`。
- [x] **Task 1-2**: 建立基礎資料夾結構 `src/providers`, `src/config`, `data`。

## 階段二：核心介面與本地端提供者 (Core Interface & Local Provider)
- [x] **Task 2-1**: 在 `src/types.ts` 定義統一的資料結構 `GameData` 與介面 `IDataProvider`。
- [x] **Task 2-2**: 實作 `src/providers/LocalProvider.ts`，能讀取預設的本地 JSON 檔案。
- [x] **Task 2-3**: 建立測試用的 `data/mock_data.json` 提供基本的遊戲數據。

## 階段三：Kaggle 網路端提供者 (Network Provider - Kaggle)
- [x] **Task 3-1**: 實作 `src/providers/KaggleProvider.ts`。使用 Kaggle API 下載公開資料集，並將結果 Mapping 為 `GameData` 格式。

## 階段四：主程式與自動化測試 (CLI Entry & Tests)
- [x] **Task 4-1**: 實作主程式 `src/index.ts`，根據 `.env` 或啟動參數決定使用哪個 Provider，並將最終結果輸出到 `data/output.json`。
- [x] **Task 4-2**: 撰寫對應的單元測試，確認兩種 Provider 產出的結構一致。
- [x] **Task 4-3**: **[強制規範]** 確保 `README.md` 已同步更新，說明如何配置 `.env` 與啟動腳本。
