---
description: [Override] 確保所有具備副作用或網路延遲的指令獲得實質驗證
---
# [Override] Agent Action Verification

> [!IMPORTANT]
> 此 Skill 為本專案的覆寫規範 (Override)，執行任何內建驗證 (Verification) 技能時，必須同時遵守以下專案特有的強制紀律。

## 強制程序 (Mandatory Procedures)

1. **指令執行監控**：若使用 `run_command` 非同步執行，**必須**透過 `command_status` 持續檢查，確保 `Exit code` 為 `0`。發生錯誤時，Agent 必須自行嘗試解讀並修復。
2. **網路操作驗證**：針對 `git push`、`npm install` 等，必須等待並確認出現成功日誌 (如 `Success`)。
3. **副作用驗證**：執行檔案操作或編譯 (`build`) 後，必須透過後續指令確認預期產物已生成。

## 回報規範 (Reporting Protocol)
- **成功時**：在給 User 的最終回報中，必須加註「已通過 [指令名稱] 驗證」。
