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
- **Forms**: react-hook-form + Zod → `/api/lead` → Telegram Bot
- **Icons**: lucide-react, react-icons
- **SEO**: Next.js Metadata API + JSON-LD + next-sitemap

## Commands

```bash
npm run dev       # Development (Turbopack)
npm run build     # Production build (Turbopack)
npm run start     # Start production server
npm run lint      # ESLint
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
│   ├── courses.ts          # Course levels, categories, pricing
│   ├── teachers.ts         # Teacher profiles
│   ├── branches.ts         # Branch locations + map utils
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
2. `POST /api/lead` with `{ name, phone, level?, source }`
3. Backend sends to Telegram via Bot API (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)

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
TELEGRAM_BOT_TOKEN   # Telegram bot token for lead notifications
TELEGRAM_CHAT_ID     # Telegram chat ID for lead notifications
```

## Important Notes

- `next.config.ts` is the only config file (no next.config.js)
- Remote images allowed from: json-api.uz, picsum.photos, avatars.mds.yandex.net, res.cloudinary.com, images.uzum.uz, flagsapi.com
- Sitemap auto-generated on `postbuild` via next-sitemap
- Theme: light/dark mode via CSS variables, initialized with inline script before hydration
