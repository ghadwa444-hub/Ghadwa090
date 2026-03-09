import { IDataService } from '@/core/interfaces/IDataService';
import { Chef, Order, Product, Box, PromoCode, ContactSettings, Category } from '@/core/domain/entities';
import { supabase } from '../supabase/client';
import { logger } from '@/infrastructure/logging/logger';

import { MOCK_MENU, MOCK_BOXES, MOCK_CHEFS, MOCK_PROMOS, MOCK_SETTINGS } from '@/infrastructure/api/mockData';

// --- Caching Layer to Reduce Supabase Egress & Requests ---
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes cache time

const pendingRequests = new Map<string, Promise<any>>();

/**
 * Helper to fetch data with localStorage cache and concurrent request deduplication.
 * This dramatically reduces the egress consumed from Supabase.
 */
async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>, ttl: number = CACHE_TTL): Promise<T> {
    // 1. Try to return valid cached data
    try {
        const cached = localStorage.getItem(`ghadwa_cache_${key}`);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < ttl) {
                return parsed.data as T;
            }
        }
    } catch (e) {
        // Ignore parsing errors, will just fetch fresh
    }

    // 2. Prevent concurrent requests to the same endpoint
    if (pendingRequests.has(key)) {
        return pendingRequests.get(key) as Promise<T>;
    }

    // 3. Fetch fresh data and cache it
    const promise = fetcher().then(data => {
        try {
            localStorage.setItem(`ghadwa_cache_${key}`, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
        } catch (e) {
            // Ignore quota exceeded in local storage
        }
        pendingRequests.delete(key);
        return data;
    }).catch(err => {
        pendingRequests.delete(key);
        throw err;
    });

    pendingRequests.set(key, promise);
    return promise;
}

export const supabaseDataService: IDataService = {
    // --- Read ---
    getChefs: async (): Promise<Chef[]> => {
        return fetchWithCache('chefs', async () => {
            const { data, error } = await supabase.from('chefs').select('*');
            if (error || !data || data.length === 0) {
                return MOCK_CHEFS;
            }

            return (data || []).map((dbChef: any) => ({
                id: dbChef.id,
                chef_name: dbChef.name,
                specialty: dbChef.specialty,
                description: dbChef.bio,
                image_url: dbChef.img,
                cover_image_url: dbChef.cover,
                working_hours: dbChef.working_hours,
                delivery_time: dbChef.delivery_time,
                rating: dbChef.rating,
                is_active: dbChef.is_open ?? true
            })) as Chef[];
        });
    },

    getOrders: async (): Promise<Order[]> => {
        // Shorter TTL for orders to keep them somewhat real-time
        return fetchWithCache('orders', async () => {
            const { data, error } = await supabase.from('orders').select('*, items:order_items(*)').order('created_at', { ascending: false });
            if (error) {
                logger.error('SUPABASE', 'Error fetching orders', error);
                return [];
            }
            return data as Order[] || [];
        }, 30 * 1000); // 30 seconds
    },

    getMenuItems: async (): Promise<Product[]> => {
        return fetchWithCache('menu_items', async () => {
            // Re-use cached getChefs rather than making a standalone DB query
            const chefs = await supabaseDataService.getChefs();
            const chefsMap = new Map<string, string>();
            const chefStatusMap = new Map<string, boolean>();

            chefs.forEach((chef) => {
                if (chef.chef_name) {
                    const name = chef.chef_name.toLowerCase().trim();
                    chefsMap.set(name, String(chef.id));
                    // Also map variations without "شيف " prefix to handle inconsistencies
                    const withoutPrefix = name.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                    if (withoutPrefix !== name) chefsMap.set(withoutPrefix, String(chef.id));
                }
                chefStatusMap.set(String(chef.id), chef.is_active ?? true);
            });

            const { data, error } = await supabase.from('menu_items').select('*');

            if (error || !data || data.length === 0) {
                return [];
            }

            return data.map((item: any) => {
                let category = item.category || 'طواجن';
                const chefName = item.chef?.toLowerCase().trim();
                let chefId = undefined;
                if (chefName) {
                    chefId = chefsMap.get(chefName);
                    if (!chefId) {
                        const withoutPrefix = chefName.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                        chefId = chefsMap.get(withoutPrefix);
                    }
                }
                const finalChefId = item.chef_id || chefId;

                return {
                    ...item,
                    image_url: item.img,
                    prep_time: parseInt(item.time) || 0,
                    category: category,
                    chef_id: finalChefId,
                    chef: item.chef,
                    is_available: item.is_available ?? true,
                    is_offer: item.is_offer ?? false,
                    is_featured: item.is_featured ?? false,
                    chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
                };
            }) as Product[];
        });
    },

    getOffers: async (): Promise<Product[]> => {
        return fetchWithCache('offers', async () => {
            const chefs = await supabaseDataService.getChefs();
            const chefsMap = new Map<string, string>();
            const chefStatusMap = new Map<string, boolean>();

            chefs.forEach((chef) => {
                if (chef.chef_name) {
                    const name = chef.chef_name.toLowerCase().trim();
                    chefsMap.set(name, String(chef.id));
                    const withoutPrefix = name.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                    if (withoutPrefix !== name) chefsMap.set(withoutPrefix, String(chef.id));
                }
                chefStatusMap.set(String(chef.id), chef.is_active ?? true);
            });

            const { data, error } = await supabase.from('offers').select('*');
            if (error) {
                logger.error('SUPABASE', 'Error fetching offers', error);
                return [];
            }

            return (data || []).map((item: any) => {
                const chefName = item.chef?.toLowerCase().trim();
                let chefId = undefined;
                if (chefName) {
                    chefId = chefsMap.get(chefName);
                    if (!chefId) {
                        const withoutPrefix = chefName.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                        chefId = chefsMap.get(withoutPrefix);
                    }
                }
                const finalChefId = item.chef_id || chefId;

                return {
                    ...item,
                    image_url: item.img || item.image_url,
                    prep_time: parseInt(item.time) || 0,
                    category: item.category || 'طواجن',
                    old_price: item.old_price,
                    chef_id: finalChefId,
                    is_available: item.is_available ?? true,
                    is_offer: true,
                    chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
                };
            }) as Product[];
        });
    },

    getBoxes: async (): Promise<Box[]> => {
        return fetchWithCache('boxes', async () => {
            const chefs = await supabaseDataService.getChefs();
            const chefsMap = new Map<string, string>();
            const chefStatusMap = new Map<string, boolean>();

            chefs.forEach((chef) => {
                if (chef.chef_name) {
                    const name = chef.chef_name.toLowerCase().trim();
                    chefsMap.set(name, String(chef.id));
                    const withoutPrefix = name.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                    if (withoutPrefix !== name) chefsMap.set(withoutPrefix, String(chef.id));
                }
                chefStatusMap.set(String(chef.id), chef.is_active ?? true);
            });

            const { data: boxesData, error: boxesError } = await supabase.from('boxes').select('*');

            if (boxesError) {
                logger.error('SUPABASE', 'Error fetching boxes', boxesError);
                return [];
            }

            return (boxesData || []).map((box: any) => {
                const chefName = box.chef?.toLowerCase().trim();
                let chefId = undefined;
                if (chefName) {
                    chefId = chefsMap.get(chefName);
                    if (!chefId) {
                        const withoutPrefix = chefName.replace(/^شيف\s+/, '').replace(/^chef\s+/, '').trim();
                        chefId = chefsMap.get(withoutPrefix);
                    }
                }
                const finalChefId = box.chef_id || chefId;

                return {
                    ...box,
                    image_url: box.img,
                    is_active: box.is_active ?? true,
                    chef_id: finalChefId,
                    chef: box.chef,
                    chef_is_open: finalChefId ? (chefStatusMap.get(String(finalChefId)) ?? true) : true
                };
            }) as Box[];
        });
    },

    getBestSellers: async (): Promise<Product[]> => {
        // Extract directly from cached menuItems to save 1 request & bandwidth
        const items = await supabaseDataService.getMenuItems();
        const featured = items.filter(i => i.is_featured);
        if (featured.length > 0) {
            return featured.sort((a, b) => (b.order_count || 0) - (a.order_count || 0));
        }
        return [...items].sort((a, b) => (b.order_count || 0) - (a.order_count || 0)).slice(0, 4).map(i => ({ ...i, is_featured: true }));
    },

    getFrozenItems: async (): Promise<Product[]> => {
        // Extract directly from cached menuItems to save 1 request & bandwidth
        const items = await supabaseDataService.getMenuItems();
        return items.filter(i => i.category === 'مجمد' || i.category === 'frozen');
    },

    getHealthyItems: async (): Promise<Product[]> => {
        // Extract directly from cached menuItems to save 1 request & bandwidth
        const items = await supabaseDataService.getMenuItems();
        return items.filter(i => i.category === 'هيلثي' || i.category === 'healthy');
    },

    getPromoCodes: async (): Promise<PromoCode[]> => {
        return fetchWithCache('promo_codes', async () => {
            const { data, error } = await supabase.from('promo_codes').select('*');
            if (error) {
                logger.error('SUPABASE', 'Error fetching promo codes', error);
                return [];
            }

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
                is_active: item.is_active !== false,
                created_at: item.created_at
            })) as PromoCode[];
        });
    },

    getContactSettings: async (): Promise<ContactSettings> => {
        return fetchWithCache('settings', async () => {
            const { data, error } = await supabase.from('settings').select('*').limit(1).single();
            if (error) {
                const { data: altData, error: altError } = await supabase.from('contact_settings').select('*').limit(1).single();
                if (altError) {
                    logger.error('SUPABASE', 'Error fetching settings', error);
                    return {} as ContactSettings;
                }
                return altData as ContactSettings;
            }
            return data as ContactSettings;
        });
    },

    getCategories: async (): Promise<Category[]> => {
        return fetchWithCache('categories', async () => {
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
        });
    },

    getPartners: async (): Promise<any[]> => {
        return fetchWithCache('partners', async () => {
            const { data, error } = await supabase.from('partners').select('*').eq('is_active', true);
            if (error) {
                return [];
            }
            return data || [];
        });
    },

    // --- Write ---
    submitOrder: async (order: any): Promise<boolean> => {
        try {
            const { itemsDetails, items, ...orderData } = order;

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
    },

    submitAmbassadorRequest: async (data: any): Promise<boolean> => {
        const { error } = await supabase.from('ambassadors').insert(data);
        if (error) {
            logger.error('SUPABASE', 'Error adding ambassador request', error);
            return false;
        }
        return true;
    }
};
