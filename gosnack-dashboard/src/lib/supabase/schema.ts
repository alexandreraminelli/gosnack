/**
 * Nomes das tabelas do banco de dados.
 */
export const TABLES = {
  cafeterias: "cafeterias",
  cafeteriaStaffAssignments: "cafeteria_staff_assignments",
  cafeteriaOpeningHours: "cafeteria_opening_hours",
  cafeteriaPhones: "cafeteria_phones",

  categories: "categories",

  orders: "orders",
  orderItems: "order_items",
  orderItemOptions: "order_item_options",
  orderStatusHistory: "order_status_history",

  products: "products",
  productOptionGroups: "product_option_groups",
  productOptions: "product_options",
  comboItems: "combo_items",

  units: "units",
  unitAdminAssignments: "unit_admin_assignments",

  users: "users",
} as const

type TableKeys = keyof typeof TABLES

/**
 * Nomes das colunas por tabela.
 */
export const COLUMNS = {
  cafeterias: {
    id: "id",
    unitId: "unit_id",
    name: "name",
    location: "location",
    createdAt: "created_at",
    updatedAt: "updated_at",
    isActive: "is_active",
  },
  cafeteriaStaffAssignments: {
    cafeteriaId: "cafeteria_id",
    userId: "user_id",
    assignedAt: "assigned_at",
  },
  cafeteriaOpeningHours: {
    id: "id",
    cafeteriaId: "cafeteria_id",
    period: "period",
    isOpen: "is_open",
    openTime: "open_time",
    closeTime: "close_time",
    updatedAt: "updated_at",
  },

  cafeteriaPhones: {
    id: "id",
    cafeteriaId: "cafeteria_id",
    phoneNumber: "phone_number",
    isWhatsapp: "is_whatsapp",
    updatedAt: "updated_at",
  },

  categories: {
    id: "id",
    name: "name",
    iconPath: "icon_path",
    createdAt: "created_at",
    updatedAt: "updated_at",
    isActive: "is_active",
  },

  orders: {
    id: "id",
    userId: "user_id",
    cafeteriaId: "cafeteria_id",
    staffId: "staff_id",
    status: "status",
    totalAmount: "total_amount",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  orderItems: {
    id: "id",
    orderId: "order_id",
    productId: "product_id",
    quantity: "quantity",
    priceAtOrder: "price_at_order",
    notes: "notes",
  },
  orderItemOptions: {
    id: "id",
    orderItemId: "order_item_id",
    optionId: "option_id",
    priceModifierAtOrder: "price_modifier_at_order",
  },
  orderStatusHistory: {
    id: "id",
    orderId: "order_id",
    fromStatus: "from_status",
    toStatus: "to_status",
    changedBy: "changed_by",
    changedAt: "changed_at",
  },

  products: {
    id: "id",
    cafeteriaId: "cafeteria_id",
    categoryId: "category_id",
    name: "name",
    description: "description",
    imagePath: "image_path",
    price: "price",
    discount: "discount",
    stock: "stock",
    isAvailable: "is_available",
    createdAt: "created_at",
    updatedAt: "updated_at",
    isCombo: "is_combo",
  },
  productOptionGroups: {
    id: "id",
    productId: "product_id",
    name: "name",
    isRequired: "is_required",
    minSelections: "min_selections",
    maxSelections: "max_selections",
    displayOrder: "display_order",
  },
  productOptions: {
    id: "id",
    groupId: "group_id",
    name: "name",
    priceModifier: "price_modifier",
    displayOrder: "display_order",
    isAvailable: "is_available",
  },
  comboItems: {
    id: "id",
    comboId: "combo_id",
    productId: "product_id",
    quantity: "quantity",
  },

  units: {
    id: "id",
    name: "name",
    createdAt: "created_at",
    updatedAt: "updated_at",
    isActive: "is_active",
  },
  unitAdminAssignments: {
    unitId: "unit_id",
    adminId: "admin_id",
    assignedAt: "assigned_at",
  },

  users: {
    id: "id",
    email: "email",
    firstName: "first_name",
    lastName: "last_name",
    role: "role",
    avatarUrl: "avatar_url",
    isActive: "is_active",
    updatedAt: "updated_at",
  },
} as const satisfies Record<TableKeys, Record<string, string>>
