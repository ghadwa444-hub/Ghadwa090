
import React, { useState } from 'react'
import { MenuItem, CartItem, Chef } from '@/core/domain/entities'
import { SectionTitle } from './SectionTitle'
import { UnifiedProductCard } from './UnifiedProductCard'
import { EmptyState } from '@/presentation/components/shared/EmptyState'

interface FullMenuProps {
    menuItems: MenuItem[];
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    chefs?: any[]; // Add chefs prop to lookup chef names
}

export const FullMenu: React.FC<FullMenuProps> = ({ menuItems, cart, updateQuantity, chefs = [] }) => {
    const [activeCategory, setActiveCategory] = useState("الكل");

    // Helper to get chef name from chef_id
    const getChefName = (chefId?: string): string => {
        if (!chefId || !chefs.length) return 'مطبخ';
        const chef = chefs.find(c => c.id === chefId);
        return chef?.chef_name || 'مطبخ';
    };

    // Filter items by category only - show all items (including from closed chefs)
    const filteredItems = (activeCategory === "الكل"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory)
    );

    // Get unique categories from menu items
    const categories = ["الكل", ...Array.from(new Set(menuItems.map(item => item.category).filter(Boolean)))];

    return (
        <section id="menu" className="py-16 sm:py-24 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="المنيو الكامل 🥘"
                    description="اختار اللي نفسك فيه من كل الأصناف، أحلى الأكل البيتي عندنا"
                    showBadge={false}
                />

                <div className="flex overflow-x-auto pb-4 pt-2 hide-scrollbar gap-3 mb-10 sm:mb-12 justify-start md:justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-primary-800 text-white border-primary-800 shadow-lg shadow-primary-900/20 transform -translate-y-1'
                                : 'bg-white text-gray-500 border-gray-100 hover:border-primary-200 hover:text-primary-800 hover:bg-primary-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredItems.length === 0 ? (
                    <EmptyState
                        icon="fa-solid fa-utensils"
                        title="لا توجد أكلات في هذا القسم"
                        description="جرب تختار قسم تاني"
                        color="gray"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {filteredItems.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel={item.category}
                                    showChef={true}
                                    chefName={getChefName(item.chef_id)}
                                    themeColor="#8B2525"
                                    isChefOpen={item.chef_is_open ?? true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};