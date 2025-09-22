## Search Console & Analytics Setup (dafzentrum.uz)

1. Google Search Console

- Ochish: https://search.google.com/search-console
- Add property → tanlang: Domain (tavsiya) yoki URL-prefix.
- Domain uchun: DNS provider orqali TXT yozuv qo‘shing (Google beradigan qiymatni kiritib, saqlang). 5–30 daqiqa ichida verifikatsiya bo‘ladi.
- URL-prefix uchun: quyidagilardan birini tanlang:
  - HTML fayl: berilgan `googleXXXX.html` faylni `public/` ga joylang va tasdiqlang.
  - Meta teg: `<meta name="google-site-verification" content="XXXX" />` ni `app/layout.tsx` `<head>` ichiga qo‘shing.

2. Sitemap topshirish

- Search Console → Sitemaps bo‘limi → `https://dafzentrum.uz/sitemap.xml` ni yuboring.
- URL Inspection orqali muhim sahifalar uchun “Request Indexing” bosing.

3. Google Analytics 4

- GA4 property yarating.
- `gtag.js` yoki Next integratsiyasini qo‘shing (UIga ta’sir qilmasdan `<Script>` orqali). O‘lchov ID (G-XXXX) ni `.env` orqali boshqaring.

Eslatma: sayt keyinchalik 2 tilda (uz/en) bo‘lishi rejalashtirilgan. Lokalizatsiya qo‘shilganda `alternates.languages` (hreflang) va har til uchun to‘g‘ri canonical sozlamalarini kengaytiring.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
