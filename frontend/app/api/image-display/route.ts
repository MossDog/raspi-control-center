import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // TODO: Implement image processing and call Python script
    return NextResponse.json({ success: true });
}
