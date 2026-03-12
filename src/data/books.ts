export type Book = {
  title: string;
  cover: string;
  dropbox: string;
  media?: string;
};

export type ParsedTitle = {
  main: string;
  level?: string;
  type?: string;
};

export function parseTitle(raw: string): ParsedTitle {
  const title = raw.trim();
  const levelRegex = /\b([ABC][12](?:\s*[-–]\s*[ABC]?[12])?)\b/i;
  const levelMatch = title.match(levelRegex);
  const level = levelMatch ? levelMatch[1].replace(/\s*/g, "") : undefined;

  const typeRegex =
    /(Kursbuch|Übungsbuch|Ubungsbuch|Dictionary|Grammar|Wörterbuch|Woerterbuch)/i;
  const typeMatch = title.match(typeRegex);
  let type = typeMatch ? typeMatch[1] : undefined;
  if (type === "Ubungsbuch") type = "Übungsbuch";
  if (type === "Woerterbuch") type = "Wörterbuch";

  if (!type) {
    const t = title.toLowerCase();
    if (/(lug['''`]?at|lugat|w[öo]rterbuch)/.test(t)) {
      type = "Dictionary";
    } else if (/(grammatik|grammatika)/.test(t)) {
      type = "Grammar";
    }
  }

  let main = title;
  if (level) main = main.replace(levelRegex, "");
  if (typeMatch) main = main.replace(typeRegex, "");
  main = main
    .replace(/\s*[-–]\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  return { main, level, type };
}

export const books: Book[] = [
  {
    title: "Netzwerk Neu - A1 - Kursbuch",
    cover:
      "https://avatars.mds.yandex.net/get-mpic/12523390/2a0000019524abac5270e4cb9ef6cb3fe347/orig",
    dropbox:
      "https://www.dropbox.com/scl/fi/glf0j0t3enjk6npntyndp/Netzwerk-Neu-A1-Kursbuch.pdf?rlkey=7ulk2qatap1p8mq50843l3ap3&st=d7prlds6&dl=0",
    media: "https://www.allango.net/product/MAXP-607156/aug/978-3-12-607156-7",
  },
  {
    title: "Netzwerk Neu - A1 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1690409757/klett/cover/9783126071574.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/n855tcugskpgw94vhbvxu/Netzwerk-Neu-A1-bungsbuch.pdf?rlkey=jjn4yqnfzg2nyn8jkfbej0fy5&st=730xyqec&dl=0",
    media: "https://www.allango.net/product/MAXP-607157/aug/978-3-12-607157-4",
  },
  {
    title: "Netzwerk Neu - A2 - Kursbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1591222501/klett/cover/9783126071642.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/bpw71qh8i019ah2o8osya/Netzwerk-Neu-A2-Kursbuch.pdf?rlkey=ex1l5fm62f2n4zi0hy7v5pzm6&st=qgew8k8i&dl=0",
    media: "https://www.allango.net/product/MAXP-607164/aug/978-3-12-607164-2",
  },
  {
    title: "Netzwerk Neu - A2 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1693260971/klett/cover/9783126071659.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/9eczkwoeax1wd5vbq74s6/Netzwerk-Neu-A2-Ubungsbuch.pdf?rlkey=d3iy3znzqikerf6u8z4sezg0z&st=vgw6ugyh&dl=0",
    media: "https://www.allango.net/product/MAXP-607165/aug/978-3-12-607165-9",
  },
  {
    title: "Netzwerk Neu - B1 - Kursbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1690409748/klett/cover/9783126071727.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/2tez7yugdfphp7ihakew8/Netzwerk-Neu-B1-Kursbuch.pdf?rlkey=ta5l5lts4ef4l60g4l8fa01h5&st=yy5hm8hn&dl=0",
    media: "https://www.allango.net/product/MAXP-607172/aug/978-3-12-607172-7",
  },
  {
    title: "Netzwerk Neu - B1 - Übungsbuch",
    cover:
      "https://res.cloudinary.com/pim-red/image/upload/q_auto,f_auto,h_1200,ar_0.67,c_fill,g_south/v1621030502/klett/cover/9783126071734.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/s031s0b0t8l23ill0hy1k/Netzwerk-Neu-B1-bungsbuch.pdf?rlkey=kwzcsfmgjhz93afx5d0w50geb&st=lipbyfx2&dl=0",
    media: "https://www.allango.net/product/MAXP-607173/aug/978-3-12-607173-4",
  },
  {
    title: "Grammatik aktiv A1-B1",
    cover:
      "https://avatars.mds.yandex.net/i?id=12061d0da8e93bc03cb655c219cdfe06_l-9151562-images-thumbs&ref=rim&n=13&w=1428&h=1932",
    dropbox:
      "https://www.dropbox.com/scl/fi/4zn69acb0e61ubro972hf/Grammatik-aktiv-A1-B1.pdf?rlkey=pjlcd14o2w6h5txy853d7bs6d&st=za5xgt6f&dl=0",
  },
  {
    title: "Nemis tili lug'at",
    cover: "https://images.uzum.uz/cl2d0n7n7c6qm23hjlbg/original.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/kne3770rkt55g5jczje9h/Nemis-tili-lug-at.pdf?rlkey=nb351j44xe7kh8cc97k5yv3hz&st=p1e53s0v&dl=0",
  },
  {
    title: "S.Saidov - Nemis tili grammatikasi mashqlarda",
    cover: "https://json-api.uz/mnt/file-1758262543921.jpg",
    dropbox:
      "https://www.dropbox.com/scl/fi/73tjd52pqxd9mzi0y6lik/S.Saidov-Nemis-tili-grammatikasi-mashqlarda.pdf?rlkey=nf0dlv97rlbix6uy5g17iuto3&st=1uxdgr8c&dl=0",
  },
];
