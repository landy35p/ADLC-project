# Skill: Technical Writing & Markdown Excellence

## Goal
產出具備專業感、易讀性強且視覺效果統一的 Markdown 文件。

## Writing Principles
1.  **Structure**: 使用清晰的標題層級（H1 為頁面標題，H2 為主要段落）。
2.  **Alerts**: 善用 GitHub-style alerts (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) 來強調關鍵資訊。
3.  **Visuals**:
    *   優先使用 SVG 或相對路徑的圖片資產。
    *   避免在產出的文件直接寫入原始的 Mermaid 代碼，應先確認環境支援或產出靜態圖檔。
4.  **Tables**: 複雜的資料對照（如：API 參數、角色職責）必須使用表格。
5.  **Typography**: 專有名詞、檔案路徑、程式碼片段必須使用 backticks (e.g., `Activity`, `src/index.ts`)。

## Layout Patterns
- **Hero Section**: 產品/架構文件頂部應有簡短的 Vision Statement 與（選配的）視覺化大圖。
- **AC List**: 驗收標準應使用無序列表，並確保每一項都是可驗證的。
