
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Chef, Order, MenuItem, Box, PromoCode, ContactSettings, Category } from '@/core/domain/entities';
import { api } from '@/infrastructure/api/api';
import { logger } from '@/infrastructure/logging/logger';

interface DataContextType {
    chefs: Chef[];
    orders: Order[];
    menuItems: MenuItem[];
    offers: MenuItem[];
    boxes: Box[];
    bestSellers: MenuItem[];
    frozenItems: MenuItem[];
    healthyItems: MenuItem[];
    promoCodes: PromoCode[];
    contactSettings: ContactSettings;
    categories: Category[];
    isLoading: boolean;
    refreshData: () => Promise<void>;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>; // expose setter for orders (needed for placing orders)
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

const defaultContactSettings: ContactSettings = {
    phone: '201109318581',
    whatsapp: '201109318581',
    email: 'ghadwa444@gmail.com',
    address: 'طنطا، مصر',
    facebook: '',
    instagram: '',
    linkedin: '',
    working_hours: 'السبت - الخميس: 10 ص - 11 م\nالجمعة: مغلق'
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chefs, setChefs] = useState<Chef[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [offers, setOffers] = useState<MenuItem[]>([]);
    const [boxes, setBoxes] = useState<Box[]>([]);
    const [bestSellers, setBestSellers] = useState<MenuItem[]>([]);
    const [frozenItems, setFrozenItems] = useState<MenuItem[]>([]);
    const [healthyItems, setHealthyItems] = useState<MenuItem[]>([]);
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
    const [contactSettings, setContactSettings] = useState<ContactSettings>(defaultContactSettings);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const CACHE_KEY = 'ghadwa_data_cache';
    const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

    const refreshData = async () => {
        logger.info('APP', '📥 Starting data loading...');
        try {
            const startTime = performance.now();

            // Check local cache
            try {
                const cachedString = localStorage.getItem(CACHE_KEY);
                if (cachedString) {
                    const cachedData = JSON.parse(cachedString);
                    if (Date.now() - cachedData.timestamp < CACHE_EXPIRY_MS) {
                        logger.info('APP', '⚡ Using cached API data');
                        if (cachedData.data.chefs?.length) setChefs(cachedData.data.chefs);
                        if (cachedData.data.menuItems?.length) setMenuItems(cachedData.data.menuItems);
                        if (cachedData.data.offers?.length) setOffers(cachedData.data.offers);
                        if (cachedData.data.boxes?.length) setBoxes(cachedData.data.boxes);
                        if (cachedData.data.bestSellers?.length) setBestSellers(cachedData.data.bestSellers);
                        if (cachedData.data.frozenItems?.length) setFrozenItems(cachedData.data.frozenItems);
                        if (cachedData.data.healthyItems?.length) setHealthyItems(cachedData.data.healthyItems);
                        if (cachedData.data.promoCodes?.length) setPromoCodes(cachedData.data.promoCodes);
                        if (cachedData.data.orders) setOrders(cachedData.data.orders);
                        if (cachedData.data.settings) setContactSettings(cachedData.data.settings);
                        if (cachedData.data.categories?.length) setCategories(cachedData.data.categories);
                        setIsLoading(false);
                        return; // Exit early since we used cache
                    }
                }
            } catch (e) {
                logger.warn('APP', 'Failed to read cache', e);
            }

            const [chefsData, ordersData, menuData, offersData, boxesData, bestSellersData, frozenData, healthyData, promosData, settingsData, categoriesData] = await Promise.all([
                api.getChefs(),
                api.getOrders(),
                api.getMenuItems(),
                api.getOffers(),
                api.getBoxes(),
                api.getBestSellers(),
                api.getFrozenItems(),
                api.getHealthyItems(),
                api.getPromoCodes(),
                api.getContactSettings(),
                api.getCategories()
            ]);
            const loadTime = performance.now() - startTime;

            if (chefsData.length) setChefs(chefsData);
            if (menuData.length) setMenuItems(menuData);
            if (offersData.length) setOffers(offersData);
            if (boxesData.length) setBoxes(boxesData);
            if (bestSellersData.length) setBestSellers(bestSellersData);
            if (frozenData.length) setFrozenItems(frozenData);
            if (healthyData.length) setHealthyItems(healthyData);
            if (promosData.length) setPromoCodes(promosData);
            if (ordersData) setOrders(ordersData);
            if (settingsData) setContactSettings(settingsData);
            if (categoriesData.length) setCategories(categoriesData);

            // Save to cache
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    data: {
                        chefs: chefsData,
                        menuItems: menuData,
                        offers: offersData,
                        boxes: boxesData,
                        bestSellers: bestSellersData,
                        frozenItems: frozenData,
                        healthyItems: healthyData,
                        promoCodes: promosData,
                        orders: ordersData,
                        settings: settingsData,
                        categories: categoriesData
                    }
                }));
            } catch (e) {
                logger.warn('APP', 'Failed to save cache', e);
            }

            logger.info('APP', `✅ API data fetched in ${loadTime.toFixed(2)}ms`);
        } catch (error) {
            logger.error('APP', '❌ Error loading data', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <DataContext.Provider value={{
            chefs,
            orders,
            menuItems,
            offers,
            boxes,
            bestSellers,
            frozenItems,
            healthyItems,
            promoCodes,
            contactSettings,
            categories,
            isLoading,
            refreshData,
            setOrders
        }}>
            {children}
        </DataContext.Provider>
    );
};
