export type Teacher = {
  slug: string;
  name: string;
  degree: "Bachelor" | "Master";
  level: string;
  bio: string;
  // Image path is derived from slug: /lehrer/{slug}.jpg
};

export const teachers: Teacher[] = [
  {
    slug: "herr-eldor",
    name: "Herr Eldor Khaydaraliyev",
    degree: "Bachelor",
    level: "C1",
    bio: "Tanishing bu o’qituvchimiz — Herr Eldor Khaydaraliyev. O’quv markazimizda 6 oydan buyon, o’quvchilarimizga nemis tilining sir-sinoatlarini o’rgatib kelmoqdalar.\nO’zlariga kelsak, Farg’ona Davlat Universitetining “Nemis tili va adabiyoti” fakulteti bitiruvchisi.\n2019-yil DAAD (Deutsche Akademischer Austauschdienst) stipendiyasini qo’lga kiritib, Germaniyaga sarguzasht izlab yo’l olganlar.\nUndan keyin yana Germaniyada 3 yil yashab, O’zbekistonga tesha tegmagan g’oyalar bilan qaytdilar. Darajalari C1.\nO’qituvchimizda ta’lim olish bu — nemis tili bilan birgalikda butun Yevropa havosini his qilish demakdir.",
  },
  {
    slug: "herr-ulugbek",
    name: "Herr Ulugbek Akhmadjonov",
    degree: "Bachelor",
    level: "C2",
    bio: "Tanishing bu o’qituvchimiz — Herr Ulugbek Akhmadjonov.\nO’quv markazimizda 2 yildan buyon yosh avlodni Germaniyaga tayyorlash bilan shug’ullanib kelmoqdalar.\nO’zlari Farg’ona Davlat Universiteti “Nemis tili va adabiyoti” fakultetida 4-bosqich talabasidir.\nBundan tashqari 2 marta Germaniyada bo’lib, tajriba orttirib qaytganlar.\nNemis tilini ham nemislardek ravon gapiradilar.\nO’qituvchimizdan taraladigan shijoat o’quvchilarni faqat oldinga undaydi.",
  },
  {
    slug: "frau-feruza",
    name: "Frau Feruza Mamazulinova",
    degree: "Master",
    level: "C1",
    bio: "Frau Feruza Mamazulinova — ustasi farang nemis tili o’qituvchilarimizdan biri.\n2016-yil Germaniyaga “Aupair” dasturi bilan yo’l olib, Germaniyaning ma’daniyatidan bahramand bo’lish bilan birga, o’z nemis tilini “Sprachkurs” orqali yanada rivojlantirganlar.\n2019-yil DAAD stipendiyasini qo’lga kiritganlar.\n2020-yil Farg’ona Davlat Universitetida “Nemis tili va adabiyoti” fakultetini tamomlab, 2022-yil magistraturani ham aynan shu sohada o’qib, muvaffaqiyatli tamomlaganlar.\nNemis tili sohasida 10 yillik tajribaga ega.\nHurmatli Frau Mamazulinovaning o’quvchilari, o’qituvchi tanlashda sirayam adashmagansizlar.\n“Chumchuq so’ysa ham qassob so’ysin!” — deganda ayni shu o’qituvchimiz ko’z oldingizga kelaversin.",
  },
  {
    slug: "frau-iroda",
    name: "Frau Iroda Kurbanova",
    degree: "Bachelor",
    level: "C1",
    bio: "Markazimizning eng jonkuyar, eng fidokor o’qituvchilaridan biri — Frau Iroda Kurbanova.\n2008-yilda nemis tilini sevib qolganlar va shu sevgi ularni nemis tili o’rganishga undagan.\n2011–2015-yillar Farg’ona Davlat Universiteti Filologiya, “Nemis tili va adabiyoti” fakultetini tamomlagan.\n2017-yil Gaus nomidagi 10-IDUMga nemis tili o’qituvchisi sifatida ishga kirganlar.\n2022-yil aprelda ish faoliyatlarini yakunlab, Germaniyaga ketganlar.\nBir yildan so’ng Germaniyadan qaytib, 2023-yildan beri DaF Sprachzentrumda insonlarga nemis tili — qanday imkoniyatlar kaliti ekanini uqtirib kelmoqdalar.",
  },
  {
    slug: "herr-umarov",
    name: "Mo’sinjon Umarov",
    degree: "Bachelor",
    level: "B2",
    bio: "Tanishing, DaF Sprachzentrum Fergananing eng tajribali muallimlaridan biri — Mo’sinjon Umarov.\nO’quv markazimizda 1,5 yildan buyon, polaponlarga Germaniyaga to’g’ri uchib borish fanidan dars beradilar.\nO’zlari ham 1 emas, 2 emas, naqd 3 martta Germaniyaga borib, malaka oshirib qaytganlar.\nHozirda Farg’ona Davlat Universitetining “Nemis tili va adabiyoti” fakultetida 4-kurs talabasi.\nO’qituvchimizdan nemis tilining sir-asrorlarini o’rganishni istaganlar uchun, 25-fevral soat 17:30 dan boshlab yangi guruh ochilmoqda.",
  },
];

export const getTeacherBySlug = (slug: string) =>
  teachers.find((t) => t.slug === slug);
