import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";
import { validateEmailFormat } from "@/lib/validate_email_formatting";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const isValid = validateEmailFormat(email);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail(email, firstName, lastName, subject, message);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
