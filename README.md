# ADLC PoC (AI-Driven Development Lifecycle Proof of Concept)

歡迎來到 ADLC PoC 專案！此專案儲存庫包含了為「萬能活動整理系統 (Activity Aggregator)」所設計的 AI 工作流程、本地技能，以及相關的原始程式碼。

## 🚀 團隊成員快速起步指南

為了確保所有開發者的 AI Agent 行為具備高度的一致性，我們採用了 **本地技能 (Local Skills)** （存在於此儲存庫中）搭配 **全域技能 (Global Skills)** （共用的 awesome-skills 擴充套件）的雙層架構。

### 前置作業：安裝全域技能包
在要求 Agent 開始工作前，請先透過腳本將團隊統一的全域 AI 技能安裝至您的本機電腦中：

**適用於 Windows (⚠️ 必須「以系統管理員身分執行」PowerShell)：**
因為安裝過程中需要建立符號連結 (Symlinks)，如果沒有管理員權限將會導致安裝失敗。
```powershell
.\scripts\install-skills.ps1
```

這個腳本會自動將 [Antigravity Awesome Skills 專案](https://github.com/sickn33/antigravity-awesome-skills) 複製或更新到您的 `~/.gemini/antigravity/skills/` 資料夾下。

### 本地 (Local) 與全域 (Global) 技能的差異
- **全域技能 (Global Skills)**：提供 Agent 廣泛的技術知識與標準能力（例如：如何編寫 Next.js、如何繪製 C4 架構圖、如何實作身分驗證）。
- **本地技能 (Local Skills)**：位於本專案的 `.agents/skills/` 目錄下。這些是專屬於本專案的**覆寫規範 (Overrides)**（例如：強制使用繁體中文撰寫 Commit、或者是限制 `git push` 前必須經過人工批准）。這些覆寫規則確保了 Agent 能嚴格遵從我們團隊特有的安全與品質標準。

## 🛠️ 開始使用
待全域技能安裝完畢後，您就可以在聊天室直接下達指令給 Agent，例如：
> `請根據 docs/prd.md 啟動 /architect-agent 與 /product-agent 開始規劃 MVP。`
