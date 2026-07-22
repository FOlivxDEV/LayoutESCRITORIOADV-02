drop policy "published areas are public" on public.practice_areas;
drop policy "published team is public" on public.team_members;
drop policy "published articles are public" on public.articles;
drop policy "published faqs are public" on public.faq_items;
drop policy "staff edit areas" on public.practice_areas;
drop policy "staff edit team" on public.team_members;
drop policy "staff edit articles" on public.articles;
drop policy "staff edit faqs" on public.faq_items;
drop policy "admins manage profiles" on public.admin_profiles;

create policy "published areas are public" on public.practice_areas for select to anon using(is_published=true);
create policy "areas visible to authenticated" on public.practice_areas for select to authenticated using(is_published=true or private.is_active_staff());
create policy "staff insert areas" on public.practice_areas for insert to authenticated with check(private.is_active_staff());
create policy "staff update areas" on public.practice_areas for update to authenticated using(private.is_active_staff()) with check(private.is_active_staff());
create policy "staff delete areas" on public.practice_areas for delete to authenticated using(private.is_active_staff());

create policy "published team is public" on public.team_members for select to anon using(is_published=true);
create policy "team visible to authenticated" on public.team_members for select to authenticated using(is_published=true or private.is_active_staff());
create policy "staff insert team" on public.team_members for insert to authenticated with check(private.is_active_staff());
create policy "staff update team" on public.team_members for update to authenticated using(private.is_active_staff()) with check(private.is_active_staff());
create policy "staff delete team" on public.team_members for delete to authenticated using(private.is_active_staff());

create policy "published articles are public" on public.articles for select to anon using(status='published');
create policy "articles visible to authenticated" on public.articles for select to authenticated using(status='published' or private.is_active_staff());
create policy "staff insert articles" on public.articles for insert to authenticated with check(private.is_active_staff());
create policy "staff update articles" on public.articles for update to authenticated using(private.is_active_staff()) with check(private.is_active_staff());
create policy "staff delete articles" on public.articles for delete to authenticated using(private.is_active_staff());

create policy "published faqs are public" on public.faq_items for select to anon using(is_published=true);
create policy "faqs visible to authenticated" on public.faq_items for select to authenticated using(is_published=true or private.is_active_staff());
create policy "staff insert faqs" on public.faq_items for insert to authenticated with check(private.is_active_staff());
create policy "staff update faqs" on public.faq_items for update to authenticated using(private.is_active_staff()) with check(private.is_active_staff());
create policy "staff delete faqs" on public.faq_items for delete to authenticated using(private.is_active_staff());

create policy "admins insert profiles" on public.admin_profiles for insert to authenticated with check(private.is_admin());
create policy "admins update profiles" on public.admin_profiles for update to authenticated using(private.is_admin()) with check(private.is_admin());
create policy "admins delete profiles" on public.admin_profiles for delete to authenticated using(private.is_admin());
