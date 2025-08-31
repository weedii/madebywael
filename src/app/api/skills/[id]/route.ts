import { NextRequest, NextResponse } from "next/server";
import { skillsDB } from "@/lib/local-db";

// GET /api/skills/[id] - Get single skills
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skills = await skillsDB.findById(params.id);

    if (!skills) {
      return NextResponse.json({ error: "Skills not found" }, { status: 404 });
    }

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// PUT /api/skills/[id] - Update skills
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.languages || !body.frameworksAndStack || !body.toolsAndServices) {
      return NextResponse.json(
        {
          error: "Languages, frameworks/stack, and tools/services are required",
        },
        { status: 400 }
      );
    }

    const skills = await skillsDB.update(params.id, body);

    if (!skills) {
      return NextResponse.json({ error: "Skills not found" }, { status: 404 });
    }

    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] - Delete skills
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await skillsDB.delete(params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Skills not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Skills deleted successfully" });
  } catch (error) {
    console.error("Error deleting skills:", error);
    return NextResponse.json(
      { error: "Failed to delete skills" },
      { status: 500 }
    );
  }
}
