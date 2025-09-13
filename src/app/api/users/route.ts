import { NextRequest, NextResponse } from "next/server";
import { userDB, User } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await userDB.findAll();
    // Remove password from response
    const safeUsers = users.map(({ password, ...user }) => user);
    return NextResponse.json(safeUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.password || !body.fullName) {
      return NextResponse.json(
        { error: "Email, password, and full name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userDB.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Create user with default values
    const userData = {
      email: body.email,
      password: hashedPassword,
      role: body.role || "admin",
      fullName: body.fullName,
      publicEmail: body.publicEmail || body.email,
      phoneNumber: body.phoneNumber || "",
      location: body.location || "",
      profilePicture: body.profilePicture || "/me.jpg",
      bio: body.bio || "",
      githubUrl: body.githubUrl || "",
      linkedinUrl: body.linkedinUrl || "",
      xUrl: body.xUrl || "",
    };

    const user = await userDB.create(userData);

    // Remove password from response
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
