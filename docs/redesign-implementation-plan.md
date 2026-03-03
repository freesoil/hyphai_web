# Redesign Implementation, Integration & Test Plan

This document outlines how to implement the website redesign described in [redesign.md](./redesign.md), how to integrate new and existing pieces, and how to test the result.

---

## Completion status (all phases implemented)

| Phase | Status | Notes |
|-------|--------|--------|
| **1** Routing & shell | Done | Routes in `web/routes.ts`; nav and footer in `App.tsx`. |
| **2** New page components | Done | Home, Solutions, Pilot, Who We Serve, How We Work, About, Contact. |
| **3** Copy & assets | Done | `web/copy/redesign.ts`; all new pages use it. Hero video kept. Content audit: no pricing/discount on public pages. |
| **4** Legacy alignment | Done | Catalog uses redesign copy; Guide has intro + link to Solutions; Brochure `Machine` import fixed; Consultation links to Contact. |
| **5** Forms & backend | Done | Contact and Pilot waitlist use Formspree (see §2.3 below). Email/phone and email validation added. |

**Routing tests:** `web/routes.test.ts` (Vitest) — run with `npm run test` in `web/`.

---

## 1. Implementation Plan

### 1.1 Phase 1 — Routing & Shell (Week 1)

**Goal:** Introduce new route set and shared shell (header/footer) without breaking existing views.

| Task | Description | Deliverable |
|------|-------------|-------------|
| **1.1.1** | Extend route type and `parseHashRoute` / `buildHash` to support: `solutions`, `pilot`, `who-we-serve`, `how-we-work`, `about`, `contact`. | Updated `App.tsx` route types and helpers. |
| **1.1.2** | Add hash routes: `#/solutions`, `#/pilot`, `#/who-we-serve`, `#/how-we-work`, `#/about`, `#/contact`. | Same file; backward compatibility for `#/`, `#/catalog`, etc. |
| **1.1.3** | Redesign header nav per redesign §9: Home, Solutions, Pilot Programs, Who We Serve, How We Work, About, Contact. Optionally keep Equipment (catalog) and Brochure under a dropdown or secondary nav. | Updated header in `App.tsx`. |
| **1.1.4** | Ensure footer shows on all pages (or per redesign: all non-home if that’s kept), with Safety and Privacy links. | Footer behavior and links. |

**Dependencies:** None.  
**Risk:** Low. Keep existing views rendering for current routes until new pages exist.

---

### 1.2 Phase 2 — New Page Components (Weeks 2–3)

**Goal:** Implement each new page as a component with content from redesign.md.

| Task | Description | Deliverable |
|------|-------------|-------------|
| **2.1** | **Homepage (new)** — Rebuild `HomePage.tsx` to match redesign §1: Hero, Built Around Real Operations, One Adaptive System, Built in Partnership, Designed to Fit Your Operation + CTA. Reuse or create shared components (e.g. `Section`, `PillarCard`, `CTAButton`). | New `HomePage.tsx` (and optional shared components). |
| **2.2** | **Solutions page** — New component `SolutionsPage.tsx`: headline, subhead, four sections (Operational Software, Connected Visibility, Assistive Automation, Equipment Integration) with bullets per redesign §2. | `SolutionsPage.tsx`. |
| **2.3** | **Pilot Programs page** — New component `PilotProgramsPage.tsx`: headline, Equipment Pilot Opportunities, Operational Software Pilot (Summer 2026), “Join pilot waitlist” CTA. | `PilotProgramsPage.tsx`. |
| **2.4** | **Who We Serve page** — New component `WhoWeServePage.tsx`: Specialty Crop Growers and Food Hubs sections with value props and pain points per redesign §4. | `WhoWeServePage.tsx`. |
| **2.5** | **How We Work page** — New component `HowWeWorkPage.tsx`: “You visit / observe / design / deploy / adapt”, Adaptive by Design, four sections (workflow mapping, system configuration, pilot deployment, continuous adaptation). | `HowWeWorkPage.tsx`. |
| **2.6** | **About page** — New component `AboutPage.tsx`: mission statement, five principles. | `AboutPage.tsx`. |
| **2.7** | **Contact page** — New component `ContactPage.tsx`: form with I am a, Primary interest, Busy season window, Current tools, Email/phone. No backend required for first version (can submit to same endpoint as existing quote/contact or placeholder). | `ContactPage.tsx`. |

**Dependencies:** Phase 1 (routes and nav).  
**Risk:** Medium. Copy and layout should be reviewed against redesign.md.

---

### 1.3 Phase 3 — Content & Copy Integration (Week 3–4)

**Goal:** Ensure all copy matches redesign.md; add any missing assets.

| Task | Description | Deliverable |
|------|-------------|-------------|
| **3.1** | Extract copy into a single source (e.g. `web/copy/redesign.ts` or JSON) keyed by page/section for easier edits and i18n later. | `copy/redesign.ts` or similar. |
| **3.2** | Replace hardcoded strings in new page components with references to copy source. | Components use copy module. |
| **3.3** | Hero: decide on imagery (video vs static). If keeping video, ensure it fits “operational intelligence” messaging or replace per redesign tone. | Asset decision and any new hero asset. |
| **3.4** | Confirm “no pricing / no discount / no tractor manipulation” is respected in all new and touched components. | Copy and asset audit. |

**Dependencies:** Phase 2.  
**Risk:** Low.

---

### 1.4 Phase 4 — Legacy Pages & Equipment (Week 4–5)

**Goal:** Align existing equipment and brochure flows with new information architecture.

| Task | Description | Deliverable |
|------|-------------|-------------|
| **4.1** | **Catalog** — Keep `MachineCatalog` and `MachineDetail` under “Equipment” or “Solutions → Equipment Integration”. Update nav label and any in-page copy to match “Equipment Integration” and “Pilot” messaging. | Updated catalog entry points and microcopy. |
| **4.2** | **Equipment Guide** — Keep `MachineGuide` or fold into Solutions / Pilot; if kept, add short intro that ties to “Explore solutions” and equipment pilots. | Optional intro component or redirect. |
| **4.3** | **Brochure** — Keep `BrochurePage` or redirect to Solutions/Pilot; ensure no conflicting messaging (e.g. pricing). | Decision + redirect or updated brochure content. |
| **4.4** | **Consultation / Service** — Current “Consultation” (PilotService) can map to “Talk to us” and Contact. Ensure “Free Consultation” is replaced or aligned with “Talk to us” and pilot/contact form. | Nav and CTA consistency. |

**Dependencies:** Phases 1–2.  
**Risk:** Medium (stakeholder decision on what to keep vs remove).

---

### 1.5 Phase 5 — Contact & Pilot Waitlist (Week 5)

**Goal:** Contact form and pilot waitlist work end-to-end.

| Task | Description | Deliverable |
|------|-------------|-------------|
| **5.1** | Contact form submission: either use existing backend (e.g. quote/contact endpoint) or add a small serverless/API route that accepts form payload and sends email or stores in DB. | Backend endpoint + env/config for webhook or email. |
| **5.2** | “Join pilot waitlist” on Pilot Programs page: same backend as contact or dedicated “pilot_waitlist” type; form may be minimal (email + optional role/interest). | Pilot waitlist submission. |
| **5.3** | Success/error states and basic validation (required fields, email format) on Contact and Pilot waitlist. | UX and validation. |

**Dependencies:** Phase 2 (Contact + Pilot pages).  
**Risk:** Low to medium (depends on existing backend).

---

## 2. Integration Plan

### 2.1 App and Routing Integration

- **Single source of routes:** Centralize route definitions (path ↔ view ↔ component) in one place (e.g. `routes.tsx` or inside `App.tsx`) so adding/removing pages is trivial.
- **Hash vs path:** Current app uses hash routing. Keep hash for simplicity and compatibility, or migrate to path-based (e.g. React Router) in this redesign; document choice.
- **Analytics:** Reuse existing `logEvent` (or replace with real analytics) for new CTAs: “Talk to us”, “Explore solutions”, “Join pilot waitlist”, form submissions.

### 2.2 Design System and Shared Components

- **Shared UI:** Buttons (primary/secondary), section containers, headings, and cards should be consistent. Consider a small `components/ui/` set (e.g. `Button`, `Section`, `Card`) and use Tailwind/custom CSS from existing setup.
- **Theme:** Retain existing “site-bg”, “surface”, typography (font-display), and color (emerald, amber, stone) unless a deliberate visual redesign is planned; ensure new pages use the same tokens.

### 2.3 Backend and Third-Party Integration

- **Forms:** All forms use **Formspree**. No env vars required (endpoints are hardcoded).
  - **Contact** and **Consultation** (PilotService) and **Pilot waitlist:** `https://formspree.io/f/mqelrdep` (request types: `Contact`, `Pilot waitlist (Software Summer 2026)`, or consultation payload with optional machine).
  - **Quote request** (per-machine): `https://formspree.io/f/mpqlvybz`.
- **QuoteRequestModal:** Used for equipment quote requests only. “Talk to us” goes to Contact page; Consultation page includes a link to Contact for a quick form.

### 2.4 Deprecation and Redirects

- If any route is removed (e.g. old “Consultation” URL), add a redirect to the closest new page (e.g. Contact or Pilot Programs) and document in a small “Redirects” section in code or docs.

---

## 3. Test Plan

### 3.1 Unit / Component Tests (Optional but Recommended)

| Area | What to test | Tool idea |
|------|----------------|-----------|
| **Routing** | `parseHashRoute` and `buildHash` for all new and legacy paths; default and unknown hash. | Jest or Vitest. |
| **Contact form** | Required validation, email format, submit payload shape (mock submit). | React Testing Library. |
| **Pilot waitlist** | Same as contact: validation and submit. | React Testing Library. |

### 3.2 Integration Tests (Optional)

| Scenario | Steps | Expected |
|----------|--------|----------|
| **Nav to every new page** | From home, click each nav item. | Correct view and URL hash; no blank or error. |
| **CTA from Home** | Click “Talk to us” and “Explore solutions”. | Navigate to Contact and Solutions (or intended targets). |
| **Form submit** | Fill Contact form and submit (mock or staging backend). | Success message or redirect; no uncaught error. |
| **Pilot waitlist** | Submit waitlist form. | Same as form submit. |

### 3.3 Manual QA Checklist

Use this for each release (staging/production).

**Navigation & routes**
- [ ] Home, Solutions, Pilot Programs, Who We Serve, How We Work, About, Contact load without error.
- [ ] Hash updates in address bar when navigating; refresh on each page keeps same page.
- [ ] Footer links (Safety, Privacy) work on all pages where footer is shown.
- [ ] Mobile: nav collapses or works as designed; all pages usable.

**Homepage**
- [ ] Hero: headline, subhead, pills, and both CTAs visible and correct.
- [ ] All sections from redesign §1 present and copy matches spec.
- [ ] “Talk to us” and “Explore solutions” go to correct destinations.

**Solutions**
- [ ] Four solution areas present with correct bullets; no pricing; equipment integration mentions transplanting and ridging only as stated.

**Pilot Programs**
- [ ] Equipment pilot and Software pilot (Summer 2026) sections present; “Join pilot waitlist” CTA works.
- [ ] No public pricing; “Discuss pricing privately” only where specified.

**Who We Serve / How We Work / About**
- [ ] Copy matches redesign; no broken layout or missing sections.

**Contact**
- [ ] All form fields present (I am a, Primary interest, Busy season, Current tools, Email/phone).
- [ ] Required validation and submit works (staging backend or mock).

**Legacy**
- [ ] Equipment catalog and machine detail still work if kept.
- [ ] Brochure and Guide behave per Phase 4 decisions (kept or redirected).
- [ ] QuoteRequestModal or “Talk to us” flow still works if applicable.

**Content policy**
- [ ] No pricing or discount language on public pages.
- [ ] No tractor or manipulation claims in assistive automation unless approved.
- [ ] Legal: Safety and Privacy pages still accurate and linked.

### 3.4 Accessibility & Performance (Quick Pass)

- [ ] Keyboard navigation: tab through nav and main CTAs; form fields focusable.
- [ ] One quick pass with axe or Lighthouse for critical a11y issues.
- [ ] No obvious layout shift (CLS) on load; hero image/video doesn’t block LCP excessively.

---

## 4. Rollout and Documentation

- **Staging:** Deploy to a staging URL after Phase 2 (all new pages) and run manual QA; repeat after Phase 5 (forms).
- **Production:** Deploy after sign-off on content and QA. If needed, feature-flag new homepage and new routes and switch over in one release.
- **Docs:** Keep [redesign.md](./redesign.md) as the single source of content and structure; keep this implementation plan updated when phases or tasks change (e.g. redirects, new env vars).

---

## 5. Summary Table

| Phase | Focus | Duration | Key deliverables |
|-------|--------|----------|-------------------|
| 1 | Routing & shell | ~1 week | New routes, new nav, footer behavior |
| 2 | New pages | ~2 weeks | Home, Solutions, Pilot, Who We Serve, How We Work, About, Contact |
| 3 | Copy & assets | ~1 week | Copy source, hero asset, content audit |
| 4 | Legacy alignment | ~1 week | Catalog/Guide/Brochure and “Talk to us” |
| 5 | Forms & backend | ~1 week | Contact + pilot waitlist working |

Total rough timeline: **5–6 weeks** for full implementation, integration, and test cycle (can overlap phases if multiple contributors).
