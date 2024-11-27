import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { childrenTable } from "@/db/schema/children";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const parsedData = await req.json();
    console.log("Parsed data:", parsedData);

    // Prepare user data
    const userData = {
      parentEmail: parsedData.parentEmail,
      parentNumber: parsedData.parentNumber,
      childName: parsedData.childName,
    };

    console.log("Inserting data into usersTable...");

    // Insert into usersTable
    const user = await db.insert(usersTable).values(userData).returning();
    console.log("User inserted:", user);

    if (user.length === 0) {
      return NextResponse.json(
        { message: "Failed to register user" },
        { status: 500 }
      );
    }

    const userId = user[0].id;

    // Prepare child data
    const childData = {
      userId, // Reference ID to the user
      childName: parsedData.childName,
      age: null, // Placeholder for other fields
      gender: null,
      connections: null,
      details: null,
      hobbies: null,
    };

    console.log("Inserting data into childrenTable...");

    // Insert into childrenTable
    const child = await db.insert(childrenTable).values(childData).returning();
    console.log("Child inserted:", child);

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = JSON.stringify(user[0]);
    const cookieStore = cookies();

    await (await cookieStore).set("session", session, {
      expires,
      httpOnly: true,
    });

    return NextResponse.json({
      message: "User registered successfully",
      user,
      child,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
    console.error("An error occurred:", error);

    if ("code" in error && error.code === "23505") {
      return NextResponse.json(
        { message: "Already exists, Use emailed link to step forward" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
}