-- Create subscriptions table
create table if not exists public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null unique,
  plan text default 'free', -- free, pro
  trial_start timestamp with time zone default timezone('utc'::text, now()) not null,
  trial_end timestamp with time zone not null,
  status text default 'active', -- active, expired
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.subscriptions enable row level security;
-- No policies needed for admin service role, but for users:
create policy "Users can view their own subscription" 
  on public.subscriptions for select 
  using (auth.uid() = user_id);
