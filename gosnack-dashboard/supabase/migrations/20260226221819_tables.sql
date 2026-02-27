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

-- Tabela de produtos ----------------------------------------------------------

create table products (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Lanchonete a qual o produto pertence
    cafeteria_id uuid not null references cafeterias(id) on delete cascade,
    -- Categoria do produto
    category_id uuid not null references categories(id) on delete restrict,
    -- Nome do produto
    name text not null,
    constraint uq_products_cafeteria_name unique (cafeteria_id, name),
    -- Descrição do produto
    description text,
    -- Imagem do produto
    image_path text,
    -- Preço do produto
    price numeric(10,2) not null check (price >= 0),
    -- Desconto para alunos e professores
    discount integer not null default 0 check (discount >= 0 and discount <= 100),
    -- Estoque do produto
    stock integer not null default 0 check (stock >= 0),
    -- Se o produto está disponível para venda
    is_available boolean not null default true,
    -- Data e hora de criação
    created_at timestamp not null default now(),
    -- Data e hora de atualização
    updated_at timestamp not null default now(),
    -- Se o produto é um combo
    is_combo boolean not null default false
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_products_updated_at
before update on products
for each row execute function update_updated_at();

-- Tabela de grupos de opções de um produto ------------------------------------

create table product_option_groups (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Produto ao qual o grupo pertence
    product_id uuid not null references products(id) on delete cascade,
    -- Nome do grupo (exemplo: "Tamanho", "Molho", "Acompanhamento")
    name text not null,
    -- Se o grupo é obrigatório ou não
    is_required boolean not null default false,
    -- Mínimo de opções que devem ser selecionadas
    min_selections integer not null default 0,
    -- Máximo de opções que podem ser selecionadas
    max_selections integer not null default 1,
    -- Ordem de exibição no app
    display_order integer not null default 0,

    -- Verificar se valores são validos
    constraint chk_selections check (
        min_selections >= 0
        and max_selections >= 1
        and min_selections <= max_selections
    ),
    -- Nome do grupo único por produto
    constraint uq_product_option_group unique (product_id, name)
);

-- Opções dentro de cada grupo -------------------------------------------------

create table product_options (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- Grupo ao qual a opção pertence
    group_id uuid not null references product_option_groups(id) on delete cascade,
    -- Nome da opção (exemplo: "Bacon", "Ketchup")
    name text not null,
    -- Preço adicional (0 se não mudar)
    price_modifier numeric(10,2) not null default 0 check (price_modifier >= 0),
    -- Ordem de exibição no app
    display_order integer not null default 0,
    -- Se a opção está disponível para seleção
    is_available boolean not null default true,

    -- Nome da opção único por grupo
    constraint uq_product_option unique (group_id, name)
);

-- Tabela de itens de um combo -------------------------------------------------

create table combo_items (
    -- ID do item do combo
    id uuid primary key default gen_random_uuid(),
    -- ID do produto de combo
    combo_id uuid not null references products(id) on delete cascade,
    -- ID do produto que é parte do combo
    product_id uuid not null references products(id) on delete cascade,
    -- Quantidade do produto no combo
    quantity integer not null default 1 check (quantity > 0),

    -- Garantir que um produto não seja adicionado mais de uma vez ao mesmo combo
    constraint uq_combo_item unique (combo_id, product_id),
    -- Combo não pode conter a si mesmo
    constraint chk_combo_not_self check (combo_id != product_id)
);

create or replace function check_combo_items()
returns trigger as $$
begin
    -- combo_id deve ser um produto marcado como combo
    if (select is_combo from products where id = NEW.combo_id) = false then
        raise exception 'combo_id must reference a product marked as combo';
    end if;

    -- product_id não pode ser outro combo
    if (select is_combo from products where id = NEW.product_id) = true then
        raise exception 'product_id cannot reference a product marked as combo';
    end if;

    return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_combo_items_check
before insert or update on combo_items
for each row execute function check_combo_items();

-- Tabela de pedidos

create table orders (
    -- ID do pedido
    id uuid primary key default gen_random_uuid(),
    -- ID do usuário que fez o pedido
    user_id uuid not null references users(id) on delete restrict,
    -- ID da lanchonete onde o pedido foi feito
    cafeteria_id uuid not null references cafeterias(id) on delete restrict,
    -- Funcionário que atendeu o pedido
    staff_id uuid references users(id) on delete restrict,
    -- Status do pedido
    status order_status not null default 'pending',
    -- Valor total do pedido
    total_amount numeric(10,2) not null default 0 check (total_amount >= 0),
    -- Data e hora de criação do pedido
    created_at timestamp not null default now(),
    -- Data e hora de atualização do pedido
    updated_at timestamp not null default now()
);

-- Trigger para atualizar updated_at automaticamente
create trigger trg_orders_updated_at
before update on orders
for each row execute function update_updated_at();

-- Tabela de itens do pedido ---------------------------------------------------

create table order_items (
    -- ID do item do pedido
    id uuid primary key default gen_random_uuid(),
    -- ID do pedido
    order_id uuid not null references orders(id) on delete cascade,
    -- ID do produto
    product_id uuid not null references products(id) on delete restrict,
    -- Quantidade do produto no pedido
    quantity integer not null default 1 check (quantity > 0),
    -- Preço do produto no momento do pedido (considerando desconto)
    price_at_order numeric(10,2) not null check (price_at_order >= 0),
    -- Observações do cliente
    notes text
);

-- Opções selecionadas para cada item do pedido --------------------------------

create table order_item_options (
    -- ID 
    id uuid primary key default gen_random_uuid(),
    -- Item do pedido a qual a opção pertence
    order_item_id uuid not null references order_items(id) on delete cascade,
    -- Opção selecionada pelo cliente
    option_id uuid not null references product_options(id) on delete restrict,
    -- Preço no momento do pedido
    price_modifier_at_order numeric(10,2) not null check (price_modifier_at_order >= 0),

    -- Uma opção não pode ser adicionada mais de uma vez para o mesmo item do pedido
    constraint uq_order_item_option unique (order_item_id, option_id)
);

-- Tabela para rastrear o andamento do pedido ----------------------------------

create table order_status_history (
    -- ID
    id uuid primary key default gen_random_uuid(),
    -- ID do pedido
    order_id uuid not null references orders(id) on delete cascade,
    -- Status anterior
    from_status order_status,
    -- Novo status
    to_status order_status not null,
    -- Funcionário responsável pela mudança de status (null se automático)
    changed_by uuid references users(id) on delete set null,
    -- Data e hora da mudança de status
    changed_at timestamp not null default now()
);

-- Função para registrar mudanças de status no pedido
create or replace function record_order_status_change()
returns trigger as $$
begin
    if OLD.status is distinct from NEW.status then
        insert into order_status_history (order_id, from_status, to_status)
        values (NEW.id, OLD.status, NEW.status);
    end if;
    return NEW;
end;
$$ language plpgsql security definer;

-- Trigger para registrar mudanças de status no pedido  
create trigger trg_orders_record_status_change
after update on orders
for each row execute function record_order_status_change();
