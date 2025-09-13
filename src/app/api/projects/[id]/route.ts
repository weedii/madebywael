import { NextRequest, NextResponse } from "next/server";
import { projectDB } from "@/lib/mongodb";

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await projectDB.findById(params.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Handle publishedAt field
    if (body.published) {
      // If switching to published and no publishedAt exists, set it now
      const existingProject = await projectDB.findById(params.id);
      if (existingProject && !existingProject.publishedAt) {
        body.publishedAt = new Date().toISOString();
      }
    } else {
      // If unpublishing, remove publishedAt
      body.publishedAt = null;
    }

    const project = await projectDB.update(params.id, body);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await projectDB.delete(params.id);

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
