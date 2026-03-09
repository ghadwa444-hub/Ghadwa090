import React from 'react'
import { MenuItem, CartItem, Chef } from '@/core/domain/entities'
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers'
import { SectionTitle } from './SectionTitle'
import { UnifiedProductCard } from './UnifiedProductCard'

interface BestSellersProps {
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    chefs: Chef[];
    bestSellers: MenuItem[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ cart, updateQuantity, chefs, bestSellers }) => {
    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pattern-dots pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="الأكثر طلباً"
                    description="الأكلات اللي الناس حبتها وطلبتها مرة واتنين.. جرب الطعم الأصلي."
                />
                {bestSellers.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 border-2 border-dashed border-yellow-200 rounded-2xl bg-yellow-50">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-yellow-400">
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="text-lg font-bold text-yellow-600 mb-2">لا توجد أكثر الطلبات المشهورة حالياً</p>
                        <p className="text-sm text-yellow-400">سيتم تحديث قائمة الأكثر طلباً قريباً</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bestSellers.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel={item.category || "أصناف"}
                                    badgeIcon="fa-solid fa-utensils"
                                    badgeColor="bg-yellow-500"
                                    showRating={true}
                                    showChef={true}
                                    chefName={item.chef}
                                    isChefOpen={item.chef_is_open ?? true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
};