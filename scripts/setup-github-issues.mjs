import https from 'node:https';

const OWNER = 'sandrauddman';
const REPO = 'songbook';
const TOKEN = process.env.GITHUB_TOKEN || process.argv[2];

if (!TOKEN) {
  console.error('\x1b[31mError: No GitHub Token provided.\x1b[0m');
  console.log('\nUsage:');
  console.log('  node scripts/setup-github-issues.mjs <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>');
  console.log('  or set the GITHUB_TOKEN environment variable.');
  process.exit(1);
}

function apiRequest(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.github.com${endpoint}`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'User-Agent': 'Digital-Songbook-Ticket-Setup',
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(data ? { 'Content-Type': 'application/json' } : {})
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else if (res.statusCode === 422 && parsed?.errors?.[0]?.code === 'already_exists') {
            resolve(parsed); // Handled gracefully
          } else {
            reject(new Error(`GitHub API HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

const MILESTONES = [
  { title: 'Phase 1: The Lean MVP (P0)', description: 'Pure sing-along songbook experience with search, font sizing, and json-server backend' },
  { title: 'Phase 2: Admin & Power Features (P1)', description: 'PIN-protected admin management, QR sharing, favorites, wake lock, and dark/light themes' },
  { title: 'Phase 3: Booklets & Offline (P2 / P3)', description: 'Custom event booklets, category deletion safety, offline PWA, and printable PDF export' }
];

const LABELS = [
  { name: 'phase-1:mvp', color: 'e11d48', description: 'Phase 1: The Lean MVP (P0)' },
  { name: 'phase-2:power', color: '2563eb', description: 'Phase 2: Power Features & Admin (P1)' },
  { name: 'phase-3:enhancements', color: '059669', description: 'Phase 3: Booklets & Offline (P2/P3)' },
  { name: 'type:feature', color: '0ea5e9', description: 'New user-facing capability' },
  { name: 'type:backend', color: '8b5cf6', description: 'API routes, json-server, data layer' },
  { name: 'type:ui/ux', color: 'f59e0b', description: 'Styling, components, accessibility' },
  { name: 'priority:p0', color: 'dc2626', description: 'Core MVP requirement' },
  { name: 'priority:p1', color: 'd97706', description: 'High priority power feature' },
  { name: 'priority:p2', color: '10b981', description: 'Secondary enhancement' },
  { name: 'priority:p3', color: '6b7280', description: 'Polish / Future iteration' }
];

const TICKETS = [
  {
    title: 'T-01: Data Persistence & Development Sidecar Workflow Setup',
    milestone: 'Phase 1: The Lean MVP (P0)',
    labels: ['phase-1:mvp', 'type:backend', 'priority:p0'],
    body: `### User Story
**US-6:** As a developer, I want \`npm run dev\` to start both Next.js and \`json-server\` watching \`data/db.json\`.

### Description
Set up the \`json-server\` mock REST database sidecar process and seed \`data/db.json\` with 25+ curated traditional Swedish snapsvisor and core categories. Configure \`package.json\` scripts with \`concurrently\` to orchestrate both processes simultaneously.

### Technical Scope
- \`data/db.json\` (Seed 25+ songs and initial categories: Snapsvisor, Kräftskiva, Midsommar, Jul & Vinter, Öl & Studentvisor)
- \`package.json\` (Add \`json-server@0.17.4\`, \`concurrently\`, scripts: \`dev\`, \`dev:next\`, \`dev:server\`)
- \`.env.local\` (\`JSON_SERVER_URL=http://localhost:3001\`)
- \`types/song.ts\` (TypeScript definitions for \`Song\`, \`Category\`, \`SongFormData\`, \`CategoryFormData\`)

### Acceptance Criteria
- [ ] \`data/db.json\` contains valid JSON with \`categories\` and at least 25 Swedish songs.
- [ ] Running \`npm run dev\` starts Next.js on port 3000 and \`json-server\` on port 3001 in parallel.
- [ ] \`http://localhost:3001/songs\` and \`http://localhost:3001/categories\` respond with JSON data.
- [ ] \`types/song.ts\` exports all required interfaces and types.`
  },
  {
    title: 'T-02: Next.js API Proxy Routes & HTTP Client',
    milestone: 'Phase 1: The Lean MVP (P0)',
    labels: ['phase-1:mvp', 'type:backend', 'priority:p0'],
    body: `### User Story
**US-1, US-2, US-5:** As a frontend client, I want Next.js API routes that proxy requests to \`json-server\` on port 3001.

### Description
Create Next.js App Router API route handlers (\`/api/songs\`, \`/api/songs/[id]\`, \`/api/categories\`) that securely proxy read requests to \`json-server\`, supporting query search (\`?q=...\`) and category filtering (\`?categoryId=...\`).

### Technical Scope
- \`lib/json-server-client.ts\` (Fetch utility helper for \`http://localhost:3001\`)
- \`app/api/songs/route.ts\` (GET proxy forwarding \`q\` and \`categoryId\` params)
- \`app/api/songs/[id]/route.ts\` (GET single song by slug/id)
- \`app/api/categories/route.ts\` (GET categories sorted by \`order\`)
- \`hooks/useSongs.ts\` (React hook for fetching and searching songs)
- \`hooks/useCategories.ts\` (React hook for fetching categories)

### Acceptance Criteria
- [ ] \`GET /api/songs\` returns all songs from \`json-server\`.
- [ ] \`GET /api/songs?q=helan\` performs full-text search against lyrics, title, melody, tags.
- [ ] \`GET /api/songs?categoryId=snaps\` filters songs by category ID.
- [ ] \`GET /api/songs/[id]\` returns 200 with the single song object or 404 if not found.
- [ ] \`GET /api/categories\` returns category list ordered by \`order\`.`
  },
  {
    title: 'T-03: Catalog Home View with Debounced Search & Category Chips',
    milestone: 'Phase 1: The Lean MVP (P0)',
    labels: ['phase-1:mvp', 'type:ui/ux', 'type:feature', 'priority:p0'],
    body: `### User Story
**US-1, US-2:** As a party guest, I want to search and filter songs on the home page so I can find any snapsvisa in under 2 seconds.

### Description
Implement the responsive home page (\`/\`) featuring a festive header, debounced search bar, horizontal scrollable category chip bar, and responsive grid of \`SongCard\` components.

### Technical Scope
- \`app/page.tsx\` (Main catalog view)
- \`components/Header.tsx\` (App title, logo, subtitle)
- \`components/SearchAndFilter.tsx\` (Debounced search input with clear button, category chip filter list with song count badges)
- \`components/SongCard.tsx\` (Title, melody, category badge, lyrics preview snippet, link to \`/visa/[slug]\`)
- \`app/globals.css\` (Tailwind v4 styling and responsive layout variables)

### Acceptance Criteria
- [ ] Typing in the search input debounces requests (~300ms) to \`/api/songs?q=...\`.
- [ ] Clicking category chips filters the list immediately, updating active chip style and URL state.
- [ ] Displays empty state (*"Inga visor hittades"*) with a reset search button when 0 results match.
- [ ] Responsive grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop.
- [ ] Clicking a \`SongCard\` navigates to \`/visa/[slug]\`.`
  },
  {
    title: 'T-04: Sing-Along Lyric View & Song Navigation',
    milestone: 'Phase 1: The Lean MVP (P0)',
    labels: ['phase-1:mvp', 'type:ui/ux', 'type:feature', 'priority:p0'],
    body: `### User Story
**US-3, US-5:** As a singer around a dinner table, I want large high-contrast lyrics with distinct verse spacing, melody banners, and next/prev buttons.

### Description
Build the dedicated sing-along song view (\`/visa/[slug]\`) optimized for low-light dinner environments. Include clear title hierarchy, "Melodi: ..." banner, formatted stanza line breaks, ritual notes callouts, and bottom navigation to cycle through songs.

### Technical Scope
- \`app/visa/[slug]/page.tsx\` (Dynamic route with SSR metadata and dynamic params)
- \`components/SongDetail.tsx\` (Large typography lyric display, toast/ritual callout box)
- Prev/Next navigation bar with keyboard arrow navigation (\`ArrowLeft\` / \`ArrowRight\`)

### Acceptance Criteria
- [ ] Navigating to \`/visa/helan-gar\` renders song title, category badge, melody name, notes callout, and formatted lyrics.
- [ ] Stanzas/lines preserve proper spacing and readability.
- [ ] Prev / Next buttons navigate smoothly between adjacent songs in the catalog.
- [ ] Left/Right keyboard arrows navigate to previous/next songs on desktop/tablet.
- [ ] Shows 404/not-found screen if an invalid slug is requested.`
  },
  {
    title: 'T-05: One-Tap Dynamic Font Sizing Stepper',
    milestone: 'Phase 1: The Lean MVP (P0)',
    labels: ['phase-1:mvp', 'type:ui/ux', 'type:feature', 'priority:p0'],
    body: `### User Story
**US-4:** As a user, I want \`A-\` / \`A+\` buttons to resize text on the fly, with my preferred size saved in \`localStorage\`.

### Description
Implement persistent dynamic font sizing across the song detail view. Users can adjust text size between 4 presets (Normal, Large, X-Large, Huge) via a sticky header control.

### Technical Scope
- \`hooks/useFontSize.ts\` (Font size state management with \`localStorage\` persistence)
- \`components/FontSizeControls.tsx\` (\`A-\` / \`A+\` button stepper with visual active step indicators)
- Integrate into \`components/SongDetail.tsx\` and \`app/visa/[slug]/page.tsx\`

### Acceptance Criteria
- [ ] \`A-\` decreases font size down to minimum (Normal); \`A+\` increases font size up to maximum (Huge).
- [ ] Stepper buttons disable when reaching minimum or maximum bounds.
- [ ] Font size preference is saved to \`localStorage\` and restored automatically when opening another song.
- [ ] Lyric text scales smoothly without breaking UI layout or line wrapping on mobile.`
  },
  {
    title: 'T-06: Admin PIN Authentication & Proxy Security',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:backend', 'priority:p1'],
    body: `### User Story
**US-7:** As an admin/toastmaster, I want to authenticate with a secure PIN to manage songs and categories.

### Description
Implement PIN-based authentication for the \`/admin\` portal. API mutation routes (\`POST\`, \`PUT\`, \`DELETE\` on \`/api/songs\` and \`/api/categories\`) must verify the admin PIN session cookie before proxying changes to \`json-server\`.

### Technical Scope
- \`app/api/admin/verify/route.ts\` (Verifies PIN against \`ADMIN_PIN\` and sets HTTP-only session cookie)
- \`hooks/useAdminAuth.ts\` (Admin auth state hook: \`isAuthenticated\`, \`login(pin)\`, \`logout()\`)
- \`components/admin/AdminLogin.tsx\` (PIN entry keypad/card UI with error feedback)
- \`.env.local\` (Add \`ADMIN_PIN=1234\` default fallback)

### Acceptance Criteria
- [ ] Entering the correct PIN issues a secure session and grants access to \`/admin\`.
- [ ] Entering an incorrect PIN displays a clear error message and prevents access.
- [ ] API routes reject unauthorized \`POST\`/\`PUT\`/\`DELETE\` calls with HTTP 401 Unauthorized.
- [ ] Logout button clears the session cookie and redirects to \`/admin\` login screen.`
  },
  {
    title: 'T-07: Admin Song Management with Live Preview (CRUD)',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:feature', 'type:ui/ux', 'priority:p1'],
    body: `### User Story
**US-7:** As an admin, I want to add, edit, and delete songs with a live preview so I can customize the catalog for parties.

### Description
Create the song management dashboard in \`/admin\` with a searchable song table, an "Add Song" / "Edit Song" modal featuring live side-by-side lyrics rendering, auto-slug generator, and a deletion confirmation modal.

### Technical Scope
- \`app/admin/page.tsx\` (Tabs: Songs & Categories)
- \`components/admin/SongTable.tsx\` (Searchable, sortable song management table with edit/delete actions)
- \`components/admin/SongFormModal.tsx\` (Form inputs: Title, Melody, Category, Multi-line Lyrics, Tags, Notes; split-screen preview)
- \`components/admin/DeleteConfirmModal.tsx\` (Confirmation dialog before deletion)
- \`app/api/songs/route.ts\` (Add authenticated \`POST\` handler)
- \`app/api/songs/[id]/route.ts\` (Add authenticated \`PUT\` and \`DELETE\` handlers)

### Acceptance Criteria
- [ ] Admin can add a new song; slug is automatically suggested from title.
- [ ] Live preview updates in real-time as admin types lyrics, melody, or notes.
- [ ] Submitting form persists new/updated song to \`data/db.json\` via \`json-server\`.
- [ ] Admin can edit an existing song with pre-populated fields.
- [ ] Deleting a song opens a confirmation dialog; confirming removes the record from \`data/db.json\`.`
  },
  {
    title: 'T-08: Admin Category Management (CRUD)',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:feature', 'type:ui/ux', 'priority:p1'],
    body: `### User Story
**US-8:** As an admin, I want to create and edit categories with emojis, titles, and color badges.

### Description
Implement category management in \`/admin\` enabling the host to create custom event categories (e.g. *Nyår 🍾*, *Kräftskiva 🦞*, *Bröllop 💍*) with emoji pickers and color badge themes.

### Technical Scope
- \`components/admin/CategoryTable.tsx\` (List of categories with song counts and edit/delete buttons)
- \`components/admin/CategoryFormModal.tsx\` (Name, Slug, Emoji preset selector, Color badge selector, Description, Order)
- \`app/api/categories/route.ts\` (Add authenticated \`POST\` handler)
- \`app/api/categories/[id]/route.ts\` (Add authenticated \`PUT\` and \`DELETE\` handlers)

### Acceptance Criteria
- [ ] Admin can view all categories with associated song counts.
- [ ] Admin can create a new category with custom emoji and color theme.
- [ ] Admin can edit an existing category's name, emoji, color, or sort order.
- [ ] Changes immediately reflect in the public catalog filter chips and song badges.`
  },
  {
    title: 'T-09: Table QR Code Sharing Modal',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:feature', 'type:ui/ux', 'priority:p1'],
    body: `### User Story
**US-9:** As a party guest, I want to show a QR code for a song on my phone so table mates can scan it with their camera.

### Description
Add a prominent "Dela med bordet" button on every song lyric page (\`/visa/[slug]\`) that opens a clean, high-contrast modal displaying a scannable QR code for the current URL, with a copy link button.

### Technical Scope
- \`components/ShareQRModal.tsx\` (Modal dialog with QR code generator using \`qrcode.react\` or SVG canvas)
- Copy to clipboard button with success toast feedback
- Integration into \`components/SongDetail.tsx\`

### Acceptance Criteria
- [ ] Clicking "Dela med bordet" opens a clean modal with the rendered QR code.
- [ ] Scanning the QR code with another smartphone opens the exact \`/visa/[slug]\` URL.
- [ ] "Kopiera länk" button copies the URL to clipboard with visual feedback (*"Kopierad!"*).
- [ ] Modal can be closed via tap outside, close \`✕\` button, or \`Escape\` key.`
  },
  {
    title: 'T-10: Local Favorites Bookmarking (⭐)',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:feature', 'priority:p1'],
    body: `### User Story
**US-10:** As a guest, I want to star songs and access a "⭐ Mina favoriter" tab stored locally in my browser.

### Description
Implement a client-side favorites system allowing users to star/unstar songs from the catalog cards or the lyric view. Add a persistent "⭐ Mina favoriter" filter tab to the home page filter chips.

### Technical Scope
- \`hooks/useFavorites.ts\` (Manages favorites state in \`localStorage\`)
- \`components/SongCard.tsx\` (Interactive star button with filled/unfilled state)
- \`components/SongDetail.tsx\` (Star button in header)
- \`components/SearchAndFilter.tsx\` (Add "⭐ Favoriter (N)" chip)

### Acceptance Criteria
- [ ] Tapping the star icon on any card or detail page toggles favorite status.
- [ ] Star status persists across page reloads and browser sessions via \`localStorage\`.
- [ ] Clicking the "⭐ Favoriter" filter chip shows only starred songs.
- [ ] If no favorites exist, selecting the tab displays a friendly empty state message.`
  },
  {
    title: 'T-11: Screen Wake Lock API & Status Pill',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:feature', 'type:ui/ux', 'priority:p1'],
    body: `### User Story
**US-11:** As a singer, I want my phone screen to stay awake while viewing lyrics so it doesn't turn off mid-toast.

### Description
Integrate the Browser Screen Wake Lock API (\`navigator.wakeLock\`) on the song detail page (\`/visa/[slug]\`). Provide a subtle visual status pill in the UI indicating that the screen is being kept awake, with graceful fallback for unsupported browsers.

### Technical Scope
- \`hooks/useWakeLock.ts\` (Requests wake lock on mount, releases on unmount, handles visibility changes)
- \`components/WakeLockIndicator.tsx\` (Small status pill with lock/bulb icon and tooltip)
- Integration into \`components/SongDetail.tsx\`

### Acceptance Criteria
- [ ] Screen Wake Lock is requested automatically upon entering \`/visa/[slug]\`.
- [ ] Screen remains illuminated without dimming on supported mobile browsers.
- [ ] Status indicator displays *"Skärmen hålls vaken"* when active.
- [ ] Lock is gracefully released when navigating back to the catalog or switching tabs.`
  },
  {
    title: 'T-12: Dark & Light Theme Switcher',
    milestone: 'Phase 2: Admin & Power Features (P1)',
    labels: ['phase-2:power', 'type:ui/ux', 'priority:p1'],
    body: `### User Story
**US-12:** As a user, I want to toggle between Nordic Tavern dark mode and Parchment light mode.

### Description
Implement a global theme switcher allowing users to toggle between **Nordic Tavern (Dark Mode)** and **Parchment (Light Mode)**, with system preference detection and \`localStorage\` persistence.

### Technical Scope
- \`hooks/useTheme.ts\` (Theme hook with \`theme\`, \`toggleTheme\`, \`setTheme\`)
- \`components/Header.tsx\` (Theme toggle button with Sun / Moon icon)
- \`app/globals.css\` (Tailwind CSS custom color tokens for tavern dark vs parchment light)
- \`app/layout.tsx\` (Theme provider script preventing flash of unstyled theme on load)

### Acceptance Criteria
- [ ] Toggling theme switches the whole application between Tavern Dark and Parchment Light.
- [ ] Selected theme is saved in \`localStorage\` and applied on reload without UI flash.
- [ ] High contrast lyric text and clear readable badges in both themes.
- [ ] Defaults to user's system OS preference (\`prefers-color-scheme\`) on initial visit.`
  },
  {
    title: 'T-13: Custom Event Booklets (Sånghäften)',
    milestone: 'Phase 3: Booklets & Offline (P2 / P3)',
    labels: ['phase-3:enhancements', 'type:feature', 'priority:p2'],
    body: `### User Story
**US-13:** As a dinner host, I want to build a custom ordered song list for a party with a dedicated shareable booklet URL.

### Description
Enable hosts to create named event booklets (e.g. *"Midsommar 2026"*, *"Kräftskiva hos Anna"*) by selecting and ordering songs. Provide a dedicated guest booklet view (\`/hafte/[slug]\`) that steps through the curated songs in sequence.

### Technical Scope
- \`app/api/booklets/route.ts\` (GET all booklets, POST create booklet)
- \`app/api/booklets/[id]/route.ts\` (GET single booklet, PUT/DELETE)
- \`app/hafte/[slug]/page.tsx\` (Guest booklet view with progress bar and step-through navigation)
- Admin Booklet Management tab in \`/admin\`

### Acceptance Criteria
- [ ] Admin can create a booklet with a title, description, and ordered list of songs.
- [ ] Booklets are stored in \`data/db.json\` under \`"booklets"\`.
- [ ] Navigating to \`/hafte/[slug]\` renders the event title, song index, and sequential next/prev buttons.
- [ ] Booklet link can be shared via QR code or direct URL.`
  },
  {
    title: 'T-14: Category Deletion Safety Reassignment Wizard',
    milestone: 'Phase 3: Booklets & Offline (P2 / P3)',
    labels: ['phase-3:enhancements', 'type:feature', 'type:ui/ux', 'priority:p2'],
    body: `### User Story
**US-14:** As an admin deleting a category, I want a wizard prompting me to reassign existing songs to another category before deletion.

### Description
Prevent orphaned songs when deleting a category in \`/admin\`. If songs belong to the category being deleted, display a modal wizard allowing the admin to choose a target replacement category for all affected songs before completing deletion.

### Technical Scope
- \`components/admin/CategoryDeleteModal.tsx\` (Safety modal detecting song references and providing reassignment dropdown)
- \`app/api/categories/[id]/route.ts\` (Batch-update songs' \`categoryId\` before deleting category)

### Acceptance Criteria
- [ ] If a category has 0 songs, admin is shown a simple delete confirmation.
- [ ] If a category has 1+ songs, modal warns the admin and displays a dropdown to select a replacement category.
- [ ] Confirming reassignment updates all affected songs in \`data/db.json\` and deletes the category without errors.`
  },
  {
    title: 'T-15: Offline PWA & Service Worker Support',
    milestone: 'Phase 3: Booklets & Offline (P2 / P3)',
    labels: ['phase-3:enhancements', 'type:feature', 'priority:p2'],
    body: `### User Story
**US-15:** As a user at a summer cottage with poor reception, I want the web app to load and function offline.

### Description
Configure Progressive Web App (PWA) manifest and Service Worker caching strategies so guests can install the app on their phone home screen and access cached songs and categories completely offline.

### Technical Scope
- \`public/manifest.json\` (PWA manifest with icons, name, colors, display mode)
- \`public/sw.js\` / Service Worker configuration (Cache static assets, app shell, and \`api/songs\` responses)
- \`app/layout.tsx\` (PWA meta tags, apple touch icons, theme colors)

### Acceptance Criteria
- [ ] App prompts or allows "Add to Home Screen" on mobile devices.
- [ ] Loaded songs remain viewable and searchable when disconnecting Wi-Fi/cellular.
- [ ] Manifest passes Chrome DevTools PWA audit with valid icons and display properties.`
  },
  {
    title: 'T-16: Printable 2-Column PDF Booklet Generator',
    milestone: 'Phase 3: Booklets & Offline (P2 / P3)',
    labels: ['phase-3:enhancements', 'type:feature', 'priority:p3'],
    body: `### User Story
**US-16:** As a host, I want to export an event booklet or song catalog as a formatted printable 2-column A4 PDF.

### Description
Provide a printable export feature that generates a formatted 2-column A4 paper songbook (sånghäfte) with table of contents, melody subtitles, and clean page breaks for physical table settings.

### Technical Scope
- \`@react-pdf/renderer\` or \`@media print\` CSS stylesheet in \`app/globals.css\`
- Print button on \`/hafte/[slug]\` and \`/admin\`
- Formatted print layout: 2-column stanzas, page number footer, table of contents

### Acceptance Criteria
- [ ] Triggering print (or clicking "Skriv ut häfte") renders a clean A4 2-column layout.
- [ ] Screen-only elements (navbars, search bars, buttons, QR modals) are hidden during print.
- [ ] Songs avoid awkward page breaks across single verses.
- [ ] Output includes booklet title and table of contents on page 1.`
  }
];

async function main() {
  console.log(`\x1b[34m🚀 Starting GitHub Project & Issue Setup for ${OWNER}/${REPO}...\x1b[0m\n`);

  // 1. Setup Milestones
  console.log('📌 Creating / Verifying Milestones...');
  const existingMilestones = await apiRequest(`/repos/${OWNER}/${REPO}/milestones?state=all`).catch(() => []);
  const milestoneMap = new Map();

  for (const m of existingMilestones) {
    milestoneMap.set(m.title, m.number);
  }

  for (const m of MILESTONES) {
    if (!milestoneMap.has(m.title)) {
      try {
        const created = await apiRequest(`/repos/${OWNER}/${REPO}/milestones`, 'POST', m);
        milestoneMap.set(created.title, created.number);
        console.log(`  ✅ Created Milestone: "${m.title}" (#${created.number})`);
      } catch (err) {
        console.warn(`  ⚠️ Could not create milestone "${m.title}": ${err.message}`);
      }
    } else {
      console.log(`  ℹ️ Milestone exists: "${m.title}" (#${milestoneMap.get(m.title)})`);
    }
  }

  // 2. Setup Labels
  console.log('\n🏷️  Creating / Verifying Labels...');
  for (const l of LABELS) {
    try {
      await apiRequest(`/repos/${OWNER}/${REPO}/labels`, 'POST', l);
      console.log(`  ✅ Created Label: "${l.name}"`);
    } catch (err) {
      if (err.message.includes('already_exists')) {
        console.log(`  ℹ️ Label exists: "${l.name}"`);
      } else {
        console.warn(`  ⚠️ Label error for "${l.name}": ${err.message}`);
      }
    }
  }

  // 3. Setup Issues
  console.log('\n📝 Creating Issues / Tickets...');
  const existingIssues = await apiRequest(`/repos/${OWNER}/${REPO}/issues?state=all&per_page=100`).catch(() => []);
  const existingTitles = new Set(existingIssues.map(i => i.title));

  for (const ticket of TICKETS) {
    if (existingTitles.has(ticket.title)) {
      console.log(`  ℹ️ Skipping existing issue: "${ticket.title}"`);
      continue;
    }

    const payload = {
      title: ticket.title,
      body: ticket.body,
      labels: ticket.labels,
      milestone: milestoneMap.get(ticket.milestone) || undefined
    };

    try {
      const issue = await apiRequest(`/repos/${OWNER}/${REPO}/issues`, 'POST', payload);
      console.log(`  ✅ Created Issue #${issue.number}: "${ticket.title}"`);
    } catch (err) {
      console.error(`  ❌ Failed to create issue "${ticket.title}": ${err.message}`);
    }
  }

  console.log('\n\x1b[32m🎉 All milestones, labels, and tickets created successfully!\x1b[0m');
  console.log(`\nView repository issues at: https://github.com/${OWNER}/${REPO}/issues`);
}

main().catch(err => {
  console.error('\n\x1b[31mFatal Error:\x1b[0m', err.message);
  process.exit(1);
});
