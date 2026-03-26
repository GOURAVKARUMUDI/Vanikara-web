import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const sb = createClient(await cookies());
  const { data: { user } } = await sb.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await sb.from('users').select('*').eq('id', user.id).single();
  const { data: sub } = await sb.from('subscriptions').select('*').eq('user_id', user.id).single();

  return (
    <DashboardClient 
      initialUser={user} 
      initialProfile={profile} 
      initialSub={sub} 
    />
  );
}
