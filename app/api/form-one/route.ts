import { NextResponse } from "next/server";

// Interface for the form data
interface Step1FormData {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
}

export async function POST(request: Request) {
  try {
    const data: Step1FormData = await request.json();

    // Validate required fields
    if (!data.id || !data.parentName || !data.parentEmail || !data.parentPhone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format phone number
    const formattedPhone = formatUSPhoneNumber(data.parentPhone);

    // Prepare webhook data
    const webhookData = {
      id: data.id,
      firstName: data.parentName.split(' ')[0],
      lastName: data.parentName.split(' ').slice(1).join(' '),
      email: data.parentEmail,
      phone: formattedPhone,
      source: "Form Step 1",
      status: "Lead",
      timestamp: new Date().toISOString()
    };

    // Send data to webhook
    const webhookUrl = "https://services.leadconnectorhq.com/hooks/jyPDXTf3YpjI9G74bRCW/webhook-trigger/081839aa-3dab-469c-bbf6-4e1e0256239d";
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook error: ${webhookResponse.statusText}`);
    }

    const responseData = await webhookResponse.json();

    return NextResponse.json({
      success: true,
      message: "Data processed successfully",
      data: responseData
    });

  } catch (error) {
    console.error("Error in form handler:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process form data"
      },
      { status: 500 }
    );
  }
}

// Utility function for phone number formatting
function formatUSPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+${cleaned}`;
  }

  return phone;
}