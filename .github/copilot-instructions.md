# ADLC PoC — Workspace Instructions

## 專案概述

此儲存庫為 **ADLC PoC (AI-Driven Development Lifecycle Proof of Concept)**，由兩個子專案組成：

- **`projects/game-success-analyzer/`** — Next.js 15 前端應用，整合 Prisma (SQLite)、Tailwind CSS、shadcn/ui、Recharts、framer-motion，API Routes 使用 App Router。
- **`projects/activity-aggregator/`** — TypeScript CLI 工具，聚合活動資料，支援本地與 Kaggle 資料來源。

## 技術棧摘要

- **前端/後端框架**：Next.js 15+ (App Router)
- **資料庫 ORM**：Prisma (SQLite)
- **UI**：Tailwind CSS + shadcn/ui
- **圖表**：Recharts + framer-motion
- **測試**：Vitest（單元/整合）、Playwright（E2E）
- **套件管理**：npm

## 常用建置與測試指令

```bash
# game-success-analyzer
cd projects/game-success-analyzer
npm run build           # 正式建置
npm run dev             # 開發伺服器
npx vitest run          # 執行單元/整合測試
npx vitest run --coverage  # 含涵蓋率報告

# activity-aggregator
cd projects/activity-aggregator
npm run build
npm test
```

---

## [Override] Git Commit 規範

> **此為本專案覆寫規範，優先於所有預設行為。**

### 語言強制規範

本專案所有 Git Commit Message **必須** 使用**繁體中文**描述，格式依循 Conventional Commits：

```
feat(auth): 新增使用者登入功能
fix(db): 修正查詢條件錯誤
docs(readme): 更新安裝說明
refactor(api): 重構預測邏輯以提升可讀性
```

### 斷點原則（The Breakpoint Rule — Critical）

- **Commit 斷點**：在執行程式碼修改的同一輪次中，**禁止**直接執行 `git commit`。必須先展示修改結果與摘要，透過對話等待 User 明確回覆「批准」後，才能在下一輪次提交。
- **Push 斷點**：**絕對禁止**自動執行 `git push`。必須明確詢問「是否批准上傳至遠端倉庫？」，獲得確認後方可執行。

---

## [Override] Agent Action Verification

> **此為本專案覆寫規範，執行任何具有副作用的指令時必須遵守。**

### 強制程序

1. **指令執行監控**：執行建置或測試指令後，**必須**確認 Exit code 為 `0`。發生錯誤時，Agent 必須自行解讀錯誤訊息並修復，不得跳過。
2. **網路操作驗證**：`npm install`、`git push` 等操作必須等待並確認出現成功日誌（如 `added X packages`、`Branch pushed`）。
3. **副作用驗證**：執行檔案操作或 `build` 後，必須透過後續確認（如列出產出物目錄）驗證預期產物已生成。

### 回報規範

- **成功時**：在最終回報中必須加註「已通過 [指令名稱] 驗證」（例如：「已通過 `npm run build` 驗證」）。

---

## [Override] 自我改進 SOP (Self-Improvement Protocol)

> **此為本專案覆寫規範，適用於所有任務執行週期。**

### 核心原則

Agent **不得**依賴 User 重複提醒相同錯誤。每次犯錯後，必須主動將教訓固化為規範，確保下次同類任務自動套用。

### 強制執行流程

#### Phase A — 任務開始前（Pre-Task Check）

執行任何任務前，**必須**查詢 `/memories/` 確認是否有相關教訓：

```
涉及 Mermaid 圖    → 讀取 /memories/mermaid-lessons.md，
                     確認驗證 SOP，寫完立即執行 npx mmdc
涉及 npm/build     → 確認 exit code 0，驗證產出物存在
涉及 git 操作      → 遵守斷點原則，確認狀態後再執行
```

#### Phase B — 任務完成後（Post-Task Retrospective）

任務結束時，評估是否觸發自動覆盤：

| 觸發條件 | 必做動作 |
|---|---|
| 同一問題需要 **2+ 輪修正** | 立即記錄教訓至 `/memories/` |
| 遭遇**未預期的工具限制或語法錯誤** | 立即記錄錯誤訊息對照表 |
| 發現**既有記憶有誤或過期** | 立即更新對應記憶檔 |

#### Phase C — 記憶寫入格式規範

在 `/memories/` 寫入教訓時，必須包含：

1. **根本原因**（Root Cause）— 為何發生，而非只描述現象
2. **正確做法**（Correct Pattern）— 含可直接複製的程式碼或指令
3. **錯誤對照**（❌ vs ✅）— 方便快速識別
4. **驗證方法**（Validation SOP）— 下次如何確認正確

### 禁止行為

- ❌ **禁止**在沒有 Pre-Task Check 的情況下，對已知高風險操作（Mermaid、build、deploy）直接執行
- ❌ **禁止**在需要 2+ 輪修正後，不留下任何記憶記錄即結束任務
- ❌ **禁止**讓 User 成為錯誤的唯一偵測者
