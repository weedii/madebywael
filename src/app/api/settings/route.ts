import { NextRequest, NextResponse } from "next/server";
import { settingsDB } from "@/lib/mongodb";

// GET /api/settings - Get site settings
export async function GET() {
  try {
    const settings = await settingsDB.findAll();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create new settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const settings = await settingsDB.create(body);
    return NextResponse.json(settings, { status: 201 });
  } catch (error) {
    console.error("Error creating settings:", error);
    return NextResponse.json(
      { error: "Failed to create settings" },
      { status: 500 }
    );
  }
}
