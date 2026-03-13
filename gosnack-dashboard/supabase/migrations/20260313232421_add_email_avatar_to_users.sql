-- Adicionar colunas email e avatar_url na tabela de usuários
alter table public.users
    add column email text not null unique,
    add column avatar_url text;