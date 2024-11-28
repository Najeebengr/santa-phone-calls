import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, selectedSlot, selectedTimezone } = body;

    console.log('Received request body:', body);

    if (!email || !phone || !selectedSlot || !selectedTimezone) {
      console.log('Missing required fields:', { email, phone, selectedSlot, selectedTimezone });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the data exactly as required by GHL API v2
    const ghlRequestData = JSON.stringify({
      calendarId: process.env.GHL_CALENDAR_ID,
      startTime: selectedSlot,
      contact: {
        email,
        phone
      },
      timezone: selectedTimezone
    });

    console.log('Sending request to GHL v2:', ghlRequestData);
    console.log('Using GHL Calendar ID:', process.env.GHL_CALENDAR_ID);

    const response = await fetch('https://services.leadconnectorhq.com/appointments/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Version': '2021-07-28'
      },
      body: ghlRequestData
    });

    const responseData = await response.json();
    console.log('GHL API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: responseData
    });

    if (!response.ok) {
      console.error('GHL API Error:', responseData);
      throw new Error(`Failed to book appointment: ${JSON.stringify(responseData)}`);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error booking appointment:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment', details: error.message },
      { status: 500 }
    );
  }
}
