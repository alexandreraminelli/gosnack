-- Definir estrutura das tabelas

-- Tabela de usuários ----------------------------------------------------------
create table users (
    -- UID (User ID)
    id UUID primary key references auth.users(id) on delete cascade,
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