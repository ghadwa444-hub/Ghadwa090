import React from 'react';
import { MenuItem, CartItem } from '@/core/domain/entities';
import { UnifiedProductCard } from './UnifiedProductCard';
import { SectionTitle } from './SectionTitle';
import { EmptyState } from '@/presentation/components/shared/EmptyState';

interface WeeklyOffersProps {
    offers: MenuItem[];
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
}

export const WeeklyOffers: React.FC<WeeklyOffersProps> = ({ offers, cart, updateQuantity }) => {
    return (
        <section id="weekly-offers" className="py-12 sm:py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-5 text-orange-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="عروض الأسبوع 🔥"
                    description="وفري مع أقوى العروض الحصرية على أشهى الأكلات البيتي"
                />

                {offers.length === 0 ? (
                    <EmptyState
                        icon="fa-solid fa-tag"
                        title="مفيش عروض حالياً"
                        description="تابعينا دايماً عشان تلحقي عروضنا الجديدة!"
                        color="orange"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {offers.map(item => (
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
                )}
            </div>
        </section>
    );
};
