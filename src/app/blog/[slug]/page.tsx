"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/ShareButtons";
import { getPostBySlug } from "@/data/posts";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowLeft, CalendarDays, User } from "lucide-react";

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { t, locale } = useI18n();
  const post = useMemo(() => getPostBySlug(params.slug), [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-semibold mb-3">Maqola topilmadi</h1>
            <Button asChild>
              <Link href="/blog" className="inline-flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />{" "}
                {t("blog.back") || "Blogga qaytish"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const dateLabel = new Date(post.date).toLocaleDateString(
    locale === "de" ? "de-DE" : "uz-UZ",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const canonicalUrl = `https://dafzentrum.uz/blog/${post.slug}`;

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-10 md:py-16">
        <div className="mb-6">
          <Button asChild variant="outline">
            <Link href="/blog" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />{" "}
              {t("blog.back") || "Blogga qaytish"}
            </Link>
          </Button>
        </div>

        <article className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-3">
              {t("blog.badge") || "📝 Blog"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/70">
              <div className="inline-flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" />
                <time>{dateLabel}</time>
              </div>
              <span className="opacity-40">•</span>
              <div className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author.slug ? (
                  <Link
                    href={`/oqituvchilar/${post.author.slug}`}
                    className="hover:underline"
                  >
                    {post.author.name}
                  </Link>
                ) : (
                  <span>{post.author.name}</span>
                )}
              </div>
            </div>
          </div>

          <Card className="overflow-hidden p-0 mb-8">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          </Card>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {post.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-base font-semibold mb-2">
              {t("blog.shareCta") || "Maqolani ulashing"}
            </h3>
            <ShareButtons
              url={canonicalUrl}
              title={post.title}
              text={post.summary}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
