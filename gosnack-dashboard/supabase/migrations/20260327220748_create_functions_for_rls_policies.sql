-- Função para verificar se o usuário está autenticado
create or replace function is_authenticated () returns boolean as $$
    select auth.uid() is not null;
$$ language sql security definer;


-- Função que retorna o role do usuário atual
create or replace function current_user_role () returns user_role as $$
    select role from public.users where id = auth.uid();
$$ language sql security definer;


-- Função para verificar se o usuário é um administrador
create or replace function is_admin () returns boolean as $$
    select current_user_role() = 'admin';
$$ language sql security definer;


-- Função para verificar se o usuário é um gerente
create or replace function is_manager () returns boolean as $$
    select current_user_role() = 'manager';
$$ language sql security definer;


-- Função para verificar se o usuário é um funcionário
create or replace function is_employee () returns boolean as $$
    select current_user_role() = 'employee';
$$ language sql security definer;


-- Função para verificar se o usuário é um cliente
create or replace function is_customer () returns boolean as $$
    select current_user_role() = 'customer';
$$ language sql security definer;


-- Verifica se o usuário tem um role >= ao especificado (hierarquia)
-- Hierarquia: admin > manager > employee > customer
-- Exemplo: "manager ou acima", "employee ou acima", etc.
create or replace function has_role_at_least (min_role user_role) returns boolean as $$
    select case min_role
        when 'customer'  then current_user_role() in ('customer', 'employee', 'manager', 'admin')
        when 'employee'  then current_user_role() in ('employee', 'manager', 'admin')
        when 'manager'   then current_user_role() in ('manager', 'admin')
        when 'admin'     then current_user_role() = 'admin'
        else false
    end;
$$ language sql security definer;


-- Função que verifica se o usuário é staff (employee ou manager)
create or replace function is_staff () returns boolean as $$
    select current_user_role() in ('employee', 'manager');
$$ language sql security definer;


-- Função que verifica se o usuário é privilegiado (admin ou manager)
create or replace function is_privileged () returns boolean as $$
    select current_user_role() in ('admin', 'manager');
$$ language sql security definer;


-- Função que verifica se o usuário está ativo
create or replace function is_active_user () returns boolean as $$
    select is_active from public.users where id = auth.uid();
$$ language sql security definer;


-- Função que retorna o UID do usuário atual (atalho para auth.uid())
create or replace function current_user_id () returns uuid as $$
    select auth.uid();
$$ language sql security definer;


-- Verifica se o usuário pertence a uma unidade específica
create or replace function is_user_in_unit (p_unit_id uuid) returns boolean as $$
    select exists (
        select 1 from public.unit_admin_assignments
        where unit_id = p_unit_id and admin_id = auth.uid()
    );
$$ language sql security definer;


-- Verifica se o usuário está atribuído a uma lanchonete específica
create or replace function is_user_in_cafeteria (p_cafeteria_id uuid) returns boolean as $$
    select exists (
        select 1 from public.cafeteria_staff_assignments
        where cafeteria_id = p_cafeteria_id and user_id = auth.uid()
    );
$$ language sql security definer;
