import { Chef, Order, Product, Box, PromoCode, ContactSettings, MenuItem, Category } from '@/core/domain/entities';

export interface IDataService {
    // Read`
    getChefs(): Promise<Chef[]>;
    getOrders(): Promise<Order[]>;
    getMenuItems(): Promise<Product[]>;
    getOffers(): Promise<Product[]>;
    getBoxes(): Promise<Box[]>;
    getBestSellers(): Promise<Product[]>;
    getFrozenItems(): Promise<Product[]>;
    getHealthyItems(): Promise<Product[]>;
    getPromoCodes(): Promise<PromoCode[]>;
    getContactSettings(): Promise<ContactSettings>;
    getPartners(): Promise<any[]>;
    getCategories(): Promise<Category[]>;

    // Write / Actions
    submitOrder(order: any): Promise<boolean>;
    addReview(review: any): Promise<boolean>;
}
