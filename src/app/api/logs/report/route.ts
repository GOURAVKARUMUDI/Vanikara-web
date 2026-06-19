import { NextResponse } from "next/server";
import { logError } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { level, message, error, context } = payload;

    // Structured server log entry matching logError format
    logError(`Client-Side [${level || "ERROR"}]`, {
      message: message || "Unhandled client-side exception",
      stack: error?.stack || "No client-side stack trace provided",
    }, {
      errorType: "CLIENT_ERROR",
      statusCode: 500,
      ...context,
      clientErrorMessage: error?.message,
    } as any);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
