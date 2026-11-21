-- -------------------------------------------------------------------------- --
-- Initial Schema                                                             --
-- -------------------------------------------------------------------------- --
-- 
-- 
-- 
-- -------------------------------------------------------------------------- --
--                                    Enums                                   --
-- -------------------------------------------------------------------------- --
-- 
-- User Role Enum ----------------------------------------------------------- --
create type public.user_role as enum(
  'student', -- Aluno
  'teacher', -- Professor
  'coordinator', -- Coordenador
  'staff', -- Funcionários do colégio (clientes)
  'guardian', -- Pais e responsáveis por alunos
  'employee', -- Funcionário de lanchonete
  'manager', -- Gerente de lanchonete
  'admin' -- Administrador do sistema
);

comment on type public.user_role is 'Papéis do usuário no sistema, que determinam permissões e acesso a recursos.';

-- Weekly Period Enum ------------------------------------------------------- --
create type public.weekly_period as enum(
  'weekdays', -- Segunda a sexta-feira
  'weekend' -- Sábados
);

comment on type public.weekly_period is 'Período da semana para definir horários de funcionamento da lanchonete.';

-- Order Status Enum -------------------------------------------------------- --
create type public.order_status as enum(
  'pending', -- Pedido criado
  'preparing', -- Em preparo
  'ready', -- Pronto para retirada
  'picked_up', -- Retirado pelo cliente
  'canceled' -- Cancelado
);

comment on type public.order_status is 'Status do pedido, que indica em qual etapa do processo ele se encontra.';

-- Cancellation Source Enum ------------------------------------------------- --
create type public.cancellation_source as enum(
  'customer', -- Cliente cancelou o pedido
  'snackbar' -- Lanchonete cancelou o pedido
);

comment on type public.cancellation_source is 'Origem do cancelamento do pedido, indicando se foi o cliente ou a lanchonete que realizou o cancelamento.';

-- Payment Status Enum ------------------------------------------------------ --
create type public.payment_status as enum(
  'pending', -- Pedido criado, aguardando pagamento
  'approved', -- Pagamento aprovado
  'declined', -- Pagamento recusado
  'refunded' -- Pagamento estornado (cancelamento)
);

comment on type public.payment_status is 'Status do pagamento do pedido, indicando se o pagamento foi aprovado, recusado ou estornado.';

-- Payment Method Enum ------------------------------------------------------ --
create type public.payment_method as enum(
  'wallet', -- Saldo da carteira pré-paga
  'stripe' -- Pagamento via Stripe (cartão de crédito/débito ou pix)
);

comment on type public.payment_method is 'Método de pagamento utilizado para o pedido, podendo ser saldo da carteira pré-paga ou pagamento via Stripe.';

-- Transaction Type Enum ---------------------------------------------------- --
create type public.transaction_type as enum(
  'deposit', -- Adicionar saldo à carteira pré-paga
  'purchase', -- Compra de um pedido com a carteira pré-paga
  'refund' -- Estorno de um pedido com a carteira pré-paga
);

comment on type public.transaction_type is 'Tipo de transação financeira, indicando se é um depósito, uma compra ou um estorno na carteira pré-paga.';

-- -------------------------------------------------------------------------- --
--                                   Helpers                                  --
-- -------------------------------------------------------------------------- --
-- 
-- -------------------------------------------------------------------------- --
create function public.set_updated_at () returns trigger language plpgsql
set
  search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at is 'Atualiza o campo `updated_at` de uma linha antes de cada update.';

-- -------------------------------------------------------------------------- --
--                                   Tables                                   --
-- -------------------------------------------------------------------------- --
-- 
-- 
-- School Unit Table -------------------------------------------------------- --
create table public.school_unit (
  -- Columns ---------------------------------------------------------------- --
  -- ID da unidade
  id uuid primary key default gen_random_uuid(),
  -- Nome da unidade
  name text not null unique,
  -- Endereço da unidade
  address text not null unique,
  -- URL da imagem da unidade
  image_url text,
  -- Se a unidade está ativa
  active boolean not null default true,
  -- Se a unidade está marcada para exclusão
  marked_for_deletion boolean not null default false,
  -- 
  -- Constraints ------------------------------------------------------------ --
  -- Nome da unidade deve ter entre 1 e 100 caracteres
  constraint school_unit_name_length check (char_length(name) between 1 and 100)
);

comment on table public.school_unit is 'Unidade escolar do colégio, que pode ter uma ou mais lanchonetes associadas.';

alter table public.school_unit enable row level security;

-- User Profile Table ------------------------------------------------------- --
create table public.profile (
  -- Columns ---------------------------------------------------------------- --
  -- Referenciar o usuário do auth.users (Supabase Auth)
  uid uuid primary key references auth.users (id) on delete cascade,
  -- Primeiro nome
  first_name text not null,
  -- Sobrenome
  last_name text,
  -- Papel do usuário no sistema
  role public.user_role not null,
  -- Email do usuário
  email text not null unique,
  -- Telefone do usuário
  phone varchar(16) unique,
  -- ID do cliente no Stripe (para pagamentos)
  stripe_customer_id text unique,
  -- Se o perfil está ativo
  active boolean not null default true,
  -- Data de criação do perfil
  created_at timestamptz not null default now(),
  -- Unidade escolar à qual o usuário está vinculado
  school_unit_id uuid references public.school_unit (id) on delete set null,
  -- 
  -- Constraints ------------------------------------------------------------ --
  -- Validar formato do telefone
  constraint profile_phone_format check (
    phone is null
    or phone ~ '^\+[1-9]\d{1,14}$'
  )
);

alter table public.profile enable row level security;

comment on table public.profile is 'Perfil do usuário, contém as informações básicas e o papel do usuário no sistema. Referencia o UID do usuário no auth.users (Supabase Auth).';

-- Criar índice para otimizar consultas por unidade escolar
create index idx_profile_school_unit_id on public.profile (school_unit_id);

-- Students And Guardians (profile specializations) ------------------------- --
-- Guard Table
create table public.guard (
  -- Columns ---------------------------------------------------------------- --
  -- Referência ao UID do usuário
  profile_uid uuid primary key references public.profile (uid) on delete cascade
);

alter table public.guard enable row level security;

comment on table public.guard is 'Pais e responsáveis por alunos (especialização de profile).';

-- Student Table
create table public.student (
  -- Columns ---------------------------------------------------------------- --
  -- Referência ao UID do usuário
  profile_uid uuid primary key references public.profile (uid) on delete cascade
);

alter table public.student enable row level security;

comment on table public.student is 'Alunos que possuem pais/responsáveis (especialização de profile).';

-- Guard and Student Relationship Table
create table public.student_guard (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o UID do aluno
  student_profile_uid uuid not null references public.student (profile_uid) on delete cascade,
  -- PK + FK para o UID do responsável
  guard_profile_uid uuid not null references public.guard (profile_uid) on delete cascade,
  -- Primary Key Composta por FKs
  primary key (student_profile_uid, guard_profile_uid)
);

alter table public.student_guard enable row level security;

comment on table public.student_guard is 'Vínculo entre alunos e seus responsáveis.';

-- Indices para otimizar consultas por aluno e por responsável
create index idx_student_guard_guard_uid on public.student_guard (guard_profile_uid);

-- Snackbar ----------------------------------------------------------------- --
create table public.snackbar (
  -- Columns ---------------------------------------------------------------- --
  -- ID da lanchonete
  id uuid primary key default gen_random_uuid(),
  -- FK para a unidade escolar
  school_unit_id uuid not null references public.school_unit (id) on delete restrict,
  -- Nome da lanchonete
  name text not null,
  -- Localização da lanchonete
  location text,
  -- URL do logo da lanchonete
  logo_url text,
  -- Se a lanchonete está ativa (aceita pedidos)
  active boolean not null default true,
  -- Se a lanchonete está marcada para exclusão (não deve ser exibida na API)
  marked_for_deletion boolean not null default false,
  -- Constraints ------------------------------------------------------------ --
  -- Nome da lanchonete deve ser único dentro da mesma unidade escolar
  constraint unique_snackbar_name_in_same_unit unique (name, school_unit_id)
);

alter table public.snackbar enable row level security;

comment on table public.snackbar is 'Lanchonete escolar presente em uma unidade do colégio.';

-- Índice para otimizar consultas por unidade escolar
create index idx_snackbar_school_unit_id on public.snackbar (school_unit_id);

-- SnackBar Employees ------------------------------------------------------- --
create table public.snackbar_employee (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o UID do usuário
  profile_uid uuid primary key references public.profile (uid) on delete cascade,
  -- FK para a lanchonete
  snackbar_id uuid not null references public.snackbar (id) on delete restrict,
  -- Se é gerente da lanchonete
  is_manager boolean not null default false,
  -- Se está disponível para preparar pedidos
  available_to_prepare_orders boolean not null default true
);

alter table public.snackbar_employee enable row level security;

comment on table public.snackbar_employee is 'Usuários que são funcionários ou gerentes de uma lanchonete.';

-- Apenas um gerente por lanchonete
create unique index uq_snackbar_single_manager on public.snackbar_employee (snackbar_id)
where
  is_manager;

-- Índice para otimizar consultas por lanchonete
create index idx_snackbar_employee_snackbar_id on public.snackbar_employee (snackbar_id);

-- SnackBar Opening Hours --------------------------------------------------- --
create table public.snackbar_opening_hours (
  -- Columns ---------------------------------------------------------------- --
  -- ID do horário
  id uuid primary key default gen_random_uuid(),
  -- FK para a lanchonete
  snackbar_id uuid not null references public.snackbar (id) on delete cascade,
  -- Período da semana (dias úteis ou finais de semana)
  weekly_period public.weekly_period not null,
  -- Horário de abertura
  opens_at time not null,
  -- Horário de fechamento
  closes_at time not null,
  -- Constraints ------------------------------------------------------------ --
  -- Apenas um horário por período da semana por lanchonete
  constraint unique_snackbar_weekly_opening_time unique (snackbar_id, weekly_period),
  -- Horário de fechamento deve ser maior que o horário de abertura
  constraint opening_hours_valid_range check (closes_at > opens_at)
);

alter table public.snackbar_opening_hours enable row level security;

comment on table public.snackbar_opening_hours is 'Horários de funcionamento da lanchonete, separados por período da semana (dias úteis e finais de semana).';

-- Dietary Restrictions And Allergies --------------------------------------- --
create table public.dietary_restriction (
  -- Columns ---------------------------------------------------------------- --
  -- ID da restrição alimentar
  id uuid primary key default gen_random_uuid(),
  -- Nome da restrição alimentar
  name text not null unique,
  -- URL do ícone da restrição alimentar
  icon_url text
);

alter table public.dietary_restriction enable row level security;

comment on table public.dietary_restriction is 'Restrições alimentares e alergias.';

-- User Dietary Restrictions ------------------------------------------------ --
create table public.user_dietary_restriction (
  -- PK + FK para a restrição alimentar
  dietary_restriction_id uuid not null references public.dietary_restriction (id) on delete cascade,
  -- PK + FK para o UID do usuário
  profile_uid uuid not null references public.profile (uid) on delete cascade,
  -- PK Composta por FKs
  primary key (profile_uid, dietary_restriction_id)
);

alter table public.user_dietary_restriction enable row level security;

comment on table public.user_dietary_restriction is 'Restrições alimentares e alergias dos usuários.';

-- Índice para otimizar consultas por restrição alimentar
create index idx_user_dietary_restriction_restriction_id on public.user_dietary_restriction (dietary_restriction_id);

-- Category Table ----------------------------------------------------------- --
create table public.category (
  -- Columns ---------------------------------------------------------------- --
  -- ID da categoria
  id uuid primary key default gen_random_uuid(),
  -- FK para a lanchonete
  snackbar_id uuid not null references public.snackbar (id) on delete restrict,
  -- Nome da categoria
  name text not null,
  -- URL do ícone da categoria
  icon_url text,
  -- URL da imagem da categoria
  image_url text,
  -- Se a categoria está ativa (visível no cardápio)
  active boolean not null default true,
  -- Se a categoria está marcada para exclusão (não deve ser exibida na API)
  marked_for_deletion boolean not null default false,
  -- Datas de criação e atualização da categoria
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Constraint ------------------------------------------------------------- --
  -- Não repetir o nome da categoria dentro da mesma lanchonete
  constraint unique_category_name_in_snackbar unique (snackbar_id, name),
  -- Não permitir categorias duplicadas com o mesmo ID e lanchonete (evitar conflitos de ID)
  constraint uq_category_id_snackbar unique (id, snackbar_id)
);

alter table public.category enable row level security;

comment on table public.category is 'Categoria de itens do cardápio, pertencente a uma lanchonete.';

-- Atualizar o campo `updated_at` antes de cada update na categoria
create trigger trg_category_updated_at
before update on public.category for each row
execute function public.set_updated_at ();

-- Menu Item Table ---------------------------------------------------------- --
create table public.menu_item (
  -- Columns ---------------------------------------------------------------- --
  -- ID do item do cardápio
  id uuid primary key default gen_random_uuid(),
  -- FK para a lanchonete
  snackbar_id uuid not null references public.snackbar (id) on delete restrict,
  -- FK para a categoria
  category_id uuid not null,
  -- Nome do item do cardápio
  name text not null,
  -- Descrição do item do cardápio
  description text,
  -- Preço do item do cardápio
  price numeric(8, 2) not null,
  -- URL da imagem do item do cardápio
  image_url text,
  -- Se o item está disponível para venda
  available boolean not null default true,
  -- Se o item está marcado para exclusão (não deve ser exibido na API)
  marked_for_deletion boolean not null default false,
  -- Datas de criação e atualização do item do cardápio
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Constraints ------------------------------------------------------------ --
  -- Garantir que a categoria pertence à mesma lanchonete do item do cardápio
  constraint menu_item_category_fk foreign key (category_id, snackbar_id) references public.category (id, snackbar_id) on delete restrict,
  -- Não repetir o nome do item dentro da mesma lanchonete
  constraint unique_item_name_in_snackbar unique (snackbar_id, name),
  -- Máximo de 500 caracteres para a descrição do item
  constraint menu_item_description_length check (
    description is null
    or char_length(description) <= 500
  ),
  -- Preço do item deve ser não-negativo
  constraint menu_item_price_non_negative check (price >= 0)
);

alter table public.menu_item enable row level security;

-- Atualizar o campo `updated_at` antes de cada update no item do cardápio
create trigger trg_menu_item_updated_at
before update on public.menu_item for each row
execute function public.set_updated_at ();

-- Individual Product Table (Menu Item Specialization) ---------------------- --
create table public.product (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o item do cardápio
  menu_item_id uuid primary key references public.menu_item (id) on delete cascade,
  -- Se o produto deve ter seu estoque monitorado
  tracks_stock boolean not null default false,
  -- Quantidade em estoque do produto (pode ser nula se não rastrear estoque)
  stock_quantity integer,
  -- Constraints ------------------------------------------------------------ --
  -- Estoque deve ser não-negativo 
  constraint product_stock_non_negative check (
    stock_quantity is null
    or stock_quantity >= 0
  ),
  -- Estoque é obrigatório se o produto rastrear estoque
  constraint product_stock_required_when_tracked check (
    not tracks_stock
    or stock_quantity is not null
  )
);

alter table public.product enable row level security;

comment on table public.product is 'Produto individual do cardápio (especialização de Menu Item).';

comment on column public.product.tracks_stock is 'Se o estoque do produto deve ser monitorado.';

-- Product Dietary Restrictions Association Table --------------------------- --
create table public.product_dietary_restriction (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o item do cardápio (produto)
  product_menu_item_id uuid not null references public.product (menu_item_id) on delete cascade,
  -- PK + FK para a restrição alimentar
  dietary_restriction_id uuid not null references public.dietary_restriction (id) on delete cascade,
  -- Primary Key Composta por FKs
  primary key (product_menu_item_id, dietary_restriction_id)
);

alter table public.product_dietary_restriction enable row level security;

comment on table public.product_dietary_restriction is 'Restrições alimentares presentes nos produtos.';

-- Índice para otimizar consultas por restrição alimentar
create index idx_product_dietary_restriction_restriction_id on public.product_dietary_restriction (dietary_restriction_id);

-- Combo Table (Menu Item Specialization) ----------------------------------- --
create table public.combo (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o item do cardápio
  menu_item_id uuid primary key references public.menu_item (id) on delete cascade
);

alter table public.combo enable row level security;

comment on table public.combo is 'Combo que combina vários produtos em um único item.';

create table public.combo_item (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o item do cardápio (combo)
  combo_menu_item_id uuid not null references public.combo (menu_item_id) on delete cascade,
  -- PK + FK para o item do cardápio (produto)
  product_menu_item_id uuid not null references public.product (menu_item_id) on delete cascade,
  -- Quantidade do produto no combo
  quantity integer not null default 1,
  -- Primary Key Composta por FKs
  primary key (combo_menu_item_id, product_menu_item_id),
  -- Constraints ------------------------------------------------------------ --
  -- Quantidade de cada item do combo deve ser positiva
  constraint combo_item_quantity_positive check (quantity > 0)
);

alter table public.combo_item enable row level security;

-- Índice para otimizar consultas por produto
create index idx_combo_item_product_id on public.combo_item (product_menu_item_id);

-- Product Discounts Table -------------------------------------------------- --
create table public.discount (
  -- Columns ---------------------------------------------------------------- --
  -- ID do desconto
  id uuid primary key default gen_random_uuid(),
  -- FK para o item do cardápio
  menu_item_id uuid not null references public.menu_item (id) on delete cascade,
  -- Papel do usuário elegível para o desconto
  role public.user_role not null,
  -- Percentual de desconto
  percentage numeric(5, 2) not null,
  -- Se o desconto está ativo
  active boolean not null default false,
  -- Datas de início e fim do desconto (pode ser nulo para desconto permanente)
  start_at timestamptz default now(),
  end_at timestamptz,
  -- Constraints ------------------------------------------------------------ --
  -- Apenas um desconto por item do cardápio e papel do usuário
  constraint only_one_product_discount_per_role unique (menu_item_id, role),
  -- Percentual de desconto deve estar entre 10% e 90%
  constraint discount_range check (percentage between 0.10 and 0.90),
  -- Papel do usuário elegível para o desconto deve ser um dos papéis de cliente
  constraint discount_eligible_roles check (role in ('student', 'teacher', 'coordinator', 'staff', 'guardian')),
  -- Validação da janela de validade do desconto
  constraint discount_valid_window check (
    start_at is null
    or end_at is null
    or end_at > start_at
  )
);

alter table public.discount enable row level security;

comment on table public.discount is 'Descontos de um item do cardápio para determinados perfis de usuário.';

comment on column public.discount.percentage is 'Fração do desconto (0.15 = 15%).';

-- Orders Table ------------------------------------------------------------- --
create table public.orders (
  -- Columns ---------------------------------------------------------------- --
  -- ID do pedido
  id uuid primary key default gen_random_uuid(),
  -- Status do pedido
  status public.order_status not null default 'pending',
  -- FK para a lanchonete onde o pedido foi feito
  snackbar_id uuid not null references public.snackbar (id) on delete restrict,
  -- FK para o perfil do usuário que fez o pedido
  profile_uid uuid not null references public.profile (uid) on delete restrict,
  -- FK para o funcionário da lanchonete que preparou o pedido 
  -- (nulo se ainda não foi preparado)
  snackbar_employee_profile_uid uuid references public.snackbar_employee (profile_uid) on delete set null,
  -- Subtotal do pedido (soma dos preços dos itens, sem desconto)
  subtotal numeric(10, 2) not null,
  -- Desconto aplicado ao pedido (soma dos descontos dos itens)
  discount_amount numeric(10, 2) not null default 0,
  -- Total do pedido (subtotal - desconto)
  total numeric(10, 2) generated always as (subtotal - discount_amount) stored,
  -- Código de 4 dígitos para retirada do pedido
  pickup_code text not null,
  -- Quem cancelou o pedido (cliente ou lanchonete), nulo se não foi cancelado
  canceled_by public.cancellation_source,
  -- Mensagem informada pela lanchonete ao cancelar o pedido, nula se não foi cancelado
  cancellation_message text,
  -- Datas e horários de criação e atualização do pedido
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Constraints ------------------------------------------------------------ --
  -- Não permitir pedidos duplicados para o mesmo usuário
  constraint uq_orders_id_profile unique (id, profile_uid),
  -- Validar formato do código de retirada (4 dígitos)
  constraint orders_pickup_code_format check (pickup_code ~ '^[0-9]{4}$'),
  -- Validar consistência dos valores monetários do pedido
  constraint orders_amounts_valid check (
    subtotal >= 0
    and discount_amount >= 0
    and discount_amount <= subtotal -- Desconto menor que subtotal
  ),
  -- Garantir consistência entre status de cancelamento e quem cancelou
  constraint orders_cancellation_consistent check ((status = 'canceled') = (canceled_by is not null)),
  -- Garantir consistência entre status de cancelamento e mensagem de cancelamento
  constraint orders_cancellation_message_length check (
    cancellation_message is null
    or char_length(cancellation_message) <= 255
  )
);

alter table public.orders enable row level security;

comment on table public.orders is 'Pedidos feitos pelos usuários, contendo informações sobre status, pagamento e retirada.';

comment on column public.orders.pickup_code is 'Código de 4 dígitos para retirada.';

comment on column public.orders.canceled_by is 'Quem cancelou: o cliente ou a lanchonete.';

comment on column public.orders.cancellation_message is 'Mensagem informada pela lanchonete ao cancelar o pedido.';

-- Índice para otimizar consultas por perfil de usuário e data de criação do pedido
create index idx_orders_profile_uid on public.orders (profile_uid, created_at desc);

-- Índice para otimizar consultas por lanchonete, status do pedido e data de criação do pedido
create index idx_orders_snackbar_status on public.orders (snackbar_id, status, created_at desc);

-- Índice para otimizar consultas por funcionário da lanchonete que preparou o pedido
create index idx_orders_employee_uid on public.orders (snackbar_employee_profile_uid);

-- Atualizar o campo `updated_at` antes de cada update no pedido
create trigger trg_orders_updated_at
before update on public.orders for each row
execute function public.set_updated_at ();

-- Order Item Table --------------------------------------------------------- --
create table public.order_item (
  -- Columns ---------------------------------------------------------------- --
  -- ID do item do pedido
  id uuid primary key default gen_random_uuid(),
  -- FK para o pedido
  order_id uuid not null references public.orders (id) on delete restrict,
  -- FK para o item do cardápio (pode ser nulo se o item foi removido do cardápio)
  menu_item_id uuid references public.menu_item (id) on delete set null,
  -- Nome do item no momento da compra
  item_name text not null,
  -- Preço unitário do item no momento da compra
  unit_price numeric(10, 2) not null,
  -- Fração de desconto aplicada ao item no momento da compra (0.15 = 15%)
  discount numeric(5, 2) not null default 0,
  -- Quantidade do item no pedido
  quantity integer not null default 1,
  -- Observações do pedido feitas pelo cliente
  notes text,
  -- Constraints ------------------------------------------------------------ --
  -- Quantidade deve ser positiva
  constraint order_item_quantity_positive check (quantity > 0),
  -- Preço unitário do item deve ser não-negativo
  constraint order_item_unit_price_non_negative check (unit_price >= 0),
  -- Desconto do item deve estar entre 0 e 1 (0% a 100%)
  constraint order_item_discount_range check (discount between 0 and 1),
  -- Observações do pedido devem ter no máximo 255 caracteres
  constraint order_item_notes_length check (
    notes is null
    or char_length(notes) <= 255
  )
);

alter table public.order_item enable row level security;

comment on table public.order_item is 'Itens de um pedido, que podem ser produtos individuais ou combos.';

comment on column public.order_item.notes is 'Observações do pedido feitas pelo cliente.';

comment on column public.order_item.item_name is 'Nome do item no momento da compra.';

comment on column public.order_item.unit_price is 'Preço unitário do item no momento da compra.';

comment on column public.order_item.discount is 'Fração de desconto aplicada ao item no momento da compra.';

-- Índice para otimizar consultas por pedido
create index idx_order_item_order_id on public.order_item (order_id);

-- Índice para otimizar consultas por item do cardápio
create index idx_order_item_menu_item_id on public.order_item (menu_item_id);

-- Reviews ------------------------------------------------------------------ --
create table public.review (
  -- Columns ---------------------------------------------------------------- --
  -- PK + FK para o pedido
  order_id uuid not null,
  -- PK + FK para o perfil do usuário que fez a avaliação
  profile_uid uuid not null,
  -- Nota da avaliação (1 a 5)
  rating integer not null,
  -- Comentário da avaliação (opcional)
  comment text,
  -- Data de criação da avaliação
  created_at timestamptz not null default now(),
  -- PK Composta por FKs
  primary key (order_id, profile_uid),
  -- Constraints ------------------------------------------------------------ --
  -- Garantir que o pedido e o perfil do usuário existam
  foreign key (order_id, profile_uid) references public.orders (id, profile_uid) on delete cascade,
  -- Garantir que a nota da avaliação esteja entre 1 e 5
  constraint review_rating_range check (rating between 1 and 5),
  -- Garantir que o comentário da avaliação tenha no máximo 500 caracteres
  constraint review_comment_length check (
    comment is null
    or char_length(comment) <= 500
  )
);

alter table public.review enable row level security;

comment on table public.review is 'Avaliações feitas pelos usuários sobre os pedidos realizados.';

-- Índice para otimizar consultas por pedido
create index idx_review_profile_uid on public.review (profile_uid);

-- -------------------------------------------------------------------------- --
