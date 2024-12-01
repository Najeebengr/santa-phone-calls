import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env["NEXT_PUBLIC_SUPABASE_URL"];
const SUPABASE_ANON_KEY = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

// Interfaces
interface Child {
  id: string;
  name?: string;
  age?: number;
  gender?: string;
  childName?: string;
  childAge?: number;
  childGender?: string;
  connections?: string;
  details?: string;
  hobbies?: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Debug - Raw incoming data:", data);

    // Validate required fields
    if (
      !data.children ||
      !Array.isArray(data.children) ||
      data.children.length === 0
    ) {
      console.error("No children data received");
      return NextResponse.json(
        { success: false, error: "Children data is required" },
        { status: 400 },
      );
    }

    // Format children data according to schema
    const formattedChildren = data.children.map((child: Child) => ({
      id: child.id,
      childName: child.childName || child.name || "",
      childAge: child.childAge || child.age || 0,
      childGender: child.childGender || child.gender || "",
      connections: child.connections || "",
      details: child.details || "",
      hobbies: child.hobbies || "",
    }));

    // Format datetime
    let formattedDateTime = data.selected_time;
    if (
      data.selected_time &&
      !data.callNow &&
      !formattedDateTime.includes("M")
    ) {
      try {
        const date = new Date(formattedDateTime);
        formattedDateTime = date.toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: data.selectedTimezone,
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        formattedDateTime = "Invalid Date";
      }
    }

    // Format phone numbers
    const formattedPhone = formatUSPhoneNumber(data.phone);
    const formattedRecipientPhone = data.recipientPhone
      ? formatUSPhoneNumber(data.recipientPhone)
      : undefined;

    // Prepare webhook data
    const webhookData = {
      id: data.id,
      children: formattedChildren,
      numberChildern: formattedChildren.length,
      email: data.email,
      phone: formattedPhone,
      firstName: data.firstName,
      lastName: data.lastName,
      packageName: data.packageName,
      totalAmount: data.totalAmount,
      paymentStatus: data.paymentStatus,
      paymentId: data.paymentId,
      selected_time: formattedDateTime,
      selectedTimezone: data.selectedTimezone,
      planId: data.planId,
      recording: data.hasRecording,
      callNow: data.callNow,
      when: data.callNow
        ? 0
        : data.when || calculateHoursFromNow(new Date(data.selected_time)),
      recipientName: data.recipientName,
      recipientPhone: formattedRecipientPhone,
    };

    // Validate children data
    const invalidChildren = formattedChildren.filter(
      (child: Child) =>
        !child.childName || !child.childAge || !child.childGender,
    );

    if (invalidChildren.length > 0) {
      console.error("Invalid children data:", invalidChildren);
      return NextResponse.json(
        { success: false, error: "Missing required child information" },
        { status: 400 },
      );
    }

    // Initialize Supabase client
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Call the Supabase Edge Function
    const { data: functionResponse, error: functionError } =
      await supabase.functions.invoke("webhook-handler", {
        body: JSON.stringify(webhookData),
      });

    if (functionError) {
      throw new Error(`Edge function error: ${functionError.message}`);
    }

    console.log("Edge Function Response:", functionResponse);

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      data: functionResponse,
    });
  } catch (error) {
    console.error("Error in webhook handler:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to process webhook",
      },
      { status: 500 },
    );
  }
}

// Utility functions
function calculateHoursFromNow(date: Date): number {
  const diffInMilliseconds = date.getTime() - new Date().getTime();
  return Math.max(0, Math.ceil(diffInMilliseconds / (1000 * 60 * 60)));
}

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
