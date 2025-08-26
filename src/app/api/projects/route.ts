import { NextRequest, NextResponse } from "next/server";
import { projectDB } from "@/lib/local-db";

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = await projectDB.findAll();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
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

    // Set publishedAt if published is true
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date().toISOString();
    }

    const project = await projectDB.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
