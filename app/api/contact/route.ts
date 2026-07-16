import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Server misconfigured. Please contact the site owner." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { name, contact, email } = await req.json();

    if (!name || !contact || !email) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const receiver = process.env.CONTACT_RECEIVER_EMAIL;
    if (!receiver) {
      console.error("CONTACT_RECEIVER_EMAIL is not set");
      return NextResponse.json(
        { error: "Server misconfigured. Please contact the site owner." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "FinTech & Data Chat <onboarding@resend.dev>",
      to: receiver,
      replyTo: email,
      subject: `New Express Interest: ${name}`,
      html: `
        <h2>New Express Interest Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}