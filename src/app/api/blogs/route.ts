import { NextRequest, NextResponse } from "next/server";
import { blogDB } from "@/lib/mongodb";

// GET /api/blogs - Get all blogs
export async function GET() {
  try {
    const blogs = await blogDB.findAll();
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Auto-generate excerpt if not provided
    if (!body.excerpt) {
      const plainText = body.content.replace(/[#*`\n]/g, " ").trim();
      body.excerpt =
        plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
    }

    // Set publishedAt if published is true
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date().toISOString();
    }

    const blog = await blogDB.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
