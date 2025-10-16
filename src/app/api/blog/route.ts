import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

type Query = {
  page?: string;
  limit?: string;
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const query: Query = Object.fromEntries(searchParams.entries());

  const page = Math.max(1, Number(query.page ?? 1) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit ?? 12) || 12));

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const start = (page - 1) * limit;
  const end = start + limit;
  const slice = sorted.slice(start, end);

  const items = slice.map((p) => {
    const href = `/blog/${p.slug}`;
    const coverUrlAbsolute = p.cover.startsWith("http")
      ? p.cover
      : new URL(
          p.cover.startsWith("/") ? p.cover : `/${p.cover}`,
          origin
        ).toString();
    return {
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      tags: p.tags ?? [],
      cover: p.cover,
      coverUrl: coverUrlAbsolute,
      author: p.author,
      url: new URL(href, origin).toString(),
    };
  });

  const body = {
    items,
    page,
    limit,
    total: posts.length,
    hasMore: end < posts.length,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
