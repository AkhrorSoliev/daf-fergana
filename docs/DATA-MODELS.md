# Data Modellari

Barcha statik data `src/data/` papkasida saqlanadi. React kodi yo'q — faqat TypeScript tiplar va exportlar.

## Kurslar (`courses.ts`)

### Tiplar

```typescript
type CourseLevel = "A1" | "A2" | "B1" | "B2";
type CourseCategory = "Individual" | "Intensive" | "Standard";

interface Course {
  id: string;                              // "individual-a1", "standard-b2"
  category: CourseCategory;
  level: CourseLevel;
  duration: { uz: string; de: string };    // "2 oy" / "2 Monate"
  hours: number;                           // Umumiy soatlar
  description: { uz: string; de: string };
  features: { uz: string[]; de: string[] };
  icon: string;                            // Emoji
  color: string;                           // Tailwind gradient klasi
}
```

### Ma'lumotlar (12 ta kurs)

| Kategoriya | Darajalar | Soatlar |
|------------|-----------|---------|
| Individual | A1-B2 | 48-84 |
| Intensive | A1-B2 | 60-120 |
| Standard | A1-B2 | 72-144 |

Narx ERP'dan keladi, filial × tur bo'yicha; `courses.ts` da narx yo'q.

### Helper funksiyalar

```typescript
getCoursesByCategory(category: CourseCategory): Course[]
getCourseById(id: string): Course | undefined
```

---

## O'qituvchilar (`teachers.ts`)

### Tip

```typescript
type Teacher = {
  slug: string;          // URL uchun: "herr-jamsher"
  name: string;          // "Jamsher Murtazoxonov"
  degree: "Bachelor" | "Master";
  level: string;         // "C1", "B2"
  bio: { uz: string; de: string };
};
```

### O'qituvchilar (10+)

| Slug | Ism | Daraja | Level |
|------|-----|--------|-------|
| herr-jamsher | Jamsher Murtazoxonov | Master | C1 |
| herr-eldor | Eldor Khaydaraliyev | Bachelor | C1 |
| herr-ulugbek | Ulug'bek Akhmadjonov | Bachelor | B2 |
| frau-feruza | Feruza Mamazulinova | Master | C1 |
| frau-iroda | Iroda Kurbanova | Bachelor | C1 |
| frau-saida | Saida Mustafoyeva | Bachelor | C1 |
| herr-umarov | Musinjon Umarov | Bachelor | C1 |
| frau-gulnoza | Gulnoza | Bachelor | B2 |
| frau-yoqutxon | Yoqutxon | Bachelor | B2 |
| herr-doston | Doston | Bachelor | B2 |
| frau-sakina | Sakina | Bachelor | B2 |

### Rasm qoidalari

- Asosiy: `/lehrer/{slug}.png`
- Istisnolar:
  - `herr-umarov` → `/lehrer/herr-musinjon.png`
  - `herr-doston` → `/lehrer/herr-doston.jpg`
  - `frau-sakina` → `/lehrer/frau-sakina.jpg`

### Helper funksiya

```typescript
getTeacherBySlug(slug: string): Teacher | undefined
```

---

## Filiallar

Manba — ERP: `getBranches()` (server, `src/lib/site-content.ts`) va komponentlarda `useBranches()`. `src/data/branches.ts` — 3 filialli ASOSIY ro'yxat (narxlar: 450 000 so'm / 740 000 so'm / 100 $); endi u faqat zaxira emas.

Qoida (`mergeBranches()`, `src/lib/site-content-parse.ts`): ERP ma'lumoti asosiy ro'yxat ustiga maydon-maydon qo'yiladi.

- ERP'dagi har bir to'g'ri maydon asosiy maydonni almashtiradi; narxlar kurs turi bo'yicha. ERP'da bo'sh narx — asosiy narx qoladi.
- Noto'g'ri maydon faqat o'zi e'tiborsiz qoldiriladi, filial yoki butun javob tashlanmaydi.
- ERP filiali asosiy filialga avval slug bo'yicha, bo'lmasa `ERP_BRANCH_IDS` bo'yicha moslanadi (slug ustun).
- Sayt bilmaydigan ERP filiali faqat «saytda ko'rsatilsin» belgilangan va to'liq bo'lsa (slug, shahar, manzil, telefon, Telegram kanal) qo'shiladi.
- Asosiy filialni ERP'dan yashirib bo'lmaydi. ERP javob bermasa yoki javob `{ branches: [...] }` bo'lmasa — asosiy ro'yxat o'zgarishsiz.
- Build vaqtida `ERP_API_URL` + `ERP_WEBSITE_CONTENT_KEY` kerak; `ERP_BRANCH_IDS` endi ERP ma'lumotini asosiy filialga moslash uchun ham ishlatiladi (ERP'da slug yo'q bo'lsa).

### Tip (`SiteBranch`, `src/lib/site-content-parse.ts`)

```typescript
type SiteBranch = {
  id: string;                    // slug: "fergana", "namangan", "qarshi"
  erpId?: number;                // ERP Branch.id — lid shu filialga ketadi
  city: { uz: string; de: string };
  name?: string;                 // ixtiyoriy
  address: string;
  phones: string[];
  email?: string;
  telegramChannel: string;
  telegramAdmin: string;
  mapEmbedUrl?: string;          // faqat ruxsat etilgan Google/Yandex manzillari
  prices: Partial<Record<CourseCategory, { amount: number; currency: "UZS" | "USD" }>>;
};
```

### Helper funksiyalar (`branches.ts`)

```typescript
branchCity(branch: Branch, locale: Locale): string
cityById(list: Branch[], id: string, locale: Locale): string
mapSearchUrl(city: string, address: string): string   // Google Maps qidiruv
mapEmbedUrl(city: string, address: string): string     // Google Maps embed
```

---

## Blog Postlar (`posts.ts`)

### Tip

```typescript
type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;                    // ISO format: "2025-01-15"
  tags?: string[];
  cover: string;                   // Public rasm yo'li
  author: {
    name: string;
    slug?: string;                 // /oqituvchilar/[slug] ga havola
  };
  content: string[];               // Paragraflar massivi
};
```

### Postlar (3 ta)

| Slug | Muallif | Sana |
|------|---------|------|
| nemis-tilini-samarali-orgatish-metodlari | Herr Jamsher | — |
| goethe-imtihoniga-tayyorlanish-rejasi | Frau Feruza | — |
| sofligini-saqlagan-grammatika-odati | Herr Eldor | — |

### Helper funksiya

```typescript
getPostBySlug(slug: string): BlogPost | undefined
```

---

## Kitoblar (`books.ts`)

### Tiplar

```typescript
type Book = {
  title: string;
  cover: string;          // Rasm URL
  dropbox: string;        // PDF yuklab olish havolasi
  media?: string;         // Audio/media havolasi (ixtiyoriy)
};

type ParsedTitle = {
  main: string;           // Asosiy nom
  level?: string;         // "A1", "B1-B2"
  type?: string;          // "Kursbuch", "Übungsbuch", "Dictionary", "Grammar"
};
```

### parseTitle() funksiyasi

Kitob nomidan daraja va turni ajratib oladi:
- `"Netzwerk Neu - A1 - Kursbuch"` → `{ main: "Netzwerk Neu", level: "A1", type: "Kursbuch" }`
- `"Nemis tili lug'at"` → `{ main: "Nemis tili", type: "Dictionary" }`

### Kitoblar (9 ta)

- Netzwerk Neu seriyasi: A1-B1 (Kursbuch + Übungsbuch juftliklari)
- Grammatik aktiv A1-B1
- Nemis tili lug'at
- S.Saidov grammatika mashqlari

---

## Galeriya rasmlari (`gallery-images.ts`)

```typescript
export const GALLERY_IMAGE_URLS: string[]   // 74 ta URL (json-api.uz CDN)
```

`/natijalar` sahifasida masonry grid + lightbox sifatida ishlatiladi.

---

## Testimoniallar (`testimonials.ts`)

### Tiplar va exportlar

```typescript
type Testimonial = {
  name: string;
  role: string;            // "Goethe A2 sertifikati"
  content: string;
  avatar: string;          // picsum.photos URL
  rating: number;          // 1-5
};

export const testimonials: Testimonial[];     // 4 ta sharh
export const workplaces: string[];            // 5 ta partner rasm yo'li
export const marqueeImages: string[];         // 24 ta CDN rasm URL
```
