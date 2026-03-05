# 架構設計與 Task 拆解 (Architecture & Task Plan): Activity Aggregator

## 1. 系統架構模式 (Architecture Context)
Activity Aggregator 定位為一個「後端守護執行緒(Daemon) / CLI 工具」，它的唯一職責是取得外部資料並儲存為一致的結構，供其他微服務或專案使用。
為了輕量化與跨平台，我們採用 **Node.js CLI** 架構，並搭配 TypeScript 確保介面一致性。

## 2. 技術選型 (Tech Stack)
- **執行環境**: `Node.js` (TypeScript)
- **指令列解析**: `commander` 或原生的 `util.parseArgs`
- **網路請求**: 原生 `fetch` (Node.js 18+)
- **Kaggle 整合**: 透過 Kaggle 官方 Public API 呼叫，需要使用者配置 `kaggle.json` 或環境變數 (`KAGGLE_USERNAME`, `KAGGLE_KEY`)。
- **儲存格式**: 輸出標準化的 `data/games.json` 或 `data/games.csv`。

## 3. 系統元件與邏輯 (System Components)
1. **設定載入模組 (Config Loader)**：讀取 `.env` 檔案決定 `DATA_SOURCE`。
2. **抽象供應商 (Provider Interface)**：定義 `interface IDataProvider { fetchData(): Promise<GameData[]> }`。
3. **本地供應商 (LocalProvider)**：實作 `IDataProvider`，讀取本地的 `mock_data.json`。
4. **Kaggle供應商 (KaggleProvider)**：實作 `IDataProvider`，呼叫 Kaggle API 下載 Dataset 並解析。
5. **輸出模組 (Exporter)**：將拿到的 `GameData[]` 統一寫入目標檔案或 SQLite DB。

---

## Task Plan 拆解 (供 Dev Agent 執行)
已同步建立於 `.agents/task_plan.md` 提供 Dev Agent 按序執行。
