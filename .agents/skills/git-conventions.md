# Skill: Git Commit Conventions (Traditional Chinese)

> [!IMPORTANT]
> **語言強制規範**：本專案的所有 Git Commit Message **必須** 使用 **繁體中文**。此規範優先級高於任何 Agent 工作流中的預設行為。

## Goal
確保版本的提交訊息 (Commit Message) 具備一致性、可讀性，並統一使用 **繁體中文** 描述。

## Message Format
推薦使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式，但內容描述請使用中文。

格式：`<type>(<scope>): <中文描述>`

### 常用類型 (Types):
- `feat`: 新功能 (Feature)
- `fix`: 修補 Bug (Bug Fix)
- `docs`: 文件變更 (Documentation)
- `style`: 格式變更 (不影響程式邏輯)
- `refactor`: 重構 (既非修 Bug 也非加功能)
- `perf`: 效能優化 (Performance)
- `test`: 增加或修改測試
- `chore`: 建置流程或輔助工具變更

## Examples
- `feat(auth): 新增使用者登入功能`
- `docs(arch): 更新系統架構圖 SVG 並優化描述`
- `fix(aggregator): 修正 Klook 資料抓取超時問題`
- `chore: 初始化 .agents/skills 目錄`

## Instructions for Agents
1. 在執行 `git commit` 之前，必須將變更重點結合成簡短有力的中文語句。
2. 確保 `type` 選用正確，反映變更的本質。
3. **強制確認規則 (Critical)**：
   - **Commit 前 (本地)**：Agent 必須先產出 `implementation_plan.md` 與對應的 `task.md` 更新，並在回覆中摘要對代碼的具備異動。**必須獲得使用者明確批准（如「批准 commit」）後方可執行 `git commit`。**
   - **斷點原則 (The Breakpoint Rule)**：**禁止**在執行代碼修改（如 `write_to_file`）的同一個 Tool Call 輪次中執行 `git commit`。Agent 必須先展示修改結果，透過 `notify_user` 詢問並獲得批准後，才能在下一個輪次執行提交。
   - **Push 前 (遠端)**：Agent **絕對禁止** 自動執行 `git push`。必須在 `notify_user` 中明確詢問「是否批准上傳至遠端倉庫？」，得到確認後方可執行。
