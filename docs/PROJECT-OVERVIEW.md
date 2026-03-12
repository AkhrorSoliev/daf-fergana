# DaF Fergana — Loyiha haqida

## Umumiy ma'lumot

**DaF Sprachzentrum Fergana** — O'zbekistonda nemis tilini o'qitishga ixtisoslashgan til markazi veb-sayti.

- **URL**: https://dafzentrum.uz
- **Tillar**: O'zbek (uz), Nemis (de)
- **Filiallar**: 8 ta (Toshkent, Buxoro, Farg'ona x2, Namangan, Navoiy, Samarqand, Xorazm)
- **Tashkil etilgan**: 2022-yil

## Tech Stack

| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| Next.js | 16.1.6 | App Router framework |
| React | 19.1.0 | UI kutubxonasi |
| TypeScript | 5 | Tip xavfsizligi |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 11.18.2 | Animatsiyalar |
| shadcn/ui | (Radix) | UI komponentlar |
| react-hook-form | 7.62.0 | Forma boshqaruvi |
| Zod | 4.1.8 | Validatsiya |
| lucide-react | 0.544.0 | Ikonlar |
| next-sitemap | 4.2.3 | SEO sitemap |

## Buyruqlar

```bash
npm run dev       # Development server (Turbopack)
npm run build     # Production build (Turbopack)
npm run start     # Production serverni ishga tushirish
npm run lint      # ESLint tekshiruvi
```

## Environment Variables

```env
TELEGRAM_BOT_TOKEN   # Telegram bot tokeni (lead xabarnomalar uchun)
TELEGRAM_CHAT_ID     # Telegram chat ID (lead xabarnomalar uchun)
```

## Sahifalar ro'yxati

| Sahifa | URL | Turi | Tavsif |
|--------|-----|------|--------|
| Asosiy | `/` | Static | Hero, About, Advantages, Media, Consultation, Contacts |
| Blog | `/blog` | Static | Blog maqolalar ro'yxati |
| Blog post | `/blog/[slug]` | Dynamic | Alohida blog maqola |
| Kurslar | `/kurslar` | Static | Kurs ro'yxati va ro'yxatdan o'tish |
| O'qituvchilar | `/oqituvchilar` | Static | O'qituvchilar ro'yxati |
| O'qituvchi | `/oqituvchilar/[slug]` | Dynamic | Alohida o'qituvchi profili |
| Kutubxona | `/library` | Static | Kitoblar va materiallar |
| Natijalar | `/natijalar` | Static | Rasm galereyasi (lightbox bilan) |
| Filiallar | `/filiallar` | Static | Filial manzillari va xaritalar |
| Bachelor/Master | `/afzalliklar/bachelor-master` | Static | Oliy ta'lim dasturi |
| Weiterbildung | `/afzalliklar/weiterbildung` | Static | Malaka oshirish |
| Ausbildung | `/afzalliklar/ausbildung` | Static | Dual ta'lim |
| Consulting | `/afzalliklar/consulting` | Static | Konsalting xizmatlari |
| FSJ/BFD | `/afzalliklar/fsj-bfd` | Static | Volontiyorlik dasturi |
| Au-pair | `/afzalliklar/aupair` | Static | Enagalik dasturi |
| Ferienjob | `/afzalliklar/ferienjob` | Static | Ta'til ishi |
| Saisonarbeit | `/afzalliklar/saisonarbeit` | Static | Mavsumiy ish |
| Mutaxassis ishi | `/afzalliklar/mutaxassis-ishi` | Static | Mutaxassislik bo'yicha ish |

## API Endpointlar

| Endpoint | Method | Maqsad |
|----------|--------|--------|
| `/api/lead` | POST | Lead formadan Telegramga yuborish |
| `/api/blog` | GET | Paginated blog postlar |
