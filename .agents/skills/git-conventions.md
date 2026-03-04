---
description: [Override] Git Commit 與 Push 的語言及斷點核准規範
---
# [Override] Git Commit Conventions

> [!IMPORTANT]
> 此 Skill 為本專案的覆寫規範 (Override)。請結合系統內建的 Git / Commit 技能，但在執行時必須**絕對服從**以下兩大專案專屬限制。

## 1. 語言強制規範 (Language Mandatory Rule)
本專案的所有 Git Commit Message **必須** 使用 **繁體中文** 描述，格式依循 Conventional Commits (例如：`feat(auth): 新增使用者登入功能`)。

## 2. 斷點原則 (The Breakpoint Rule - Critical)
為落實嚴格的交付審查，Agent 必須放棄自動 Commit 與 Push 的權利：
- **Commit 斷點**：在執行代碼修改的同一輪次中，**禁止**直接執行 `git commit`。必須先展示修改結果與摘要，透過對話明確等待 User 回覆「批准」後，才能在下一輪次提交。
- **Push 斷點**：**絕對禁止** 自動執行 `git push`。必須明確詢問「是否批准上傳至遠端倉庫？」，獲得確認後方可執行。
