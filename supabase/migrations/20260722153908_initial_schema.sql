create extension if not exists pgcrypto;

create type public.content_status as enum ('draft','review','published','archived');
create type public.admin_role as enum ('admin','editor');
create type public.contact_status as enum ('new','in_progress','closed','deleted');

create table public.practice_areas(id uuid primary key default gen_random_uuid(),slug text unique not null,name text not null,description text not null,content_markdown text not null default '',icon text,is_published boolean not null default false,sort_order int not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.team_members(id uuid primary key default gen_random_uuid(),slug text unique not null,name text not null,role text not null,practice_area text not null,oab_placeholder text not null,image_path text,is_published boolean not null default false,sort_order int not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.articles(id uuid primary key default gen_random_uuid(),slug text unique not null,category text not null,title text not null,summary text not null,body_markdown text not null,author_name text not null,status public.content_status not null default 'draft',published_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.faq_items(id uuid primary key default gen_random_uuid(),question text not null,answer text not null,category text not null,is_published boolean not null default false,sort_order int not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.site_settings(id uuid primary key default gen_random_uuid(),key text unique not null,value jsonb not null default '{}'::jsonb,is_critical boolean not null default false,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.contact_submissions(id uuid primary key default gen_random_uuid(),public_id text unique not null,name text not null check(char_length(name)<=120),email text not null check(char_length(email)<=254),phone text not null check(char_length(phone)<=24),subject text not null,message text not null check(char_length(message)<=2000),privacy_accepted boolean not null,policy_version text not null,status public.contact_status not null default 'new',ip_hash text,user_agent_hash text,deleted_at timestamptz,retention_review_at timestamptz not null default(now()+interval '180 days'),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.admin_profiles(id uuid primary key references auth.users(id) on delete restrict,full_name text not null,role public.admin_role not null default 'editor',is_active boolean not null default true,last_login_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.audit_logs(id uuid primary key default gen_random_uuid(),actor_id uuid references auth.users(id) on delete set null,action text not null,entity_type text not null,entity_id uuid,metadata jsonb not null default '{}'::jsonb,created_at timestamptz not null default now());

create index contact_status_created_idx on public.contact_submissions(status,created_at desc);
create index articles_status_published_idx on public.articles(status,published_at desc);
create index audit_actor_created_idx on public.audit_logs(actor_id,created_at desc);

create or replace function public.is_active_staff() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from public.admin_profiles p where p.id=(select auth.uid()) and p.is_active)$$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$select exists(select 1 from public.admin_profiles p where p.id=(select auth.uid()) and p.is_active and p.role='admin')$$;
revoke all on function public.is_active_staff() from public;revoke all on function public.is_admin() from public;grant execute on function public.is_active_staff(),public.is_admin() to authenticated;

alter table public.practice_areas enable row level security;alter table public.team_members enable row level security;alter table public.articles enable row level security;alter table public.faq_items enable row level security;alter table public.site_settings enable row level security;alter table public.contact_submissions enable row level security;alter table public.admin_profiles enable row level security;alter table public.audit_logs enable row level security;

create policy "published areas are public" on public.practice_areas for select to anon,authenticated using(is_published=true or public.is_active_staff());
create policy "published team is public" on public.team_members for select to anon,authenticated using(is_published=true or public.is_active_staff());
create policy "published articles are public" on public.articles for select to anon,authenticated using(status='published' or public.is_active_staff());
create policy "published faqs are public" on public.faq_items for select to anon,authenticated using(is_published=true or public.is_active_staff());
create policy "staff edit areas" on public.practice_areas for all to authenticated using(public.is_active_staff()) with check(public.is_active_staff());
create policy "staff edit team" on public.team_members for all to authenticated using(public.is_active_staff()) with check(public.is_active_staff());
create policy "staff edit articles" on public.articles for all to authenticated using(public.is_active_staff()) with check(public.is_active_staff());
create policy "staff edit faqs" on public.faq_items for all to authenticated using(public.is_active_staff()) with check(public.is_active_staff());
create policy "admins manage settings" on public.site_settings for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "staff read contacts" on public.contact_submissions for select to authenticated using(public.is_active_staff());
create policy "staff update contacts" on public.contact_submissions for update to authenticated using(public.is_active_staff()) with check(public.is_active_staff());
create policy "admins delete contacts" on public.contact_submissions for delete to authenticated using(public.is_admin());
create policy "own profile read" on public.admin_profiles for select to authenticated using(id=(select auth.uid()) or public.is_admin());
create policy "admins manage profiles" on public.admin_profiles for all to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "staff read audit" on public.audit_logs for select to authenticated using(public.is_active_staff());
create policy "admins insert audit" on public.audit_logs for insert to authenticated with check(public.is_admin() and actor_id=(select auth.uid()));

revoke all on public.contact_submissions,public.admin_profiles,public.audit_logs,public.site_settings from anon;
revoke insert,update,delete on public.practice_areas,public.team_members,public.articles,public.faq_items from anon;
grant select on public.practice_areas,public.team_members,public.articles,public.faq_items to anon,authenticated;
grant select,insert,update,delete on public.practice_areas,public.team_members,public.articles,public.faq_items to authenticated;
grant select,update,delete on public.contact_submissions to authenticated;
grant select,insert,update,delete on public.admin_profiles,public.site_settings to authenticated;
grant select,insert on public.audit_logs to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('public-site-images','public-site-images',true,5242880,array['image/jpeg','image/png','image/webp']),('private-admin-files','private-admin-files',false,5242880,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy "public images readable" on storage.objects for select to anon,authenticated using(bucket_id='public-site-images');
create policy "staff upload public images" on storage.objects for insert to authenticated with check(bucket_id='public-site-images' and public.is_active_staff());
create policy "staff update public images" on storage.objects for update to authenticated using(bucket_id='public-site-images' and public.is_active_staff()) with check(bucket_id='public-site-images' and public.is_active_staff());
create policy "admins delete public images" on storage.objects for delete to authenticated using(bucket_id='public-site-images' and public.is_admin());
