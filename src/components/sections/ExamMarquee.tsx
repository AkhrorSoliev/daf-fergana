import { Highlight } from "@/components/ui/highlight";

const EXAMS = ["Goethe", "ECL", "ÖSD", "TELC", "TestDaF"];
const DOTS = ["bg-green-500", "bg-sun-400", "bg-coral-500", "bg-sky-500", "bg-lilac-500"];

export default function ExamMarquee() {
  return (
    <div className="-mx-2 mt-[clamp(28px,5vw,48px)] overflow-hidden py-2" aria-hidden>
      <div className="flex w-max animate-[daf-marquee_28s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {EXAMS.concat(EXAMS).map((e, i) => (
              <span
                key={i}
                className="flex items-center gap-7 pr-7 text-[clamp(28px,4vw,44px)] leading-none font-semibold tracking-[-0.03em] text-ink"
              >
                {i % 2 ? <Highlight>{e}</Highlight> : e}
                <span className={`size-3 rotate-45 rounded-[3px] ${DOTS[i % 5]}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
