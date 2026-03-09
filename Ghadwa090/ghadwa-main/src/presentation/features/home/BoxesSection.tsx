
import React from 'react'
import { Box, CartItem, MenuItem, Chef } from '@/core/domain/entities'
import { BoxCard } from './BoxCard'
import { SectionTitle } from './SectionTitle'

interface BoxesSectionProps {
  boxes: Box[]
  cart: CartItem[]
  updateQuantity: (id: number, qty: number, item?: MenuItem) => void
  chefs?: Chef[] // Add chefs prop to lookup chef names
}

export const BoxesSection: React.FC<BoxesSectionProps> = ({
  boxes,
  cart,
  updateQuantity,
  chefs = []
}) => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionTitle
          title="بوكسات بس"
          description="جمعنالك أحلى الأكلات في بوكسات توفر عليك وتحلي لمتك."
        />

        {/* RESPONSIVE GRID: 1 col (mobile) → 2 cols (tablet) → 3 cols (lg) → 4 cols (xl) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {boxes.map(box => {
            console.log(box)
            // Use chef_is_open from database, default to true if not available
            const isOpen = box.chef_is_open ?? true;

            return (
              <BoxCard
                key={box.id}
                box={box}
                cart={cart}
                updateQuantity={updateQuantity}
                isOpen={isOpen}
                chefs={chefs}
              />
            )
          })}
        </div>

        {/* EMPTY STATE */}
        {boxes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">لا توجد بوكسات متاحة حالياً</p>
          </div>
        )}
      </div>
    </section>
  )
}
