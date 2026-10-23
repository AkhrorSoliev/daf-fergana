import type { Metadata } from "next";
import ProgramsIndexClient from "@/components/afzalliklar/ProgramsIndexClient";

export const metadata: Metadata = {
  title: "Afzalliklar",
  description: "Germaniyada ta'lim va ish dasturlari: Bachelor & Master, Ausbildung, FSJ/BFD, Aupair, Ferienjob va boshqalar.",
  alternates: { canonical: "/afzalliklar" },
};

export default function Page() {
  return <ProgramsIndexClient />;
}
