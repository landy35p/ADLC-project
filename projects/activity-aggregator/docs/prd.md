# Product Requirements Document (PRD): Activity & Data Aggregator (資料聚合服務)

## 1. 產品願景與目標 (Product Vision & Goals)
**願景**：為了解決下游分析服務（如 Game Success Analyzer）面臨的「資料匱乏」與「網路請求成本過高」的問題，我們將建立一個獨立的彈性資料聚合器 (Data Aggregator)。
**目標**：
- **雙模式支援**：同時支援「本地自訂資料 (Local Data)」與「網路公開資料 (Network Data)」，以簡化本地開發與測試的成本。
- **網路資料源**：第一階段 (V1) 的網路資料來源將優先鎖定使用 **Kaggle**，以獲取大量且免費的資料集。
- **介面統一**：提供一致的資料輸出結構，確保下游服務不受資料來源切換的影響。

## 2. 目標受眾 (Target Audience)
- **內部開發與測試人員**：需要快速、低成本的本地測試環境，不希望每次測試都觸發真實網路請求。
- **資料分析系統 (Downstream Services)**：需要穩定且結構化的遊戲市場資料來源。

## 3. 使用者故事 (User Stories)
1. **作為開發人員**，我希望系統能啟動「Local 模式」並讀取本地自訂檔案（如假資料 CSV/JSON），以便我可以無延遲且不耗費 API 配額地進行邏輯測試。
2. **作為系統管理員**，我希望系統能啟動「Network 模式」並整合 Kaggle 的數據來源，自動或手動化獲取真實世界的開源數據，解決缺乏資料的問題。
3. **作為系統架構師**，我希望這個 Aggregator 能抽象出統一的資料供應介面 (Provider Interface)，這樣未來如果我們有了預算想要串接真實 Steam API 或付費爬蟲時，下游程式碼完全不需修改。

## 4. 驗收標準 (Acceptance Criteria - AC)
### AC 1: 聚合器架構設計與雙模式切換
- 系統必須存在明確的設定檔或環境變數（例如 `DATA_SOURCE=LOCAL` 或 `KAGGLE`）來決定當前的運行模式。
- 必須定義一套標準的資料輸出介面（例如 `interface GameData { title: string; price: number; tags: string[]; ... }`）。

### AC 2: 本地資料模式 (Local Mock Mode)
- 當切換至 Local 模式時，系統應從指令指定的本地路徑讀取靜態文件（JSON 或 CSV）。
- 必須附帶一份小型的「測試用本地資料集範例」，供開發人員直接使用。

### AC 3: 網路資料模式 (Kaggle Integration)
- 當切換至 Kaggle 模式時，系統能透過 Kaggle API（需配置 `.Kaggle/kaggle.json` 憑證）或自訂下載腳本，獲取指定的 Kaggle 資料集。
- 獲取後，系統需將原始資料轉型為 AC 1 定義的標準資料輸出介面。

## 5. 里程碑與範圍限制 (Out of Scope for V1)
- V1 暫不實作定期排程 (Cron Job) 自動更新資料庫的功能，先以「開發者手動觸發 (CLI 或 API)」為主。
- V1 不實作 Kaggle 以外的網路資料源（如真實的 Steam Web API）。
