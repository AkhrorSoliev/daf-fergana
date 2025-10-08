export type CourseLevel = "A1" | "A2" | "B1" | "B2";
export type CourseCategory = "Individual" | "Intensive" | "Standard";

export interface Course {
  id: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: { uz: string; de: string };
  hours: number;
  price: string;
  description: { uz: string; de: string };
  features: { uz: string[]; de: string[] };
  icon: string;
  color: string;
}

export const courses: Course[] = [
  // Individual Courses
  {
    id: "individual-a1",
    category: "Individual",
    level: "A1",
    duration: { uz: "2 oy", de: "2 Monate" },
    hours: 48,
    price: "100$",
    description: {
      uz: "Shaxsiy darslar orqali nemis tilining asoslarini o'rganing",
      de: "Lernen Sie die Grundlagen der deutschen Sprache im Einzelunterricht.",
    },
    features: {
      uz: [
        "1:1 darslar",
        "Moslashuvchan jadval",
        "Shaxsiy yondashuv",
        "Tez natija",
      ],
      de: [
        "1:1-Unterricht",
        "Flexibler Zeitplan",
        "Individueller Ansatz",
        "Schnelle Ergebnisse",
      ],
    },
    icon: "🐻",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-a2",
    category: "Individual",
    level: "A2",
    duration: { uz: "2.5 oy", de: "2,5 Monate" },
    hours: 60,
    price: "100$",
    description: {
      uz: "A1 asosida nemis tilini chuqurroq o'rganing",
      de: "Vertiefen Sie Ihre Deutschkenntnisse aufbauend auf A1 im Einzelunterricht.",
    },
    features: {
      uz: [
        "1:1 darslar",
        "Moslashuvchan jadval",
        "Grammatika diqqati",
        "Gapirish ko'nikmalari",
      ],
      de: [
        "1:1-Unterricht",
        "Flexibler Zeitplan",
        "Grammatikfokus",
        "Sprechfertigkeit",
      ],
    },
    icon: "🎒",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-b1",
    category: "Individual",
    level: "B1",
    duration: { uz: "3 oy", de: "3 Monate" },
    hours: 72,
    price: "100$",
    description: {
      uz: "O'rta daraja nemis tili individual darslar",
      de: "Einzelunterricht auf Mittelstufenniveau (B1).",
    },
    features: {
      uz: [
        "1:1 darslar",
        "Murakkab grammatika",
        "Yozma ishlash",
        "Imtihon tayyorlash",
      ],
      de: [
        "1:1-Unterricht",
        "Komplexe Grammatik",
        "Schriftpraxis",
        "Prüfungsvorbereitung",
      ],
    },
    icon: "🚀",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-b2",
    category: "Individual",
    level: "B2",
    duration: { uz: "3.5 oy", de: "3,5 Monate" },
    hours: 84,
    price: "100$",
    description: {
      uz: "Yuqori o'rta daraja individual ta'lim",
      de: "Einzelunterricht auf fortgeschrittenem Niveau (B2).",
    },
    features: {
      uz: [
        "1:1 darslar",
        "Professional suhbat",
        "Akademik yozuv",
        "Sertifikat tayyorlash",
      ],
      de: [
        "1:1-Unterricht",
        "Professionelle Kommunikation",
        "Akademisches Schreiben",
        "Zertifikatsvorbereitung",
      ],
    },
    icon: "🎯",
    color: "from-blue-500/20 to-blue-600/10",
  },

  // Intensive Courses
  {
    id: "intensive-a1",
    category: "Intensive",
    level: "A1",
    duration: { uz: "1.5 oy", de: "1,5 Monate" },
    hours: 60,
    price: "690 000 so'm",
    description: {
      uz: "Tezkor nemis tili o'rganish dasturi",
      de: "Schnelles Deutschlernprogramm.",
    },
    features: {
      uz: ["Kuniga 3 soat", "Kichik guruh", "Intensiv mashqlar", "Tez natija"],
      de: [
        "3 Stunden täglich",
        "Kleingruppe",
        "Intensive Übungen",
        "Schnelle Ergebnisse",
      ],
    },
    icon: "⚡",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-a2",
    category: "Intensive",
    level: "A2",
    duration: { uz: "2 oy", de: "2 Monate" },
    hours: 80,
    price: "690 000 so'm",
    description: {
      uz: "A2 darajasini tez va samarali o'zlashtiring",
      de: "A2 schnell und effektiv erlernen.",
    },
    features: {
      uz: [
        "Kuniga 3 soat",
        "Amaliy mashqlar",
        "Gapirish klublari",
        "Haftalik test",
      ],
      de: [
        "3 Stunden täglich",
        "Praktische Übungen",
        "Sprechclubs",
        "Wöchentlicher Test",
      ],
    },
    icon: "🔥",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-b1",
    category: "Intensive",
    level: "B1",
    duration: { uz: "2.5 oy", de: "2,5 Monate" },
    hours: 100,
    price: "690 000 so'm",
    description: {
      uz: "O'rta daraja intensive kurs",
      de: "Intensivkurs auf Mittelstufenniveau (B1).",
    },
    features: {
      uz: [
        "Kuniga 3 soat",
        "Murakkab mavzular",
        "Prezentatsiya ko'nikmalari",
        "Mock imtihonlar",
      ],
      de: [
        "3 Stunden täglich",
        "Komplexe Themen",
        "Präsentationsfähigkeiten",
        "Probeprüfungen",
      ],
    },
    icon: "🎪",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-b2",
    category: "Intensive",
    level: "B2",
    duration: { uz: "3 oy", de: "3 Monate" },
    hours: 120,
    price: "690 000 so'm",
    description: {
      uz: "Yuqori o'rta daraja intensive dastur",
      de: "Intensivprogramm auf fortgeschrittenem Niveau (B2).",
    },
    features: {
      uz: [
        "Kuniga 3 soat",
        "Professional leksika",
        "Akademik yozuv",
        "Sertifikat tayyorlash",
      ],
      de: [
        "3 Stunden täglich",
        "Fachspezifischer Wortschatz",
        "Akademisches Schreiben",
        "Zertifikatsvorbereitung",
      ],
    },
    icon: "🏆",
    color: "from-orange-500/20 to-orange-600/10",
  },

  // Standard Courses
  {
    id: "standard-a1",
    category: "Standard",
    level: "A1",
    duration: { uz: "3 oy", de: "3 Monate" },
    hours: 72,
    price: "400 000 so'm",
    description: {
      uz: "Oddiy tempda nemis tilini o'rganing",
      de: "Deutschlernen in moderatem Tempo.",
    },
    features: {
      uz: [
        "Haftada 3 marta",
        "Kichik guruh",
        "Asosiy ko'nikmalar",
        "Uy vazifalari",
      ],
      de: [
        "3 Mal pro Woche",
        "Kleingruppe",
        "Grundkompetenzen",
        "Hausaufgaben",
      ],
    },
    icon: "🌱",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-a2",
    category: "Standard",
    level: "A2",
    duration: { uz: "4 oy", de: "4 Monate" },
    hours: 96,
    price: "400 000 so'm",
    description: {
      uz: "A2 darajasini puxta o'zlashtiring",
      de: "A2 gründlich erlernen.",
    },
    features: {
      uz: [
        "Haftada 3 marta",
        "Grammatika asoslari",
        "Lug'at boyitish",
        "Amaliy mashqlar",
      ],
      de: [
        "3 Mal pro Woche",
        "Grammatikgrundlagen",
        "Wortschatzerweiterung",
        "Praktische Übungen",
      ],
    },
    icon: "🌿",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-b1",
    category: "Standard",
    level: "B1",
    duration: { uz: "5 oy", de: "5 Monate" },
    hours: 120,
    price: "400 000 so'm",
    description: {
      uz: "O'rta daraja standard kurs",
      de: "Standardkurs Mittelstufe (B1).",
    },
    features: {
      uz: [
        "Haftada 3 marta",
        "Chuqur grammatika",
        "Matn tahlili",
        "Suhbat mashqlari",
      ],
      de: [
        "3 Mal pro Woche",
        "Vertiefte Grammatik",
        "Textanalyse",
        "Konversationsübungen",
      ],
    },
    icon: "🌳",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-b2",
    category: "Standard",
    level: "B2",
    duration: { uz: "6 oy", de: "6 Monate" },
    hours: 144,
    price: "400 000 so'm",
    description: {
      uz: "Yuqori o'rta daraja standard dastur",
      de: "Standardprogramm Fortgeschrittene (B2).",
    },
    features: {
      uz: [
        "Haftada 3 marta",
        "Ilg'or mavzular",
        "Yozma ishlash",
        "Imtihon strategiyalari",
      ],
      de: [
        "3 Mal pro Woche",
        "Fortgeschrittene Themen",
        "Schriftpraxis",
        "Prüfungsstrategien",
      ],
    },
    icon: "🎓",
    color: "from-green-500/20 to-green-600/10",
  },
];

export const getCoursesByCategory = (category: CourseCategory) =>
  courses.filter((course) => course.category === category);

export const getCourseById = (id: string) =>
  courses.find((course) => course.id === id);
