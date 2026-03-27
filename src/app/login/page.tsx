"use client";

import { GoogleLogin } from '@/components/auth/GoogleLogin';
import { useAuthRedirect } from '@/lib/authRedirect';

export default function LoginPage() {
  useAuthRedirect();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md p-10 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-blue-900/5 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -mr-16 -mt-16"></div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back</h1>
        <p className="text-slate-500 mb-10 font-medium">Sign in to access your VANIKARA INTELLIGENCE dashboard</p>
        <div className="flex justify-center flex-col items-center">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
