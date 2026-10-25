import { NextRequest, NextResponse } from "next/server";

// ERP (daf-erp-system) filial id lari: ERP_BRANCH_IDS="fergana:1,namangan:2,qarshi:3".
// Filial berilmasa birinchisi (Farg'ona) ishlatiladi.
function erpBranchId(branch?: string): number | null {
  const map = (process.env.ERP_BRANCH_IDS ?? "")
    .split(",")
    .map((p) => p.split(":").map((x) => x.trim()));
  const found = map.find(([k]) => k === branch) ?? map[0];
  const id = Number(found?.[1]);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, level, source, branch } = body ?? {};

    if (!firstName?.trim() || !lastName?.trim() || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required", reason: "validation" },
        { status: 400 }
      );
    }

    const url = process.env.ERP_API_URL;
    const key = process.env.ERP_WEBSITE_LEADS_KEY;
    const branchId = erpBranchId(branch);
    if (!url || !key || !branchId) {
      console.error("Missing ERP_API_URL / ERP_WEBSITE_LEADS_KEY / ERP_BRANCH_IDS");
      return NextResponse.json(
        { error: "Server misconfiguration", reason: "missing_env" },
        { status: 500 }
      );
    }

    const referer = request.headers.get("referer") || "";
    const inferredSource =
      source || (level || referer.includes("/kurslar") ? "Kurslar" : "Bepul konsultatsiya");

    const resp = await fetch(`${url.replace(/\/$/, "")}/public/website-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": key },
      body: JSON.stringify({ firstName, lastName, phone, branchId, source: inferredSource }),
    });

    if (!resp.ok) {
      const details = await resp.text().catch(() => "");
      console.error("ERP lead error:", resp.status, details);
      return NextResponse.json(
        { error: "Failed to notify", reason: "erp_error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", reason: "exception" },
      { status: 500 }
    );
  }
}
