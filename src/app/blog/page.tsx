"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { posts } from "@/data/posts";
import { useI18n } from "@/i18n/I18nProvider";
import { ArrowRight, CalendarDays } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-muted/20 via-background to-secondary/10 relative overflow-hidden">
      <div className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t("blog.badge") || "📝 Blog"}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            {t("blog.title") || "Blog maqolalari"}
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {t("blog.subtitle") ||
              "Ustozlarimizdan foydali maqolalar va maslahatlar"}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {posts.map((post, idx) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Card className="overflow-hidden p-0 group bg-card/50">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx < 2}
                  />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <CalendarDays className="w-4 h-4" />
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="mt-1">
                    <Button asChild size="sm" className="">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center"
                      >
                        {t("blog.readMore") || "Batafsil o'qish"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
