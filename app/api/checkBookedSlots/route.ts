import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env["NEXT_PUBLIC_SUPABASE_URL"];
const SUPABASE_ANON_KEY = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

const DEFAULT_TIMEZONE = "America/Los_Angeles";

export async function POST(req: NextRequest) {
  try {
    const { timezone, startDate, endDate } = await req.json();

    // Use provided timezone or fallback to default
    const userTimezone = timezone || DEFAULT_TIMEZONE;

    // Validate Supabase configuration
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Server configuration error");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Call the Edge Function to get available slots
    const { data: slotsData, error: functionError } =
      await supabase.functions.invoke("get-available-slots", {
        body: JSON.stringify({
          timezone: userTimezone,
          startDate,
          endDate,
        }),
      });

    if (functionError) {
      throw new Error(functionError.message);
    }

    return NextResponse.json(slotsData);
  } catch (error) {
    console.error("Error fetching available slots:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      {
        status: 500,
      },
    );
  }
}
