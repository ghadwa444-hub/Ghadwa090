
import { Chef, Product, Order, Box, PromoCode, ContactSettings } from '@/core/domain/entities';
import { logger } from '@/infrastructure/logging/logger';
import { MOCK_CHEFS, MOCK_MENU, MOCK_BOXES, MOCK_PROMOS, MOCK_SETTINGS, MOCK_ORDERS } from '@/infrastructure/api/mockData';

// Storage Keys
const KEYS = {
    ORDERS: 'ghadwa_orders',
};

// Helper: Simulate Network Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Get Data from Storage or Fallback to Initial Data
function getDB<T>(key: string, fallback: T): T {
    try {
        const stored = localStorage.getItem(key);
        if (!stored) {
            // seed with mock orders if empty
            if (key === KEYS.ORDERS && Array.isArray(fallback) && fallback.length === 0) {
                return MOCK_ORDERS as unknown as T;
            }
            return fallback;
        }
        return JSON.parse(stored);
    } catch (error) {
        console.error(`Error reading ${key}`, error);
        return fallback;
    }
}

// Helper: Save Data to Storage
function saveDB<T>(key: string, data: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error writing ${key}`, error);
    }
}

import { IDataService } from '@/core/interfaces/IDataService';
import { supabaseDataService } from '@/infrastructure/api/supabaseDataService';

// Export the selected API implementation
export const api: IDataService = supabaseDataService;

// Keep mock implementation for reference or fallback (renamed)
export const mockApi: IDataService = {
    // --- Fetch Data (READ ONLY) ---
    getChefs: async (): Promise<Chef[]> => {
        await delay(500);
        return MOCK_CHEFS;
    },
    getOrders: async (): Promise<Order[]> => {
        await delay(500);
        return getDB<Order[]>(KEYS.ORDERS, []);
    },
    getMenuItems: async (): Promise<Product[]> => {
        await delay(300);
        return MOCK_MENU;
    },
    getOffers: async (): Promise<Product[]> => {
        await delay(300);
        return MOCK_MENU.filter(i => i.is_offer);
    },
    getBoxes: async (): Promise<Box[]> => {
        await delay(300);
        return MOCK_BOXES;
    },
    getBestSellers: async (): Promise<Product[]> => {
        await delay(300);
        return MOCK_MENU.filter(i => i.is_featured);
    },
    getPromoCodes: async (): Promise<PromoCode[]> => {
        await delay(300);
        return MOCK_PROMOS;
    },
    getContactSettings: async (): Promise<ContactSettings> => {
        await delay(200);
        return MOCK_SETTINGS;
    },
    getPartners: async (): Promise<any[]> => {
        await delay(200);
        return [];
    },

    // --- User Actions ---
    submitOrder: async (order: any): Promise<boolean> => {
        await delay(800);
        logger.info('API_ORDERS', '📤 Mock submitting order', order);

        // Save to local storage to simulate persistence
        const orders = getDB<Order[]>(KEYS.ORDERS, []);
        orders.unshift(order); // Add to beginning
        saveDB(KEYS.ORDERS, orders);

        return true;
    },

    addReview: async (review: any): Promise<boolean> => {
        logger.info('API_REVIEWS', 'Mock addReview', review);
        return true;
    }
};
