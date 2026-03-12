# Arxitektura

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (I18nProvider, Navbar, Footer)
│   ├── page.tsx                  # Home sahifa (server component)
│   ├── globals.css               # Global stillar, CSS variables, animatsiyalar
│   ├── api/
│   │   ├── blog/route.ts         # GET — paginated blog
│   │   └── lead/route.ts         # POST — Telegram bot ga yuborish
│   ├── blog/
│   │   ├── page.tsx              # Server wrapper → BlogPageClient
│   │   └── [slug]/page.tsx       # Server wrapper → BlogPostClient
│   ├── kurslar/
│   │   ├── layout.tsx            # SEO metadata
│   │   └── page.tsx              # Server wrapper → CoursesPageClient
│   ├── library/
│   │   ├── layout.tsx            # SEO metadata
│   │   └── page.tsx              # Server wrapper → LibraryPageClient
│   ├── oqituvchilar/
│   │   ├── layout.tsx            # SEO metadata
│   │   ├── page.tsx              # Server wrapper → TeachersPageClient
│   │   └── [slug]/page.tsx       # Server wrapper → TeacherDetailClient
│   ├── filiallar/
│   │   └── page.tsx              # Server wrapper → BranchesPageClient
│   ├── natijalar/
│   │   ├── layout.tsx            # SEO metadata
│   │   └── page.tsx              # Server wrapper → ResultsPageClient
│   └── afzalliklar/              # 9 ta sahifa — barchasi pure server component
│       ├── bachelor-master/
│       ├── weiterbildung/
│       ├── ausbildung/
│       ├── consulting/
│       ├── fsj-bfd/
│       ├── aupair/
│       ├── ferienjob/
│       ├── saisonarbeit/
│       └── mutaxassis-ishi/
│
├── components/
│   ├── Navbar.tsx                # Navigatsiya (fixed, scroll-aware)
│   ├── Footer.tsx                # 4 ustunli footer
│   ├── LeadModal.tsx             # Lead forma modal
│   ├── ThemeToggle.tsx           # Dark/Light/System tanlash
│   ├── LanguageToggle.tsx        # UZ ↔ DE tanlash
│   ├── ShareButtons.tsx          # Ijtimoiy ulashish tugmalari
│   ├── sections/                 # Asosiy sahifa bo'limlari
│   │   ├── HeroSection.tsx       # Karusel + animatsion matn
│   │   ├── AboutSection.tsx      # Markaz haqida + statistika
│   │   ├── AdvantagesSection.tsx  # 9 ta afzallik kartochkalari
│   │   ├── MediaSection.tsx      # Marquee + testimoniallar
│   │   ├── ConsultationSection.tsx # Bepul konsultatsiya formasi
│   │   └── ContactsSection.tsx   # Filial tanlash + xarita
│   ├── ui/                       # shadcn/ui komponentlar
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── navigation-menu.tsx
│   │   └── smooth-cursor.tsx     # Custom cursor (spring fizikasi)
│   ├── blog/                     # Blog client komponentlar
│   │   ├── BlogPageClient.tsx
│   │   └── BlogPostClient.tsx
│   ├── courses/
│   │   └── CoursesPageClient.tsx
│   ├── teachers/
│   │   ├── TeachersPageClient.tsx
│   │   └── TeacherDetailClient.tsx
│   ├── library/
│   │   └── LibraryPageClient.tsx
│   ├── results/
│   │   └── ResultsPageClient.tsx
│   └── branches/
│       └── BranchesPageClient.tsx
│
├── data/                         # Statik data fayllar
│   ├── courses.ts                # Kurslar (12 ta: Individual/Intensive/Standard × A1-B2)
│   ├── teachers.ts               # O'qituvchilar (10+ profil)
│   ├── branches.ts               # Filiallar (8 ta) + xarita URL funksiyalar
│   ├── posts.ts                  # Blog postlar (3 ta)
│   ├── books.ts                  # Kitoblar (9 ta) + parseTitle()
│   ├── gallery-images.ts         # Galeriya rasmlari (74 ta URL)
│   └── testimonials.ts           # Testimoniallar, hamkorlar, marquee rasmlari
│
├── i18n/                         # Tarjima tizimi
│   ├── I18nProvider.tsx          # React Context provider (client-side)
│   ├── dictionaries.ts           # Re-export + getFromDict()
│   └── dictionaries/
│       ├── uz.ts                 # O'zbek tarjimalar
│       └── de.ts                 # Nemis tarjimalar
│
├── hooks/
│   └── useCountUp.ts            # Raqam animatsiyasi (IntersectionObserver)
│
├── utils/
│   └── phone.ts                 # formatUzbekPhone, PHONE_PREFIX, PHONE_PATTERN
│
└── lib/
    └── utils.ts                 # cn() — clsx + tailwind-merge
```

## Server vs Client Components

### Qoida: Barcha page.tsx fayllar server component bo'lishi shart

**Pure Server Components** (hech qanday client kodi yo'q):
- `/` — Home page (section komponentlarni import qiladi)
- `/afzalliklar/*` — 9 ta sahifa (statik kontent, animatsiya yo'q)

**Server Wrappers** (page.tsx server, kontent client):
```
page.tsx (server) → imports → *Client.tsx ("use client")
```

| Sahifa | Client Component |
|--------|-----------------|
| `/blog` | `components/blog/BlogPageClient.tsx` |
| `/blog/[slug]` | `components/blog/BlogPostClient.tsx` |
| `/kurslar` | `components/courses/CoursesPageClient.tsx` |
| `/oqituvchilar` | `components/teachers/TeachersPageClient.tsx` |
| `/oqituvchilar/[slug]` | `components/teachers/TeacherDetailClient.tsx` |
| `/library` | `components/library/LibraryPageClient.tsx` |
| `/natijalar` | `components/results/ResultsPageClient.tsx` |
| `/filiallar` | `components/branches/BranchesPageClient.tsx` |

## Root Layout oqimi

```
<html lang="uz">
  <head>
    <Script id="theme-init" />     ← Dark mode flash prevention
  </head>
  <body>
    <I18nProvider>                  ← Client-side i18n context
      <Navbar />                   ← Fixed navigation
      <main>{children}</main>      ← Page content (server yoki client)
      <Footer />                   ← Footer
    </I18nProvider>
    <Script id="org-ld" />         ← JSON-LD structured data
  </body>
</html>
```

## Data oqimi

```
                    ┌─────────────────┐
                    │  Static Data    │
                    │  (src/data/*.ts) │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
        ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
        │  Pages    │ │ Sections  │ │   API     │
        │(server)   │ │ (client)  │ │ Routes    │
        └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
              │              │              │
              │         useI18n()      ┌────▼────┐
              │              │         │Telegram │
              │              │         │ Bot API │
              └──────────────┘         └─────────┘
```
