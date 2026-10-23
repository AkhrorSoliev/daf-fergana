"use client";

import PageHead from "@/components/PageHead";
import { Section, HighlightLast } from "@/components/ui/section";
import { BlogCard } from "@/components/cards";
import { posts } from "@/data/posts";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/utils/date";

export default function BlogPageClient() {
  const { t, locale } = useI18n();
  const fmt = (d: string) => formatDate(d, locale);
  return (
    <>
      <PageHead eyebrow={t("blog.badge")} eyebrowTone="white" title={<HighlightLast text={t("blog.title")} color="lilac" />} subtitle={t("blog.subtitle")} />
      <Section className="pt-0">
        <div className="kit-grid-3">
          {posts.map((p, i) => (
            <BlogCard
              key={p.slug}
              href={`/blog/${p.slug}`}
              cover={p.cover}
              title={p.title}
              summary={p.summary}
              tags={p.tags}
              meta={`${fmt(p.date)} · ${p.author.name}`}
              priority={i < 2}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
