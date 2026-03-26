"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Compass, 
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function DashboardClient({ initialUser, initialProfile, initialSub }: any) {
  const [user, setUser] = useState(initialUser);
  const [sub, setSub] = useState(initialSub);
  const [upgrading, setUpgrading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const getTrialDays = () => {
    if (!sub?.trial_end) return 0;
    const diff = new Date(sub.trial_end).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);
      const res = await fetch('/api/payment/dummy', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setSub(json.data);
        alert("Payment successful! You are now a PRO member (Demo).");
      }
    } catch (err) {
      console.error("Upgrade failed:", err);
    } finally {
      setUpgrading(false);
    }
  };

  const trialDays = getTrialDays();
  const isExpired = sub?.plan === 'free' && trialDays <= 0;

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-blue-600/10">
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 ${sub?.plan === 'pro' ? 'bg-indigo-600 text-white' : 'bg-blue-600/10 text-blue-600'} text-[10px] font-black uppercase tracking-widest rounded-full border ${sub?.plan === 'pro' ? 'border-indigo-700' : 'border-blue-600/20'} shadow-sm`}>
                  {sub?.plan?.toUpperCase() || 'FREE'} PLAN
                </span>
                {sub?.plan === 'free' && (
                  <span className={`px-3 py-1 ${isExpired ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'} text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm`}>
                    {isExpired ? 'TRIAL EXPIRED' : `${trialDays} DAYS LEFT`}
                  </span>
                )}
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">{user.email?.split('@')[0]}</span>
              </h1>
              <p className="text-slate-500 font-medium tracking-tight">Access your premium Vanikara tools and insights.</p>
            </div>
          </div>
        </div>

        {/* Quick Stats / Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="p-6 bg-white border border-slate-200 rounded-3xl relative overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="p-4 bg-green-50 text-green-600 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Account Status</p>
              <h3 className="text-lg font-bold text-slate-900 truncate">Verified Portal</h3>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-3xl relative overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="p-4 bg-blue-50 text-blue-600 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Plan</p>
              <h3 className="text-lg font-bold text-slate-900 truncate">{sub?.plan === 'pro' ? 'Premium (Pro)' : 'Starter (Free)'}</h3>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-3xl relative overflow-hidden group hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
              <div className="p-4 bg-indigo-50 text-indigo-600 w-fit rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Trial Status</p>
              <h3 className="text-lg font-bold text-slate-900 truncate">{sub?.plan === 'pro' ? 'Unlimited' : `${trialDays} Days Remaining`}</h3>
            </div>
        </div>

        {/* Subscription / Plan Card */}
        {sub?.plan === 'free' && (
        <div className={`mb-12 p-8 ${isExpired ? 'bg-slate-900' : 'bg-gradient-to-r from-blue-600 to-indigo-700'} rounded-3xl text-white shadow-xl shadow-blue-600/20 relative overflow-hidden`}>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
               <h2 className="text-2xl font-black mb-2 tracking-tight uppercase">
                 {isExpired ? 'Trial Period Ended' : 'Upgrade to Premium'}
               </h2>
               <p className="text-blue-100 font-medium opacity-80">
                 {isExpired ? 'Your 16-day trial has passed. Upgrade now to keep accessing your tools.' : 'Unlock advanced AI tools, priority support, and infinite storage.'}
               </p>
            </div>
            <button 
              onClick={handleUpgrade}
              disabled={upgrading}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
            >
              {upgrading ? 'Upgrading...' : 'Upgrade to Pro (Demo)'}
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32"></div>
        </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Services Section */}
          <section>
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-slate-900 uppercase tracking-tight">
              <Sparkles className="w-5 h-5 text-blue-600" /> Premium Services
            </h2>
            <div className="space-y-4">
              {[
                { title: "AI Assistant", desc: "Interact with our advanced AI to boost your productivity.", icon: Compass, href: "/ai" },
                { title: "Settings", desc: "Manage your account preferences and security settings.", icon: Settings, href: "/settings" },
                { title: "Help Center", desc: "Need assistance? Our support team is here to help you 24/7.", icon: HelpCircle, href: "/contact" },
              ].map((item) => (
                <button 
                  key={item.title} 
                  onClick={() => router.push(item.href || "#")}
                  className="w-full p-6 bg-white border border-slate-200 rounded-3xl flex items-center justify-between group hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-2xl text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-600/10 transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-sm">{item.title}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </section>

          {/* User Profile Card */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/20">
                  {user.email?.[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">{user.email?.split('@')[0]}</h3>
                  <p className="text-slate-500 text-sm font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl mb-8">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Security Health</span>
                  <span className="text-blue-600 font-black text-[10px] uppercase">Excellent</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-2xl transition-all font-black uppercase tracking-widest text-xs border border-slate-200 hover:border-red-200"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
