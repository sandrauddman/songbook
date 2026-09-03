# Agent Triage & Label Vocabulary

## Phase / Milestone Labels
- `phase-1:mvp`: Core Lean MVP features (P0). Pure songbook experience, search, font sizing, `json-server` persistence.
- `phase-2:power`: Power Features & Admin (P1). Admin CRUD, PIN auth proxy, table QR sharing, local favorites, wake lock, dark/light themes.
- `phase-3:enhancements`: Booklets & Offline (P2/P3). Custom event booklets (*sånghäften*), category deletion wizard, PWA offline, PDF export.

## Priority Labels
- `priority:p0`: Critical / Blocker / MVP essential requirement.
- `priority:p1`: High priority power feature.
- `priority:p2`: Medium priority enhancement.
- `priority:p3`: Low priority polish or physical backup feature.

## Type Labels
- `type:feature`: User-facing capability or functionality.
- `type:backend`: Server route, proxy, `json-server`, data layer, authentication.
- `type:ui/ux`: Layout, responsive styling, design system, theme tokens, accessibility.
- `type:bug`: Bug fix or defect remediation.
- `type:refactor`: Code restructuring without functional change.

## Issue Status Pipeline
1. `Backlog` — Unprioritized or future phase issues.
2. `To Do / Ready` — Prioritized and spec'd issues ready for active implementation.
3. `In Progress` — Actively being worked on by developer or agent.
4. `Review / QA` — Implementation complete; running verification and review.
5. `Done` — Verified against acceptance criteria and merged.
