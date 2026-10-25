"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LeadModal } from "@/components/LeadModal";

type LeadOptions = { source?: string; subtitle?: string };
const LeadCtx = createContext<(o?: LeadOptions) => void>(() => {});

/** useLead()({ source, subtitle }) opens the shared lead dialog. */
export const useLead = () => useContext(LeadCtx);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean } & LeadOptions>({
    open: false,
  });
  const open = useCallback(
    (o: LeadOptions = {}) => setState({ open: true, ...o }),
    [],
  );
  return (
    <LeadCtx.Provider value={open}>
      {children}
      <LeadModal
        open={state.open}
        onClose={() => setState((s) => ({ ...s, open: false }))}
        source={state.source ?? "Bepul konsultatsiya"}
        subtitle={state.subtitle}
      />
    </LeadCtx.Provider>
  );
}
