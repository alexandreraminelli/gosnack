-- Habilitar RSL na tabela units
alter table units enable row level security;


-- Read: qualquer um, autenticado ou não, pode ver as unidades ativas
create policy "anyone can select active units" on units for
select
    to anon,
    authenticated using (is_active = true);


-- Read: admin pode ver todas as unidades, ativas ou não
create policy "admin can select all units" on units to authenticated using (
    is_admin ()
    and is_active_user ()
);


-- Create: apenas admin pode inserir novas unidades
create policy "admin can insert units" on units for insert to authenticated
with
    check (
        is_admin ()
        and is_active_user ()
    );


-- Update: apenas admin pode editar unidades
create policy "admin can update units" on units
for update
    to authenticated using (
        is_admin ()
        and is_active_user ()
    )
with
    check (
        is_admin ()
        and is_active_user ()
    );


-- Delete: bloqueado via client, apenas no Supabase Dashboard ou via SQL
create policy "unit deletion restricted" on units for delete to authenticated using (false);
