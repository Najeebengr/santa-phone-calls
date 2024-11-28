import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { childrenTable } from "@/db/schema/children";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const parsedData = await req.json();
    console.log("Parsed Data:", parsedData);

    const cookieStore = cookies();
    const authToken = (await cookieStore).get("session")?.value;

    if (!authToken) {
      return NextResponse.json(
        { message: "Unauthorized: Session token not found" },
        { status: 401 }
      );
    }

    const sessionData = JSON.parse(authToken);
    const { id: userId } = sessionData;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User ID not found in session" },
        { status: 401 }
      );
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, userId));
    if (!user || user.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log("User found:", user);

    if (!Array.isArray(parsedData.children) || parsedData.children.length === 0) {
      return NextResponse.json(
        { message: "Invalid children data: must be a non-empty array" },
        { status: 400 }
      );
    }

    // Check for conflicting slots
    const conflictingBooking = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.scheduledDate, parsedData.scheduledDate),
          eq(usersTable.scheduledTime, parsedData.scheduledTime)
        )
      );

    if (conflictingBooking.length > 0) {
      return NextResponse.json(
        { message: "Slot already booked. Please choose a different time." },
        { status: 400 }
      );
    }

    // Process each child
    for (const child of parsedData.children) {
      const childName = child.name?.trim().toLowerCase() || null;

      if (!childName) {
        return NextResponse.json(
          { message: "Invalid childName: must be non-empty" },
          { status: 400 }
        );
      }

      const childData = {
        childName,
        age: child.age || null,
        gender: child.gender || null,
        connections: child.connections || null,
        details: child.details || null,
        hobbies: child.hobbies || null,
        userId,
      };

      console.log("Cleaned Child Data:", childData);

      const existingChild = await db
        .select()
        .from(childrenTable)
        .where(
          and(eq(childrenTable.userId, userId), eq(childrenTable.childName, childName))
        );

      if (existingChild.length > 0) {
        await db.update(childrenTable).set(childData).where(eq(childrenTable.id, existingChild[0].id));
        console.log(`Child ${childName} updated`);
      } else {
        await db.insert(childrenTable).values(childData).returning();
        console.log(`Child ${childName} inserted`);
      }
    }

    // Update user-related fields
    const userData = {
      callType: parsedData.callType || null,
      scheduledDate: parsedData.scheduledDate || null,
      scheduledTime: parsedData.scheduledTime || null,
      recipientName: parsedData.recipientName || null,
      recipientPhone: parsedData.recipientPhone || null,
    };

    const updatedUser = await db
      .update(usersTable)
      .set(userData)
      .where(eq(usersTable.id, userId))
      .returning();

    console.log("User updated:", updatedUser);

    return NextResponse.json({ message: "Data processed successfully", user: updatedUser[0] });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  }
}