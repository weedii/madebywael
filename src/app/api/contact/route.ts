import { NextRequest, NextResponse } from "next/server";
import { contactDB } from "@/lib/local-db";

// GET /api/contact - Get contact info
export async function GET() {
  try {
    const contact = await contactDB.findAll();
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact info
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const contact = await contactDB.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("Error creating contact info:", error);
    return NextResponse.json(
      { error: "Failed to create contact info" },
      { status: 500 }
    );
  }
}
