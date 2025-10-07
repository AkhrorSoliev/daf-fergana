export type Locale = "uz" | "de";

type Dict = Record<string, unknown>;

export const dictionaries: Record<Locale, Dict> = {
  uz: {
    hero: {
      phrases: [
        "Kuchli start 💪",
        "Ravon yo'l 🛣️",
        "Cheksiz imkoniyatlar ✨",
        "Tez natija ⚡",
        "Samarali tayyorgarlik 🎯",
        "Ishonchli yo'l-yo'riq 🧭",
        "Yuqori motivatsiya 🚀",
        "Amaliy tajriba 🧩",
      ],
      subtitle:
        "Nemis tili sizni universitetlar, ish va yangi hayot sari yetaklaydi.",
      ctaPrimary: "Kurslarni ko'rish",
      ctaSecondary: "Bepul konsultatsiya",
    },
    teachers: {
      title: "O'qituvchilarimiz",
      subtitle:
        "Tajribali ustozlarimiz bilan nemis tilini samarali va zavq bilan o'rganing",
      badge: "👨‍🏫 Professional jamoa",
      featured: "Rahbar",
      details: "Batafsil ma'lumot",
      backToTeachers: "Barcha o'qituvchilarga qaytish",
      fullBiography: "To'liq biografiya",
      mainInfo: "Asosiy ma'lumotlar",
      consultation: "Bepul konsultatsiya olish",
      courses: "Kurslar",
      additionalInfo:
        "Bu o'qituvchi haqida savollaringiz bormi? Bepul konsultatsiya orqali barcha savollaringizga javob oling.",
      meetTeacher: "O'qituvchi bilan tanishing?",
      consultationSubtitle: "Bepul konsultatsiya uchun bog'laning",
    },
    advantages: {
      title: "Nima uchun bizni tanlash kerak?",
      subtitle: "Bizning afzalliklarimiz va imkoniyatlarimiz",
      badge: "⭐ Afzalliklar",
      items: {
        bachelor: {
          title: "Germaniyada Ta'lim — Bachelor & Master",
          desc: "Universitetga qabul, talablari va stipendiya imkoniyatlari haqida to'liq yo'l xaritasi.",
        },
        weiterbildung: {
          title: "Weiterbildung — Malaka oshirish",
          desc: "Ish faoliyati yonida qisqa kurslar orqali kasbiy malaka va sertifikat olish yo'llari.",
        },
        ausbildung: {
          title: "Ausbildung — Dual Ta'lim",
          desc: "Nazariya + amaliyot: o'qish bilan birga oylik maosh to'lanadigan kasb-hunar tayyorlash.",
        },
        fsj: {
          title: "FSJ/BFD — volontiyorlik dasturi",
          desc: "Ijtimoiy sohada ko'ngilli faoliyat, madaniy almashinuv va tilni amalda rivojlantirish.",
        },
        aupair: {
          title: "Aupair — Enagalik dasturi",
          desc: "Nemis oilasida yashab, bolalar parvarishi bilan tilni kundalik hayotda o'rganish.",
        },
        ferienjob: {
          title: "Ferienjob — 3 oylik ta'til ishi",
          desc: "Talabalar uchun yozgi mavsumda qisqa muddatli ish, tajriba va daromad imkoniyati.",
        },
        specialist: {
          title: "Mutaxassisligingiz bo'yicha ish",
          desc: "Diplomni tan oldirish, ish beruvchi topish va kasbiy migratsiya jarayonlari.",
        },
        saisonarbeit: {
          title: "Saisonarbeit — Mavsumiy ish",
          desc: "Qishloq xo'jaligi va xizmat ko'rsatishda mavsumiy ishlar uchun rasmiy yo'l.",
        },
        consulting: {
          title: "Consulting xizmatlari",
          desc: "Profil tahlili, yo'nalish tanlash, hujjatlar va viza jarayonida yo'l-yo'riq.",
        },
      },
    },
    media: {
      title: "Bizning faoliyatimiz",
      subtitle: "O'quv jarayoni va muvaffaqiyatlarimiz haqida",
      badge: "📸 Galereya",
    },
    contacts: {
      title: "Biz bilan bog'laning",
      subtitle: "Savollaringiz bormi? Biz sizga yordam beramiz!",
      badge: "📞 Aloqa",
      address: "Manzil",
      phone: "Telefon",
      email: "Email",
      workingHours: "Ish vaqti",
      social: "Ijtimoiy tarmoqlar",
      form: {
        name: "Ism Familiya",
        phone: "Telefon raqam",
        message: "Xabar",
        submit: "Yuborish",
        sending: "Yuborilmoqda...",
        success: "Xabar muvaffaqiyatli yuborildi!",
        error: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
      },
    },
    about: {
      badge: "📚 Bizning markaz",
      title: "Markaz haqida",
      subtitle: "Professional nemis tili ta'limi va Germaniya imkoniyatlari",
      p1: "DaF Sprachzentrum M.CH.J — nemis tilini o'qitishga ixtisoslashgan til markazi. O'zbekiston bo'ylab 8 ta filial. 2022-yildan beri yoshlarga Germaniya ta'lim standartlari asosida zamonaviy nemis tili ta'limi.",
      p2: "Farg'ona filialida 650+ yosh Goethe, ECL, ÖSD, TELC, TestDaF kabi xalqaro sertifikat imtihonlariga tayyorlanmoqda va muvaffaqiyat qozonmoqda.",
      stats: {
        branches: "Filiallar",
        startedYear: "Boshlangan yil",
        preparedYouth: "Tayyorgarlik olgan yoshlar",
        internationalExams: "Xalqaro imtihonlar",
      },
      workplacesTitle: "Bitiruvchilarimiz ish joylari",
      testimonialsTitle: "O'quvchilarning fikrlari",
      resultsBadge: "⭐ Bizning natijalar",
      resultsTitle: "Bizning muvaffaqiyatlarimiz",
      resultsSubtitle:
        "O'quvchilarimizning yutuqlari va muvaffaqiyatlari bizning g'ururimiz",
    },
    consultation: {
      badge: "📞 Bepul maslahat",
      title: "Bepul konsultatsiya",
      subtitle:
        "Nemis tilini o'rganish yoki Germaniyada ta'lim olish haqida maslahat oling. Mutaxassislarimiz sizga yordam berishga tayyor!",
      form: {
        name: "Ism Familiya *",
        namePlaceholder: "Ismingizni kiriting",
        phone: "Telefon raqam *",
        phonePlaceholder: "+998 XXX XX XX XX",
        submit: "Konsultatsiya so'rang",
        sending: "Yuborilmoqda...",
        phoneFormatError: "Telefon raqam formati: +998 XXX XX XX XX",
        success: "Muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.",
        error: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
      },
    },
    navbar: {
      home: "Asosiy sahifa",
      teachers: "Oqituvchilar",
      courses: "Kurslar",
      branches: "Filallar",
      results: "Natijalar",
      library: "Kutubxona",
      cta: "Bepul konsultatsiya",
    },
    footer: {
      navigation: "Navigatsiya",
      contact: "Aloqa",
      social: "Ijtimoiy tarmoqlar",
      desc1:
        "DaF Sprachzentrum M.CH.J — nemis tilini o'qitishga ixtisoslashgan til markazi.",
      desc2: "O'zbekiston bo'ylab 8 ta filial.",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      madeBy: "tomonidan tayyorlandi.",
    },
    courses: {
      badge: "📚 Nemis tili kurslari",
      title: "Bizning kurslarimiz",
      subtitle:
        "A1 dan C1 gacha barcha darajalar uchun individual, intensiv va standart kurslar.",
      subtitle2:
        "O'zingizga mos yo'nalishni tanlang va nemis tilini professional darajada o'rganing.",
      category: {
        Individual: {
          title: "Individual kurslar",
          desc: "Shaxsiy yondashuv va moslashtirilgan jadval orqali tezroq natijaga erishing.",
          badge: "👤 Shaxsiy yondashuv",
        },
        Intensive: {
          title: "Intensiv kurslar",
          desc: "Qisqa vaqt ichida samarali mashg‘ulotlar bilan yuqori natijaga erishing.",
          badge: "⚡ Tezkor o‘sish",
        },
        Standard: {
          title: "Standart kurslar",
          desc: "Barqaror o‘quv rejasi bilan chuqur va mustahkam bilimlarni egallang.",
          badge: "🌱 Barqaror rivojlanish",
        },
      },
      ctaTitle: "Qaysi kurs sizga mos?",
      ctaSubtitle: "Bepul konsultatsiya orqali eng yaxshi variantni tanlang",
      ctaButton: "Konsultatsiya olish",
      levelLabel: "daraja",
      duration: "Davomiyligi",
      hours: "soat",
      register: "Ro'yxatdan o'tish",
      modal: {
        title: "Kursga yozilish",
        selected: "Tanlangan kurs",
        name: "Ism Familiya *",
        phone: "Telefon raqam *",
        sending: "Yuborilmoqda...",
        success: "Muvaffaqiyat! Tez orada siz bilan bog'lanamiz.",
        error: "Xatolik yuz berdi. Qaytadan urinib ko'ring.",
      },
    },
    lang: {
      uz: "O'zbek",
      de: "Deutsch",
      system: "Tizim",
    },
    metadata: {
      title: "DaF Zentrum – O'zbekistonda nemis tili kurslari",
      description:
        "O'zbekistonda nemis tili kurslari, imtihonlarga tayyorgarlik va materiallar. A1–B2 darslar, tajribali o'qituvchilar va amaliy materiallar.",
      keywords:
        "nemis tili, kurslar, o'zbekiston, goethe, testdaf, imtihon, ta'lim, daf zentrum",
    },
  },
  de: {
    hero: {
      phrases: [
        "Starker Start 💪",
        "Fließender Weg 🛣️",
        "Unbegrenzte Möglichkeiten ✨",
        "Schnelle Ergebnisse ⚡",
        "Effektive Vorbereitung 🎯",
        "Zuverlässige Orientierung 🧭",
        "Hohe Motivation 🚀",
        "Praktische Erfahrung 🧩",
      ],
      subtitle:
        "Die deutsche Sprache führt Sie zu Universitäten, Arbeit und einem neuen Leben.",
      ctaPrimary: "Kurse ansehen",
      ctaSecondary: "Kostenlose Beratung",
    },
    teachers: {
      title: "Unsere Lehrer",
      subtitle:
        "Lernen Sie Deutsch effektiv und mit Freude mit unseren erfahrenen Lehrern",
      badge: "👨‍🏫 Professionelles Team",
      featured: "Leiter",
      details: "Weitere Details",
      backToTeachers: "Zurück zu allen Lehrern",
      fullBiography: "Vollständige Biografie",
      mainInfo: "Grundlegende Informationen",
      consultation: "Kostenlose Beratung erhalten",
      courses: "Kurse",
      additionalInfo:
        "Haben Sie Fragen zu diesem Lehrer? Erhalten Sie Antworten auf alle Ihre Fragen mit einer kostenlosen Beratung.",
      meetTeacher: "Lehrer kennenlernen?",
      consultationSubtitle: "Kontaktieren Sie uns für eine kostenlose Beratung",
    },
    advantages: {
      title: "Warum uns wählen?",
      subtitle: "Unsere Vorteile und Möglichkeiten",
      badge: "⭐ Vorteile",
      items: {
        bachelor: {
          title: "Studium in Deutschland — Bachelor & Master",
          desc: "Vollständige Anleitung zu Universitätszulassung, Anforderungen und Stipendienmöglichkeiten.",
        },
        weiterbildung: {
          title: "Weiterbildung — Qualifikationserhöhung",
          desc: "Berufliche Qualifikation und Zertifikate durch kurze Kurse neben der Arbeit.",
        },
        ausbildung: {
          title: "Ausbildung — Duales Studium",
          desc: "Theorie + Praxis: Berufsausbildung mit monatlichem Gehalt während des Studiums.",
        },
        fsj: {
          title: "FSJ/BFD — Freiwilligendienst",
          desc: "Freiwilligenarbeit im sozialen Bereich, kultureller Austausch und praktische Sprachanwendung.",
        },
        aupair: {
          title: "Aupair — Au-pair Programm",
          desc: "Leben in deutschen Familien, Kinderbetreuung und tägliches Sprachenlernen.",
        },
        ferienjob: {
          title: "Ferienjob — 3-monatige Ferienarbeit",
          desc: "Kurzzeitige Arbeit für Studenten in der Sommersaison, Erfahrung und Einkommen.",
        },
        specialist: {
          title: "Arbeit in Ihrem Fachbereich",
          desc: "Diplomanerkennung, Arbeitgebersuche und berufliche Migrationsprozesse.",
        },
        saisonarbeit: {
          title: "Saisonarbeit — Saisonale Arbeit",
          desc: "Offizielle Wege für saisonale Arbeiten in Landwirtschaft und Dienstleistungen.",
        },
        consulting: {
          title: "Beratungsdienstleistungen",
          desc: "Profilanalyse, Richtungswahl, Dokumente und Anleitung im Visumprozess.",
        },
      },
    },
    media: {
      title: "Unsere Aktivitäten",
      subtitle: "Über den Lernprozess und unsere Erfolge",
      badge: "📸 Galerie",
    },
    contacts: {
      title: "Kontaktieren Sie uns",
      subtitle: "Haben Sie Fragen? Wir helfen Ihnen gerne!",
      badge: "📞 Kontakt",
      address: "Adresse",
      phone: "Telefon",
      email: "E-Mail",
      workingHours: "Arbeitszeiten",
      social: "Soziale Netzwerke",
      form: {
        name: "Vor- und Nachname",
        phone: "Telefonnummer",
        message: "Nachricht",
        submit: "Senden",
        sending: "Wird gesendet...",
        success: "Nachricht erfolgreich gesendet!",
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      },
    },
    about: {
      badge: "📚 Unser Zentrum",
      title: "Über das Zentrum",
      subtitle: "Professioneller Deutschunterricht und Chancen in Deutschland",
      p1: "DaF Sprachzentrum GmbH – ein auf Deutschunterricht spezialisiertes Zentrum. 8 Filialen in Usbekistan. Seit 2022 moderne Deutschkurse nach deutschen Standards.",
      p2: "In der Filiale Fergana bereiten sich über 650 Jugendliche auf Goethe, ECL, ÖSD, TELC, TestDaF vor und erzielen Erfolge.",
      stats: {
        branches: "Filialen",
        startedYear: "Gründungsjahr",
        preparedYouth: "Vorbereitete Lernende",
        internationalExams: "Internationale Prüfungen",
      },
      workplacesTitle: "Arbeitsplätze unserer Absolventen",
      testimonialsTitle: "Stimmen unserer Lernenden",
      resultsBadge: "⭐ Unsere Ergebnisse",
      resultsTitle: "Unsere Erfolge",
      resultsSubtitle: "Die Erfolge unserer Lernenden sind unser Stolz",
    },
    consultation: {
      badge: "📞 Kostenlose Beratung",
      title: "Kostenlose Beratung",
      subtitle:
        "Erhalten Sie Beratung zum Deutschlernen oder Studium in Deutschland. Unsere Experten helfen Ihnen gern!",
      form: {
        name: "Vor- und Nachname *",
        namePlaceholder: "Geben Sie Ihren Namen ein",
        phone: "Telefonnummer *",
        phonePlaceholder: "+998 XXX XX XX XX",
        submit: "Beratung anfordern",
        sending: "Wird gesendet...",
        phoneFormatError: "Telefonformat: +998 XXX XX XX XX",
        success: "Erfolgreich gesendet! Wir kontaktieren Sie in Kürze.",
        error: "Ein Fehler ist aufgetreten. Bitte erneut versuchen.",
      },
    },
    navbar: {
      home: "Startseite",
      teachers: "Lehrer",
      courses: "Kurse",
      branches: "Filialen",
      results: "Ergebnisse",
      library: "Bibliothek",
      cta: "Kostenlose Beratung",
    },
    footer: {
      navigation: "Navigation",
      contact: "Kontakt",
      social: "Soziale Netzwerke",
      desc1:
        "DaF Sprachzentrum GmbH – Zentrum spezialisiert auf Deutschunterricht.",
      desc2: "8 Filialen in ganz Usbekistan.",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      madeBy: "erstellt von.",
    },
    courses: {
      badge: "📚 Deutschkurse",
      title: "Unsere Kurse",
      subtitle:
        "Individuelle, Intensiv- und Standardkurse für alle Niveaus von A1 bis C1.",
      subtitle2:
        "Wählen Sie den passenden Kurs und lernen Sie Deutsch professionell.",
      category: {
        Individual: {
          title: "Individuelle Kurse",
          desc: "Schneller zum Ziel mit individueller Betreuung und flexiblem Zeitplan.",
          badge: "👤 Individuelle Betreuung",
        },
        Intensive: {
          title: "Intensivkurse",
          desc: "In kurzer Zeit hohe Ergebnisse mit effektiven Unterrichtseinheiten.",
          badge: "⚡ Schnelles Wachstum",
        },
        Standard: {
          title: "Standardkurse",
          desc: "Tiefes und solides Wissen mit einem stabilen Lernplan.",
          badge: "🌱 Stetige Entwicklung",
        },
      },
      ctaTitle: "Welcher Kurs passt zu Ihnen?",
      ctaSubtitle:
        "Wählen Sie die beste Option mit einer kostenlosen Beratung.",
      ctaButton: "Beratung erhalten",
      levelLabel: "Niveau",
      duration: "Dauer",
      hours: "Std.",
      register: "Anmelden",
      modal: {
        title: "Kursanmeldung",
        selected: "Ausgewählter Kurs",
        name: "Vor- und Nachname *",
        phone: "Telefonnummer *",
        sending: "Wird gesendet...",
        success: "Erfolg! Wir kontaktieren Sie in Kürze.",
        error: "Fehler aufgetreten. Bitte erneut versuchen.",
      },
    },
    lang: {
      uz: "Usbekisch",
      de: "Deutsch",
      system: "System",
    },
    metadata: {
      title: "DaF Zentrum – Deutschkurse in Usbekistan",
      description:
        "Deutschkurse, Prüfungsvorbereitung und Materialien in Usbekistan. A1–B2 Kurse, erfahrene Lehrer und praktische Materialien.",
      keywords:
        "deutsch, kurse, usbekistan, goethe, testdaf, prüfung, bildung, daf zentrum",
    },
  },
};

export function getFromDict(dict: unknown, path: string): string {
  const value = path
    .split(".")
    .reduce(
      (acc, key) =>
        acc && typeof acc === "object" && acc !== null && key in acc
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      dict
    );
  return typeof value === "string" ? value : "";
}
