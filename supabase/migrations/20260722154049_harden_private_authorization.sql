create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_active_staff()
returns boolean language sql stable security definer set search_path = ''
as $$select exists(select 1 from public.admin_profiles p where p.id=(select auth.uid()) and p.is_active)$$;
create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$select exists(select 1 from public.admin_profiles p where p.id=(select auth.uid()) and p.is_active and p.role='admin')$$;

revoke all on function private.is_active_staff() from public, anon;
revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_active_staff(), private.is_admin() to authenticated;

alter policy "published areas are public" on public.practice_areas using(is_published=true or private.is_active_staff());
alter policy "published team is public" on public.team_members using(is_published=true or private.is_active_staff());
alter policy "published articles are public" on public.articles using(status='published' or private.is_active_staff());
alter policy "published faqs are public" on public.faq_items using(is_published=true or private.is_active_staff());
alter policy "staff edit areas" on public.practice_areas using(private.is_active_staff()) with check(private.is_active_staff());
alter policy "staff edit team" on public.team_members using(private.is_active_staff()) with check(private.is_active_staff());
alter policy "staff edit articles" on public.articles using(private.is_active_staff()) with check(private.is_active_staff());
alter policy "staff edit faqs" on public.faq_items using(private.is_active_staff()) with check(private.is_active_staff());
alter policy "admins manage settings" on public.site_settings using(private.is_admin()) with check(private.is_admin());
alter policy "staff read contacts" on public.contact_submissions using(private.is_active_staff());
alter policy "staff update contacts" on public.contact_submissions using(private.is_active_staff()) with check(private.is_active_staff());
alter policy "admins delete contacts" on public.contact_submissions using(private.is_admin());
alter policy "own profile read" on public.admin_profiles using(id=(select auth.uid()) or private.is_admin());
alter policy "admins manage profiles" on public.admin_profiles using(private.is_admin()) with check(private.is_admin());
alter policy "staff read audit" on public.audit_logs using(private.is_active_staff());
alter policy "admins insert audit" on public.audit_logs with check(private.is_admin() and actor_id=(select auth.uid()));
alter policy "staff upload public images" on storage.objects with check(bucket_id='public-site-images' and private.is_active_staff());
alter policy "staff update public images" on storage.objects using(bucket_id='public-site-images' and private.is_active_staff()) with check(bucket_id='public-site-images' and private.is_active_staff());
alter policy "admins delete public images" on storage.objects using(bucket_id='public-site-images' and private.is_admin());

drop function public.is_active_staff();
drop function public.is_admin();
drop policy if exists "public images readable" on storage.objects;
