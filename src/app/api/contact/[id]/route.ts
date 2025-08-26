import { NextRequest, NextResponse } from "next/server";
import { contactDB } from "@/lib/local-db";

// GET /api/contact/[id] - Get single contact info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contact = await contactDB.findById(params.id);

    if (!contact) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

// PUT /api/contact/[id] - Update contact info
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const contact = await contactDB.update(params.id, body);

    if (!contact) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact info
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await contactDB.delete(params.id);

    if (!success) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Contact info deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact info:", error);
    return NextResponse.json(
      { error: "Failed to delete contact info" },
      { status: 500 }
    );
  }
}
