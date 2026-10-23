"use client";

import { Button } from "@/components/ui/button";
import { useLead } from "@/components/LeadProvider";

/** Button that opens the shared lead dialog. */
export default function LeadButton({
  source,
  level,
  subtitle,
  askBranch,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  source?: string;
  level?: string;
  subtitle?: string;
  askBranch?: boolean;
}) {
  const open = useLead();
  return <Button {...props} onClick={() => open({ source, level, subtitle, askBranch })} />;
}
