export type CourseLevel = "A1" | "A2" | "B1" | "B2";
export type CourseCategory = "Individual" | "Intensive" | "Standard";

export interface Course {
  id: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  hours: number;
  price: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

export const courses: Course[] = [
  // Individual Courses
  {
    id: "individual-a1",
    category: "Individual",
    level: "A1",
    duration: "2 oy",
    hours: 48,
    price: "Narxni aniqlash uchun bog'laning",
    description: "Shaxsiy darslar orqali nemis tilining asoslarini o'rganing",
    features: [
      "1:1 darslar",
      "Moslashuvchan jadval",
      "Shaxsiy yondashuv",
      "Tez natija",
    ],
    icon: "🐻",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-a2",
    category: "Individual",
    level: "A2",
    duration: "2.5 oy",
    hours: 60,
    price: "Narxni aniqlash uchun bog'laning",
    description: "A1 asosida nemis tilini chuqurroq o'rganing",
    features: [
      "1:1 darslar",
      "Moslashuvchan jadval",
      "Grammatika diqqati",
      "Gapirish ko'nikmalari",
    ],
    icon: "🎒",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-b1",
    category: "Individual",
    level: "B1",
    duration: "3 oy",
    hours: 72,
    price: "Narxni aniqlash uchun bog'laning",
    description: "O'rta daraja nemis tili individual darslar",
    features: [
      "1:1 darslar",
      "Murakkab grammatika",
      "Yozma ishlash",
      "Imtihon tayyorlash",
    ],
    icon: "🚀",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: "individual-b2",
    category: "Individual",
    level: "B2",
    duration: "3.5 oy",
    hours: 84,
    price: "Narxni aniqlash uchun bog'laning",
    description: "Yuqori o'rta daraja individual ta'lim",
    features: [
      "1:1 darslar",
      "Professional suhbat",
      "Akademik yozuv",
      "Sertifikat tayyorlash",
    ],
    icon: "🎯",
    color: "from-blue-500/20 to-blue-600/10",
  },

  // Intensive Courses
  {
    id: "intensive-a1",
    category: "Intensive",
    level: "A1",
    duration: "1.5 oy",
    hours: 60,
    price: "1,200,000 so'm",
    description: "Tezkor nemis tili o'rganish dasturi",
    features: [
      "Kuniga 3 soat",
      "Kichik guruh",
      "Intensiv mashqlar",
      "Tez natija",
    ],
    icon: "⚡",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-a2",
    category: "Intensive",
    level: "A2",
    duration: "2 oy",
    hours: 80,
    price: "1,500,000 so'm",
    description: "A2 darajasini tez va samarali o'zlashtiring",
    features: [
      "Kuniga 3 soat",
      "Amaliy mashqlar",
      "Gapirish klubи",
      "Haftalik test",
    ],
    icon: "🔥",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-b1",
    category: "Intensive",
    level: "B1",
    duration: "2.5 oy",
    hours: 100,
    price: "1,800,000 so'm",
    description: "O'rta daraja intensive kurs",
    features: [
      "Kuniga 3 soat",
      "Murakkab mavzular",
      "Prezentatsiya ko'nikmalari",
      "Mock imtihonlar",
    ],
    icon: "🎪",
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: "intensive-b2",
    category: "Intensive",
    level: "B2",
    duration: "3 oy",
    hours: 120,
    price: "2,100,000 so'm",
    description: "Yuqori o'rta daraja intensive dastur",
    features: [
      "Kuniga 3 soat",
      "Professional leksika",
      "Akademik yozuv",
      "Sertifikat tayyorlash",
    ],
    icon: "🏆",
    color: "from-orange-500/20 to-orange-600/10",
  },

  // Standard Courses
  {
    id: "standard-a1",
    category: "Standard",
    level: "A1",
    duration: "3 oy",
    hours: 72,
    price: "900,000 so'm",
    description: "Oddiy tempda nemis tilini o'rganing",
    features: [
      "Haftada 3 marta",
      "Kichik guruh",
      "Asosiy ko'nikmalar",
      "Uy vazifalari",
    ],
    icon: "🌱",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-a2",
    category: "Standard",
    level: "A2",
    duration: "4 oy",
    hours: 96,
    price: "1,100,000 so'm",
    description: "A2 darajasini puxta o'zlashtiring",
    features: [
      "Haftada 3 marta",
      "Grammatika asoslari",
      "Lug'at boyitish",
      "Amaliy mashqlar",
    ],
    icon: "🌿",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-b1",
    category: "Standard",
    level: "B1",
    duration: "5 oy",
    hours: 120,
    price: "1,400,000 so'm",
    description: "O'rta daraja standard kurs",
    features: [
      "Haftada 3 marta",
      "Chuqur grammatika",
      "Matn tahlili",
      "Suhbat mashqlari",
    ],
    icon: "🌳",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: "standard-b2",
    category: "Standard",
    level: "B2",
    duration: "6 oy",
    hours: 144,
    price: "1,700,000 so'm",
    description: "Yuqori o'rta daraja standard dastur",
    features: [
      "Haftada 3 marta",
      "Ilg'or mavzular",
      "Yozma ishlash",
      "Imtihon strategiyalari",
    ],
    icon: "🎓",
    color: "from-green-500/20 to-green-600/10",
  },
];

export const getCoursesByCategory = (category: CourseCategory) =>
  courses.filter((course) => course.category === category);

export const getCourseById = (id: string) =>
  courses.find((course) => course.id === id);
