import { NextRequest, NextResponse } from "next/server";
import { socialDB } from "@/lib/local-db";

// GET /api/social - Get social links
export async function GET() {
  try {
    const social = await socialDB.findAll();
    return NextResponse.json(social);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

// POST /api/social - Create new social links
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate URL format for provided links
    const urlFields = ["github", "linkedin", "twitter", "instagram"];
    for (const field of urlFields) {
      if (body[field]) {
        try {
          new URL(body[field]);
        } catch {
          return NextResponse.json(
            { error: `Invalid URL format for ${field}` },
            { status: 400 }
          );
        }
      }
    }

    const social = await socialDB.create(body);
    return NextResponse.json(social, { status: 201 });
  } catch (error) {
    console.error("Error creating social links:", error);
    return NextResponse.json(
      { error: "Failed to create social links" },
      { status: 500 }
    );
  }
}
