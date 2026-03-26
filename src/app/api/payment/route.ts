import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { supabaseService } from "@/utils/supabase/service";
import crypto from "crypto";
import { apiResponse, logError } from "@/lib/security";

export const dynamic = "force-dynamic";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "dummy",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy",
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, clientId, action } = body;

    if (action === "create") {
      if (!amount || !clientId) {
        return NextResponse.json(apiResponse(false, null, "Missing payment details"), { status: 400 });
      }

      const options = {
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}_${clientId.slice(0, 8)}`,
      };

      const order = await razorpay.orders.create(options);

      await supabaseService.from("payments").insert([{
        client_id: clientId,
        amount: Number(amount),
        status: 'pending',
        razorpay_order_id: order.id
      }]);

      return NextResponse.json(apiResponse(true, order));
    } 
    
    if (action === "verify") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(apiResponse(false, null, "Missing verification data"), { status: 400 });
      }

      const hmacBody = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(hmacBody.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        await supabaseService
          .from("payments")
          .update({ status: 'success', razorpay_payment_id, razorpay_signature, updated_at: new Date().toISOString() })
          .eq("razorpay_order_id", razorpay_order_id);

        const { data: payment } = await supabaseService
          .from("payments")
          .select("client_id")
          .eq("razorpay_order_id", razorpay_order_id)
          .single();

        if (payment) {
          await supabaseService
            .from("clients")
            .update({ payment_status: 'paid' })
            .eq("id", payment.client_id);
        }

        return NextResponse.json(apiResponse(true, { success: true }));
      } else {
        return NextResponse.json(apiResponse(false, null, "Payment verification failed"), { status: 400 });
      }
    }

    return NextResponse.json(apiResponse(false, null, "Invalid action"), { status: 400 });

  } catch (error: any) {
    logError("Payment API", error);
    return NextResponse.json(apiResponse(false, null, "Internal error"), { status: 500 });
  }
}
