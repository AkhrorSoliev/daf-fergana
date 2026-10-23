"use client";

import Image from "next/image";
import Link from "next/link";
import { use as usePromise } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, HighlightLast } from "@/components/ui/section";
import { BlogCard } from "@/components/cards";
import ShareButtons from "@/components/ShareButtons";
import { getPostBySlug, posts } from "@/data/posts";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/utils/date";

export default function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = usePromise(params);
  const { t, locale } = useI18n();
  const post = getPostBySlug(slug);
  const fmt = (d: string) => formatDate(d, locale);

  if (!post) {
    return (
      <Section narrow>
        <h1 className="mb-6 text-[length:var(--fs-h2)] font-semibold tracking-[-0.03em]">Maqola topilmadi</h1>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft />
            {t("blog.back")}
          </Link>
        </Button>
      </Section>
    );
  }

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Section narrow className="pt-[clamp(24px,4vw,48px)] pb-0">
        <Button asChild variant="ghost" size="sm" className="-ml-3 mb-6">
          <Link href="/blog">
            <ArrowLeft />
            {t("blog.back")}
          </Link>
        </Button>
        {post.tags && (
          <div className="mb-[18px] flex flex-wrap gap-1.5">
            {post.tags.map((tg) => (
              <Badge key={tg} tone="lilac" size="sm">
                {tg}
              </Badge>
            ))}
          </div>
        )}
        <h1 className="text-[length:var(--fs-h1)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">{post.title}</h1>
        <div className="mt-5 flex items-center gap-2.5 text-[15px] font-medium text-ink-3">
          {post.author.slug ? (
            <Link href={`/oqituvchilar/${post.author.slug}`} className="font-semibold text-ink">
              {post.author.name}
            </Link>
          ) : (
            <span className="font-semibold text-ink">{post.author.name}</span>
          )}
          <span>·</span>
          <time>{fmt(post.date)}</time>
        </div>
      </Section>

      <Section className="py-[clamp(28px,4vw,48px)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(28px,4vw,44px)] bg-paper-3 sm:aspect-[16/8]">
          <Image src={post.cover} alt={post.title} fill priority sizes="(min-width:1200px) 1200px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section narrow className="pt-[clamp(8px,2vw,24px)]">
        <div className="flex flex-col gap-5 text-[length:clamp(17px,1.6vw,19px)] leading-[1.65] text-ink-2">
          <p className="text-[length:clamp(20px,2.2vw,24px)] leading-[1.45] font-medium tracking-[-0.01em] text-ink">{post.summary}</p>
          {post.content.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-10 border-t border-line pt-6">
          <h3 className="mb-3 text-[15px] font-semibold">{t("blog.shareCta")}</h3>
          <ShareButtons url={`https://dafzentrum.uz/blog/${post.slug}`} title={post.title} text={post.summary} />
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="white" inset>
          <SectionHeader title={<HighlightLast text={t("blog.title")} color="lilac" />} />
          <div className="kit-grid-2">
            {others.map((p) => (
              <BlogCard key={p.slug} href={`/blog/${p.slug}`} cover={p.cover} title={p.title} summary={p.summary} tags={p.tags} meta={`${fmt(p.date)} · ${p.author.name}`} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
