
import React, { useEffect, useState } from 'react';
import { UnifiedProductCard } from '@/presentation/features/home/UnifiedProductCard';
import { useData } from '@/application/context/DataContext';
import { useCart } from '@/application/context/CartContext';
import { PageHeader } from '@/presentation/components/shared/PageHeader';

export const MenuPage: React.FC = () => {
    const { menuItems, chefs, categories } = useData();
    const { cart, updateQuantity } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeCategory, setActiveCategory] = useState("الكل");

    const getChefName = (chefId?: string): string => {
        if (!chefId) return 'مطبخ';
        const chef = chefs.find(c => c.id === chefId);
        return chef?.chef_name || 'مطبخ';
    };

    const isChefOpen = (chefId?: string): boolean => {
        if (!chefId) return true;
        const chef = chefs.find(c => c.id === chefId);
        return chef?.is_active !== false;
    };

    // Build category names from DB, with "الكل" first
    const categoryNames = ["الكل", ...categories.map(c => c.name)];

    const filteredItems = (activeCategory === "الكل"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory)
    );

    return (
        <div className="min-h-screen bg-warm-50 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <PageHeader
                    title="المنيو"
                    highlightedText="الكامل"
                    description="اختار اللي نفسك فيه من كل الأصناف، أحلى الأكل البيتي عندنا."
                />

                {/* Categories */}
                <div className="flex overflow-x-auto pb-4 pt-2 hide-scrollbar gap-3 mb-10 sm:mb-12 justify-start md:justify-center">
                    {categoryNames.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-[#8B2525] text-white border-[#8B2525] shadow-lg shadow-[#8B2525]/20 transform -translate-y-1'
                                : 'bg-white text-gray-500 border-gray-100 hover:border-[#8B2525]/30 hover:text-[#8B2525] hover:bg-[#8B2525]/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-300">
                            <i className="fa-solid fa-utensils"></i>
                        </div>
                        <p className="text-xl font-bold text-gray-500 mb-2">لا توجد أكلات في هذا القسم</p>
                        <p className="text-sm text-gray-400">جرب تختار قسم تاني</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {filteredItems.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel={item.category}
                                    badgeColor="bg-[#8B2525]"
                                    showChef={true}
                                    chefName={item.chef}
                                    isChefOpen={item.chef_is_open ?? true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
