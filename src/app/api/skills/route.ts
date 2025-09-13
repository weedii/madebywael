import { NextRequest, NextResponse } from "next/server";
import { skillsDB, Skills } from "@/lib/mongodb";

// GET /api/skills - Get skills
export async function GET() {
  try {
    const skills = await skillsDB.findAll();
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// POST /api/skills - Add skill to category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, skill } = body;

    // Validate required fields
    if (!category || !skill) {
      return NextResponse.json(
        { error: "Category and skill are required" },
        { status: 400 }
      );
    }

    if (
      !["languages", "frameworksAndStack", "toolsAndServices"].includes(
        category
      )
    ) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Get existing skills or create default structure
    let skillsData = await skillsDB.findAll();
    let mainSkills;

    if (skillsData.length === 0) {
      // Create initial skills object
      mainSkills = await skillsDB.create({
        languages: [],
        frameworksAndStack: [],
        toolsAndServices: [],
      });
    } else {
      mainSkills = skillsData[0];
    }

    // Add skill to category if not already exists
    const currentSkills =
      (mainSkills[category as keyof Skills] as string[]) || [];
    if (!currentSkills.includes(skill)) {
      currentSkills.push(skill);
      (mainSkills as any)[category] = currentSkills;

      // Update the skills object
      await skillsDB.update(mainSkills.id, mainSkills);
    }

    return NextResponse.json(mainSkills, { status: 200 });
  } catch (error) {
    console.error("Error adding skill:", error);
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

// DELETE /api/skills - Remove skill from category
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, skill } = body;

    // Validate required fields
    if (!category || !skill) {
      return NextResponse.json(
        { error: "Category and skill are required" },
        { status: 400 }
      );
    }

    if (
      !["languages", "frameworksAndStack", "toolsAndServices"].includes(
        category
      )
    ) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Get existing skills
    const skillsData = await skillsDB.findAll();
    if (skillsData.length === 0) {
      return NextResponse.json({ error: "No skills found" }, { status: 404 });
    }

    const mainSkills = skillsData[0];
    const currentSkills =
      (mainSkills[category as keyof Skills] as string[]) || [];
    const skillIndex = currentSkills.indexOf(skill);

    if (skillIndex > -1) {
      currentSkills.splice(skillIndex, 1);
      (mainSkills as any)[category] = currentSkills;

      // Update the skills object
      await skillsDB.update(mainSkills.id, mainSkills);
    }

    return NextResponse.json(mainSkills, { status: 200 });
  } catch (error) {
    console.error("Error removing skill:", error);
    return NextResponse.json(
      { error: "Failed to remove skill" },
      { status: 500 }
    );
  }
}
