export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { sanitize, apiResponse, logError } from "@/lib/security";

export async function POST(req: Request) {
  try {
    const sb = createClient(await cookies());
    const { data: { user } } = await sb.auth.getUser();

    if (!user) return NextResponse.json(apiResponse(false, null, "Unauthorized"), { status: 401 });

    if (!openai) {
      logError("AI Config", "OpenAI not configured");
      return NextResponse.json(apiResponse(false, null, "AI not configured"), { status: 500 });
    }

    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json(apiResponse(false, null, "Prompt required"), { status: 400 });

    const sPrompt = sanitize(prompt).slice(0, 2000);

    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: sPrompt }],
    });

    const reply = res.choices[0].message.content || 'No response';

    await sb.from('ai_logs').insert({
      user_id: user.id,
      prompt: sPrompt,
      response: reply,
    });

    return NextResponse.json(apiResponse(true, { reply }));
  } catch (e: any) {
    logError("AI API", e);
    return NextResponse.json(apiResponse(false, null, "Internal error"), { status: 500 });
  }
}
