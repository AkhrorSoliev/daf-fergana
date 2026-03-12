"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { branches } from "@/data/branches";

const validIds = new Set(branches.map((b) => b.id));

/**
 * Syncs a branch selection with the `branch` URL search param.
 * Returns [selectedBranchId, setSelectedBranchId].
 */
export function useBranchParam(
  defaultId = "fergana",
): [string, (id: string) => void] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const paramValue = searchParams.get("branch");
  const selectedBranchId =
    paramValue && validIds.has(paramValue) ? paramValue : defaultId;

  const setSelectedBranchId = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id === defaultId) {
        params.delete("branch");
      } else {
        params.set("branch", id);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname, defaultId],
  );

  return [selectedBranchId, setSelectedBranchId];
}
