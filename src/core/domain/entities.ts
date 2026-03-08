/**
 * Ghadwa Application Types
 * 
 * These interfaces match the Supabase database schema exactly.
 * See DATABASE_SCHEMA.md for full documentation.
 * 
 * IMPORTANT: All IDs are UUIDs (strings), not numbers.
 */

// ============================================
// DATABASE TYPES (match Supabase schema exactly)
// ============================================

/**
 * User profile from profiles table
 * NOTE: Database has whatsapp_number (required), email/phone (added by migration)
 */
export interface Profile {
  id: string;           // UUID, references auth.users
  full_name: string;
  whatsapp_number: string;
  delivery_address?: string;
  role: 'admin' | 'chef' | 'customer';
  is_active?: boolean;
  avatar_url?: string;
  email?: string;       // Added by migration
  phone?: string;       // Added by migration
  created_at?: string;
  updated_at?: string;
}

/**
 * Chef from chefs table
 */
export interface Chef {
  id: string;           // UUID
  profile_id?: string;  // UUID
  chef_name: string;
  specialty?: string;
  description?: string;
  image_url?: string;
  cover_image_url?: string; // Cover/banner image for chef profile
  working_hours?: string;   // e.g., "يوميًا 10ص - 10م"
  delivery_time?: string;   // e.g., "30-45 دقيقة"
  rating: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Product/MenuItem from products table
 * NOTE: Database has both title/name, is_active/is_available, preparation_time/prep_time (synced by migration)
 */
export interface Product {
  id: string;           // UUID
  chef_id?: string;     // UUID
  original_price?: number; // Original price before discount (for offers)
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  is_available: boolean;
  is_featured: boolean;
  is_offer: boolean;
  offer_price?: number;
  old_price?: number;   // Original price before discount (for offers)
  prep_time?: number;
  stock_quantity?: number;
  created_at?: string;
  updated_at?: string;

  // Nutrition information (optional, for healthy meals)
  calories?: number;    // السعرات الحرارية
  fats?: number;        // الدهون بالجرام
  protein?: number;     // البروتين بالجرام
  carbs?: number;       // الكربوهيدرات بالجرام

  // Legacy/computed fields (not in database, populated by UI)
  chef?: string;        // Chef name (computed from chef_id lookup)
  rating?: number;      // Product rating (could be from reviews)
  chef_is_open?: boolean; // Chef's kitchen open status (from joined chefs table)
}

/**
 * Order from orders table
 */
export interface Order {
  id: string;           // UUID
  customer_id?: string; // UUID
  chef_id?: string;     // UUID
  order_number?: string; // GHD-xxx format
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  subtotal: number;     // Required in DB
  delivery_fee?: number;
  tax_amount?: number;
  discount_amount: number;
  total_amount: number;
  delivery_address?: string;
  delivery_phone?: string;
  delivery_notes?: string;
  customer_name?: string;
  customer_phone?: string;
  payment_method?: string;
  payment_status?: string;
  promo_code?: string;
  notes?: string;
  created_at?: string;
  confirmed_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  updated_at?: string;
  items?: OrderItem[];  // Joined from order_items

  // Legacy fields (used by UI, not in DB)
  customer?: string;    // Maps to customer_name
  phone?: string;       // Maps to customer_phone
  address?: string;     // Maps to delivery_address
  date?: string;        // Maps to created_at
  total?: number;       // Maps to total_amount
  itemsDetails?: any[]; // Temporary cart items
}

/**
 * Order item from order_items table
 */
export interface OrderItem {
  id: string;           // UUID
  order_id: string;     // UUID
  product_id?: string;  // UUID
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url?: string;   // Product image URL at time of order
  notes?: string;
  created_at?: string;
  // Legacy fields for compatibility
  product_price?: number;  // Alias for unit_price
  subtotal?: number;       // Alias for total_price
}

/**
 * Box from boxes table
 * NOTE: boxes.id is BIGINT (number), not UUID!
 * Contains both legacy fields (img, items, chef, serves) and new migration fields
 */
export interface Box {
  id: number;           // BIGINT (not UUID - actual DB uses numeric IDs)
  name: string;
  price: number;

  // Legacy fields (original schema)
  serves?: string;
  chef?: string;
  chef_id?: string;     // UUID reference to chefs table
  items?: string[];     // ARRAY type in database
  img?: string;
  color?: string;
  accent?: string;
  badge?: string;
  category?: string;

  // New migration fields
  description?: string;
  image_url?: string;
  items_count?: number;
  is_active?: boolean;
  chef_is_open?: boolean; // Chef's kitchen open status (from joined chefs table)

  created_at?: string;
  updated_at?: string;
}

/**
 * Promo code from promo_codes table
 */
export interface PromoCode {
  id: string;           // UUID
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_uses?: number;
  current_uses: number;
  valid_from?: string;
  valid_until?: string;
  is_active: boolean;
  created_at?: string;
}

/**
 * Contact settings from contact_settings table
 */
export interface ContactSettings {
  id?: string;          // UUID
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  working_hours?: string;
  updated_at?: string;
}

/**
 * Category from categories table
 */
export interface Category {
  id: number;           // BIGINT
  name: string;
  icon?: string;
  created_at?: string;
}

/**
 * Partner from partners table
 */
export interface Partner {
  id: string; // UUID
  name: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  created_at?: string;
}

// ============================================
// UI/FRONTEND TYPES (for cart, checkout, etc.)
// ============================================

/**
 * Cart item extends Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Checkout form data
 */
export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
  promoCode?: string;
  discountApplied?: number;
  deliveryDate?: string;
  deliveryTime?: string;
}

/**
 * Review (can be stored in separate table or as JSON)
 */
export interface Review {
  id: string;
  product_id: string;
  customer_id?: string;
  rating: number;
  comment: string;
  customer_name: string;
  created_at: string;
}

// ============================================
// LEGACY TYPES (for backward compatibility)
// These map old field names to new database columns
// ============================================

/**
 * @deprecated Use Product instead
 * MenuItem is an alias for Product for backward compatibility
 */
export type MenuItem = Product;

// ============================================
// HELPER TYPES
// ============================================

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

/**
 * Data loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
