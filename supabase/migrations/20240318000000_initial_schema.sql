-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  name text not null,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  items jsonb not null,
  total decimal(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up row level security (RLS)
alter table profiles enable row level security;
alter table orders enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Orders policies
create policy "Users can view their own orders"
  on orders for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own orders"
  on orders for insert
  with check ( auth.uid() = user_id );

create policy "Admin users can view all orders"
  on orders for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Admin users can update all orders"
  on orders for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );