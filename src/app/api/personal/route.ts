import { NextRequest, NextResponse } from "next/server";
import { personalDB } from "@/lib/local-db";

// GET /api/personal - Get personal info
export async function GET() {
  try {
    const personal = await personalDB.findAll();
    return NextResponse.json(personal);
  } catch (error) {
    console.error("Error fetching personal info:", error);
    return NextResponse.json(
      { error: "Failed to fetch personal info" },
      { status: 500 }
    );
  }
}

// POST /api/personal - Create new personal info
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.bio) {
      return NextResponse.json(
        { error: "Name and bio are required" },
        { status: 400 }
      );
    }

    const personal = await personalDB.create(body);
    return NextResponse.json(personal, { status: 201 });
  } catch (error) {
    console.error("Error creating personal info:", error);
    return NextResponse.json(
      { error: "Failed to create personal info" },
      { status: 500 }
    );
  }
}
