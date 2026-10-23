import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import type { Tone } from "@/components/ui/badge";

/** Top block of inner pages: optional back link, eyebrow, h1, subtitle. */
export default function PageHead({
  eyebrow,
  eyebrowTone,
  title,
  subtitle,
  back,
  narrow,
}: {
  eyebrow?: React.ReactNode;
  eyebrowTone?: Tone;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  back?: { href: string; label: string };
  narrow?: boolean;
}) {
  return (
    <Section narrow={narrow} className="pt-[clamp(32px,6vw,80px)] pb-[clamp(32px,5vw,56px)]">
      {back && (
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href={back.href}>
              <ArrowLeft />
              {back.label}
            </Link>
          </Button>
        </div>
      )}
      <SectionHeader as="h1" size="h1" eyebrow={eyebrow} eyebrowTone={eyebrowTone} title={title} subtitle={subtitle} className="!mb-0" />
    </Section>
  );
}
