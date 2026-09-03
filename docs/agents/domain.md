# Domain Documentation & Engineering Guidelines

## Product Summary
**Digital Sångbok** is a modern, mobile-first responsive web application for singing traditional Swedish snapsvisor and drinking songs during social gatherings (kräftskivor, midsommar, dinner parties, student festivities).

## Core Documentation References
- **Master Product & Technical Specification:** [`docs/spec.md`](../spec.md)
- **Ticket Backlog:** [`docs/tickets.md`](../tickets.md)
- **Wireframes & Concepts:** [`docs/wireframe/`](../wireframe/)

## Technical Architecture
- **Framework:** Next.js 16 (App Router) on Port 3000
- **Data Persistence:** `json-server` (v0.17.4) on Port 3001 watching `data/db.json`
- **Orchestration:** `concurrently` running `next dev -p 3000` and `json-server --watch data/db.json --port 3001` via `npm run dev`
- **Proxy Layer:** Next.js API route handlers in `app/api/*` proxy all client requests to `json-server`
- **State & Storage:** Client `localStorage` for favorites (`useFavorites.ts`) and font scaling (`useFontSize.ts`)
- **Styling:** Tailwind CSS v4, Lucide React icons, mobile-first responsive layouts
- **Theme Modes:** Nordic Tavern (Dark) & Parchment (Light)

## Engineering Discipline & Best Practices
1. **Vertical Slices:** Implement features as complete vertical slices (Data/API -> Client Hook -> UI Component -> Page Integration).
2. **Type Safety:** Maintain strict TypeScript types defined in `types/song.ts`.
3. **Spec Alignment:** Every change must adhere to the data structures and endpoint contracts in `docs/spec.md`.
4. **Verification:** Test API responses and component renders before marking tasks done.
