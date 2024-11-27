import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("session")?.value;
    const sessionData = JSON.parse(authToken || '{}');
    return NextResponse.json({user: sessionData});
}   