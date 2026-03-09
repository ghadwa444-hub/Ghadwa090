import React from 'react'
import { MenuItem, CartItem, Chef } from '@/core/domain/entities'
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers'
import { SectionTitle } from './SectionTitle'
import { UnifiedProductCard } from './UnifiedProductCard'
import { EmptyState } from '@/presentation/components/shared/EmptyState'

interface HealthySectionProps {
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    healthyItems: MenuItem[];
}

export const HealthySection: React.FC<HealthySectionProps> = ({ cart, updateQuantity, healthyItems }) => {
    return (
        <section className="py-12 sm:py-16 bg-green-50/50 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pattern-leaves pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="هيلثي & دايت"
                    description="أكل صحي، خفيف، ومحسوب السعرات.. عشان صحتك تهمنا."
                />

                {healthyItems.length === 0 ? (
                    <EmptyState
                        icon="fa-solid fa-carrot"
                        title="قريباً.. قائمة الهيلثي"
                        description="نجهز لكم أشهى الأطباق الصحية حالياً"
                        color="green"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </section>
    )
}
