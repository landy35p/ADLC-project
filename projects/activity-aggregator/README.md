# Activity Aggregator

獨立的輕量級資料聚合器，負責從各種來源（本地、網路）拉取數據並正規化為統一結構，以供下游專案（如 Game Success Analyzer）無縫使用。

## Key Features
- **雙模式架構**：能靈活切換 Local Mock 與 Kaggle API 資料源，降低開發測試成本。
- **本地零成本測試 (Zero-Cost Local Testing)**：透過讀取自定義的本地 JSON，讓下游可實現免網路請求、無延遲的邏輯開發。
- **統一介面**：實作 `IDataProvider` 抽象層 (`GameData`) 進行反轉依賴，保證無論切換哪種模式，輸出結構皆一致。
- **測試覆蓋**：Vitest 單元測試 100% 覆蓋率，保證 Provider 提煉出來的 JSON 結構具備防呆機制。

## Tech Stack
- **Language**: Node.js (TypeScript)
- **Testing**: Vitest
- **Data parsing**: csv-parse
- **Environment**: dotenv

## Prerequisites
- Node.js 18 or higher (推薦使用 20+)

## Getting Started

### 1. 安裝套件
```bash
npm install
```

### 2. 環境變數配置 (.env)
複製或建立 `.env` 檔案於 `projects/activity-aggregator/` 目錄中：

| Variable | Description | Example / Default |
| -------- | ----------- | ----------------- |
| `DATA_SOURCE` | 決定資料來源模式 (`LOCAL` 或 `KAGGLE`) | `LOCAL` |

範例 `.env` 內容：
```env
DATA_SOURCE=LOCAL
```

### 3. 操作 Local Mock Data (本地測試資料)
為了讓開發者能在本地自由構造邊角案例（Edge Cases）而不需要對外連線，系統預設啟動 `LocalProvider`。

**本地資料在哪裡？**
預設的路徑位於：`data/mock_data.json`

**如何更改或自訂？**
您可以直接開啟並修改 `data/mock_data.json`。其格式必須符合以下 `GameData` 介面：
```json
[
  {
    "title": "My Custom Game",
    "priceUSD": 29.99,
    "estimatedOwners": 50000,
    "revenue": 1499500,
    "tags": ["Action", "Indie"]
  }
]
```
*每一次執行程式，都會無縫載入您剛剛修改的這些本地數據。*

### 4. 執行聚合器
```bash
npm start
```
成功執行後，無論您是在 `LOCAL` 或是 `KAGGLE` 模式，標準化過後的資料都會被統一輸出保存至：
`data/output.json`
您可以將這個檔案直接提供給下游系統（例如 Game Success Analyzer）做進一步解析。

## Testing

本專案的 Provider 皆具備單元測試防護，包含欄位型別驗證。
```bash
# 執行 Vitest 單元測試
npm test
```
