-- Definir estrutura das tabelas

-- Funções auxiliares ----------------------------------------------------------

-- Função para atualizar o campo updated_at automaticamente
create or replace function update_updated_at()
returns trigger as $$
begin
    NEW.updated_at = now();
    return NEW;
end;
$$ language plpgsql;

-- Tabela de usuários ----------------------------------------------------------
create table users (
    -- UID (User ID)
    id uuid primary key references auth.users(id) on delete cascade,
    -- Primeiro nome
    first_name text not null,
    -- Sobrenome
    last_name text not null,
    -- Papel do usuário
    role user_role not null default 'customer',
    -- Se o usuário está ativo
    is_active boolean not null default true,
    -- Quanto foi a última atualização
    updated_at timestamp not null default now()
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_users_updated_at
before update on users
for each row execute function update_updated_at();

-- Tabela de Unidades ----------------------------------------------------------

create table units (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Nome da unidade
    name text not null unique,
    -- Data e hora de criação
    created_at timestamp not null default now(),
    -- Data e hora de atualização
    updated_at timestamp not null default now(),
    -- Se a unidade está ativa
    is_active boolean not null default true
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_units_updated_at
before update on units
for each row execute function update_updated_at();

-- Relação entre usuários e unidades (N:N) -------------------------------------

create table unit_admin_assignments (
    -- FKs
    unit_id uuid not null references units(id) on delete cascade,
    admin_id uuid not null references users(id) on delete cascade,
    -- PK composta
    primary key (unit_id, admin_id),
    -- Data e hora de atribuição
    assigned_at timestamp not null default now()
);

-- Restrição para apenas usuários com role 'admin' possam ser atribuídos
create or replace function check_unit_admin_assignments_role() 
returns trigger as $$
begin
    if (select role from users where id = NEW.admin_id) != 'admin' then
        raise exception 'only users with admin role can be assigned to units';
    end if;
    return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_unit_admin_assignments_check_role
before insert or update on unit_admin_assignments
for each row execute function check_unit_admin_assignments_role();

-- Tabela Lanchonete -----------------------------------------------------------

create table cafeterias (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Unidade a qual a lanchonete pertence
    unit_id uuid not null references units(id) on delete cascade,
    -- Nome da lanchonete
    name text not null unique (unit_id, name),
    -- Localização
    location text,
    -- Data e hora de criação
    created_at timestamp not null default now(),
    -- Data e hora de atualização
    updated_at timestamp not null default now(),
    -- Se a lanchonete está ativa
    is_active boolean not null default true
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_cafeterias_updated_at
before update on cafeterias
for each row execute function update_updated_at();