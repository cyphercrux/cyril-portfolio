import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY environment variable is not configured.");
      return NextResponse.json(
        {
          error: "Email service is temporarily unconfigured. Please configure RESEND_API_KEY or email cyrilwilliam2003@gmail.com directly.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["cyrilwilliam2003@gmail.com"],
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #09090b; color: #f4f4f5; border-radius: 8px; border: 1px solid #27272a;">
          <h2 style="margin-top: 0; color: #c6ff00; font-size: 20px;">New Message from Portfolio Website</h2>
          <p style="margin: 12px 0; color: #a1a1aa; font-size: 15px;">
            <strong style="color: #ffffff;">Sender:</strong> ${name} (<a href="mailto:${email}" style="color: #c6ff00; text-decoration: none;">${email}</a>)
          </p>
          <div style="margin-top: 20px; padding: 16px; background: #18181b; border-radius: 6px; border-left: 3px solid #7c3aed;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #e4e4e7;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #71717a;">
            Sent from Cyril William's Portfolio Contact Form &bull; Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error while sending email.";
    console.error("Contact API route exception:", err);
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}

