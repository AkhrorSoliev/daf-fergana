import TeacherDetailClient from "@/components/teachers/TeacherDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function TeacherDetailPage({ params }: PageProps) {
  return <TeacherDetailClient params={params} />;
}
