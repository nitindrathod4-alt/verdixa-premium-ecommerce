create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price integer not null check (price >= 0),
  compare_at_price integer check (compare_at_price is null or compare_at_price >= price),
  unit text,
  category text,
  inventory integer not null default 0,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  email text,
  address text not null,
  pin_code text not null,
  payment_method text not null check (payment_method in ('prepaid','cod')),
  payment_status text not null default 'pending',
  fulfillment_status text not null default 'pending',
  subtotal integer not null,
  shipping integer not null,
  cod_fee integer not null default 0,
  total integer not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_slug text not null,
  product_name text not null,
  unit_price integer not null,
  quantity integer not null check (quantity > 0),
  line_total integer not null
);

alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "public can read active products"
on products for select
using (active = true);

insert into products (slug,name,description,price,compare_at_price,unit,category,inventory)
values
('pure-moringa-powder','Pure Moringa Powder','Pure botanical moringa powder for a simple daily wellness ritual.',299,null,'100 G','Powders',50),
('hibiscus-herbal-infusion','Hibiscus Herbal Infusion','A floral herbal infusion crafted for a slow, considered pause.',549,699,'30 PYRAMID BAGS','Infusions',40),
('butterfly-pea-blue-tea','Butterfly Pea Blue Tea','A delicate botanical tea for beautiful everyday rituals.',579,799,'30 PYRAMID BAGS','Tea',35)
on conflict (slug) do update set
name=excluded.name, description=excluded.description, price=excluded.price,
compare_at_price=excluded.compare_at_price, unit=excluded.unit, category=excluded.category;
