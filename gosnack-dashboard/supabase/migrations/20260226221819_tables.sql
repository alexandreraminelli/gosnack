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
    name text not null,
    constraint uq_cafeterias_unit_name unique (unit_id, name),
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

-- Relação entre lanchonetes e usuários (managers e employees) (N:N) -----------

create table cafeteria_staff_assignments (
    -- FKs
    cafeteria_id uuid not null references cafeterias(id) on delete cascade,
    user_id uuid not null references users(id) on delete cascade,
    -- PK composta
    primary key (cafeteria_id, user_id),
    -- Data e hora de atribuição
    assigned_at timestamp not null default now()
);

-- Restrição para apenas usuários com role 'manager' ou 'employee' possam ser atribuídos
create or replace function check_cafeteria_staff_role()
returns trigger as $$
begin
    if (select role from users where id = NEW.user_id) not in ('employee', 'manager') then
        raise exception 'only users with employee or manager role can be assigned to cafeterias';
    end if;
    return NEW;
end;
$$ language plpgsql security definer;

-- Trigger para verificar o papel do usuário ao atribuir a uma lanchonete
create trigger trg_cafeteria_staff_check_role
before insert or update on cafeteria_staff_assignments
for each row execute function check_cafeteria_staff_role();

-- Horários de Funcionamento das lanchonetes -----------------------------------

create table cafeteria_opening_hours (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Lanchonete
    cafeteria_id uuid not null references cafeterias(id) on delete cascade,
    -- Periodo
    period day_period not null,
    -- Se está aberto nesse período
    is_open boolean not null default false,
    -- Horário de abertura
    open_time time,
    -- Horário de fechamento
    close_time time,
    -- Data e hora de atualização
    updated_at timestamp not null default now(),

    -- um horário por período para cada lanchonete
    constraint uq_cafeteria_opening_hours_period unique (cafeteria_id, period),
    -- horários obrigatórios se is_open for true
    constraint chk_cafeteria_opening_hours_times check (
        is_open = false
        or (open_time is not null and close_time is not null)
    ),
    -- horário de abertura deve ser antes do horário de fechamento
    constraint chk_opening_before_closing check (
        is_open = false
        or (open_time < close_time)
    )
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_cafeteria_opening_hours_updated_at
before update on cafeteria_opening_hours
for each row execute function update_updated_at();

-- Tabela de telefones das lanchonetes -----------------------------------------

create table cafeteria_phones (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Lanchonete   
    cafeteria_id uuid not null references cafeterias(id) on delete cascade,
    -- Número de telefone
    phone_number text not null,
    -- Se é do WhatsApp
    is_whatsapp boolean not null default false,
    -- Data e hora de modificação
    updated_at timestamp not null default now()
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_cafeteria_phones_updated_at
before update on cafeteria_phones
for each row execute function update_updated_at();

-- Tabela de categorias --------------------------------------------------------

create table categories (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Nome da categoria
    name text not null unique,
    -- URL pro ícone
    icon_path text,
    -- Data e hora de criação
    created_at timestamp not null default now(),
    -- Data e hora de atualização   
    updated_at timestamp not null default now(),
    -- Se a categoria está ativa
    is_active boolean not null default true
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_categories_updated_at
before update on categories
for each row execute function update_updated_at();