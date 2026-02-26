-- Tipagens de Enums

-- Tipo de usuário
CREATE TYPE user_role AS ENUM (
    'customer',
    'employee',
    'manager',
    'admin'
);

-- Período de funcionamento das lanchonetes
CREATE TYPE day_period AS ENUM (
    'weekday', 
    'saturday'
);

-- Status dos pedidos
CREATE TYPE order_status AS ENUM (
    'pending',
    'preparing',
    'ready',
    'completed',
    'cancelled'
);