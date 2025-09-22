export type Branch = {
  id: string;
  city: string;
  name?: string;
  address: string;
  phones: string[];
  email?: string;
};

export const branches: Branch[] = [
  {
    id: "tashkent",
    city: "Toshkent",
    address: "Chilonzor tumani, Lutfiy ko‘chasi 47",
    phones: ["+998 90 002 77 66", "+998 95 989 16 09"],
    email: "tashkent@daf-fergana.uz",
  },
  {
    id: "bukhara",
    city: "Buxoro",
    address: "“Dunyo” binosi",
    phones: ["+998 90 412 97 95"],
  },
  {
    id: "fergana",
    city: "Farg‘ona",
    address: "Turkiston ko‘chasi 22",
    phones: ["+99 890 535 10 99"],
    email: "fergana@daf-fergana.uz",
  },
  {
    id: "fergana-texnopark",
    city: "Farg‘ona",
    name: "DaF Texnopark",
    address: "Texnopark, Farg‘ona",
    phones: ["+99 890 535 10 99"],
  },
  {
    id: "namangan",
    city: "Namangan",
    address: "A. Xo‘jayev ko‘chasi 38",
    phones: ["+998 97 258 12 26"],
  },
  {
    id: "navoiy",
    city: "Navoiy",
    address: "Gulbog‘ ko‘chasi 12",
    phones: ["+998 90 665 25 25"],
  },
  {
    id: "samarkand",
    city: "Samarqand",
    address: "Ibn Xoldun ko‘chasi 10B, klinikada tibbiy ekspert",
    phones: ["+998 90 159 98 88"],
    email: "samarkand@daf-fergana.uz",
  },
  {
    id: "khorezm",
    city: "Xorazm",
    address: "Urganch shahri",
    phones: ["+998 91 862 36 93"],
  },
];

export function mapSearchUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function mapEmbedUrl(city: string, address: string): string {
  const q = encodeURIComponent(`${city}, ${address}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
