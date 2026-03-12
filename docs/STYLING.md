# Stillar va Dizayn

## Ranglar

### CSS Variables (`globals.css`)

**Light rejim (`:root`):**

| Variable | Qiymat | Ishlatilish |
|----------|--------|-------------|
| `--background` | #ffffff | Sahifa foni |
| `--foreground` | #1f2547 | Asosiy matn |
| `--primary` | #444d78 | Asosiy rang (ko'k) |
| `--primary-foreground` | #ffffff | Primary ustida matn |
| `--secondary` | #9aa6d9 | Ikkinchi darajali rang |
| `--accent` | #58cc02 | Aksent rang (yashil) |
| `--accent-foreground` | #ffffff | Aksent ustida matn |
| `--muted` | #f2f4fa | O'chirilgan fon |
| `--muted-foreground` | #6b7280 | O'chirilgan matn |
| `--destructive` | #ef4444 | Xato rangi |
| `--border` | #e6e8f2 | Chegaralar |
| `--ring` | #444d78 | Focus ring |

**Dark rejim (`.dark`):**

| Variable | Qiymat |
|----------|--------|
| `--background` | #1f2547 |
| `--foreground` | #ffffff |
| `--card` | #2a2f4a |
| `--primary` | #9aa6d9 |
| `--secondary` | #444d78 |
| `--muted` | #3a4159 |
| `--accent` | #58cc02 (o'zgarmaydi!) |
| `--border` | #3a4159 |

### Radius

```css
--radius: 0.625rem;   /* 10px */
```

## Shrift

**Bricolage Grotesque** (Google Fonts)
- CSS variable: `--font-bricolage`
- Subset: Latin
- Yuklanish: `next/font/google`

## Animatsiyalar

### Marquee (cheksiz aylana)

```css
/* Asosiy marquee — 30s */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.animate-marquee { animation: marquee 30s linear infinite; }

/* 50% marquee — 65s (MediaSection) */
@keyframes marquee-50 {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee-50 { animation: marquee-50 65s linear infinite; }
```

**Responsive marquee:**
- Mobile (≤640px): 98s, 200px rasm
- Tablet (641-768px): 108s, 240px rasm
- Desktop: 65s, 273px rasm

### Gentle Bounce

```css
@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
  25%      { transform: translateY(-8px) scale(1.05) rotate(-3deg); }
  50%      { transform: translateY(-12px) scale(1.1) rotate(0deg); }
  75%      { transform: translateY(-8px) scale(1.05) rotate(3deg); }
}
```

### Icon Hover Effect

```css
.icon-hover-effect {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.group:hover .icon-hover-effect {
  transform: translateY(-4px) scale(1.1);
  animation: gentle-bounce 0.6s ease-in-out;
}
```

## Container

```css
.container {
  @apply max-w-7xl mx-auto px-4 md:px-6;
}
```

- Max width: 80rem (1280px)
- Padding: 1rem (mobile), 1.5rem (md+)

## Responsive Breakpoints

| Prefix | Min-width | Ishlatilish |
|--------|-----------|-------------|
| (default) | 0px | Mobile |
| `sm:` | 640px | Katta mobil |
| `md:` | 768px | Planshet |
| `lg:` | 1024px | Desktop (Navbar o'zgaradi) |
| `xl:` | 1280px | Katta desktop |

## Framer Motion Patterns

### Fade-in animatsiya (ko'p ishlatiladi)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
```

### Stagger children

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};
```

### Hover effektlari

```tsx
whileHover={{ y: -8, scale: 1.02 }}      // Kartochka ko'tarish
whileHover={{ scale: 1.05 }}              // Kichik kattalashtirish
whileTap={{ scale: 0.99 }}               // Bosish effekti
```

## Dark Mode

**Ishga tushirish** (flash prevention):
- `<Script strategy="beforeInteractive">` root layoutda
- `localStorage["theme"]` tekshiriladi
- `.dark` klasi `<html>` ga qo'shiladi
- `colorScheme` CSS property o'rnatiladi

**Qo'llash:**
- `dark:` Tailwind prefiksi bilan
- Masalan: `bg-white dark:bg-card`, `text-foreground dark:text-foreground`
