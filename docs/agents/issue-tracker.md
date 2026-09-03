# Agent Issue Tracker Configuration

## Primary Issue Tracker
- **Type:** GitHub Issues
- **Repository:** `sandrauddman/songbook`
- **URL:** [https://github.com/sandrauddman/songbook/issues](https://github.com/sandrauddman/songbook/issues)
- **Project Board:** [https://github.com/sandrauddman/songbook/projects](https://github.com/sandrauddman/songbook/projects)

## Secondary / Local Tracker
- **File:** [`docs/tickets.md`](../tickets.md)
- **Format:** Markdown document defining tickets with Title, Milestone, Priority, Labels, User Stories, Technical Scope, and Acceptance Criteria checklists.

## Automation & Tools
- **Automation Script:** [`scripts/setup-github-issues.mjs`](../../scripts/setup-github-issues.mjs) (Node.js script to sync milestones, labels, and issues with GitHub API)
- **GitHub Action Workflow:** [`.github/workflows/setup-tickets.yml`](../../.github/workflows/setup-tickets.yml) (1-click issue provisioning via GitHub Actions)

## Rules for Agents
1. When tasked with implementing a ticket, always reference its Ticket ID (e.g. `T-01`, `T-02`) and verify against its Acceptance Criteria checklist.
2. Mark completed acceptance criteria as checked `[x]` in local documentation or PR descriptions.
3. Keep tickets small, vertical, and testable.
