# Skill: Professional Architecture Sketching (SVG)

## Goal
產出文字精確、排版工整且無須外部外掛即可顯示的向量架構圖 (SVG)。

## Design System
- **Background**: White or Transparent.
- **Node Colors**:
    - **Frontend/UI**: Blue (#e3f2fd, stroke: #1976d2)
    - **App Core**: Green (#e8f5e9, stroke: #2e7d32)
    - **Data/Infrastructure**: Orange (#fff3e0, stroke: #e65100)
    - **External Service**: Grey (#f5f5f5, stroke: #616161)
- **Arrows**: Solid black for direct flow, Dashed red for feedback loops.
- **Typography**: Sans-serif (Arial/Inter), font-size: 14px (label), 12px (description).

## SVG Template Structure
```xml
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <!-- CSS Styles for fonts and effects -->
  <style>
    .node { font-family: sans-serif; font-size: 14px; font-weight: bold; }
    .label { font-family: sans-serif; font-size: 11px; fill: #666; }
  </style>
  <!-- Nodes and connectors -->
</svg>
```

## Workflow
1.  **Sketching**: 先在腦中規劃層次（Top-Down 或 Layered）。
2.  **Coding**: 直接撰寫 `<rect>`, `<text>`, `<path>` 元素。
3.  **Labeling**: 確保文字座標與方框中心對齊（text-anchor="middle"）。
4.  **Output**: 將代碼儲存為 `.svg` 檔案，並以相對路徑嵌入 Markdown。
