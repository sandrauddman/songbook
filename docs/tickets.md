# Project Backlog & GitHub Tickets: Digital Sångbok

This document defines the complete issue/ticket backlog derived from [`docs/spec.md`](./spec.md) for the **Digital Sångbok** web application. Each ticket contains user stories, technical scope, file paths, acceptance criteria, and priority tags ready to be created as GitHub Issues or loaded into a GitHub Project board.

---

## 📋 Suggested GitHub Project Board Setup

### Suggested Columns
1. 📥 **Backlog** (Unprioritized or upcoming phase tickets)
2. 🎯 **To Do / Ready** (Tickets ready to be picked up in current sprint/phase)
3. 🚧 **In Progress** (Currently active)
4. 🔍 **Review / QA** (Under testing or PR review)
5. ✅ **Done** (Completed and verified)

### Label Taxonomy
| Label | Description | Color |
| :--- | :--- | :--- |
| `phase-1:mvp` | Phase 1: The Lean MVP (P0) | `#E11D48` (Red) |
| `phase-2:power` | Phase 2: Power Features & Admin (P1) | `#2563EB` (Blue) |
| `phase-3:enhancements` | Phase 3: Booklets & Offline (P2/P3) | `#059669` (Green) |
| `type:feature` | New user-facing capability | `#0EA5E9` (Cyan) |
| `type:backend` | API routes, `json-server`, data layer | `#8B5CF6` (Purple) |
| `type:ui/ux` | Styling, components, accessibility | `#F59E0B` (Amber) |
| `priority:p0` | Core MVP requirement | `#DC2626` (Bright Red) |
| `priority:p1` | High priority power feature | `#D97706` (Orange) |
| `priority:p2` | Secondary enhancement | `#10B981` (Teal) |
| `priority:p3` | Polish / Future iteration | `#6B7280` (Gray) |

---

# 🚀 Phase 1: The Lean MVP (P0)

## Ticket T-01: Data Persistence & Development Sidecar Workflow Setup
- **Milestone:** Phase 1 (MVP)
- **Priority:** `priority:p0`
- **Labels:** `phase-1:mvp`, `type:backend`, `priority:p0`
- **User Story:** US-6: As a developer, I want `npm run dev` to start both Next.js and `json-server` watching `data/db.json`.

### Description
Set up the `json-server` mock REST database sidecar process and seed `data/db.json` with 25+ curated traditional Swedish snapsvisor and core categories. Configure `package.json` scripts with `concurrently` to orchestrate both processes simultaneously.

### Technical Scope
- **Files Created/Modified:**
  - `data/db.json` (Seed 25+ songs and initial categories: Snapsvisor, Kräftskiva, Midsommar, Jul & Vinter, Öl & Studentvisor)
  - `package.json` (Add `json-server@0.17.4`, `concurrently`, scripts: `dev`, `dev:next`, `dev:server`)
  - `.env.local` (`JSON_SERVER_URL=http://localhost:3001`)
  - `types/song.ts` (TypeScript definitions for `Song`, `Category`, `SongFormData`, `CategoryFormData`)

### Acceptance Criteria
- [ ] `data/db.json` contains valid JSON with `categories` and at least 25 Swedish songs with `id`, `slug`, `title`, `melody`, `categoryId`, `lyrics` array, `tags`, `notes`, and `language`.
- [ ] Running `npm run dev` starts Next.js on port 3000 and `json-server` on port 3001 in parallel.
- [ ] `http://localhost:3001/songs` and `http://localhost:3001/categories` respond with JSON data.
- [ ] `types/song.ts` exports all required interfaces and types.

---

## Ticket T-02: Next.js API Proxy Routes & HTTP Client
- **Milestone:** Phase 1 (MVP)
- **Priority:** `priority:p0`
- **Labels:** `phase-1:mvp`, `type:backend`, `priority:p0`
- **User Story:** US-1, US-2, US-5: As a frontend client, I want Next.js API routes that proxy requests to `json-server` on port 3001.

### Description
Create Next.js App Router API route handlers (`/api/songs`, `/api/songs/[id]`, `/api/categories`) that securely proxy read requests to `json-server`, supporting query search (`?q=...`) and category filtering (`?categoryId=...`).

### Technical Scope
- **Files Created/Modified:**
  - `lib/json-server-client.ts` (Fetch utility helper for `http://localhost:3001`)
  - `app/api/songs/route.ts` (GET proxy forwarding `q` and `categoryId` params)
  - `app/api/songs/[id]/route.ts` (GET single song by slug/id)
  - `app/api/categories/route.ts` (GET categories sorted by `order`)
  - `hooks/useSongs.ts` (React hook for fetching and searching songs)
  - `hooks/useCategories.ts` (React hook for fetching categories)

### Acceptance Criteria
- [ ] `GET /api/songs` returns all songs from `json-server`.
- [ ] `GET /api/songs?q=helan` performs full-text search against lyrics, title, melody, tags.
- [ ] `GET /api/songs?categoryId=snaps` filters songs by category ID.
- [ ] `GET /api/songs/[id]` returns 200 with the single song object or 404 if not found.
- [ ] `GET /api/categories` returns category list ordered by `order`.

---

## Ticket T-03: Catalog Home View with Debounced Search & Category Chips
- **Milestone:** Phase 1 (MVP)
- **Priority:** `priority:p0`
- **Labels:** `phase-1:mvp`, `type:ui/ux`, `type:feature`, `priority:p0`
- **User Story:** US-1, US-2: As a party guest, I want to search and filter songs on the home page so I can find any snapsvisa in under 2 seconds.

### Description
Implement the responsive home page (`/`) featuring a festive header, debounced search bar, horizontal scrollable category chip bar, and responsive grid of `SongCard` components.

### Technical Scope
- **Files Created/Modified:**
  - `app/page.tsx` (Main catalog view)
  - `components/Header.tsx` (App title, logo, subtitle)
  - `components/SearchAndFilter.tsx` (Debounced search input with clear button, category chip filter list with song count badges)
  - `components/SongCard.tsx` (Title, melody, category badge, lyrics preview snippet, link to `/visa/[slug]`)
  - `app/globals.css` (Tailwind v4 styling and responsive layout variables)

### Acceptance Criteria
- [ ] Typing in the search input debounces requests (~300ms) to `/api/songs?q=...`.
- [ ] Clicking category chips filters the list immediately, updating active chip style and URL state.
- [ ] Displays empty state (*"Inga visor hittades"*) with a reset search button when 0 results match.
- [ ] Responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop.
- [ ] Clicking a `SongCard` navigates to `/visa/[slug]`.

---

## Ticket T-04: Sing-Along Lyric View & Song Navigation
- **Milestone:** Phase 1 (MVP)
- **Priority:** `priority:p0`
- **Labels:** `phase-1:mvp`, `type:ui/ux`, `type:feature`, `priority:p0`
- **User Story:** US-3, US-5: As a singer around a dinner table, I want large high-contrast lyrics with distinct verse spacing, melody banners, and next/prev buttons.

### Description
Build the dedicated sing-along song view (`/visa/[slug]`) optimized for low-light dinner environments. Include clear title hierarchy, "Melodi: ..." banner, formatted stanza line breaks, ritual notes callouts, and bottom navigation to cycle through songs.

### Technical Scope
- **Files Created/Modified:**
  - `app/visa/[slug]/page.tsx` (Dynamic route with SSR metadata and dynamic params)
  - `components/SongDetail.tsx` (Large typography lyric display, toast/ritual callout box)
  - Prev/Next navigation bar with keyboard arrow navigation (`ArrowLeft` / `ArrowRight`)

### Acceptance Criteria
- [ ] Navigating to `/visa/helan-gar` renders song title, category badge, melody name, notes callout, and formatted lyrics.
- [ ] Stanzas/lines preserve proper spacing and readability.
- [ ] Prev / Next buttons navigate smoothly between adjacent songs in the catalog.
- [ ] Left/Right keyboard arrows navigate to previous/next songs on desktop/tablet.
- [ ] Shows 404/not-found screen if an invalid slug is requested.

---

## Ticket T-05: One-Tap Dynamic Font Sizing Stepper
- **Milestone:** Phase 1 (MVP)
- **Priority:** `priority:p0`
- **Labels:** `phase-1:mvp`, `type:ui/ux`, `type:feature`, `priority:p0`
- **User Story:** US-4: As a user, I want `A-` / `A+` buttons to resize text on the fly, with my preferred size saved in `localStorage`.

### Description
Implement persistent dynamic font sizing across the song detail view. Users can adjust text size between 4 presets (Normal, Large, X-Large, Huge) via a sticky header control.

### Technical Scope
- **Files Created/Modified:**
  - `hooks/useFontSize.ts` (Font size state management with `localStorage` persistence)
  - `components/FontSizeControls.tsx` (`A-` / `A+` button stepper with visual active step indicators)
  - Integrate into `components/SongDetail.tsx` and `app/visa/[slug]/page.tsx`

### Acceptance Criteria
- [ ] `A-` decreases font size down to minimum (Normal); `A+` increases font size up to maximum (Huge).
- [ ] Stepper buttons disable when reaching minimum or maximum bounds.
- [ ] Font size preference is saved to `localStorage` and restored automatically when opening another song.
- [ ] Lyric text scales smoothly without breaking UI layout or line wrapping on mobile.

---

# ⚡ Phase 2: Admin Management & Power Features (P1)

## Ticket T-06: Admin PIN Authentication & Proxy Security
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:backend`, `priority:p1`
- **User Story:** US-7: As an admin/toastmaster, I want to authenticate with a secure PIN to manage songs and categories.

### Description
Implement PIN-based authentication for the `/admin` portal. API mutation routes (`POST`, `PUT`, `DELETE` on `/api/songs` and `/api/categories`) must verify the admin PIN session cookie before proxying changes to `json-server`.

### Technical Scope
- **Files Created/Modified:**
  - `app/api/admin/verify/route.ts` (Verifies PIN against environment variable `ADMIN_PIN` and sets HTTP-only session cookie)
  - `hooks/useAdminAuth.ts` (Admin auth state hook: `isAuthenticated`, `login(pin)`, `logout()`)
  - `components/admin/AdminLogin.tsx` (PIN entry keypad/card UI with error feedback)
  - `.env.local` (Add `ADMIN_PIN=1234` default fallback)

### Acceptance Criteria
- [ ] Entering the correct PIN issues a secure session and grants access to `/admin`.
- [ ] Entering an incorrect PIN displays a clear error message and prevents access.
- [ ] API routes reject unauthorized `POST`/`PUT`/`DELETE` calls with HTTP 401 Unauthorized.
- [ ] Logout button clears the session cookie and redirects to `/admin` login screen.

---

## Ticket T-07: Admin Song Management with Live Preview (CRUD)
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:feature`, `type:ui/ux`, `priority:p1`
- **User Story:** US-7: As an admin, I want to add, edit, and delete songs with a live preview so I can customize the catalog for parties.

### Description
Create the song management dashboard in `/admin` with a searchable song table, an "Add Song" / "Edit Song" modal featuring live side-by-side lyrics rendering, auto-slug generator, and a deletion confirmation modal.

### Technical Scope
- **Files Created/Modified:**
  - `app/admin/page.tsx` (Tabs: Songs & Categories)
  - `components/admin/SongTable.tsx` (Searchable, sortable song management table with edit/delete actions)
  - `components/admin/SongFormModal.tsx` (Form inputs: Title, Melody, Category, Multi-line Lyrics, Tags, Notes; split-screen preview)
  - `components/admin/DeleteConfirmModal.tsx` (Confirmation dialog before deletion)
  - `app/api/songs/route.ts` (Add authenticated `POST` handler)
  - `app/api/songs/[id]/route.ts` (Add authenticated `PUT` and `DELETE` handlers)

### Acceptance Criteria
- [ ] Admin can add a new song; slug is automatically suggested from title.
- [ ] Live preview updates in real-time as admin types lyrics, melody, or notes.
- [ ] Submitting form persists new/updated song to `data/db.json` via `json-server`.
- [ ] Admin can edit an existing song with pre-populated fields.
- [ ] Deleting a song opens a confirmation dialog; confirming removes the record from `data/db.json`.

---

## Ticket T-08: Admin Category Management (CRUD)
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:feature`, `type:ui/ux`, `priority:p1`
- **User Story:** US-8: As an admin, I want to create and edit categories with emojis, titles, and color badges.

### Description
Implement category management in `/admin` enabling the host to create custom event categories (e.g. *Nyår 🍾*, *Kräftskiva 🦞*, *Bröllop 💍*) with emoji pickers and color badge themes.

### Technical Scope
- **Files Created/Modified:**
  - `components/admin/CategoryTable.tsx` (List of categories with song counts and edit/delete buttons)
  - `components/admin/CategoryFormModal.tsx` (Name, Slug, Emoji preset selector, Color badge selector, Description, Order)
  - `app/api/categories/route.ts` (Add authenticated `POST` handler)
  - `app/api/categories/[id]/route.ts` (Add authenticated `PUT` and `DELETE` handlers)

### Acceptance Criteria
- [ ] Admin can view all categories with associated song counts.
- [ ] Admin can create a new category with custom emoji and color theme.
- [ ] Admin can edit an existing category's name, emoji, color, or sort order.
- [ ] Changes immediately reflect in the public catalog filter chips and song badges.

---

## Ticket T-09: Table QR Code Sharing Modal
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:feature`, `type:ui/ux`, `priority:p1`
- **User Story:** US-9: As a party guest, I want to show a QR code for a song on my phone so table mates can scan it with their camera.

### Description
Add a prominent "Dela med bordet" button on every song lyric page (`/visa/[slug]`) that opens a clean, high-contrast modal displaying a scannable QR code for the current URL, with a copy link button.

### Technical Scope
- **Files Created/Modified:**
  - `components/ShareQRModal.tsx` (Modal dialog with QR code generator using `qrcode.react` or SVG canvas)
  - Copy to clipboard button with success toast feedback
  - Integration into `components/SongDetail.tsx`

### Acceptance Criteria
- [ ] Clicking "Dela med bordet" opens a clean modal with the rendered QR code.
- [ ] Scanning the QR code with another smartphone opens the exact `/visa/[slug]` URL.
- [ ] "Kopiera länk" button copies the URL to clipboard with visual feedback (*"Kopierad!"*).
- [ ] Modal can be closed via tap outside, close `✕` button, or `Escape` key.

---

## Ticket T-10: Local Favorites Bookmarking (⭐)
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:feature`, `priority:p1`
- **User Story:** US-10: As a guest, I want to star songs and access a "⭐ Mina favoriter" tab stored locally in my browser.

### Description
Implement a client-side favorites system allowing users to star/unstar songs from the catalog cards or the lyric view. Add a persistent "⭐ Mina favoriter" filter tab to the home page filter chips.

### Technical Scope
- **Files Created/Modified:**
  - `hooks/useFavorites.ts` (Manages favorites state in `localStorage`: `toggleFavorite(songId)`, `isFavorite(songId)`, `favoriteIds`)
  - `components/SongCard.tsx` (Interactive star button with filled/unfilled state)
  - `components/SongDetail.tsx` (Star button in header)
  - `components/SearchAndFilter.tsx` (Add "⭐ Favoriter (N)" chip)

### Acceptance Criteria
- [ ] Tapping the star icon on any card or detail page toggles favorite status.
- [ ] Star status persists across page reloads and browser sessions via `localStorage`.
- [ ] Clicking the "⭐ Favoriter" filter chip shows only starred songs.
- [ ] If no favorites exist, selecting the tab displays a friendly empty state message (*"Du har inga sparade favoriter än. Klicka på stjärnan för att spara!"*).

---

## Ticket T-11: Screen Wake Lock API & Status Pill
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:feature`, `type:ui/ux`, `priority:p1`
- **User Story:** US-11: As a singer, I want my phone screen to stay awake while viewing lyrics so it doesn't turn off mid-toast.

### Description
Integrate the Browser Screen Wake Lock API (`navigator.wakeLock`) on the song detail page (`/visa/[slug]`). Provide a subtle visual status pill in the UI indicating that the screen is being kept awake, with graceful fallback for unsupported browsers.

### Technical Scope
- **Files Created/Modified:**
  - `hooks/useWakeLock.ts` (Requests wake lock on mount, releases on unmount, handles visibility change re-acquisition)
  - `components/WakeLockIndicator.tsx` (Small status pill with lock/bulb icon and tooltip)
  - Integration into `components/SongDetail.tsx`

### Acceptance Criteria
- [ ] Screen Wake Lock is requested automatically upon entering `/visa/[slug]`.
- [ ] Screen remains illuminated without dimming on supported mobile browsers (iOS Safari 16.4+, Chrome Android).
- [ ] Status indicator displays *"Skärmen hålls vaken"* when active.
- [ ] Lock is gracefully released when navigating back to the catalog or switching tabs.
- [ ] Gracefully degrades on unsupported browsers without throwing console errors.

---

## Ticket T-12: Dark & Light Theme Switcher
- **Milestone:** Phase 2 (Power Features)
- **Priority:** `priority:p1`
- **Labels:** `phase-2:power`, `type:ui/ux`, `priority:p1`
- **User Story:** US-12: As a user, I want to toggle between Nordic Tavern dark mode and Parchment light mode.

### Description
Implement a global theme switcher allowing users to toggle between **Nordic Tavern (Dark Mode)** and **Parchment (Light Mode)**, with system preference detection and `localStorage` persistence.

### Technical Scope
- **Files Created/Modified:**
  - `hooks/useTheme.ts` (Theme hook with `theme`, `toggleTheme`, `setTheme`)
  - `components/Header.tsx` (Theme toggle button with Sun / Moon icon)
  - `app/globals.css` (Tailwind CSS custom color tokens for tavern dark vs parchment light)
  - `app/layout.tsx` (Theme provider script preventing flash of unstyled theme on load)

### Acceptance Criteria
- [ ] Toggling theme switches the whole application between Tavern Dark and Parchment Light.
- [ ] Selected theme is saved in `localStorage` and applied on reload without UI flash.
- [ ] High contrast lyric text and clear readable badges in both themes.
- [ ] Defaults to user's system OS preference (`prefers-color-scheme`) on initial visit.

---

# 📦 Phase 3: Party Enhancements & Booklets (P2 / P3)

## Ticket T-13: Custom Event Booklets (*Sånghäften*)
- **Milestone:** Phase 3 (Enhancements)
- **Priority:** `priority:p2`
- **Labels:** `phase-3:enhancements`, `type:feature`, `priority:p2`
- **User Story:** US-13: As a dinner host, I want to build a custom ordered song list for a party with a dedicated shareable booklet URL.

### Description
Enable hosts to create named event booklets (e.g. *"Midsommar 2026"*, *"Kräftskiva hos Anna"*) by selecting and ordering songs. Provide a dedicated guest booklet view (`/hafte/[slug]`) that steps through the curated songs in sequence.

### Technical Scope
- **Files Created/Modified:**
  - `app/api/booklets/route.ts` (GET all booklets, POST create booklet)
  - `app/api/booklets/[id]/route.ts` (GET single booklet, PUT/DELETE)
  - `app/hafte/[slug]/page.tsx` (Guest booklet view with progress bar and step-through navigation)
  - Admin Booklet Management tab in `/admin`

### Acceptance Criteria
- [ ] Admin can create a booklet with a title, description, and ordered list of songs.
- [ ] Booklets are stored in `data/db.json` under `"booklets"`.
- [ ] Navigating to `/hafte/[slug]` renders the event title, song index, and sequential next/prev buttons.
- [ ] Booklet link can be shared via QR code or direct URL.

---

## Ticket T-14: Category Deletion Safety Reassignment Wizard
- **Milestone:** Phase 3 (Enhancements)
- **Priority:** `priority:p2`
- **Labels:** `phase-3:enhancements`, `type:feature`, `type:ui/ux`, `priority:p2`
- **User Story:** US-14: As an admin deleting a category, I want a wizard prompting me to reassign existing songs to another category before deletion.

### Description
Prevent orphaned songs when deleting a category in `/admin`. If songs belong to the category being deleted, display a modal wizard allowing the admin to choose a target replacement category for all affected songs before completing deletion.

### Technical Scope
- **Files Created/Modified:**
  - `components/admin/CategoryDeleteModal.tsx` (Safety modal detecting song references and providing reassignment dropdown)
  - `app/api/categories/[id]/route.ts` (Batch-update songs' `categoryId` before deleting category)

### Acceptance Criteria
- [ ] If a category has 0 songs, admin is shown a simple delete confirmation.
- [ ] If a category has 1+ songs, modal warns the admin and displays a dropdown to select a replacement category.
- [ ] Confirming reassignment updates all affected songs in `data/db.json` and deletes the category without errors.
- [ ] Prevents orphaned `categoryId` references in the database.

---

## Ticket T-15: Offline PWA & Service Worker Support
- **Milestone:** Phase 3 (Enhancements)
- **Priority:** `priority:p2`
- **Labels:** `phase-3:enhancements`, `type:feature`, `priority:p2`
- **User Story:** US-15: As a user at a summer cottage with poor reception, I want the web app to load and function offline.

### Description
Configure Progressive Web App (PWA) manifest and Service Worker caching strategies so guests can install the app on their phone home screen and access cached songs and categories completely offline.

### Technical Scope
- **Files Created/Modified:**
  - `public/manifest.json` (PWA manifest with icons, name, colors, display mode)
  - `public/sw.js` / Service Worker configuration (Cache static assets, app shell, and `api/songs` responses)
  - `app/layout.tsx` (PWA meta tags, apple touch icons, theme colors)

### Acceptance Criteria
- [ ] App prompts or allows "Add to Home Screen" on mobile devices.
- [ ] Loaded songs remain viewable and searchable when disconnecting Wi-Fi/cellular.
- [ ] Manifest passes Chrome DevTools PWA audit with valid icons and display properties.

---

## Ticket T-16: Printable 2-Column PDF Booklet Generator
- **Milestone:** Phase 3 (Enhancements)
- **Priority:** `priority:p3`
- **Labels:** `phase-3:enhancements`, `type:feature`, `priority:p3`
- **User Story:** US-16: As a host, I want to export an event booklet or song catalog as a formatted printable 2-column A4 PDF.

### Description
Provide a printable export feature that generates a formatted 2-column A4 paper songbook (sånghäfte) with table of contents, melody subtitles, and clean page breaks for physical table settings.

### Technical Scope
- **Files Created/Modified:**
  - `@react-pdf/renderer` or `@media print` CSS stylesheet in `app/globals.css`
  - Print button on `/hafte/[slug]` and `/admin`
  - Formatted print layout: 2-column stanzas, page number footer, table of contents

### Acceptance Criteria
- [ ] Triggering print (or clicking "Skriv ut häfte") renders a clean A4 2-column layout.
- [ ] Screen-only elements (navbars, search bars, buttons, QR modals) are hidden during print.
- [ ] Songs avoid awkward page breaks across single verses.
- [ ] Output includes booklet title and table of contents on page 1.

---

## 📊 Summary Ticket Overview Table

| Ticket ID | Phase / Milestone | Priority | Title | Primary Components / Files |
| :--- | :--- | :---: | :--- | :--- |
| **T-01** | Phase 1 (MVP) | `P0` | Backend & Sidecar Workflow Setup | `data/db.json`, `package.json`, `types/song.ts` |
| **T-02** | Phase 1 (MVP) | `P0` | Next.js API Proxy Routes | `app/api/songs`, `app/api/categories`, `lib/json-server-client.ts` |
| **T-03** | Phase 1 (MVP) | `P0` | Catalog Home View & Debounced Search | `app/page.tsx`, `components/SearchAndFilter.tsx`, `SongCard.tsx` |
| **T-04** | Phase 1 (MVP) | `P0` | Sing-Along Lyric View & Navigation | `app/visa/[slug]/page.tsx`, `components/SongDetail.tsx` |
| **T-05** | Phase 1 (MVP) | `P0` | Dynamic Font Sizing Stepper | `hooks/useFontSize.ts`, `components/FontSizeControls.tsx` |
| **T-06** | Phase 2 (Power) | `P1` | Admin PIN Authentication & Proxy Security | `app/api/admin/verify`, `hooks/useAdminAuth.ts`, `AdminLogin.tsx` |
| **T-07** | Phase 2 (Power) | `P1` | Admin Song Management with Live Preview | `app/admin/page.tsx`, `SongTable.tsx`, `SongFormModal.tsx` |
| **T-08** | Phase 2 (Power) | `P1` | Admin Category Management | `CategoryTable.tsx`, `CategoryFormModal.tsx` |
| **T-09** | Phase 2 (Power) | `P1` | Table QR Code Sharing Modal | `components/ShareQRModal.tsx`, `qrcode.react` |
| **T-10** | Phase 2 (Power) | `P1` | Local Favorites Bookmarking (⭐) | `hooks/useFavorites.ts`, `SongCard.tsx`, filter tab |
| **T-11** | Phase 2 (Power) | `P1` | Screen Wake Lock API & Status Pill | `hooks/useWakeLock.ts`, `components/WakeLockIndicator.tsx` |
| **T-12** | Phase 2 (Power) | `P1` | Dark & Light Theme Switcher | `hooks/useTheme.ts`, `components/Header.tsx`, `globals.css` |
| **T-13** | Phase 3 (Extras) | `P2` | Custom Event Booklets (*Sånghäften*) | `app/hafte/[slug]/page.tsx`, `app/api/booklets` |
| **T-14** | Phase 3 (Extras) | `P2` | Category Deletion Safety Reassignment | `components/admin/CategoryDeleteModal.tsx` |
| **T-15** | Phase 3 (Extras) | `P2` | Offline PWA Support | `public/manifest.json`, Service Worker caching |
| **T-16** | Phase 3 (Extras) | `P3` | Printable 2-Column PDF Booklet Generator| Print CSS / `@react-pdf/renderer` |
