
import React, { useEffect } from 'react';
import { UnifiedProductCard } from '@/presentation/features/home/UnifiedProductCard';
import { useData } from '@/application/context/DataContext';
import { useCart } from '@/application/context/CartContext';
import { PageHeader } from '@/presentation/components/shared/PageHeader';
import { EmptyState } from '@/presentation/components/shared/EmptyState';

export const OffersPage: React.FC = () => {
    const { offers } = useData();
    const { cart, updateQuantity } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-warm-50 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <PageHeader
                    title="عروض"
                    highlightedText="الأسبوع"
                    description="وفري مع أقوى العروض الحصرية على أشهى الأكلات البيتي. اطلبي دلوقتي واستمتعي بالطعم الأصلي بأفضل سعر."
                />

                {/* Offers Grid */}
                {offers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {offers.map((item) => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel="عرض مميز"
                                    badgeIcon="fa-solid fa-fire"
                                    badgeColor="bg-orange-600"
                                    showChef={true}
                                    chefName={item.chef}
                                    isChefOpen={item.chef_is_open ?? true}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon="fa-solid fa-tag"
                        title="مفيش عروض حالياً"
                        description="تابعينا دايماً عشان تلحقي عروضنا الجديدة!"
                        color="red"
                    />
                )}
            </div>
        </div>
    );
};
