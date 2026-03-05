---
description: 執行具備交互回饋機制的 ADLC 階層式開發工作流 (Planning -> Execution -> Validation)
---

這是一個自動化的多代理人協作流程。請嚴格執行以下階層步驟，運用檔案作為上下文隔離與交接的橋樑。

### Phase 1: 策略與規劃層的「協商與拆解」 (Strategy & Planning - Debate Protocol)
1. **[Product Agent]** 閱讀使用者的原始需求，產出 `docs/prd.md` 的初稿 (Draft)，必須包含明確的 User Story 與 Acceptance Criteria (AC)。
// turbo
2. **[Architect Agent 審查]** 讀取剛產生的 `docs/prd.md`，從技術可行性與架構層面進行審查評估。
3. **[交互與回測 (Feedback Loop)]** 根據 Architect 的評估結果：
   - **分支 A (需修改)**：若技術不可行或效能風險太高，請 **[Architect Agent]** 列出具體修改建議。接著切換為 **[Product Agent]**，根據建議修改 `docs/prd.md`。此步驟最多反覆 2 次，若仍無共識請暫停並詢問 User。
   - **分支 B (沒問題)**：若審查通過，進入 Step 4。
4. **[Architect Agent 定案與拆解]** 雙方達成共識後，**[Architect Agent]** 執行以下任務：
   - 產生 `docs/architecture-design.md`，定義技術選型、Schema 與 API 規格。
   - 分析上述文件，在 `.agents/task_plan.md` 中建立一組「原子化、可被獨立執行」的 Task 列表 (Ticket)，並標示依賴關係。
   - **[強制規範]** 必須在 task_plan.md 的最後階段，明確加入「更新專案文件 (如 README.md, API docs)」的原子任務。

### Phase 2: 執行層 (Execution - Atomic Tasks)
5. **[Dev Agent]** 讀取 `.agents/task_plan.md` 中第一個未完成的 Task。
6. **[Dev Agent]** 嚴格遵循 PRD 的 AC 與 Architecture 的技術規範，開始攥寫程式碼。完成後，將該 Task 標記為 `[x]`。若還有未完成之 Task，重複 Step 5，直到所有 Task 皆被實作完畢。
// turbo
7. **[編譯與驗證]** 根據【個人全局指令】，由主控端主動尋找並執行專案對應的建置指令 (如 `npm run build` 或 `dotnet build`) 進行本地編譯驗證。如果編譯失敗，自動讀取 Error 訊息完成修正，直到編譯成功。

### Phase 3: 驗證防線 (Validation - Parallel Dispatch)
8. **並行分派 (Parallel Dispatch)**：請**同時 (在觀念上平行處理)**啟動以下兩項審查任務：
   - 任務 A **[Security Agent]**：掃描方才撰寫的程式碼，重點檢查代碼安全性與合規性，並在 `docs/security-audit.md` 輸出漏洞分析結果。
   - 任務 B **[QA Agent]**：對照 `docs/prd.md` 檢查新代碼，驗證邏輯是否遺漏，並在 `docs/qa-report.md` 輸出整合測試評估或 Bug 報告。
9. **[結果彙整與退件機制]** 檢視 `security-audit.md` 與 `qa-report.md`。
   - 若有阻斷性問題 (Blocker Bug / Vulnerability)，請將問題彙整成清單，退回 Phase 2 (Step 5)，要求 **[Dev Agent]** 針對清單進行修復。
   - 若皆通過 (Pass)，則進入下一步。

### Phase 4: 交付與部署準備 (Delivery)
10. **[DevOps Agent]** 檢閱本次更新是否需要改動 CI/CD 腳本或 `Dockerfile`，並進行必要的相應調整。
11. **[DevOps Agent]** 核對專案文件 (如 `README.md`) 是否與最新的 `docs/prd.md` 功能同步，若有遺漏立即補齊。
12. **[Git 操作規範]** 執行終端機指令（特別是 `git add` / `git commit`）前，必須嚴格檢查並 `cd` 至正確的目標工作目錄 (CWD)，避免因路徑錯誤導致漏提交。
13. 最後，向 User 總結本次 ADLC 開發週期的成功與否、修復了幾次 Bug，以及完成的產出物。
