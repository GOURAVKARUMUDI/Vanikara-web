import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { isAdmin } from "@/lib/isAdmin";

import CRMOverview from "@/components/admin/CRMOverview";
import LeadsTable from "@/components/admin/LeadsTable";
import ClientsTable from "@/components/admin/ClientsTable";
import PaymentsTable from "@/components/admin/PaymentsTable";
import PackagesManager from "@/components/admin/PackagesManager";

export const metadata = {
  title: "CRM Workspace | Vanikara",
  description: "Advanced CRM for lead-to-client conversion and financial tracking."
};

export default async function AdminPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ tab?: string }> 
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdmin(user.email)) {
    redirect("/dashboard");
  }

  const { tab = "overview" } = await searchParams;

  const tabs = [
    { id: "overview", label: "Dashboard" },
    { id: "leads", label: "Leads" },
    { id: "clients", label: "Clients" },
    { id: "payments", label: "Payments" },
    { id: "packages", label: "Packages" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-1">
              CRM <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-blue-500/20">WORKSPACE</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium tracking-tight uppercase">Vanikara Technology Controller</p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm">
            <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
              {user.email?.[0]}
            </div>
            <div className="text-xs">
               <div className="text-slate-900 font-bold">{user.email}</div>
               <div className="text-slate-500 uppercase tracking-widest font-black text-[8px] mt-0.5">Super Admin</div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-2 mb-10 bg-slate-100/50 p-2 rounded-3xl border border-slate-200 w-fit">
          {tabs.map((t) => (
            <a 
              key={t.id}
              href={`/admin?tab=${t.id}`}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tab === t.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-white"
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>

        {/* Dynamic Content */}
        <main className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {tab === "overview" && (
            <>
              <CRMOverview />

              {/* Founding Team Overview */}
              <div className="mb-12 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
                  Founding Team Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Ideation & Vision</h3>
                    <p className="text-slate-900 font-bold text-lg">Mirayla Giri Charan</p>
                    <p className="text-slate-500 text-sm mt-1">Founding partner focused on vision and idea development.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Technical Execution</h3>
                    <p className="text-slate-900 font-bold text-lg">Gourav Karumudi</p>
                    <p className="text-slate-500 text-sm mt-1">Founding partner focused on development and technical execution.</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Marketing & Growth</h3>
                    <p className="text-slate-900 font-bold text-lg">Chejarala Hari Charan Reddy</p>
                    <p className="text-slate-500 text-sm mt-1">Founding partner focused on marketing, partnerships, and growth.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <LeadsTable />
                <ClientsTable />
              </div>
            </>
          )}

          {tab === "leads" && <LeadsTable />}
          {tab === "clients" && <ClientsTable />}
          {tab === "payments" && <PaymentsTable />}
          {tab === "packages" && <PackagesManager />}
        </main>
      </div>
    </div>
  );
}
