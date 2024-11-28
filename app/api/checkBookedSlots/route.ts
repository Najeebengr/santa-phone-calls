import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
 // Replace with your actual bookings table
import { eq } from "drizzle-orm";
import { bookingsTable } from "@/db/schema/bookings";

export async function POST(req: NextRequest) {
  try {
    const { date } = await req.json(); // Date in YYYY-MM-DD format
    if (!date) {
      return NextResponse.json(
        { message: "Date is required" },
        { status: 400 }
      );
    }

    // Query the database for booked slots on the given date
    const bookedSlots = await db
      .select({
        scheduledTime: bookingsTable.scheduledTime,
      })
      .from(bookingsTable)
      .where(eq(bookingsTable.scheduledDate, date));

    // Extract times from the results
    const disabledTimes = bookedSlots.map((slot) => slot.scheduledTime);

    return NextResponse.json({
      disabledTimes,
    });
  } 
  catch (error: unknown) {
    if(error instanceof Error) {
    console.error("Error fetching booked slots:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
}