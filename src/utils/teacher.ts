/** Photo path for a teacher (files live in /public/lehrer and /public/lehrer-qarshi with mixed extensions). */
export function teacherPhoto(slug: string, branch: string): string {
  if (branch === "qarshi") {
    const ext = slug === "herr-khasan" || slug === "herr-lazizjon" ? "jpg" : "JPG";
    return `/lehrer-qarshi/${slug}.${ext}`;
  }
  if (slug === "herr-umarov") return "/lehrer/herr-musinjon.png";
  if (slug === "herr-doston") return "/lehrer/herr-doston.jpg";
  if (slug === "frau-sakina") return "/lehrer/frau-sakina.jpg";
  return `/lehrer/${slug}.png`;
}
