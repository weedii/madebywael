import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const createEmailTemplate = (
  firstName: string,
  lastName: string,
  email: string,
  subject: string,
  message: string
) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #1a1a1a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgb(21, 128, 61) 0%, rgb(16, 102, 48) 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
            New Contact Message
          </h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
            You have received a new message from your portfolio website
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">
          
          <!-- Contact Info Card -->
          <div style="background-color: #262626; border-left: 4px solid rgb(21, 128, 61); padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
              Contact Information
            </h2>
            <div style="margin-bottom: 10px;">
              <span style="color: rgb(21, 128, 61); font-weight: 600; display: inline-block; width: 80px;">Name:</span>
              <span style="color: #e5e5e5; font-weight: 500;">${firstName} ${lastName}</span>
            </div>
            <div style="margin-bottom: 10px;">
              <span style="color: rgb(21, 128, 61); font-weight: 600; display: inline-block; width: 80px;">Email:</span>
              <a href="mailto:${email}" style="color: #e5e5e5; text-decoration: none; font-weight: 500; border-bottom: 1px solid rgba(21, 128, 61, 0.5); transition: border-color 0.3s ease;">${email}</a>
            </div>
            <div>
              <span style="color: rgb(21, 128, 61); font-weight: 600; display: inline-block; width: 80px;">Subject:</span>
              <span style="color: #e5e5e5; font-weight: 500;">${subject}</span>
            </div>
          </div>

          <!-- Message Content -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px; font-weight: 600; border-bottom: 2px solid rgb(21, 128, 61); padding-bottom: 8px; display: inline-block;">
              Message
            </h3>
            <div style="background-color: #2a2a2a; border: 1px solid rgba(21, 128, 61, 0.3); border-radius: 8px; padding: 20px; color: #e5e5e5; font-size: 16px; line-height: 1.7;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>

          <!-- Call to Action -->
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
               style="display: inline-block; background: linear-gradient(135deg, rgb(21, 128, 61) 0%, rgb(16, 102, 48) 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 2px 4px rgba(21, 128, 61, 0.4);">
              Reply to ${firstName}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #000000; padding: 20px 30px; text-align: center;">
          <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 14px;">
            This message was sent from your portfolio contact form
          </p>
          <p style="color: rgba(255, 255, 255, 0.5); margin: 5px 0 0 0; font-size: 12px;">
            ${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendEmail = async (
  from: string,
  firstName: string,
  lastName: string,
  subject: string,
  message: string
) => {
  const htmlTemplate = createEmailTemplate(
    firstName,
    lastName,
    from,
    subject,
    message
  );

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // Resend's default verified domain because I don't have my own verified domain change this ki twali korza
      replyTo: from, // User's email for easy replies
      to: process.env.MY_EMAIL!,
      subject: `New Contact: ${subject}`,
      html: htmlTemplate,
    });

    console.log("Resend API response:", result);
    return result;
  } catch (error) {
    console.error("Resend API error:", error);
    throw error;
  }
};
