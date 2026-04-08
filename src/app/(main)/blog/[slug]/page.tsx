import BlogPostClient from "@/components/blog/BlogPostClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function BlogPostPage({ params }: PageProps) {
  return <BlogPostClient params={params} />;
}
