# Komponentlar

## Asosiy sahifa bo'limlari (sections/)

### HeroSection

**Fayl**: `src/components/sections/HeroSection.tsx`
**Turi**: Client component

**Xususiyatlari:**
- 4 ta fon rasmi karuseli (desktop + mobile variantlari)
- 6 soniyada rasm almashinadi, 2.6 soniyada matn
- Cross-fade o'tish (1.2s)
- Keyingi rasmni oldindan yuklash (flash prevention)
- Gradient overlay: chapdan 60%, o'rtadan 40%, o'ngdan 60%

**Rasmlar:**
- Desktop: `/assets/hero-image-{1-4}.jpg`
- Mobile: `/assets/hero-image-mobile-{1-4}.jpg`
- Breakpoint: 767px

**Tugmalar:**
- Primary: "Kurslarni ko'rish" → `/kurslar`
- Secondary: "Bepul konsultatsiya" → `#consultation` (smooth scroll)

---

### AboutSection

**Fayl**: `src/components/sections/AboutSection.tsx`
**Turi**: Client component

**Statistika (useCountUp hook bilan):**

| Metrika | Qiymat | Ikon |
|---------|--------|------|
| Filiallar | 8 | Building2 |
| Boshlangan yil | 2022 | Calendar |
| Tayyorgarlik olgan yoshlar | 650+ | Users |
| Xalqaro imtihonlar | 5+ | Award |

**Imtihon badge'lari:** Goethe, ECL, ÖSD, TELC, TestDaF

---

### AdvantagesSection

**Fayl**: `src/components/sections/AdvantagesSection.tsx`
**Turi**: Client component

**9 ta kartochka:**

| # | Nomi | Ikon | Havola |
|---|------|------|--------|
| 1 | Bachelor & Master | GraduationCap | /afzalliklar/bachelor-master |
| 2 | Weiterbildung | Briefcase | /afzalliklar/weiterbildung |
| 3 | Ausbildung | Wrench | /afzalliklar/ausbildung |
| 4 | FSJ/BFD | Heart | /afzalliklar/fsj-bfd |
| 5 | Au-pair | Home | /afzalliklar/aupair |
| 6 | Ferienjob | Sun | /afzalliklar/ferienjob |
| 7 | Mutaxassis ishi | Briefcase | /afzalliklar/mutaxassis-ishi |
| 8 | Saisonarbeit | Coffee | /afzalliklar/saisonarbeit |
| 9 | Consulting | Users | /afzalliklar/consulting |

---

### MediaSection

**Fayl**: `src/components/sections/MediaSection.tsx`
**Turi**: Client component

**Bo'limlar:**
1. **Marquee galereyasi** — 24 ta rasm cheksiz aylana (65s animatsiya)
2. **Statistika kartochkasi** — 650+ o'quvchi, 8 filial, 5+ sertifikat
3. **Testimoniallar** — 4 ta 5-yulduzli sharh (4 ustunli grid)
4. **Hamkorlar** — 5 ta partner logosi (2 ustunli grid)

**Data manba**: `src/data/testimonials.ts`

---

### ConsultationSection

**Fayl**: `src/components/sections/ConsultationSection.tsx`
**Turi**: Client component
**Section ID**: `#consultation` (anchor link uchun)

**Forma maydonlari:**
- Ism Familiya (min 2 belgi, Zod validatsiya)
- Telefon raqam (+998 XX XXX XX XX formatda)

**Forma holatlari:** idle → submitting → success | error

**Submit**: POST `/api/lead` → `{ name, phone, source: "Bepul konsultatsiya" }`

**Kontakt ma'lumotlar (forma ostida):**
- Telefon: +998 90 535 10 99 (uz) / +49 176 238 97 113 (de)
- Email: info@daf-fergana.uz (uz) / orif.ahmadaliyev@consultinguz.de (de)
- Telegram: @daffergana (faqat uz)

---

### ContactsSection

**Fayl**: `src/components/sections/ContactsSection.tsx`
**Turi**: Client component

**Xususiyatlari:**
- Filial tanlash dropdown (8 ta filial)
- Tanlangan filial manzili, telefonlari, emaili
- Google Maps embed (iframe)
- Tugmalar: Qo'ng'iroq, Email, Telegram

---

## Navigatsiya komponentlari

### Navbar

**Fayl**: `src/components/Navbar.tsx`
**Turi**: Client component

**Desktop (lg+):**
- Logo (65x65, light/dark variant)
- 5 ta navigatsiya linki
- Active indicator (animated dot)
- LanguageToggle + ThemeToggle
- CTA: "Konsultatsiya" tugmasi

**Mobile (<lg):**
- Logo + menu icon (X/Menu toggle)
- Slide-down menyu
- Full-width CTA tugma

**Linklar:**

| Label | Havola |
|-------|--------|
| Asosiy sahifa | `/` |
| O'qituvchilar | `/oqituvchilar` |
| Kurslar | `/kurslar` |
| Filiallar | `/filiallar` |
| Natijalar | `/natijalar` |

**Scroll davlati:**
- Scrolled: bg-background/95, backdrop-blur-lg, shadow-lg
- Default: bg-background/80, backdrop-blur-md

---

### Footer

**Fayl**: `src/components/Footer.tsx`
**Turi**: Client component

**4 ustun (lg+):**
1. Logo + tavsif matni
2. Navigatsiya linklarai (5 ta, Navbar bilan bir xil)
3. Kontakt: telefon, email, manzil
4. Ijtimoiy tarmoqlar: Telegram, Instagram

**Bottom bar:** © 2026, Maxfiylik siyosati, Foydalanish shartlari

---

### ThemeToggle

**Fayl**: `src/components/ThemeToggle.tsx`
**Turi**: Client component

**Rejimlar:** Light (Sun), Dark (Moon), System (Laptop)
**Saqlash**: localStorage["theme"]
**Desktop:** Dropdown menu | **Mobile:** Bottom sheet

---

### LanguageToggle

**Fayl**: `src/components/LanguageToggle.tsx`
**Turi**: Client component

**Tillar:** uz ↔ de
**UI:** Bayroq rasmi (keyingi tilning bayrog'i ko'rsatiladi)
**Bayroqlar:** `/flags/Flag_of_Uzbekistan.svg`, `/flags/Flag_of_Germany.svg`

---

## LeadModal

**Fayl**: `src/components/LeadModal.tsx`
**Turi**: Client component

**Props:**
```typescript
type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;                    // Lead manbai (masalan "Kurslar")
  levelOptions?: string[];           // Kurs tanlash opsiyalari
  redirectUrlAfterSuccess?: string;  // Muvaffaqiyatdan keyin redirect
};
```

**Forma:**
- Ism Familiya (required)
- Telefon raqam (formatUzbekPhone bilan)
- Yo'nalish (ixtiyoriy, Select komponent)

**Submit**: POST `/api/lead`

---

## UI komponentlar (shadcn/ui)

| Komponent | Fayl | Tavsif |
|-----------|------|--------|
| Button | `ui/button.tsx` | Variantlar: default, outline, ghost; O'lchamlar: sm, md, lg |
| Card | `ui/card.tsx` | Kontent kartochkasi |
| Input | `ui/input.tsx` | Matn kiritish |
| Textarea | `ui/textarea.tsx` | Ko'p qatorli matn |
| Select | `ui/select.tsx` | Radix Select wrapper |
| NavigationMenu | `ui/navigation-menu.tsx` | Radix NavigationMenu wrapper |
| SmoothCursor | `ui/smooth-cursor.tsx` | Custom cursor (spring fizikasi bilan) |
