
-- Remover coluna email de public.users
alter table public.users drop column email;

-- Criar View que expõe o e-mail via join com auth.users (fonte da verdade)
create view public.users_with_email as
select 
    u.id,
    u.first_name,
    u.last_name,
    u.role,
    u.is_active,
    u.avatar_url,
    u.updated_at,
    a.email
from public.users u
join auth.users a on a.id = u.id;
