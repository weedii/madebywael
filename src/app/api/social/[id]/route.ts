import { NextRequest, NextResponse } from "next/server";
import { socialDB } from "@/lib/local-db";

// GET /api/social/[id] - Get single social links
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const social = await socialDB.findById(params.id);

    if (!social) {
      return NextResponse.json(
        { error: "Social links not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(social);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

// PUT /api/social/[id] - Update social links
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const social = await socialDB.update(params.id, body);

    if (!social) {
      return NextResponse.json(
        { error: "Social links not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(social);
  } catch (error) {
    console.error("Error updating social links:", error);
    return NextResponse.json(
      { error: "Failed to update social links" },
      { status: 500 }
    );
  }
}

// DELETE /api/social/[id] - Delete social links
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await socialDB.delete(params.id);

    if (!success) {
      return NextResponse.json(
        { error: "Social links not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Social links deleted successfully" });
  } catch (error) {
    console.error("Error deleting social links:", error);
    return NextResponse.json(
      { error: "Failed to delete social links" },
      { status: 500 }
    );
  }
}
