# ADLC PoC (AI-Driven Development Lifecycle Proof of Concept)

歡迎來到 ADLC PoC 專案！此儲存庫包含了基於 **GitHub Copilot Custom Agent Modes** 的 ADLC（AI 驅動開發生命週期）工作流程，以及兩個子專案的原始程式碼。

## 📂 子專案

| 專案 | 路徑 | 說明 |
| :--- | :--- | :--- |
| **Game Success Analyzer** | `projects/game-success-analyzer/` | Next.js 15 前端應用，分析遊戲市場成功因素 |
| **Activity Aggregator** | `projects/activity-aggregator/` | TypeScript CLI 工具，聚合多來源活動資料 |

## 🚀 快速起步指南

本專案採用 **GitHub Copilot Custom Agent Modes** 來標準化 AI Agent 行為。所有 Agent 指令均定義於 `.github/agents/` 資料夾中，開箱即用，無需額外安裝。

### 必要條件

- [GitHub Copilot](https://github.com/features/copilot) 訂閱（支援 Agent Modes 的版本）
- VS Code 最新版本

### 前置作業

1. 確認 VS Code 的 Copilot 擴充套件已更新至支援 Agent Modes 的版本。
2. 開啟本儲存庫資料夾。`.github/agents/` 中的 Agent 會自動被 Copilot 識別。

## 🤖 Copilot Agent Modes 使用指南

開啟 VS Code Copilot Chat，點擊模式選擇器切換至對應的 Agent Mode：

| Agent Mode | 用途 |
| :--- | :--- |
| `@adlc` | **推薦入口**：啟動完整四階段 ADLC 流程（規劃 → 開發 → 驗證 → 部署） |
| `@dev` | 直接委派開發工程師執行功能實作 |
| `@qa` | 啟動測試工程師進行品質驗收 |
| `@security` | 啟動安全官進行 OWASP 源碼安全審查 |
| `@devops` | 啟動維運工程師更新 CI/CD 流水線 |

### 典型工作流程

```
在 Copilot Chat 中切換至 @adlc，然後輸入：
「請根據 docs/prd.md 分析需求，並啟動 ADLC 開發流程。」
```

詳細的 ADLC 流程說明請參閱 [`docs/adlc/overview.md`](docs/adlc/overview.md)。

---

## 🛠️ 本地開發指令

```bash
# Game Success Analyzer
cd projects/game-success-analyzer
npm install
npm run dev        # 開發伺服器
npm run build      # 正式建置
npx vitest run     # 單元/整合測試

# Activity Aggregator
cd projects/activity-aggregator
npm install
npm run build
npm test
```

---

> **Antigravity 用戶（選用）**：若您同時使用 Antigravity CLI，可執行 `.\scripts\install-skills.ps1` 安裝全域技能包（需以系統管理員身分執行 PowerShell）。
