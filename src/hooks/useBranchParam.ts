"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { branches } from "@/data/branches";

const validIds = new Set(branches.map((b) => b.id));

/**
 * Syncs a branch selection with the `branch` URL search param.
 * Returns [selectedBranchId, setSelectedBranchId].
 *
 * Reads the URL param via window.location.search instead of useSearchParams()
 * so this hook does NOT require a Suspense boundary — avoiding hydration
 * mismatches caused by deferred Suspense hydration + locale detection.
 */
export function useBranchParam(
  defaultId = "fergana",
): [string, (id: string) => void] {
  const [branchId, setBranchId] = useState(defaultId);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const val = params.get("branch");
    if (val && validIds.has(val)) setBranchId(val);
  }, []);

  const setSelectedBranchId = useCallback(
    (id: string) => {
      setBranchId(id);
      const params = new URLSearchParams(window.location.search);
      if (id === defaultId) {
        params.delete("branch");
      } else {
        params.set("branch", id);
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, defaultId],
  );

  return [branchId, setSelectedBranchId];
}
