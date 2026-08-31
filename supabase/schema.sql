-- ============================================================
-- Puerto Fjord v2 — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. User roles (admin / owner)
create table if not exists pf_user_roles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  role        text check (role in ('admin','owner')) not null,
  created_at  timestamptz default now()
);
alter table pf_user_roles enable row level security;
create policy "Users read own role" on pf_user_roles for select using (auth.uid() = user_id);
create policy "Admins read all roles" on pf_user_roles for select using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);

-- 2. Properties
create table if not exists pf_properties (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text unique not null,
  guests_max    int,
  bedrooms      int,
  rate_from_usd numeric(10,2),
  owner_user_id uuid references auth.users(id),
  active        boolean default true,
  created_at    timestamptz default now()
);
alter table pf_properties enable row level security;
-- Public can read active properties
create policy "Public read active properties" on pf_properties for select using (active = true);
-- Owners read their own
create policy "Owners read own property" on pf_properties for select using (owner_user_id = auth.uid());
-- Admins full access
create policy "Admins all" on pf_properties using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);

-- 3. Insert the 5 houses
insert into pf_properties (name, slug, guests_max, bedrooms, rate_from_usd) values
  ('Nest House',     'nest',     6,  2, 2042.00),
  ('The Cliff House','cliff',    9,  3, 2000.00),
  ('Icefield House', 'icefield', 10, 4, 2500.00),
  ('The Loft',       'loft',     4,  2, 894.00),
  ('The Woods',      'woods',    6,  2, 715.00)
on conflict (slug) do nothing;

-- 4. Reservations
create table if not exists pf_reservations (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid references pf_properties(id) not null,
  guest_name    text not null,
  guest_email   text,
  check_in      date not null,
  check_out     date not null,
  nights        int generated always as (check_out - check_in) stored,
  guests        int,
  total_usd     numeric(10,2),
  status        text check (status in ('pending','confirmed','cancelled')) default 'pending',
  notes         text,
  created_at    timestamptz default now()
);
alter table pf_reservations enable row level security;
-- Owners read reservations of their properties
create policy "Owners read own reservations" on pf_reservations for select using (
  exists (
    select 1 from pf_properties
    where id = pf_reservations.property_id
    and owner_user_id = auth.uid()
  )
);
-- Admins full access
create policy "Admins all reservations" on pf_reservations using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);

-- 5. Blocked dates (maintenance, owner use, etc.)
create table if not exists pf_blocked_dates (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid references pf_properties(id) not null,
  date_from   date not null,
  date_to     date not null,
  reason      text,
  created_at  timestamptz default now()
);
alter table pf_blocked_dates enable row level security;
create policy "Public read blocked dates" on pf_blocked_dates for select using (true);
create policy "Admins manage blocked dates" on pf_blocked_dates using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);

-- 6. Contact messages
create table if not exists pf_contact_messages (
  id            uuid primary key default gen_random_uuid(),
  first_name    text,
  last_name     text,
  email         text not null,
  enquiry_type  text,
  guests        int,
  season        text,
  message       text,
  notify_email  text default 'gustavo@puertofjord.com',
  read          boolean default false,
  created_at    timestamptz default now()
);
alter table pf_contact_messages enable row level security;
-- Anyone can insert (public form)
create policy "Public insert messages" on pf_contact_messages for insert with check (true);
-- Admins read all
create policy "Admins read messages" on pf_contact_messages for select using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);
create policy "Admins update messages" on pf_contact_messages for update using (
  exists (select 1 from pf_user_roles where user_id = auth.uid() and role = 'admin')
);

-- ============================================================
-- After running this SQL:
-- 1. Go to Supabase → Authentication → Users
-- 2. Create a user for each owner and for the admin
-- 3. Run: INSERT INTO pf_user_roles (user_id, role) VALUES ('<uuid>', 'admin');
--    and:  INSERT INTO pf_user_roles (user_id, role) VALUES ('<uuid>', 'owner');
-- 4. For the owner with 2 houses (Icefield + Loft), update pf_properties:
--    UPDATE pf_properties SET owner_user_id = '<owner_uuid>' WHERE slug IN ('icefield','loft');
-- ============================================================
