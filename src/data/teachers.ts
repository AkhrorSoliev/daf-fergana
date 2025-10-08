export type Teacher = {
  slug: string;
  name: string;
  degree: "Bachelor" | "Master";
  level: string;
  bio: { uz: string; de: string };
  // Image path is derived from slug: /lehrer/{slug}.jpg
};

export const teachers: Teacher[] = [
  {
    slug: "herr-jamsher",
    name: "Herr Jamsher Murtazoxonov",
    degree: "Master",
    level: "C1",
    bio: {
      uz: "O‘zlariga kelsak, Fargʻona Davlat Universiteti magistranti.\n\nTil bilish darajasi: C1.\n\n5 yil davomida Germaniyada yashab, xorijiy tajriba orttirgan.\n\n2022-yildan buyon markazimizda faoliyat yuritib kelmoqda. Bugungi kunda markaz rahbari.\n\nTanishaylik — bu bizning rahbarimiz Herr Jamsher Murtazoxonov.\n1994-yil 9-avgust kuni Fargʻonada tug‘ilgan Jamsher aka o‘zining mehnatsevarligi, qat’iyati va til o‘rganishga bo‘lgan cheksiz ishtiyoqi bilan nafaqat markazimiz, balki butun jamoamiz uchun ham ilhom manbai bo‘lib kelmoqda.\n\nU o‘z ta’lim yo‘lini Fargʻona Davlat Universitetida magistr darajasi bilan yakunlagan. Shundan so‘ng 5 yil davomida Germaniyada istiqomat qilib, nafaqat tilni, balki o‘sha yerdagi madaniyat va hayot tarzini ham chuqur o‘zlashtirdi. Bugun esa o‘quvchilarimiz bilan Yevropa tajribasini ulashib kelmoqda.\n\nMarkaz rahbari sifatida 2022-yildan buyon ta’lim jarayonlarini boshqarib, o‘quvchilar uchun samarali va iliq muhit yaratishda davom etmoqda.\n\nU kishidan ta’lim olish — bu faqat nemis tilini o‘rganish emas, balki Germaniyada yashash tajribasidan ham bahramand bo‘lish demakdir. 🌍✨",
      de: "Zu seiner Person: Masterstudent der Staatlichen Universität Fergana.\n\nSprachniveau: C1.\n\nEr lebte 5 Jahre in Deutschland und sammelte internationale Erfahrungen.\n\nSeit 2022 ist er in unserem Zentrum tätig und leitet es heute als Geschäftsführer.\n\nLernen wir ihn kennen — das ist unser Leiter, Herr Jamsher Murtazoxonov.\nGeboren am 9. August 1994 in Fergana, inspiriert Jamsher durch Fleiß, Entschlossenheit und seine große Leidenschaft für Sprachen nicht nur unser Zentrum, sondern unser ganzes Team.\n\nSeinen Bildungsweg schloss er mit einem Masterabschluss an der Staatlichen Universität Fergana ab. Danach lebte er 5 Jahre in Deutschland und vertiefte nicht nur seine Sprachkenntnisse, sondern auch Kultur und Lebensweise vor Ort. Heute teilt er diese Europa-Erfahrungen mit unseren Lernenden.\n\nAls Leiter des Zentrums organisiert er seit 2022 die Bildungsprozesse und schafft eine warme, effiziente Lernumgebung.\n\nBei ihm zu lernen bedeutet nicht nur Deutsch zu lernen, sondern auch Einblicke in das Leben in Deutschland zu gewinnen. 🌍✨",
    },
  },
  {
    slug: "herr-eldor",
    name: "Herr Eldor Khaydaraliyev",
    degree: "Bachelor",
    level: "C1",
    bio: {
      uz: "Tanishing bu o’qituvchimiz — Herr Eldor Khaydaraliyev. O’quv markazimizda 6 oydan buyon, o’quvchilarimizga nemis tilining sir-sinoatlarini o’rgatib kelmoqdalar.\nO’zlariga kelsak, Farg’ona Davlat Universitetining “Nemis tili va adabiyoti” fakulteti bitiruvchisi.\n2019-yil DAAD (Deutsche Akademischer Austauschdienst) stipendiyasini qo’lga kiritib, Germaniyaga sarguzasht izlab yo’l olganlar.\nUndan keyin yana Germaniyada 3 yil yashab, O’zbekistonga tesha tegmagan g’oyalar bilan qaytdilar. Darajalari C1.\nO’qituvchimizda ta’lim olish bu — nemis tili bilan birgalikda butun Yevropa havosini his qilish demakdir.",
      de: "Lernen Sie unseren Lehrer kennen — Herr Eldor Khaydaraliyev. Seit 6 Monaten vermittelt er in unserem Zentrum die Feinheiten der deutschen Sprache.\nEr ist Absolvent der Fakultät für Deutsche Sprache und Literatur der Staatlichen Universität Fergana.\n2019 erhielt er das DAAD-Stipendium (Deutscher Akademischer Austauschdienst) und begab sich nach Deutschland.\nDanach lebte er weitere 3 Jahre in Deutschland und kehrte mit frischen Ideen nach Usbekistan zurück. Niveau: C1.\nBei ihm zu lernen bedeutet, neben Deutsch auch die Atmosphäre Europas zu spüren.",
    },
  },
  {
    slug: "herr-ulugbek",
    name: "Herr Ulug‘bek Akhmadjonov",
    degree: "Bachelor",
    level: "B2",
    bio: {
      uz: "Fargʻona davlat universiteti Chet tillari fakulteti bitiruvchisi.\n\nTil darajasi: B2.\n\nGermaniyada Ferienjob dasturi orqali park va hotel sohasida tajriba orttirgan.\n\n2023-yildan buyon o‘quv markazimizda faoliyat yuritib kelmoqda.\n\nTanishaylik — yosh va iqtidorli o‘qituvchimiz Herr Ulug‘bek Akhmadjonov.\n2004-yil 24-yanvarda Farg‘onada tug‘ilgan Ulug‘bek o‘zining cheksiz mehnatsevarligi va bilimga chanqoqligi bilan ajralib turadi. Yoshligidan til o‘rganishga qiziqqan u, orzularining orqasidan qat’iyat bilan ergashib, bugun ko‘plab o‘quvchilar uchun ilhom manbaiga aylangan.\n\nTalabalik yillarida Germaniyada ikki marta bo‘lish imkoniyatiga ega bo‘lib, Ferienjob dasturi doirasida park va mehmonxona sohasida ishlagan. Bu tajriba unga nafaqat nemis tilini chuqurroq o‘zlashtirish, balki Yevropa hayoti va madaniyatini yaqindan his qilish imkonini berdi.\n\nBugun esa u markazimizda o‘zining yosh energiyasi va Germaniyada orttirgan hayotiy tajribasi bilan o‘quvchilarimizni tilni darsliklardan emas, balki hayotning o‘zidan o‘rganishga chorlamoqda. 🌍✨",
      de: "Absolvent der Fakultät für Fremdsprachen der Staatlichen Universität Fergana.\n\nSprachniveau: B2.\n\nEr sammelte Erfahrung in Deutschland im Rahmen des Ferienjob-Programms in Park- und Hotelbereichen.\n\nSeit 2023 arbeitet er in unserem Bildungszentrum.\n\nLernen wir unseren jungen und talentierten Lehrer kennen — Herr Ulug‘bek Akhmadjonov.\nGeboren am 24. Januar 2004 in Fergana, zeichnet sich Ulug‘bek durch großen Fleiß und Wissensdurst aus. Schon in jungen Jahren interessierte er sich für Sprachen und wurde für viele Lernende zur Inspiration.\n\nWährend seines Studiums war er zweimal in Deutschland und arbeitete im Rahmen des Ferienjob-Programms in Park- und Hotelbereichen. Diese Erfahrung half ihm nicht nur, sein Deutsch zu vertiefen, sondern auch das europäische Leben und die Kultur hautnah zu erleben.\n\nHeute motiviert er unsere Schüler mit jugendlicher Energie und seinen in Deutschland gesammelten Erfahrungen dazu, die Sprache nicht nur aus Lehrbüchern, sondern aus dem Leben selbst zu lernen. 🌍✨",
    },
  },
  {
    slug: "frau-feruza",
    name: "Frau Feruza Mamazulinova",
    degree: "Master",
    level: "C1",
    bio: {
      uz: "Frau Feruza Mamazulinova — ustasi farang nemis tili o’qituvchilarimizdan biri.\n2016-yil Germaniyaga “Aupair” dasturi bilan yo’l olib, Germaniyaning ma’daniyatidan bahramand bo’lish bilan birga, o’z nemis tilini “Sprachkurs” orqali yanada rivojlantirganlar.\n2019-yil DAAD stipendiyasini qo’lga kiritganlar.\n2020-yil Farg’ona Davlat Universitetida “Nemis tili va adabiyoti” fakultetini tamomlab, 2022-yil magistraturani ham aynan shu sohada o’qib, muvaffaqiyatli tamomlaganlar.\nNemis tili sohasida 10 yillik tajribaga ega.\nHurmatli Frau Mamazulinovaning o’quvchilari, o’qituvchi tanlashda sirayam adashmagansizlar.\n“Chumchuq so’ysa ham qassob so’ysin!” — deganda ayni shu o’qituvchimiz ko’z oldingizga kelaversin.",
      de: "Frau Feruza Mamazulinova gehört zu unseren erfahrensten Deutschlehrerinnen.\n2016 reiste sie mit dem Au-pair-Programm nach Deutschland und entwickelte ihre Deutschkenntnisse zusätzlich in Sprachkursen weiter, während sie die Kultur des Landes kennenlernte.\n2019 erhielt sie ein DAAD-Stipendium.\n2020 schloss sie ihr Bachelorstudium an der Staatlichen Universität Fergana (Deutsche Sprache und Literatur) ab und beendete 2022 erfolgreich ihr Masterstudium im selben Fachbereich.\nSie verfügt über 10 Jahre Erfahrung im Bereich Deutschunterricht.\nLiebe Lernende von Frau Mamazulinova — mit dieser Lehrerin haben Sie die richtige Wahl getroffen.",
    },
  },
  {
    slug: "frau-iroda",
    name: "Frau Iroda Kurbanova",
    degree: "Bachelor",
    level: "C1",
    bio: {
      uz: "Farg‘ona Davlat Universiteti filologiya va nemis tilini o‘qitish yo‘nalishi bitiruvchisi.\n\nTil darajasi: C1.\n\n1 yil davomida Germaniyada yashagan va EP GmbH & Co Mack KGda faoliyat olib borgan.\n\n2017–2022 yillarda Farg‘ona shahar Gaus nomidagi nemis tiliga ixtisoslashtirilgan 10-IDUMda tajriba orttirgan.\n\n2023-yildan buyon markazimizda faoliyat olib kelmoqda.\n\nTanishaylik — bu bizning bilimdon va tajribali ustozimiz Frau Iroda Kurbanova.\n1991-yil 16-fevral kuni Farg‘ona shahrida tug‘ilgan Iroda opa yoshligidan filologiya va chet tillariga qiziqib, bu yo‘nalishda o‘zini izchil rivojlantirib kelgan.\n\nU o‘z ta’lim yo‘lini Farg‘ona Davlat Universitetida filologiya va nemis tilini o‘qitish yo‘nalishi bo‘yicha bakalavr darajasini olib yakunlagan. So‘ngra 2017–2022 yillarda Farg‘ona shahridagi Gaus nomidagi nemis tiliga ixtisoslashtirilgan 10-IDUMda faoliyat yuritib, o‘quvchilariga nafaqat tilni, balki chet el madaniyatiga bo‘lgan qiziqishni ham uyg‘otgan.\n\nKeyinchalik Germaniyada EP GmbH & Co Mack KGda ishlash imkoniyatiga ega bo‘lib, 1 yil davomida Yevropa hayotini bevosita his etgan. Ushbu tajribasi unga nafaqat C1 darajasida til ko‘nikmasini mustahkamlash, balki o‘z o‘quvchilariga yanada real va hayotiy tajribalarni ulashish imkonini berdi.\n\nBugun esa u markazimizda, 2023-yildan beri, o‘zining boy tajribasi va cheksiz mehrini qo‘shib, o‘quvchilarni yangi marralarga yetaklamoqda.\n\nO‘qituvchimizdan ta’lim olish — bu nemis tilini o‘rganish bilan birga, Germaniyada yashash ruhi va madaniyatini ham his qilish demakdir. 🌍✨",
      de: "Absolventin der Staatlichen Universität Fergana im Fachbereich Philologie und Deutschdidaktik.\n\nSprachniveau: C1.\n\nSie lebte 1 Jahr in Deutschland und arbeitete bei EP GmbH & Co Mack KG.\n\nZwischen 2017 und 2022 sammelte sie Erfahrung an der auf Deutsch spezialisierten Schule Nr. 10 (Gaus) in Fergana.\n\nSeit 2023 arbeitet sie in unserem Zentrum.\n\nLernen wir unsere wissensreiche und erfahrene Lehrerin kennen — Frau Iroda Kurbanova.\nGeboren am 16. Februar 1991 in Fergana, interessierte sie sich seit ihrer Jugend für Philologie und Fremdsprachen und entwickelte sich konsequent in diesem Bereich weiter.\n\nSie erwarb den Bachelorabschluss an der Staatlichen Universität Fergana im Bereich Philologie und Deutschunterricht. Anschließend arbeitete sie an der Gaus-Schule und weckte bei Lernenden nicht nur Sprachinteresse, sondern auch Neugier für fremde Kulturen.\n\nSpäter bot sich ihr die Möglichkeit, in Deutschland zu arbeiten und das europäische Leben ein Jahr lang direkt zu erleben. Diese Erfahrung festigte nicht nur ihre C1-Kompetenz, sondern bereicherte ihren Unterricht mit realen, lebensnahen Beispielen.\n\nHeute führt sie — seit 2023 — Lernende mit Erfahrung und großer Hingabe zu neuen Zielen.\n\nBei ihr zu lernen bedeutet, neben der Sprache auch den Geist und die Kultur Deutschlands zu spüren. 🌍✨",
    },
  },
  {
    slug: "frau-saida",
    name: "Frau Saida Mustafoyeva",
    degree: "Bachelor",
    level: "C1",
    bio: {
      uz: "Fargʻona Davlat Universiteti Xorijiy til va adabiyoti (nemis tili) yoʻnalishi 4-bosqich talabasi.\n\nTil darajasi: C1.\n\n“Oʻzbekiston Respublikasi Prezidenti Granti” hamda universitet ichki stipendiyalari sohibasi.\n\n2022–2023 yillarda 2 marta Germaniyada Ferienjob dasturida ishtirok etgan.\n\n2 yildan buyon DaF Sprachzentrumda faoliyat yuritib kelmoqda.\n\nTanishaylik — iqtidorli va faol ustozimiz Saida Mustafoyeva.\nU Fargʻona Davlat Universitetining nemis tili yoʻnalishi 4-bosqich talabasi bo‘lishiga qaramay, qisqa vaqt ichida katta muvaffaqiyatlarga erishgan. Til bilish darajasi C1 bo‘lgan Saida, nafaqat o‘qishda, balki ilmiy va amaliy faoliyatda ham o‘zini ko‘rsatib kelmoqda.\n\nYoshligidan bilimga chanqoqligi uni Respublika miqyosida oʻtkazilgan “Prezident Granti” va universitet miqyosidagi stipendiyalar sohibasiga aylantirdi. Bundan tashqari, 2022–2023 yillarda ikki marta Germaniyaga borib, Ferienjob dasturi orqali bevosita tajriba orttirgan.\n\nBugun esa Saida opa 2 yildan buyon DaF Sprachzentrum jamoasining faol a’zosi sifatida o‘quvchilarimizga nafaqat nemis tilini, balki bilim olishga bo‘lgan ishtiyoq va intilishning naqadar muhimligini ham o‘rgatmoqda.\n\nUstozimizdan ta’lim olish — bu tilni mukammal o‘rganish, Germaniyadagi hayotni his etish va o‘z orzularingiz sari dadil qadam tashlash demakdir. 🌍✨",
      de: 'Studentin im 4. Studienjahr des Fachs Deutsche Sprache und Literatur an der Staatlichen Universität Fergana.\n\nSprachniveau: C1.\n\nStipendiatin des "Präsidentenstipendiums der Republik Usbekistan" sowie weiterer Universitätsstipendien.\n\nIn den Jahren 2022–2023 nahm sie zweimal am Ferienjob-Programm in Deutschland teil.\n\nSeit 2 Jahren ist sie im DaF Sprachzentrum aktiv.\n\nLernen wir unsere talentierte und engagierte Lehrerin kennen — Frau Saida Mustafoyeva.\nTrotz ihres Studiums hat sie in kurzer Zeit große Erfolge erzielt. Mit ihrem C1-Niveau zeigt sie sich sowohl in der Wissenschaft als auch in der Praxis.\n\nIhr Wissensdurst brachte ihr bedeutende Stipendien ein. Zudem sammelte sie in Deutschland direkte Erfahrungen im Rahmen des Ferienjob-Programms.\n\nHeute vermittelt sie unseren Lernenden nicht nur Deutsch, sondern auch Lernmotivation und Zielstrebigkeit.\n\nBei ihr zu lernen bedeutet, die Sprache fundiert zu beherrschen, das Leben in Deutschland zu spüren und mutig den eigenen Träumen zu folgen. 🌍✨',
    },
  },
  {
    slug: "herr-umarov",
    name: "Herr Musinjon Umarov",
    degree: "Bachelor",
    level: "C1",
    bio: {
      uz: "Fargʻona Davlat Universiteti “Nemis tili va adabiyoti” fakulteti bitiruvchisi.\n\nTil darajasi: C1.\n\n3 yil davomida Germaniyada Ferienjob dasturi orqali faoliyat olib borgan.\n\n2023-yildan buyon o‘quv markazimizda faoliyat olib kelmoqda.\n\nTanishaylik — yosh va istiqbolli o‘qituvchimiz Herr Musinjon Umarov.\n2003-yil 20-may kuni Fargʻona viloyati Qoʻshtepa tumanida tug‘ilgan Musinjon, bolaligidan chet tillariga, xususan nemis tiliga qiziqib ulg‘aygan.\n\nU o‘z ta’lim yo‘lini FDU “Nemis tili va adabiyoti” fakultetida davom ettirib, chuqur nazariy bilimlar egasiga aylangan. Talabalik davrida esa 3 yil davomida Germaniyada bo‘lib, Ferienjob dasturi orqali nafaqat tilni, balki Yevropa madaniyati va hayot tarzini ham yaqindan his etish imkoniga ega bo‘lgan.\n\nBugun esa u markazimizning eng faol yosh o‘qituvchilaridan biri bo‘lib, 2023-yildan buyon o‘quvchilarimizga nemis tilini o‘rgatib kelmoqda. Musinjon o‘zining cheksiz energiyasi va Germaniyada orttirgan tajribasi bilan darslarni yanada jonli, qiziqarli va hayotiy misollar bilan boyitadi.\n\nO‘qituvchimizdan ta’lim olish — bu nemis tilini o‘rganish bilan birga, Yevropada yashash tajribasidan ham ilhom olish demakdir. 🌍✨",
      de: 'Absolvent der Fakultät "Deutsche Sprache und Literatur" der Staatlichen Universität Fergana.\n\nSprachniveau: C1.\n\nEr war 3 Jahre im Rahmen des Ferienjob-Programms in Deutschland tätig.\n\nSeit 2023 arbeitet er in unserem Zentrum.\n\nLernen wir unseren jungen und vielversprechenden Lehrer kennen — Herr Musinjon Umarov.\nGeboren am 20. Mai 2003 im Bezirk Qoʻshtepa (Region Fergana), interessierte er sich schon früh für Fremdsprachen, insbesondere Deutsch.\n\nEr setzte sein Studium an der FDU im Fach Deutsche Sprache und Literatur fort und erwarb fundiertes theoretisches Wissen. Während seiner Studienzeit lebte er 3 Jahre in Deutschland und erlebte Kultur und Lebensweise Europas direkt.\n\nHeute gehört er zu den aktivsten jungen Lehrern unseres Zentrums und unterrichtet seit 2023 mit großer Energie. Seine in Deutschland gesammelten Erfahrungen bereichern den Unterricht mit lebendigen, praxisnahen Beispielen.\n\nBei ihm zu lernen bedeutet, nicht nur Deutsch zu lernen, sondern auch vom Leben in Europa inspiriert zu werden. 🌍✨',
    },
  },
  {
    slug: "frau-yoqutxon",
    name: "Frau Yokutkhon Rustamova",
    degree: "Bachelor",
    level: "C1",
    bio: { uz: "", de: "" },
  },
  {
    slug: "frau-gulnoza",
    name: "Frau Gulnoza Salokhiddinova",
    degree: "Bachelor",
    level: "C1",
    bio: { uz: "", de: "" },
  },
  {
    slug: "herr-doston",
    name: "Herr Dostonjon Ruzimatov",
    degree: "Bachelor",
    level: "C1 (DSD 2-Stufe)",
    bio: {
      uz: "- FarDU Xorijiy til va adabiyoti (nemis tili) talabasi.\n- Til darajasi: C1 (DSD 2-Stufe).\n- Germaniyada 2 oy Ferienjob tajribasi.\n- 1,5 yil O‘zbekistonda ustozlik tajribasi.\n- 2024-yildan DaF Sprachzentrumda faoliyat yuritadi.\n\nYosh, energiyali va zamonaviy yondashuvga ega ustoz. Darslarida real hayotiy misollar va ko‘p tilli muhit orqali motivatsiya beradi. 🌍✨",
      de: "- Student der Fremdsprachenfakultät (Deutsch) an der FSU.\n- Niveau: C1 (DSD Stufe 2).\n- 2 Monate Ferienjob-Erfahrung in Deutschland.\n- 1,5 Jahre Lehrerfahrung in Usbekistan.\n- Seit 2024 im DaF Sprachzentrum tätig.\n\nJung, energiegeladen und mit modernem Ansatz. In seinem Unterricht motiviert er mit realen Beispielen und einem mehrsprachigen Umfeld. 🌍✨",
    },
  },
  {
    slug: "frau-sakina",
    name: "Frau Sakina Nomozova",
    degree: "Bachelor",
    level: "B2",
    bio: {
      uz: "- Jahon tillari universiteti — Roman-German filologiyasi (nemis filologiyasi).\n- Mutaxassisligi: filolog, nemis va ingliz tili o‘qituvchisi.\n- Til darajasi: B2 (xalqaro va milliy sertifikatlar).\n- Sommerschule dasturida tarjimon.\n- Akyıldız, Hong Kong, Blitz Olmon akademiyasi va Ata Education loyihalarida ustoz/tarjimon.\n- Harvard online: Teaching and Teacher Leadership yo‘nalishi bitiruvchisi.\n- 2025-yildan DaF Sprachzentrum jamoasida.\n\nUstozamiz — bilimli, zamonaviy metodlarni puxta egallagan va xalqaro tajribaga ega. O‘quvchilarga til bilan birga o‘rganishga muhabbat va motivatsiya ulashadi.",
      de: "- Staatliche Universität für Weltsprachen — Romanische und Germanische Philologie (Germanistik).\n- Fachrichtung: Philologin, Lehrerin für Deutsch und Englisch.\n- Sprachniveau: B2 (mit nationalen und internationalen Zertifikaten).\n- Übersetzerin im Sommerschule-Programm.\n- Lehrerin/Übersetzerin in Projekten von Akyıldız, Hong Kong, Blitz Olmon Akademisi und Ata Education.\n- Harvard Online: Absolventin des Programms Teaching and Teacher Leadership.\n- Seit 2025 im Team des DaF Sprachzentrums.\n\nUnsere Lehrerin ist fachkundig, beherrscht moderne Methoden und verfügt über internationale Erfahrung. Sie vermittelt nicht nur Sprache, sondern auch Lernfreude und Motivation.",
    },
  },
];

export const getTeacherBySlug = (slug: string) =>
  teachers.find((t) => t.slug === slug);
