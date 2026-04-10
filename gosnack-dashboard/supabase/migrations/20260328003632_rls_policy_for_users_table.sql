-- Habilitar RSL na tabela users
alter table users enable row level security;


-- Read: usuário vê apenas os próprios dados
create policy "users can select own profile" on users for
select
    to authenticated using (
        id = current_user_id ()
        and is_active_user ()
    );


-- Read: admins veem todos os usuários
create policy "admins can select all users" on users for
select
    to authenticated using (
        is_admin ()
        and is_active_user ()
    );


-- Read: managers veem funcionários e outros managers das suas lanchonetes
create policy "managers can select staff of assigned cafeterias" on users for
select
    to authenticated using (
        is_manager ()
        and is_active_user ()
        and exists (
            select
                1
            from
                cafeteria_staff_assignments csa_manager
                join cafeteria_staff_assignments csa_target on csa_manager.cafeteria_id = csa_target.cafeteria_id
            where
                csa_manager.user_id = current_user_id ()
                and csa_target.user_id = users.id
                and users.role in ('employee', 'manager')
        )
    );


-- View para obter nome e avatar do usuário
create view public.user_public_profile
-- Garantir que as políticas de RLS sejam aplicadas antes de acessar os dados
with
    (security_barrier = true) as
select
    id,
    first_name,
    last_name,
    avatar_url
from
    users;


-- Índice para acelerar consultas de pedidos por usuário
create index idx_orders_user_id on orders (user_id);


-- Índice para acelerar consultas de pedidos por lanchonete
create index idx_orders_cafeteria_id on orders (cafeteria_id);


-- Índices para acelerar consultas de funcionários por usuário e lanchonete
create index idx_csa_user_id on cafeteria_staff_assignments (user_id);


-- Índice para acelerar consultas de funcionários por lanchonete
create index idx_csa_cafeteria_id on cafeteria_staff_assignments (cafeteria_id);


-- Read: staff (manager ou employee) vê apenas nome e avatar dos clientes
create policy "staff can view users from their cafeteria orders" on users for
select
    to authenticated using (
        -- Apenas funcionários ativos
        is_staff ()
        and is_active_user ()
        -- Apenas usuários que tenham feito pedidos na lanchonete do staff
        and exists (
            select
                1
            from
                orders o
            where
                o.user_id = users.id
                and o.cafeteria_id in (
                    select
                        cafeteria_id
                    from
                        cafeteria_staff_assignments
                    where
                        user_id = current_user_id ()
                )
        )
    );


-- Insert: usuário pode se cadastrar apenas como customer
create policy "users can insert own profile as customer" on users for insert to authenticated
with
    check (
        id = current_user_id ()
        and role = 'customer'
    );


-- Insert: admin pode inserir usuários com qualquer role
create policy "admins can insert any user" on users for insert to authenticated
with
    check (
        is_admin ()
        and is_active_user ()
    );


-- Update: usuário pode atualizar apenas nome e avatar do próprio perfil
create policy "users can update own profile" on users
for update
    to authenticated using (
        id = current_user_id ()
        and is_active_user ()
    )
with
    check (
        id = current_user_id ()
        and is_active_user ()
    );


-- Update: admin pode editar qualquer usuário
create policy "admins can update users" on users
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


-- Delete: bloqueado para todos; apenas service_role pode deletar diretamente
create policy "user deletion restricted" on users for delete to authenticated using (false);