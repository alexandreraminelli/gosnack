-- Habilitar RLS na tabela cafeterias (lanchonetes)
alter table cafeterias enable row level security;


-- Read: qualquer um vê lanchonetes ativas
create policy "anyone can select active cafeterias" on cafeterias for
select
    to anon,
    authenticated using (is_active = true);


-- Read: admins veem todas as lanchonetes, inclusive inativas
create policy "admins can select all cafeterias" on cafeterias for
select
    to authenticated using (
        is_admin ()
        and is_active_user ()
    );


-- Read: Managers veem todas as lanchonetes atribuídas a eles, inclusive inativas
create policy "managers can select assigned cafeterias" on cafeterias for
select
    to authenticated using (
        is_manager ()
        and is_active_user ()
        and is_user_in_cafeteria (id)
    );


-- Create: apenas admin pode criar novas lanchonetes
create policy "admins can insert cafeterias" on cafeterias for insert to authenticated
with
    check (
        is_admin ()
        and is_active_user ()
    );


-- Update: admin pode editar qualquer lanchonete
create policy "admins can update cafeterias" on cafeterias
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


-- Update: managers podem editar apenas lanchonetes atribuídas a eles
create policy "managers can update assigned cafeterias" on cafeterias
for update
    to authenticated using (
        is_active_user ()
        and is_manager ()
        and is_user_in_cafeteria (id) -- verifica se a cafeteria é atribuída ao manager
    )
with
    check (
        is_active_user ()
        and is_manager ()
        and is_user_in_cafeteria (id)
    );


-- Delete: bloqueado para todos; apenas service_role pode deletar diretamente
create policy "cafeteria deletion restricted" on cafeterias for delete to authenticated using (false);
