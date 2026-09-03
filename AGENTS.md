<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Agent Skills Configuration (Matt Pocock Skills)

This repository is configured to follow the engineering discipline and skill workflows defined in [`docs/agents/`](docs/agents/):

- **Issue Tracker:** [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md)
  - Primary: GitHub Issues ([`sandrauddman/songbook`](https://github.com/sandrauddman/songbook))
  - Local: [`docs/tickets.md`](docs/tickets.md)
- **Triage & Labels:** [`docs/agents/triage-labels.md`](docs/agents/triage-labels.md)
  - Phases (`phase-1:mvp`, `phase-2:power`, `phase-3:enhancements`), Priorities (`priority:p0`–`p3`), Types (`type:feature`, `type:backend`, `type:ui/ux`).
- **Domain Documentation:** [`docs/agents/domain.md`](docs/agents/domain.md)
  - Master Spec: [`docs/spec.md`](docs/spec.md)
  - Architecture: Next.js 16 + `json-server` (Port 3001) proxy + Tailwind CSS v4.

### Supported Skill Commands & Workflows
- `/ask-matt`: Consult recommendations on which engineering workflow to use.
- `/grill-me`: Interrogate requirements, clarify edge cases, and lock in architectural decisions.
- `/to-spec`: Transform user requirements and conversational decisions into a structured specification.
- `/to-tickets`: Deconstruct specifications into small, testable, vertical tickets.
- `/implement`: Build features following TDD and vertical slices according to active tickets.
- `/triage`: Review and assign priority, phase, and labels to issues.
