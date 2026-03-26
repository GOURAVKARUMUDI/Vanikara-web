import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabaseService } from "@/utils/supabase/service";
import { sanitize, isValidEmail, apiResponse, logError, isBot } from "@/lib/security";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message, bot } = body;

    // 1. Bot Protection (Honeypot)
    if (isBot(bot || '')) {
      return NextResponse.json(apiResponse(false, null, "Bot detected"), { status: 400 });
    }

    // 2. Strict Validation
    if (!name || !email || !message) {
      return NextResponse.json(apiResponse(false, null, "Missing required fields"), { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(apiResponse(false, null, "Invalid email format"), { status: 400 });
    }

    // 3. Sanitization
    const sName = sanitize(name).slice(0, 100);
    const sEmail = email.trim().toLowerCase();
    const sMsg = sanitize(message).slice(0, 5000);

    // 4. Persistence
    const { error: dbError } = await supabaseService
      .from("leads")
      .insert([
        { 
          name: sName, 
          email: sEmail, 
          message: sMsg,
          source: 'form',
          status: 'new'
        }
      ]);

    if (dbError) {
      logError("Contact DB", dbError);
      return NextResponse.json(apiResponse(false, null, "Database error"), { status: 500 });
    }

    // 5. Notification (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Vanikara Contact" <${process.env.GMAIL_USER}>`,
      to: "vanikara26@gmail.com",
      subject: `New Lead: ${sName}`,
      text: `Name: ${sName}\nEmail: ${sEmail}\nMessage: ${sMsg}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${sName}</p>
          <p><strong>Email:</strong> ${sEmail}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${sMsg}</div>
        </div>
      `
    });

    return NextResponse.json(apiResponse(true, { message: "Success" }));

  } catch (err) {
    logError("Contact API", err);
    return NextResponse.json(apiResponse(false, null, "Internal error"), { status: 500 });
  }
}
