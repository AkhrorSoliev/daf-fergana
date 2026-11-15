"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useBranches } from "@/components/SiteContentProvider";

/**
 * Syncs a branch selection with the `branch` URL search param.
 * Returns [selectedBranchId, setSelectedBranchId]. The default is the first
 * base branch (the site list is never empty).
 *
 * Reads the URL param via window.location.search instead of useSearchParams()
 * so this hook does NOT require a Suspense boundary — avoiding hydration
 * mismatches caused by deferred Suspense hydration + locale detection.
 */
export function useBranchParam(): [string, (id: string) => void] {
  const branches = useBranches();
  const defaultId = branches[0]?.id ?? "";
  const [branchId, setBranchId] = useState(defaultId);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const val = new URLSearchParams(window.location.search).get("branch");
    if (val && branches.some((b) => b.id === val)) setBranchId(val);
  }, [branches]);

  const setSelectedBranchId = useCallback(
    (id: string) => {
      setBranchId(id);
      const params = new URLSearchParams(window.location.search);
      if (id === defaultId) params.delete("branch");
      else params.set("branch", id);
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, defaultId],
  );

  return [branchId, setSelectedBranchId];
}
