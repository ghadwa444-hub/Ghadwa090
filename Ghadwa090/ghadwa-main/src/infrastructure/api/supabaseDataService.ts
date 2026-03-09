
import { IDataService } from '@/core/interfaces/IDataService';
import { Chef, Order, Product, Box, PromoCode, ContactSettings, Category } from '@/core/domain/entities';
import { supabase } from '../supabase/client';
import { logger } from '@/infrastructure/logging/logger';

import { MOCK_MENU, MOCK_BOXES, MOCK_CHEFS, MOCK_PROMOS, MOCK_SETTINGS } from '@/infrastructure/api/mockData';

export const supabaseDataService: IDataService = {
    // --- Read ---
    getChefs: async (): Promise<Chef[]> => {
        const { data, error } = await supabase.from('chefs').select('*');
        if (error || !data || data.length === 0) {
            // logger.error('SUPABASE', 'Error fetching chefs or empty', error);
            return MOCK_CHEFS;
        }

        // Map DB columns to entity fields
        return (data || []).map((dbChef: any) => ({
            id: dbChef.id,
            chef_name: dbChef.name, // DB: name, Entity: chef_name
            specialty: dbChef.specialty,
            description: dbChef.bio, // DB: bio, Entity: description
            image_url: dbChef.img,   // DB: img, Entity: image_url
            cover_image_url: dbChef.cover, // DB: cover, Entity: cover_image_url
            working_hours: dbChef.working_hours,
            delivery_time: dbChef.delivery_time,
            rating: dbChef.rating,
            // Use DB value (is_open) but default to true if missing
            is_active: dbChef.is_open ?? true
        })) as Chef[];
    },

    getOrders: async (): Promise<Order[]> => {
        const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').order('created_at', { ascending: false });
        if (error) {
            logger.error('SUPABASE', 'Error fetching orders', error);
            return [];
        }
        return data as Order[] || [];
    },

    getMenuItems: async (): Promise<Product[]> => {
        // Fetch chefs first to map chef name to chef_id AND get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, name, is_open');
        const chefsMap = new Map<string, string>();
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefsMap.set(chef.name?.toLowerCase(), String(chef.id));
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        // Use 'menu_items' as primary table based on diagnostic
        const { data, error } = await supabase.from('menu_items').select('*');

        let items: Product[] = [];

        if (!error && data && data.length > 0) {
            // Map 'menu_items' columns to Product entity if needed
            items = data.map((item: any) => {
                // Helper to determine category if missing or needing inference
                let category = item.category;

                // If category is missing or generic, try to infer from name/description
                if (!category || category === 'طواجن') {
                    const name = (item.name || '').toLowerCase();
                    const desc = (item.description || '').toLowerCase();

                    if (name.includes('صحي') || desc.includes('صحي') || name.includes('healthy')) {
                        category = 'healthy';
                    } else if (name.includes('مجمد') || desc.includes('مجمد') || name.includes('تجهيز') || name.includes('frozen')) {
                        category = 'frozen';
                    } else {
                        category = category || 'طواجن'; // Fallback to existing or default
                    }
                }

                // Lookup chef_id from chef name
                const chefName = item.chef?.toLowerCase();
                const chefId = chefName ? chefsMap.get(chefName) : undefined;
                const finalChefId = item.chef_id || chefId;

                return {
                    ...item,
                    // Map mismatched columns
                    image_url: item.img,
                    prep_time: parseInt(item.time) || 0, // '45 د' -> 45
                    category: category,
                    chef_id: finalChefId, // Use existing chef_id or lookup from name
                    chef: item.chef, // Keep original chef name

                    // Ensure boolean flags
                    is_available: item.is_available ?? true,
                    is_offer: item.is_offer ?? false,
                    is_featured: item.is_featured ?? false,

                    // Add chef_is_open status
                    chef_is_open: finalChefId ? (chefStatusMap.get(finalChefId) ?? true) : true
                };
            }) as Product[];
        }

        // Merge Mock Data if categories are missing (Hybrid Approach)
        const hasHealthy = items.some(i => i.category === 'healthy');
        const hasFrozen = items.some(i => i.category === 'frozen');

        if (!hasHealthy) {
            const mockHealthy = MOCK_MENU.filter(i => i.category === 'healthy');
            items = [...items, ...mockHealthy];
        }

        if (!hasFrozen) {
            const mockFrozen = MOCK_MENU.filter(i => i.category === 'frozen');
            items = [...items, ...mockFrozen];
        }

        return items;
    },

    getOffers: async (): Promise<Product[]> => {
        // Fetch chefs first to map chef name to chef_id AND get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, name, is_open');
        const chefsMap = new Map<string, string>();
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefsMap.set(chef.name?.toLowerCase(), String(chef.id));
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        const { data, error } = await supabase.from('offers').select('*');
        if (error) {
            logger.error('SUPABASE', 'Error fetching offers', error);
            return [];
        }

        // Apply same mapping - includes old_price for showing original price
        return (data || []).map((item: any) => {
            // Lookup chef_id from chef name
            const chefName = item.chef?.toLowerCase();
            const chefId = chefName ? chefsMap.get(chefName) : undefined;
            const finalChefId = item.chef_id || chefId;

            return {
                ...item,
                image_url: item.img || item.image_url,
                prep_time: parseInt(item.time) || 0,
                category: item.category || 'طواجن',
                old_price: item.old_price, // Original price before discount
                chef_id: finalChefId, // Map chef name to chef_id
                is_available: item.is_available ?? true,
                is_offer: true,
                // Add chef_is_open status
                chef_is_open: finalChefId ? (chefStatusMap.get(finalChefId) ?? true) : true
            };
        }) as Product[];
    },

    getBoxes: async (): Promise<Box[]> => {
        // Fetch chefs first to map chef name to chef_id AND get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, name, is_open');
        const chefsMap = new Map<string, string>();
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefsMap.set(chef.name?.toLowerCase(), String(chef.id));
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        // Fetch boxes
        const { data: boxesData, error: boxesError } = await supabase
            .from('boxes')
            .select('*');

        if (boxesError) {
            logger.error('SUPABASE', 'Error fetching boxes', boxesError);
            return [];
        }

        return (boxesData || []).map((box: any) => {
            // Lookup chef_id from chef name
            const chefName = box.chef?.toLowerCase();
            const chefId = chefName ? chefsMap.get(chefName) : undefined;
            const finalChefId = box.chef_id || chefId;

            return {
                ...box,
                image_url: box.img,
                is_active: box.is_active ?? true,
                chef_id: finalChefId, // Use existing chef_id or lookup from name
                chef: box.chef, // Keep original chef name
                // Add chef_is_open field by looking up the chef's status
                chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
            };
        }) as Box[];
    },

    getBestSellers: async (): Promise<Product[]> => {
        // Fetch chefs to get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, is_open');
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        // Use 'menu_items' as primary
        // Try fetching featured items first
        let { data, error } = await supabase.from('menu_items').select('*').eq('is_featured', true).order('order_count', { ascending: false });

        // Fallback: If no featured items or error, fetch any 4 items (sorted by order count)
        if (error || !data || data.length === 0) {
            const fallback = await supabase.from('menu_items').select('*').order('order_count', { ascending: false }).limit(4);
            data = fallback.data;
        }

        // Map columns
        return (data || []).map((item: any) => ({
            ...item,
            image_url: item.img,
            prep_time: parseInt(item.time) || 0,
            category: 'أطباق رئيسية', // Default category

            // Ensure boolean flags
            is_available: item.is_available ?? true,
            is_offer: item.is_offer ?? false,
            // Force true so they appear as featured in the UI list
            is_featured: true,
            // Add chef_is_open status
            chef_is_open: item.chef_id ? (chefStatusMap.get(item.chef_id) ?? true) : true
        })) as Product[];
    },

    getFrozenItems: async (): Promise<Product[]> => {
        // Fetch chefs first to map chef name to chef_id AND get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, name, is_open');
        const chefsMap = new Map<string, string>();
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefsMap.set(chef.name?.toLowerCase(), String(chef.id));
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        // Fetch frozen items from menu_items table
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category', 'مجمد');

        if (error) {
            logger.error('SUPABASE', 'Error fetching frozen items', error);
            return [];
        }

        return (data || []).map((item: any) => {
            // Lookup chef_id from chef name
            const chefName = item.chef?.toLowerCase();
            const chefId = chefName ? chefsMap.get(chefName) : undefined;
            const finalChefId = item.chef_id || chefId;

            return {
                ...item,
                image_url: item.img,
                prep_time: parseInt(item.time) || 0,
                category: 'frozen',
                chef_id: finalChefId,
                chef: item.chef,
                is_available: item.is_available ?? true,
                is_offer: item.is_offer ?? false,
                is_featured: item.is_featured ?? false,
                chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
            };
        }) as Product[];
    },

    getHealthyItems: async (): Promise<Product[]> => {
        // Fetch chefs first to map chef name to chef_id AND get is_open status
        const { data: chefsData } = await supabase.from('chefs').select('id, name, is_open');
        const chefsMap = new Map<string, string>();
        const chefStatusMap = new Map<string, boolean>();
        if (chefsData) {
            chefsData.forEach((chef: any) => {
                chefsMap.set(chef.name?.toLowerCase(), String(chef.id));
                chefStatusMap.set(String(chef.id), chef.is_open ?? true);
            });
        }

        // Fetch healthy items from menu_items table
        const { data, error } = await supabase
            .from('menu_items')
            .select('*')
            .eq('category', 'هيلثي');

        if (error) {
            logger.error('SUPABASE', 'Error fetching healthy items', error);
            return [];
        }

        return (data || []).map((item: any) => {
            // Lookup chef_id from chef name
            const chefName = item.chef?.toLowerCase();
            const chefId = chefName ? chefsMap.get(chefName) : undefined;
            const finalChefId = item.chef_id || chefId;

            return {
                ...item,
                image_url: item.img,
                prep_time: parseInt(item.time) || 0,
                category: 'healthy',
                chef_id: finalChefId,
                chef: item.chef,
                is_available: item.is_available ?? true,
                is_offer: item.is_offer ?? false,
                is_featured: item.is_featured ?? false,
                chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
            };
        }) as Product[];
    },

    getPromoCodes: async (): Promise<PromoCode[]> => {
        const { data, error } = await supabase.from('promo_codes').select('*');
        if (error) {
            logger.error('SUPABASE', 'Error fetching promo codes', error);
            return [];
        }

        // Map database fields to PromoCode interface
        // Database has: code, value, type
        // Interface expects: code, discount_value, discount_type, is_active, etc.
        return (data || []).map((item: any) => ({
            id: String(item.id),
            code: item.code,
            discount_type: item.type || item.discount_type || 'percentage',
            discount_value: item.value || item.discount_value || 0,
            min_order_amount: item.min_order_amount || 0,
            max_uses: item.max_uses,
            current_uses: item.current_uses || 0,
            valid_from: item.valid_from,
            valid_until: item.valid_until,
            is_active: item.is_active !== false, // Default to true if not specified
            created_at: item.created_at
        })) as PromoCode[];
    },

    getContactSettings: async (): Promise<ContactSettings> => {
        const { data, error } = await supabase.from('settings').select('*').limit(1).single();
        if (error) {
            // Try 'contact_settings' if 'settings' fails
            const { data: altData, error: altError } = await supabase.from('contact_settings').select('*').limit(1).single();
            if (altError) {
                logger.error('SUPABASE', 'Error fetching settings', error);
                return {} as ContactSettings;
            }
            return altData as ContactSettings;
        }
        return data as ContactSettings;
    },

    getCategories: async (): Promise<Category[]> => {
        const { data, error } = await supabase.from('categories').select('*').order('id', { ascending: true });
        if (error) {
            logger.error('SUPABASE', 'Error fetching categories', error);
            return [];
        }
        return (data || []).map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            created_at: cat.created_at
        })) as Category[];
    },

    getPartners: async (): Promise<any[]> => {
        const { data, error } = await supabase.from('partners').select('*').eq('is_active', true);
        if (error) {
            // logger.error('SUPABASE', 'Error fetching partners', error); // Suppress error as table might not exist
            return [];
        }
        return data || [];
    },

    // --- Write ---
    submitOrder: async (order: any): Promise<boolean> => {
        try {
            // Extract items for JSONB storage
            const { itemsDetails, items, ...orderData } = order;

            // Map to actual database column names (from supabase_schema.sql)
            // orders table has: customer, phone, address, total, status, items, items_details
            const dbOrder = {
                customer: orderData.customer_name || orderData.customer || orderData.name,
                phone: orderData.customer_phone || orderData.phone,
                address: orderData.delivery_address || orderData.address,
                total: orderData.total_amount || orderData.total || orderData.subtotal,
                status: 'pending',
                items: itemsDetails?.map((i: any) => i.name).join(', ') || items?.map((i: any) => i.product_name).join(', ') || '',
                items_details: itemsDetails || items || [],
            };

            const { error: orderError } = await supabase
                .from('orders')
                .insert(dbOrder);

            if (orderError) {
                logger.error('SUPABASE', 'Error submitting order', orderError);
                return false;
            }

            return true;
        } catch (err) {
            logger.error('SUPABASE', 'Exception submitting order', err);
            return false;
        }
    },

    addReview: async (review: any): Promise<boolean> => {
        const { error } = await supabase.from('reviews').insert(review);
        if (error) {
            logger.error('SUPABASE', 'Error adding review', error);
            return false;
        }
        return true;
    }
};
