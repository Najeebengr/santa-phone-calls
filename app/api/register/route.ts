import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { childrenTable } from "@/db/schema/children";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

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

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.parentEmail, userData.parentEmail))
      .limit(1);

    let user;
    if (existingUser.length > 0) {
      // User exists, use their data
      user = existingUser;
      console.log("Existing user found:", user);
    } else {
      // Insert new user
      console.log("Inserting data into usersTable...");
      user = await db.insert(usersTable).values(userData).returning();
      console.log("User inserted:", user);
    }

    if (user.length === 0) {
      return NextResponse.json(
        { message: "Failed to process user" },
        { status: 500 }
      );
    }

    const userId = user[0].id;

    // Prepare child data
    const childData = {
      userId,
      childName: parsedData.childName,
      age: null,
      gender: null,
      connections: null,
      details: null,
      hobbies: null,
    };

    console.log("Inserting data into childrenTable...");

    // Insert into childrenTable
    const child = await db.insert(childrenTable).values(childData).returning();
    console.log("Child inserted:", child);
    
    const sessionData = {
      ...user[0],
      childName: child[0].childName,
    };
    
    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = JSON.stringify(sessionData);
    const cookieStore = cookies();

    await (await cookieStore).set("session", session, {
      expires,
      httpOnly: true,
    });

    return NextResponse.json({
      message: existingUser.length > 0 ? "Welcome back!" : "User registered successfully",
      user,
      child,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}