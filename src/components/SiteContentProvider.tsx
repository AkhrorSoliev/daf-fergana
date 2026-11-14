"use client";

import { createContext, useContext } from "react";
import { branches as fallback, type Branch } from "@/data/branches";

const Ctx = createContext<Branch[]>(fallback);

/** Branches (with prices) the server fetched from the ERP for this render. */
export const useBranches = () => useContext(Ctx);

export function SiteContentProvider({
  branches,
  children,
}: {
  branches: Branch[];
  children: React.ReactNode;
}) {
  return <Ctx.Provider value={branches}>{children}</Ctx.Provider>;
}
