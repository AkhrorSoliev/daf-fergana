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
    slug: "herr-jamsher",
    name: "Herr Jamsher Murtazoxonov",
    degree: "Master",
    level: "C1",
    bio: "O‘zlariga kelsak, Fargʻona Davlat Universiteti magistranti.\n\nTil bilish darajasi: C1.\n\n5 yil davomida Germaniyada yashab, xorijiy tajriba orttirgan.\n\n2022-yildan buyon markazimizda faoliyat yuritib kelmoqda. Bugungi kunda markaz rahbari.\n\nTanishaylik — bu bizning rahbarimiz Herr Jamsher Murtazoxonov.\n1994-yil 9-avgust kuni Fargʻonada tug‘ilgan Jamsher aka o‘zining mehnatsevarligi, qat’iyati va til o‘rganishga bo‘lgan cheksiz ishtiyoqi bilan nafaqat markazimiz, balki butun jamoamiz uchun ham ilhom manbai bo‘lib kelmoqda.\n\nU o‘z ta’lim yo‘lini Fargʻona Davlat Universitetida magistr darajasi bilan yakunlagan. Shundan so‘ng 5 yil davomida Germaniyada istiqomat qilib, nafaqat tilni, balki o‘sha yerdagi madaniyat va hayot tarzini ham chuqur o‘zlashtirdi. Bugun esa o‘quvchilarimiz bilan Yevropa tajribasini ulashib kelmoqda.\n\nMarkaz rahbari sifatida 2022-yildan buyon ta’lim jarayonlarini boshqarib, o‘quvchilar uchun samarali va iliq muhit yaratishda davom etmoqda.\n\nU kishidan ta’lim olish — bu faqat nemis tilini o‘rganish emas, balki Germaniyada yashash tajribasidan ham bahramand bo‘lish demakdir. 🌍✨",
  },
  {
    slug: "herr-eldor",
    name: "Herr Eldor Khaydaraliyev",
    degree: "Bachelor",
    level: "C1",
    bio: "Tanishing bu o’qituvchimiz — Herr Eldor Khaydaraliyev. O’quv markazimizda 6 oydan buyon, o’quvchilarimizga nemis tilining sir-sinoatlarini o’rgatib kelmoqdalar.\nO’zlariga kelsak, Farg’ona Davlat Universitetining “Nemis tili va adabiyoti” fakulteti bitiruvchisi.\n2019-yil DAAD (Deutsche Akademischer Austauschdienst) stipendiyasini qo’lga kiritib, Germaniyaga sarguzasht izlab yo’l olganlar.\nUndan keyin yana Germaniyada 3 yil yashab, O’zbekistonga tesha tegmagan g’oyalar bilan qaytdilar. Darajalari C1.\nO’qituvchimizda ta’lim olish bu — nemis tili bilan birgalikda butun Yevropa havosini his qilish demakdir.",
  },
  {
    slug: "herr-ulugbek",
    name: "Herr Ulug‘bek Akhmadjonov",
    degree: "Bachelor",
    level: "B2",
    bio: "Fargʻona davlat universiteti Chet tillari fakulteti bitiruvchisi.\n\nTil darajasi: B2.\n\nGermaniyada Ferienjob dasturi orqali park va hotel sohasida tajriba orttirgan.\n\n2023-yildan buyon o‘quv markazimizda faoliyat yuritib kelmoqda.\n\nTanishaylik — yosh va iqtidorli o‘qituvchimiz Herr Ulug‘bek Akhmadjonov.\n2004-yil 24-yanvarda Farg‘onada tug‘ilgan Ulug‘bek o‘zining cheksiz mehnatsevarligi va bilimga chanqoqligi bilan ajralib turadi. Yoshligidan til o‘rganishga qiziqqan u, orzularining orqasidan qat’iyat bilan ergashib, bugun ko‘plab o‘quvchilar uchun ilhom manbaiga aylangan.\n\nTalabalik yillarida Germaniyada ikki marta bo‘lish imkoniyatiga ega bo‘lib, Ferienjob dasturi doirasida park va mehmonxona sohasida ishlagan. Bu tajriba unga nafaqat nemis tilini chuqurroq o‘zlashtirish, balki Yevropa hayoti va madaniyatini yaqindan his qilish imkonini berdi.\n\nBugun esa u markazimizda o‘zining yosh energiyasi va Germaniyada orttirgan hayotiy tajribasi bilan o‘quvchilarimizni tilni darsliklardan emas, balki hayotning o‘zidan o‘rganishga chorlamoqda. 🌍✨",
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
    bio: "Farg‘ona Davlat Universiteti filologiya va nemis tilini o‘qitish yo‘nalishi bitiruvchisi.\n\nTil darajasi: C1.\n\n1 yil davomida Germaniyada yashagan va EP GmbH & Co Mack KGda faoliyat olib borgan.\n\n2017–2022 yillarda Farg‘ona shahar Gaus nomidagi nemis tiliga ixtisoslashtirilgan 10-IDUMda tajriba orttirgan.\n\n2023-yildan buyon markazimizda faoliyat olib kelmoqda.\n\nTanishaylik — bu bizning bilimdon va tajribali ustozimiz Frau Iroda Kurbanova.\n1991-yil 16-fevral kuni Farg‘ona shahrida tug‘ilgan Iroda opa yoshligidan filologiya va chet tillariga qiziqib, bu yo‘nalishda o‘zini izchil rivojlantirib kelgan.\n\nU o‘z ta’lim yo‘lini Farg‘ona Davlat Universitetida filologiya va nemis tilini o‘qitish yo‘nalishi bo‘yicha bakalavr darajasini olib yakunlagan. So‘ngra 2017–2022 yillarda Farg‘ona shahridagi Gaus nomidagi nemis tiliga ixtisoslashtirilgan 10-IDUMda faoliyat yuritib, o‘quvchilariga nafaqat tilni, balki chet el madaniyatiga bo‘lgan qiziqishni ham uyg‘otgan.\n\nKeyinchalik Germaniyada EP GmbH & Co Mack KGda ishlash imkoniyatiga ega bo‘lib, 1 yil davomida Yevropa hayotini bevosita his etgan. Ushbu tajribasi unga nafaqat C1 darajasida til ko‘nikmasini mustahkamlash, balki o‘z o‘quvchilariga yanada real va hayotiy tajribalarni ulashish imkonini berdi.\n\nBugun esa u markazimizda, 2023-yildan beri, o‘zining boy tajribasi va cheksiz mehrini qo‘shib, o‘quvchilarni yangi marralarga yetaklamoqda.\n\nO‘qituvchimizdan ta’lim olish — bu nemis tilini o‘rganish bilan birga, Germaniyada yashash ruhi va madaniyatini ham his qilish demakdir. 🌍✨",
  },
  {
    slug: "frau-saida",
    name: "Frau Saida Mustafoyeva",
    degree: "Bachelor",
    level: "C1",
    bio: " Bugun esa Saida opa 2 yildan buyon DaF Sprachzentrum jamoasining faol a’zosi sifatida o‘quvchilarimizga nafaqat nemis tilini, balki bilim olishga bo‘lgan ishtiyoq va intilishning naqadar muhimligini ham o‘rgatmoqda.\n\nUstozimizdan ta’lim olish — bu tilni mukammal o‘rganish, Germaniyadagi hayotni his etish va o‘z orzularingiz sari dadil qadam tashlash demakdir. 🌍✨",
  },
  {
    slug: "herr-umarov",
    name: "Herr Musinjon Umarov",
    degree: "Bachelor",
    level: "C1",
    bio: "Fargʻona Davlat Universiteti “Nemis tili va adabiyoti” fakulteti bitiruvchisi.\n\nTil darajasi: C1.\n\n3 yil davomida Germaniyada Ferienjob dasturi orqali faoliyat olib borgan.\n\n2023-yildan buyon o‘quv markazimizda faoliyat olib kelmoqda.\n\nTanishaylik — yosh va istiqbolli o‘qituvchimiz Herr Musinjon Umarov.\n2003-yil 20-may kuni Fargʻona viloyati Qoʻshtepa tumanida tug‘ilgan Musinjon, bolaligidan chet tillariga, xususan nemis tiliga qiziqib ulg‘aygan.\n\nU o‘z ta’lim yo‘lini FDU “Nemis tili va adabiyoti” fakultetida davom ettirib, chuqur nazariy bilimlar egasiga aylangan. Talabalik davrida esa 3 yil davomida Germaniyada bo‘lib, Ferienjob dasturi orqali nafaqat tilni, balki Yevropa madaniyati va hayot tarzini ham yaqindan his etish imkoniga ega bo‘lgan.\n\nBugun esa u markazimizning eng faol yosh o‘qituvchilaridan biri bo‘lib, 2023-yildan buyon o‘quvchilarimizga nemis tilini o‘rgatib kelmoqda. Musinjon o‘zining cheksiz energiyasi va Germaniyada orttirgan tajribasi bilan darslarni yanada jonli, qiziqarli va hayotiy misollar bilan boyitadi.\n\nO‘qituvchimizdan ta’lim olish — bu nemis tilini o‘rganish bilan birga, Yevropada yashash tajribasidan ham ilhom olish demakdir. 🌍✨",
  },
  {
    slug: "frau-yoqutxon",
    name: "Frau Yokutkhon Rustamova",
    degree: "Bachelor",
    level: "C1",
    bio: "",
  },
  {
    slug: "frau-gulnoza",
    name: "Frau Gulnoza Salokhiddinova",
    degree: "Bachelor",
    level: "C1",
    bio: "",
  },
];

export const getTeacherBySlug = (slug: string) =>
  teachers.find((t) => t.slug === slug);
