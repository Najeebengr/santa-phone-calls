import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
    try {
        // Parse the incoming request data
        const parsedData = await req.json();
        console.log("Parsed data:", parsedData);

        const { id } = parsedData;

        if (!id) {
            return NextResponse.json(
                { message: "ID is required" },
                { status: 400 }
            );
        }

        // Check if the user exists in the database
            const user = await db.select().from(usersTable).where(eq(usersTable.id, id));

        if (!user || user.length === 0) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Create a session using the user's information
        const session = JSON.stringify(user[0]); // Assume user[0] is the matching user
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiry
        const cookieStore = cookies();

        (await cookieStore).set("session", session, {
            expires,
            httpOnly: true,
        });

        return NextResponse.json({
            message: "Welcome Back, Let's Proceed",
            user: user[0], // Return user info for client reference
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
        console.error("An error occurred:", error);

        // Handle unique constraint violation or other known errors
        if ("code" in error && error.code === "23505") {
            return NextResponse.json(
                { message: "Already exists, Use Emailed Link to step forward" },
                { status: 400 }
            );
        }

        // Catch-all for unexpected errors
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
}