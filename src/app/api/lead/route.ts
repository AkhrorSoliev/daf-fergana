import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      level,
      source,
    }: { name?: string; phone?: string; level?: string; source?: string } =
      body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required", reason: "validation" },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { error: "Server misconfiguration", reason: "missing_env" },
        { status: 500 }
      );
    }

    const referer = request.headers.get("referer") || "";
    const inferredSource =
      source ||
      (level
        ? "Kurslar"
        : referer.includes("/kurslar")
        ? "Kurslar"
        : "Bepul konsultatsiya");

    const escapeHtml = (value: string | undefined | null): string => {
      if (!value) return "";
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeLevel = escapeHtml(level);
    const safeSource = escapeHtml(inferredSource);
    const formattedTime = new Date().toLocaleString("uz-UZ");

    const lines: string[] = [
      `<b>🆕 Yangi lead</b> — <i>${safeSource}</i>`,
      `<b>👤 Ism:</b> ${safeName}`,
      `<b>📞 Telefon:</b> <code>${safePhone}</code>`,
    ];
    if (safeLevel) {
      lines.push(`<b>📚 Kurs:</b> ${safeLevel}`);
    }
    lines.push(`<b>⏰ Vaqt:</b> ${escapeHtml(formattedTime)}`);

    const text = lines.join("\n");

    const tgResp = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!tgResp.ok) {
      const errText = await tgResp.text().catch(() => "");
      console.error("Telegram API error:", tgResp.status, errText);
      return NextResponse.json(
        {
          error: "Failed to notify",
          reason: "telegram_error",
          details: errText,
        },
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
