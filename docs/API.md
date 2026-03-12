# API Hujjatlari

## POST /api/lead

Lead formalaridan ma'lumotlarni Telegram botga yuboradi.

### So'rov

```http
POST /api/lead
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Ism Familiya",
  "phone": "+998 90 123 45 67",
  "level": "Individual - A1",
  "source": "Kurslar"
}
```

| Maydon | Turi | Majburiy | Tavsif |
|--------|------|----------|--------|
| name | string | Ha | Foydalanuvchi ismi |
| phone | string | Ha | Telefon raqami |
| level | string | Yo'q | Kurs darajasi |
| source | string | Yo'q | Lead manbai |

### Source aniqlash tartibi

1. So'rovda berilgan `source`
2. `level` mavjud bo'lsa: "Kurs ariza"
3. Referer headerdan yo'l nomi
4. Default: "Bepul konsultatsiya"

### Telegram xabar formati

```
🆕 Yangi lead — [source]
👤 Ism: [name]
📞 Telefon: [phone]
📚 Kurs: [level]          (agar mavjud bo'lsa)
⏰ Vaqt (UZT): [datetime]  (Asia/Tashkent, UTC+5)
```

### Javoblar

**Muvaffaqiyat (200):**
```json
{ "ok": true }
```

**Validatsiya xatosi (400):**
```json
{ "error": "name va phone majburiy", "reason": "validation" }
```

**Env o'zgaruvchilar yo'q (500):**
```json
{ "error": "Telegram env vars missing", "reason": "missing_env" }
```

**Telegram xatosi (502):**
```json
{ "error": "Telegram API error", "reason": "telegram_error", "details": "..." }
```

**Umumiy xato (500):**
```json
{ "error": "Internal error", "reason": "exception" }
```

### Xavfsizlik

- Barcha qiymatlar HTML escape qilinadi (`<`, `>`, `&`, `"`, `'`)
- Content-Type: application/json tekshiriladi

---

## GET /api/blog

Paginated blog postlarni qaytaradi.

### So'rov

```http
GET /api/blog?page=1&limit=12
```

| Parametr | Turi | Default | Min/Max |
|----------|------|---------|---------|
| page | number | 1 | min: 1 |
| limit | number | 12 | min: 1, max: 50 |

### Javob (200)

```json
{
  "items": [
    {
      "slug": "nemis-tilini-samarali-orgatish-metodlari",
      "title": "Nemis tilini samarali o'rgatish metodlari",
      "summary": "...",
      "date": "2025-01-15",
      "tags": ["metodika", "til"],
      "cover": "/blog/cover-1.jpg",
      "coverUrl": "https://dafzentrum.uz/blog/cover-1.jpg",
      "author": {
        "name": "Jamsher Murtazoxonov",
        "slug": "herr-jamsher"
      },
      "url": "https://dafzentrum.uz/blog/nemis-tilini-samarali-orgatish-metodlari"
    }
  ],
  "page": 1,
  "limit": 12,
  "total": 3,
  "hasMore": false,
  "updatedAt": "2025-01-15T00:00:00.000Z"
}
```

### Kesh

```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

- 5 daqiqa ommaviy kesh
- 10 daqiqa stale-while-revalidate
