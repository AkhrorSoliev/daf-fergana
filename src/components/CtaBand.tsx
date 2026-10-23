import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/** Inset coloured band: headline left, actions right. */
export default function CtaBand({
  tone,
  title,
  children,
}: {
  tone: React.ComponentProps<typeof Section>["tone"];
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Section tone={tone} inset className="py-[clamp(40px,6vw,72px)]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <h2
          className={cn(
            "text-[length:var(--fs-h2)] leading-[1.05] font-semibold tracking-[-0.035em]",
            tone === "ink" ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
        <div className="flex flex-wrap gap-2.5">{children}</div>
      </div>
    </Section>
  );
}
