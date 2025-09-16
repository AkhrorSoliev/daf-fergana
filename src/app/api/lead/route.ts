import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Log the lead data (in production, you would save this to a database)
    console.log('New lead received:', {
      name,
      phone,
      timestamp: new Date().toISOString(),
    });

    // TODO: Connect to Telegram bot here
    // Example: await sendTelegramMessage(`New lead: ${name} - ${phone}`);

    // TODO: Save to database
    // Example: await saveLeadToDatabase({ name, phone });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
