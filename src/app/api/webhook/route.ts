import { headers, cookies } from "next/headers";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { s } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.text();
  const h = await headers();
  const sig = h.get("stripe-signature") as string;

  if (!s || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  let event;

  try {
    event = s.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const sb = createClient(await cookies());

    const { error } = await sb
      .from('subscriptions')
      .upsert({
        user_id: session.client_reference_id || session.metadata?.user_id,
        plan: 'pro',
        status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      });

    if (error) {
      console.error('Error saving subscription:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Payment success:", session.customer_email);
  }

  return NextResponse.json({ received: true });
}
