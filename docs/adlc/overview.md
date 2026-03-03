# ADLC (Agentic Development Lifecycle) 概覽

本文件說明專案中各個 AI Agent 之間的職責分配、交接規則以及自動化回饋循環邏輯。

## 1. 代理人關係圖 (Orchestration Map)

這張圖展示了 Agent 在開發生命週期中的縱向流轉、核心交付物以及回饋機制。

<svg width="600" height="900" viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { stroke-width: 2; rx: 10; ry: 10; }
    .text-title { font-family: 'Segoe UI', Arial, sans-serif; font-size: 16px; font-weight: bold; text-anchor: middle; fill: #333; }
    .text-desc { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; text-anchor: middle; fill: #666; }
    .arrow { stroke: #455a64; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    .loop-red { stroke: #ef5350; stroke-width: 2; fill: none; stroke-dasharray: 6,4; marker-end: url(#arrowhead-red); }
    .loop-blue { stroke: #42a5f5; stroke-width: 2; fill: none; stroke-dasharray: 6,4; marker-end: url(#arrowhead-blue); }
    .group-bg { fill: #fafafa; stroke: #cfd8dc; stroke-width: 1; stroke-dasharray: 4,4; rx: 15; ry: 15; }
  </style>

  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#455a64" />
    </marker>
    <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ef5350" />
    </marker>
    <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#42a5f5" />
    </marker>
  </defs>

  <!-- Start -->
  <circle cx="300" cy="40" r="10" fill="#37474f" />
  <text x="300" y="25" class="text-desc" font-weight="bold">User Vision</text>
  <line x1="300" y1="50" x2="300" y2="80" class="arrow" />

  <!-- Phase 1: Product -->
  <rect x="200" y="80" width="200" height="70" class="box" fill="#e3f2fd" stroke="#1976d2" />
  <text x="300" y="115" class="text-title">Product Agent</text>
  <text x="300" y="135" class="text-desc">PRD & AC Definition</text>
  <line x1="300" y1="150" x2="300" y2="180" class="arrow" />

  <!-- Phase 2: Architect -->
  <rect x="200" y="180" width="200" height="70" class="box" fill="#f3e5f5" stroke="#7b1fa2" />
  <text x="300" y="215" class="text-title">Architect Agent</text>
  <text x="300" y="235" class="text-desc">System Design & Specs</text>
  <line x1="300" y1="250" x2="300" y2="280" class="arrow" />

  <!-- Phase 3: Dev -->
  <rect x="200" y="280" width="200" height="70" class="box" fill="#e8f5e9" stroke="#2e7d32" />
  <text x="300" y="315" class="text-title">Dev Agent</text>
  <text x="300" y="335" class="text-desc">Coding & Verification</text>
  <line x1="300" y1="350" x2="300" y2="400" class="arrow" />

  <!-- Feedback Group: QA & Security -->
  <rect x="50" y="400" width="500" height="150" class="group-bg" />
  <text x="100" y="420" class="text-desc" font-weight="bold">Validation Shield</text>

  <rect x="100" y="440" width="180" height="70" class="box" fill="#fff9c4" stroke="#fbc02d" />
  <text x="190" y="475" class="text-title">Security Agent</text>
  <text x="190" y="495" class="text-desc">Security Audit</text>

  <rect x="320" y="440" width="180" height="70" class="box" fill="#fff3e0" stroke="#f57c00" />
  <text x="410" y="475" class="text-title">QA Agent</text>
  <text x="410" y="495" class="text-desc">Integration Testing</text>

  <!-- Inner Loop Arrows -->
  <path d="M 100,475 Q 20,475 20,315 T 190,315" class="loop-red" />
  <text x="60" y="380" class="text-desc" fill="#ef5350">Bug / Vulnerability Fix</text>

  <line x1="300" y1="550" x2="300" y2="600" class="arrow" />

  <!-- Phase 5: DevOps -->
  <rect x="200" y="600" width="200" height="70" class="box" fill="#fafafa" stroke="#455a64" />
  <text x="300" y="635" class="text-title">DevOps Agent</text>
  <text x="300" y="655" class="text-desc">Build & Deploy</text>
  <line x1="300" y1="670" x2="300" y2="700" class="arrow" />

  <!-- Phase 6: SRE -->
  <rect x="200" y="700" width="200" height="70" class="box" fill="#ffebee" stroke="#c62828" />
  <text x="300" y="735" class="text-title">SRE Agent</text>
  <text x="300" y="755" class="text-desc">Monitoring & Stability</text>

  <!-- Outer Loop: Requirement Change -->
  <path d="M 400,735 Q 580,735 580,115 T 410,115" class="loop-blue" />
  <text x="500" y="420" class="text-desc" fill="#42a5f5">Feedback / Change</text>

  <!-- Footnote -->
  <text x="300" y="850" class="text-desc" fill="#999">© ADLC Orchestration Map - Vertical Visualization</text>
</svg>

> [!TIP]
> **如何閱讀此圖**：
> - **實線箭頭**：核心交付流程（從需求到部署）。
> - **紅色虛線**：內部快速回饋循環（發生 Bug 或安全漏洞時自動退回）。
> - **藍色虛線**：外部長期閉環（根據生產環境數據優化或需求變更回饋到產品端）。

---

## 2. 角色職責說明 (Agent Roles)

| 角色 (Agent) | 產出物 (Artifacts) | 核心目標 (Key Objective) |
| :--- | :--- | :--- |
| **Product** | `docs/prd.md` | 定義「做什麼」與驗收標準 (AC)。 |
| **Architect** | `docs/architecture-design.md` | 定義「怎麼做」的結構與技術選型。 |
| **Dev** | 原始碼 / 單元測試 | 實作邏輯並確保本地編譯通過。 |
| **Security** | `docs/security-audit.md` | 安全性左移，阻斷含漏洞的代碼。 |
| **QA** | 整合測試報告 | 驗證代碼是否符合 PM 定義的 AC。 |
| **DevOps** | `Dockerfile` / CI-CD YAML | 自動化建置、測試與打包部署。 |
| **SRE** | `docs/rca-report.md` | 監控線上穩定性，主動發現運行異常。 |

---

## 3. 核心循環邏輯 (Feedback Loops)

### 內部循環 (The Inner Loop)
當 **Security** 或 **QA** 偵測到問題時，流程會自動「阻斷」並退回給 **Dev**。這是為了確保沒有瑕疵的程式碼進入部署階段。

### 外部循環 (The Outer Loop)
當 **SRE** 在生產環境偵測到異常，或 **User** 提出新需求時，流程會退回至 **Dev** (修正) 或 **Product** (重新定義)，形成持續進化的閉環。

---

## 4. 如何啟動？
您可以直接呼叫 `/pm-orchestrator` 來讓 Orchestrator Agent 引導您完成整個開發生命週期的管理。
