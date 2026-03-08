
import React, { useEffect } from 'react';
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers';
import { UnifiedProductCard } from '@/presentation/features/home/UnifiedProductCard';
import { useData } from '@/application/context/DataContext';
import { useCart } from '@/application/context/CartContext';
import { PageHeader } from '@/presentation/components/shared/PageHeader';

export const HealthyPage: React.FC = () => {
    const { healthyItems } = useData();
    const { cart, updateQuantity } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-warm-50 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <PageHeader
                    title="هيلثي &"
                    highlightedText="دايت"
                    description="تشكيلة مميزة من الأكل الصحي، قليل السعرات، والمطبوخ بأعلى معايير الجودة عشان تستمتع بطعم رائع وضمير مرتاح."
                />

                {healthyItems.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-300">
                            <i className="fa-solid fa-carrot"></i>
                        </div>
                        <p className="text-xl font-bold text-gray-500 mb-2">قريباً.. قائمة الهيلثي</p>
                        <p className="text-sm text-gray-400">نجهز لكم أشهى الأطباق الصحية حالياً</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {healthyItems.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel="صحي"
                                    badgeIcon="fa-solid fa-leaf"
                                    badgeColor="bg-green-600"
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


