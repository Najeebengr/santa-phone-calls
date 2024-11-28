import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_CALENDAR_ID = process.env.GHL_CALENDAR_ID;
const DEFAULT_TIMEZONE = "America/New_York";

export async function POST(req: NextRequest) {
  try {
    const { timezone = DEFAULT_TIMEZONE } = await req.json();

    // Get current date and 7 days from now in epoch timestamps
    const startDate = Date.now();
    const endDate = startDate + (20 * 24 * 60 * 60 * 1000);

    console.log('Start date:', startDate);
    console.log('End date:', endDate);

    const apiUrl = `https://rest.gohighlevel.com/v1/appointments/slots?calendarId=${GHL_CALENDAR_ID}&startDate=${startDate}&endDate=${endDate}&timezone=${timezone}`;

    console.log('Making GHL API request to:', apiUrl);

    const ghlResponse = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error('GHL API error response:', errorText);
      throw new Error(`GHL API error: ${ghlResponse.statusText}\nDetails: ${errorText}`);
    }

    const ghlData = await ghlResponse.json();
    console.log('GHL API response:', JSON.stringify(ghlData, null, 2));

    // Calculate total available slots
    const totalSlots = Object.values(ghlData).reduce((total: number, day: any) => total + day.slots.length, 0);
    console.log('Total available slots:', totalSlots);

    // Format the response
    const response = {
      availableSlots: ghlData,
      totalAvailableSlots: totalSlots
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in checkBookedSlots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available slots' },
      { status: 500 }
    );
  }
}