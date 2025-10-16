export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO string
  tags?: string[];
  cover: string; // public path to image
  author: {
    name: string;
    slug?: string; // links to `oqituvchilar/[slug]`
  };
  content: string[]; // paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "nemis-tilini-samarali-orgatish-metodlari",
    title: "Nemis tilini samarali o'rganish: ustozlarimizdan 7 maslahat",
    summary:
      "Tilni tez va sifatli o'rganish uchun amaliy usullar: reja, input, gapirish, xatolardan qo'rqmaslik va boshqalar.",
    date: "2025-10-10",
    tags: ["o'rganish", "metodika", "motivatsiya"],
    cover: "/assets/hero-image-1.jpg",
    author: { name: "Herr Jamsher Murtazoxonov", slug: "herr-jamsher" },
    content: [
      "Nemis tilini o'rganishda eng muhim narsa — izchillik. Har kuni kichik bo'lsa-da, muntazam mashq qilish katta natija beradi.",
      "Reja tuzing: haftaning 5 kuni 30–45 daqiqadan. Kunlar bo'yicha bo'ling: lug'at, grammatika, tinglab tushunish, gapirish va yozish.",
      "Inputni ko'paytiring: podcast, videolar, qisqa maqolalar. Tili yengil kontentdan boshlang va bosqichma-bosqich murakkablashtiring.",
      "Gapirishdan qo'rqmang: xato qilish — o'rganishning bir qismi. Tandemlar va suhbat klublari yordam beradi.",
    ],
  },
  {
    slug: "goethe-imtihoniga-tayyorlanish-rejasi",
    title: "Goethe imtihoniga tayyorlanishning oddiy reja-xaritasi",
    summary:
      "A1–B2 darajalari uchun vaqt taqsimoti, resurslar va amaliy topshiriqlar bilan qisqa qo'llanma.",
    date: "2025-10-11",
    tags: ["imtihon", "goethe", "reja"],
    cover: "/assets/hero-image-2.jpg",
    author: { name: "Frau Feruza Mamazulinova", slug: "frau-feruza" },
    content: [
      "Darajangizni aniq belgilang va rasmiy namuna topshiriqlar bilan ishlang.",
      "Har bir ko'nikma uchun alohida blok: Lesen, Hören, Schreiben, Sprechen. Har kuni bittasiga urg'u bering.",
      "Vaqtni boshqaring: real imtihon sharoitida timer bilan mashq qiling.",
      "Yozma ishlarni ustozdan feedback oling va xatolar ro'yxatini yuriting.",
    ],
  },
  {
    slug: "sofligini-saqlagan-grammatika-odati",
    title: "Grammatikani mustahkamlovchi 5 kundalik odat",
    summary:
      "Kichik odatlar: bir qoida — uch misol, gaplarni qayta yozish, mini-quiz va shadowing.",
    date: "2025-10-12",
    tags: ["grammatika", "kundalik odat"],
    cover: "/assets/hero-image-3.jpg",
    author: { name: "Herr Eldor Khaydaraliyev", slug: "herr-eldor" },
    content: [
      "Har kuni bitta qoida tanlang va kamida uchta misol tuzing.",
      "Eski gaplarni yangi qoidaga moslab qayta yozing — transformatsiya miyasini faollashtiradi.",
      "Mini-quiz tuzing yoki onlayn viktorinalardan foydalaning.",
      "Shadowing — talaffuz va tuzilmani birga mustahkamlaydi.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
