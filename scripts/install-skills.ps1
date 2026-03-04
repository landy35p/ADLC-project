# 安裝或更新 ADLC 專案全域 AI Agent 技能腳本
# 執行此腳本以確保您的開發環境擁有團隊統一的最新全域技能。

Write-Host "正在安裝/更新 Antigravity Awesome Skills..." -ForegroundColor Cyan
Write-Host "（此過程將使用官方的 npx 安裝工具，請確保您已安裝 Node.js）" -ForegroundColor Yellow

# 執行官方安裝指令
npx antigravity-awesome-skills

Write-Host "設定完成！Agent 現在可以存取完整的全域技能套件了。" -ForegroundColor Green
