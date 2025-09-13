import { NextRequest, NextResponse } from "next/server";
import { blogDB } from "@/lib/mongodb";

// GET /api/blogs/[id] - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await blogDB.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Handle publishedAt field
    if (body.published) {
      // If switching to published and no publishedAt exists, set it now
      const existingBlog = await blogDB.findById(params.id);
      if (existingBlog && !existingBlog.publishedAt) {
        body.publishedAt = new Date().toISOString();
      }
    } else {
      // If unpublishing, remove publishedAt
      body.publishedAt = null;
    }

    const blog = await blogDB.update(params.id, body);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);

    // Handle unique constraint errors
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await blogDB.delete(params.id);

    if (!success) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
