# Skill: Agent Action Verification (自我驗證規範)

## Goal
確保所有執行的指令（特別是具備副作用或網路延遲的指令）在告知使用者「已完成」之前，必須經過實質的狀態驗證。

## Mandatory Procedures (強制程序)

### 1. 指令執行監控 (Command Monitoring)
- **背景執行時**：若使用 `run_command` 且 `WaitMsBeforeAsync` 設定較低，**必須**隨後呼叫 `command_status`。
- **狀態檢查循環**：持續檢查直到狀態為 `DONE`。
- **結束碼驗證**：確保 `Exit code` 為 `0`。若不為 `0`，必須讀取錯誤訊息並進行修正，不得直接回報完成。

### 2. 網路操作驗證 (Network Ops)
- 針對 `git push`、`npm install`、`docker push` 等操作：
    - 不能僅憑「指令已送出」就回報成功。
    - 必須看到 Git 的 `master -> master (Success)` 或類似的成功日誌輸出。

### 3. 環境副作用驗證 (Side-effect Verification)
- **檔案操作**：執行 `mv` 或 `rm` 後，呼叫 `list_dir` 確保檔案確實如預期移動或刪除。
- **編譯操作**：執行 `build` 後，確保生成了預期的產物（如 `dist/` 或 `.js` 檔案）。

## Reporting Protocol (回報規範)
- **失敗時**：誠實說明失敗原因與預計採取的修正措施。
- **成功時**：在回報中加註「已通過 [指令名稱] 驗證」。

## Example
> **Agent**: 我正在執行 Git Push... (呼叫 command_status)
> **Agent**: (Status 為 DONE) Push 已完成。
> **Agent**: 報告使用者：已成功移除檔案並完成推送。
