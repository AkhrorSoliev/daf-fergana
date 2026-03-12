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
  price: string;                           // "100$" yoki "690 000 so'm"
  description: { uz: string; de: string };
  features: { uz: string[]; de: string[] };
  icon: string;                            // Emoji
  color: string;                           // Tailwind gradient klasi
}
```

### Ma'lumotlar (12 ta kurs)

| Kategoriya | Darajalar | Soatlar | Narx |
|------------|-----------|---------|------|
| Individual | A1-B2 | 48-84 | $100 |
| Intensive | A1-B2 | 60-120 | 690,000 so'm |
| Standard | A1-B2 | 72-144 | 400,000 so'm |

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

## Filiallar (`branches.ts`)

### Tip

```typescript
type Branch = {
  id: string;            // "fergana", "tashkent"
  city: string;          // "Farg'ona"
  name?: string;         // "DaF Texnopark" (ixtiyoriy)
  address: string;
  phones: string[];
  email?: string;
};
```

### Filiallar (8 ta)

| ID | Shahar | Email |
|----|--------|-------|
| tashkent | Toshkent | daftashkent@gmail.com |
| bukhara | Buxoro | — |
| fergana | Farg'ona | dafsprachzentrum@gmail.com |
| fergana-texnopark | Farg'ona (Texnopark) | — |
| namangan | Namangan | — |
| navoiy | Navoiy | — |
| samarkand | Samarqand | dafsamarkand@gmail.com |
| khorezm | Xorazm | — |

### Helper funksiyalar

```typescript
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
