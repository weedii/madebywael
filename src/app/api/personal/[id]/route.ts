import { NextRequest, NextResponse } from "next/server";
import { personalDB } from "@/lib/local-db";

// GET /api/personal/[id] - Get single personal info
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const personal = await personalDB.findById(params.id);

    if (!personal) {
      return NextResponse.json(
        { error: "Personal info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(personal);
  } catch (error) {
    console.error("Error fetching personal info:", error);
    return NextResponse.json(
      { error: "Failed to fetch personal info" },
      { status: 500 }
    );
  }
}

// PUT /api/personal/[id] - Update personal info
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.bio) {
      return NextResponse.json(
        { error: "Name and bio are required" },
        { status: 400 }
      );
    }

    const personal = await personalDB.update(params.id, body);

    if (!personal) {
      return NextResponse.json(
        { error: "Personal info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(personal);
  } catch (error) {
    console.error("Error updating personal info:", error);
    return NextResponse.json(
      { error: "Failed to update personal info" },
      { status: 500 }
    );
  }
}

// DELETE /api/personal/[id] - Delete personal info
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await personalDB.delete(params.id);

    if (!success) {
      return NextResponse.json(
        { error: "Personal info not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Personal info deleted successfully" });
  } catch (error) {
    console.error("Error deleting personal info:", error);
    return NextResponse.json(
      { error: "Failed to delete personal info" },
      { status: 500 }
    );
  }
}
