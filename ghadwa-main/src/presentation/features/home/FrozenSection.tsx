import React from 'react'
import { MenuItem, CartItem } from '@/core/domain/entities'
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers'
import { SectionTitle } from './SectionTitle'
import { UnifiedProductCard } from './UnifiedProductCard'
import { EmptyState } from '@/presentation/components/shared/EmptyState'

interface FrozenSectionProps {
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    frozenItems: MenuItem[];
}

export const FrozenSection: React.FC<FrozenSectionProps> = ({ cart, updateQuantity, frozenItems }) => {
    return (
        <section className="py-12 sm:py-16 bg-blue-50/30 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="جاهز على التسوية"
                    description="وفري وقتك ومجهودك.. منتجات مجهزة على السوا وتتبيلة بيتي أصلية."
                />

                {frozenItems.length === 0 ? (
                    <EmptyState
                        icon="fa-regular fa-snowflake"
                        title="قريباً.. قسم المفرزنات"
                        description="نجهز لكم أفضل المنتجات للتسوية المنزلية"
                        color="blue"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {frozenItems.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel="تجهيز بيتي"
                                    badgeIcon="fa-regular fa-snowflake"
                                    badgeColor="bg-blue-600"
                                    isChefOpen={item.chef_is_open ?? true}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
