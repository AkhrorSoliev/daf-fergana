import { Suspense } from "react";
import TeachersPageClient from "@/components/teachers/TeachersPageClient";

export default function TeachersPage() {
  return (
    <Suspense>
      <TeachersPageClient />
    </Suspense>
  );
}
