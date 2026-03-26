export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseService } from "@/utils/supabase/service";
import { isAdmin } from "@/lib/isAdmin";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { apiResponse, logError } from "@/lib/security";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json(apiResponse(false, null, "Unauthorized"), { status: 401 });
    }

    // 1. Total Leads
    const { count: totalLeads } = await supabaseService
      .from("leads")
      .select("*", { count: "exact", head: true });

    // 2. Converted Leads
    const { count: convertedLeads } = await supabaseService
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("status", "converted");

    // 3. Total Clients
    const { count: totalClients } = await supabaseService
      .from("clients")
      .select("*", { count: "exact", head: true });

    // 4. Total Revenue
    const { data: payments } = await supabaseService
      .from("payments")
      .select("amount")
      .eq("status", "success");

    const totalRevenue = payments?.reduce((acc: any, curr: any) => acc + (Number(curr.amount) || 0), 0) || 0;

    // 5. Conversion Rate
    const conversionRate = totalLeads ? ((convertedLeads || 0) / totalLeads) * 100 : 0;

    // 6. Chart Data: Leads Over Time
    const { data: leadsHistory } = await supabaseService
      .from("leads")
      .select("created_at")
      .order("created_at", { ascending: true });

    const leadsOverTime = Object.values((leadsHistory || []).reduce((acc: any, lead: any) => {
      const date = new Date(lead.created_at).toLocaleDateString();
      acc[date] = { date, count: (acc[date]?.count || 0) + 1 };
      return acc;
    }, {}));

    // 7. Conversion Data
    const { data: statusCounts } = await supabaseService
      .from("leads")
      .select("status");

    const conversionData = Object.values((statusCounts || []).reduce((acc: any, lead: any) => {
      const name = lead.status.toUpperCase();
      acc[name] = { name, value: (acc[name]?.value || 0) + 1 };
      return acc;
    }, {}));

    return NextResponse.json(apiResponse(true, {
        totalLeads: totalLeads || 0,
        convertedLeads: convertedLeads || 0,
        totalClients: totalClients || 0,
        totalRevenue,
        conversionRate: conversionRate.toFixed(2),
        leadsOverTime: leadsOverTime.slice(-7),
        revenueByMonth: [], 
        conversionData
    }));

  } catch (error: any) {
    logError("Stats GET", error);
    return NextResponse.json(apiResponse(false, null, "Internal error"), { status: 500 });
  }
}
