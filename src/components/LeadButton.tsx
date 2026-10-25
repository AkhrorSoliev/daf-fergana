"use client";

import { Button } from "@/components/ui/button";
import { useLead } from "@/components/LeadProvider";

/** Button that opens the shared lead dialog. */
export default function LeadButton({
  source,
  subtitle,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  source?: string;
  subtitle?: string;
}) {
  const open = useLead();
  return <Button {...props} onClick={() => open({ source, subtitle })} />;
}
