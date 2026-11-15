# DaF Fergana — CLAUDE.md

## Project Overview

DaF Sprachzentrum Fergana — nemis tili o'quv markazi veb-sayti.
**URL**: https://dafzentrum.uz
**Tillar**: O'zbek (uz), Nemis (de) — client-side i18n

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS 4 + CSS variables (primary: #444d78, accent: #58cc02)
- **UI**: shadcn/ui (Radix primitives), Framer Motion animations
- **Forms**: react-hook-form + Zod → `/api/lead` → ERP (daf-erp-system)
- **Icons**: lucide-react, react-icons
- **SEO**: Next.js Metadata API + JSON-LD + next-sitemap

## Commands

```bash
npm run dev       # Development (Turbopack)
npm run build     # Production build (Turbopack)
npm run start     # Start production server
npm run lint      # ESLint
npm test          # node --test src/lib/*.test.ts (native TypeScript; Node >= 22.18, Node 24 in use)
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (I18nProvider, Navbar, Footer)
│   ├── page.tsx            # Home (server component)
│   ├── api/                # API routes (lead, blog)
│   ├── blog/               # Blog pages
│   ├── kurslar/            # Course listing
│   ├── library/            # Books & materials
│   ├── oqituvchilar/       # Teachers + [slug]
│   ├── filiallar/          # Branch locations
│   ├── natijalar/          # Results gallery
│   └── afzalliklar/        # 9 advantage sub-pages (all server components)
├── components/
│   ├── sections/           # Home page sections (Hero, About, Advantages, etc.)
│   ├── ui/                 # shadcn/ui components
│   ├── blog/               # BlogPageClient, BlogPostClient
│   ├── courses/            # CoursesPageClient
│   ├── teachers/           # TeachersPageClient, TeacherDetailClient
│   ├── library/            # LibraryPageClient
│   ├── results/            # ResultsPageClient
│   ├── branches/           # BranchesPageClient
│   ├── Navbar.tsx, Footer.tsx, LeadModal.tsx, ThemeToggle.tsx, etc.
├── data/                   # Static data files
│   ├── courses.ts          # Course texts (prices come from the ERP)
│   ├── teachers.ts         # Teacher profiles
│   ├── branches.ts         # Base branch list (ERP overlays it) + map/city helpers
│   ├── posts.ts            # Blog posts
│   ├── books.ts            # Library books + parseTitle()
│   ├── gallery-images.ts   # Results page image URLs
│   └── testimonials.ts     # Testimonials, workplaces, marquee images
├── i18n/
│   ├── I18nProvider.tsx    # Client-side context (useI18n hook)
│   └── dictionaries/       # uz.ts, de.ts translation files
├── hooks/
│   └── useCountUp.ts      # Animated counter with IntersectionObserver
├── utils/
│   └── phone.ts           # formatUzbekPhone, PHONE_PREFIX, PHONE_PATTERN
└── lib/
    └── utils.ts            # cn() — clsx + tailwind-merge
```

### Branches and prices from the ERP

- `getBranches()` (`src/lib/site-content.ts`, server only) fetches `GET <ERP>/public/website-content` with `x-website-key`, caches it for 10 minutes and parses the answer field by field with zod (`src/lib/site-content-parse.ts`).
- `src/data/branches.ts` is the BASE branch list, not just a fallback. `mergeBranches()` overlays the ERP on it: every valid ERP field replaces the base field, prices per course type (an empty ERP price keeps the base price). A bad ERP field is ignored on its own — it never discards the branch or the answer.
- An ERP branch is matched to a base branch by slug, else by `ERP_BRANCH_IDS` (slug wins). An ERP branch the site does not know is appended only when it is marked visible and complete (slug, city, address, phone, Telegram channel). A base branch cannot be hidden from the ERP.
- Any failure (no env, timeout, non-200, a body that is not `{ branches: [...] }`) returns the base list unchanged.
- The root layout is async and wraps the app in `<SiteContentProvider>`; components read `useBranches()` and never import `branches` directly.
- Every static route is ISR with a 10-minute revalidate.
- Course prices are per branch × type (`Branch.prices`); course texts stay static in `courses.ts` (no `price`).
- Branch slugs (`fergana`, `namangan`, `qarshi`) must match `teachers.ts` and `ERP_BRANCH_IDS`.
- Map iframes only load allowlisted Google/Yandex URLs (`isAllowedMapEmbed`) and are additionally limited by the `frame-src` CSP in `next.config.ts` — a new iframe source must be added there.

### Page Rendering Rules

**IMPORTANT**: Barcha page.tsx fayllar server component bo'lishi shart.

- **Pure server components** (no client code): `/`, all `/afzalliklar/*` pages
- **Server wrappers + client children**: `/blog`, `/kurslar`, `/library`, `/oqituvchilar`, `/filiallar`, `/natijalar`
  - Page.tsx = thin server wrapper → imports `*Client.tsx` from `components/`
- **Dynamic routes**: `/blog/[slug]`, `/oqituvchilar/[slug]` (server-rendered on demand)

### i18n Pattern

- Custom solution: `I18nProvider` (React Context) wraps app in root layout
- `useI18n()` hook returns `{ locale, t, setLocale }`
- `t("consultation.form.name")` — dot-notation access to nested dictionaries
- Locale stored in `localStorage`, detected from browser language
- Translations in `src/i18n/dictionaries/uz.ts` and `de.ts`

### Form Submission Pattern

All lead forms use the same flow:
1. `formatUzbekPhone()` from `@/utils/phone` for phone input formatting
2. `POST /api/lead` with `{ firstName, lastName, phone, branch, level?, source }` — `branch` is required
3. Backend forwards to ERP `POST /public/website-leads` (header `x-website-key`); lead lands in the fixed «Sayt» section of the branch's NEW column
4. `/api/lead` resolves `branch` with `resolveErpBranchId` (`src/lib/lead-branch.ts`): ERP id from the live list, else `ERP_BRANCH_IDS`. A branch unknown to both gets HTTP 400 `unknown_branch` and is never routed to the first branch.

### Shared Utilities

- **Phone formatting**: `src/utils/phone.ts` — used in LeadModal, ConsultationSection, CoursesPageClient
- **cn()**: `src/lib/utils.ts` — className merging utility
- **Map URLs**: `src/data/branches.ts` — `mapSearchUrl()`, `mapEmbedUrl()`

## Conventions

- Path alias: `@/*` → `./src/*`
- Component naming: PascalCase, files match component names
- Client components: always have `"use client"` directive
- Data files: pure TypeScript exports, no React code
- UI components: shadcn/ui in `src/components/ui/`
- Afzalliklar pages: static content, no client-side hooks or animations
- Image optimization: `unoptimized={true}` for external CDN images
- Fonts: Bricolage Grotesque (Google Fonts, `--font-bricolage` variable)

## Environment Variables

```
ERP_API_URL            # ERP base URL
ERP_WEBSITE_LEADS_KEY  # = ERP's WEBSITE_LEADS_KEY
ERP_WEBSITE_CONTENT_KEY  # = ERP's WEBSITE_CONTENT_KEY (server only, never NEXT_PUBLIC_)
ERP_BRANCH_IDS         # fergana:1,namangan:2,qarshi:3 — slug → ERP Branch.id; matches ERP data to a base branch when the ERP has no slug for it, and routes a lead when the live list has no id for the chosen branch; no default branch; must stay set in prod
```

ERP_API_URL + ERP_WEBSITE_CONTENT_KEY must be present in Vercel BEFORE the build. If they are missing at build time every page is prerendered from the base list with no revalidation until the next deploy.

## Important Notes

- `next.config.ts` is the only config file (no next.config.js)
- Remote images allowed from: json-api.uz, picsum.photos, avatars.mds.yandex.net, res.cloudinary.com, images.uzum.uz, flagsapi.com
- Sitemap auto-generated on `postbuild` via next-sitemap
- Theme: light/dark mode via CSS variables, initialized with inline script before hydration
