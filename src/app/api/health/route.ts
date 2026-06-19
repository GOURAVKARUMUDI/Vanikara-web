import { NextResponse } from "next/server";
import { supabaseService } from "@/utils/supabase/service";
import nodemailer from "nodemailer";
import { logError } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET() {
  const status: Record<string, any> = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      database: "healthy",
      openai: "healthy",
      email: "healthy"
    }
  };

  let hasError = false;

  // 1. Check Database connectivity via Supabase service client
  try {
    const { error } = await supabaseService.from("leads").select("id").limit(1);
    if (error) {
      status.services.database = `unhealthy: ${error.message}`;
      hasError = true;
    }
  } catch (err: any) {
    status.services.database = `unhealthy: ${err.message}`;
    hasError = true;
  }

  // 2. Check OpenAI configuration credentials
  if (!process.env.OPENAI_API_KEY) {
    status.services.openai = "unhealthy: OPENAI_API_KEY is not configured";
    hasError = true;
  } else if (!process.env.OPENAI_API_KEY.startsWith("sk-")) {
    status.services.openai = "unhealthy: OPENAI_API_KEY has an invalid key format";
    hasError = true;
  }

  // 3. Check Nodemailer SMTP gmail configuration
  if (process.env.CYGMA_MOCK_AI === "true") {
    status.services.email = "healthy (mocked)";
  } else if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    status.services.email = "unhealthy: Gmail authentication environment variables not configured";
    hasError = true;
  } else {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });
      // Verifies connection configuration and SMTP credentials
      await transporter.verify();
    } catch (err: any) {
      status.services.email = `unhealthy: SMTP verification failed - ${err.message}`;
      hasError = true;
    }
  }

  if (hasError) {
    status.status = "unhealthy";
    logError("Health Check", "System health check degraded", { errorType: "health_degraded" });
    return NextResponse.json(status, { status: 500 });
  }

  return NextResponse.json(status, { status: 200 });
}
