# Skill: Professional Architecture Sketching (Mermaid & SVG)

## Goal
產出易於維護、與 Markdown 整合度高且視覺清晰的架構圖。**優先使用 Mermaid 語法**。

## Tool Selection (工具選擇)
1. **優先選擇：Mermaid**
   - **理由**：純文字維護、VS Code 原生預覽支援、GitHub 原生渲染。
   - **適用場景**：流程圖 (Flowchart)、循序圖 (Sequence)、元件圖 (Component)、狀態圖 (State)。
2. **備選/進階：SVG**
   - **理由**：極致的排版控制與視覺豐富度。
   - **適用場景**：需要特殊造型、漸層、複雜標號或 Mermaid 無法達成的高度客製化視覺。

## Mermaid Best Practices
- **Layout**: 優先使用 `graph TD` (由上而下) 以利在文件與行動端閱讀。
- **Styling**: 明確定義 `classDef` 來區分不同的系統層次（如：UI, Core, Infrastructure）。
- **Meaningful Labels**: 節點名稱應包含功能描述 (e.g., `Agg[Aggregator Service]`)。

## SVG (Fallback/Advanced)
- 若 Mermaid 無法滿足需求，參考以下規範：
  - **Background**: White or Transparent.
  - **Typography**: Sans-serif, font-size: 14px (label).
  - ** Relative Paths**: 將產出的 `.svg` 存放在 `docs/images/` 並使用相對路徑引用。

## Workflow
1. **Analyze**: 根據需求決定使用 Mermaid 還是 SVG。
2. **Implement**: 撰寫代碼並確保在預覽模式下顯示正常。
3. **Commit**: 依照 `git-conventions.md` 提交變更。
