-- CRM Tables for Vanikara

-- 1. Leads Table (Extending/Creating)
create table if not exists public.leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text,
  source text default 'form', -- form, whatsapp, gmail
  status text default 'new', -- new, contacted, converted, lost
  assigned_to uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Packages Table
create table if not exists public.packages (
  id uuid default gen_random_uuid() primary key,
  name text not null unique, -- basic, standard, premium
  price numeric not null,
  features jsonb default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Insert default packages
insert into public.packages (name, price, features)
values 
  ('basic', 5000, '["1 Page", "Contact Form", "Standard SEO"]'),
  ('standard', 15000, '["5 Pages", "Blog Setup", "Basic E-commerce"]'),
  ('premium', 30000, '["Unlimited Pages", "Custom Dashboard", "Advanced SEO"]')
on conflict (name) do nothing;

-- 3. Clients Table
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  phone text,
  project_status text default 'pending', -- pending, ongoing, completed
  package_id uuid references public.packages(id),
  amount numeric not null,
  payment_status text default 'pending', -- pending, paid
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Payments Table (Razorpay Integration)
create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.clients(id),
  amount numeric not null,
  currency text default 'INR',
  status text default 'pending', -- pending, success, failed
  method text default 'razorpay',
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Optional, but recommended. Admin bypasses via service role anyway)
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.payments enable row level security;
alter table public.packages enable row level security;
