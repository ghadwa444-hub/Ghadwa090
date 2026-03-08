import React from 'react'
import { Box, CartItem, MenuItem, Chef } from '@/core/domain/entities'
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers'
import { PriceDisplay } from '@/presentation/components/shared/PriceDisplay'

interface BoxCardProps {
  box: Box
  cart: CartItem[]
  updateQuantity: (id: number, qty: number, item?: MenuItem) => void
  isOpen: boolean
  chefs?: Chef[]
}

// Helper to get chef name from chef_id
const getChefName = (chefId?: string, chefs: Chef[] = []): string => {
  if (!chefId || !chefs.length) return 'مطبخ';
  const chef = chefs.find(c => c.id === chefId);
  return chef?.chef_name || 'مطبخ';
};

export const BoxCard: React.FC<BoxCardProps> = ({
  box,
  cart,
  updateQuantity,
  isOpen,
  chefs = []
}) => {
  const isActive = box.is_active !== false;
  const canOrder = isOpen && isActive;
  const isKitchenClosed = !isOpen;

  return (
    <div className={`flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group overflow-hidden hover:-translate-y-1 ${!canOrder ? 'grayscale opacity-80' : ''}`}>

      {/* IMAGE SECTION - Aspect Ratio 4:3 for better consistency */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={box.image_url || 'https://via.placeholder.com/400x300?text=Box'}
          alt={box.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          loading="lazy"
        />

        {/* OVERLAY GRADIENT - Subtle gradient at bottom of image for better text readability overlap if needed, or just aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* BADGE - Clean styling */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            عرض مميز
          </span>
        </div>

        {/* Not Available Overlay */}
        {!canOrder && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 backdrop-blur-[1px]">
            <span className="bg-white/95 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
              {isKitchenClosed ? (
                <>
                  <i className="fa-solid fa-shop-lock text-orange-600"></i>
                  المطبخ مغلق
                </>
              ) : (
                <>
                  <i className="fa-solid fa-ban text-red-600"></i>
                  غير متاح
                </>
              )}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex-grow flex flex-col justify-between">

        {/* INFO */}
        <div>
          {/* TITLE */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate leading-tight group-hover:text-[#8B2525] transition-colors">
            {box.name}
          </h3>

          {/* DETAILS ROW - Clean Icons */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-user-group text-gray-400"></i>
              <span>{box.serves ? `يكفي ${box.serves} أفراد` : 'وجبة عائلية'}</span>
            </div>
            {box.items_count && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{box.items_count} أصناف</span>
              </>
            )}
          </div>

          {/* Box Items / Contents */}
          {box.items && box.items.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                <span className="font-medium text-gray-600">يحتوي على: </span>
                {box.items.join(' • ')}
              </p>
            </div>
          )}

          {/* Description (fallback if no items) */}
          {box.description && (!box.items || box.items.length === 0) && (
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {box.description}
            </p>
          )}

          {/* CHEF / KITCHEN INFO - Prioritize box.chef (direct name) over chef_id lookup */}
          {(box.chef || box.chef_id) && (
            <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg w-fit">
              <i className="fa-solid fa-kitchen-set text-[#8B2525]/80 text-xs"></i>
              <span className="text-xs font-medium text-gray-600">
                إعداد: {box.chef || getChefName(box.chef_id, chefs)}
              </span>
            </div>
          )}

        </div>

        {/* FOOTER - Price & Button */}
        <div className="pt-4 mt-2 border-t border-gray-100 flex items-end justify-between gap-4">

          {/* PRICE */}
          <PriceDisplay
            price={box.price}
            size="lg"
            themeColor="#8B2525"
            className="flex-shrink-0"
          />

          {/* BUTTON - Compact but accessible */}
          <div className="flex-1 max-w-[160px]">
            <AddToCartButton
              item={{
                ...box,
                id: box.id,
                chef_id: box.chef_id || (box.chef ? chefs.find(c => c.chef_name === box.chef)?.id : undefined) || undefined,
                chef: getChefName(box.chef_id, chefs) || box.chef || 'مطبخ',
                is_available: box.is_active !== false,
                price: box.price,
                name: box.name
              } as unknown as MenuItem}
              cart={cart}
              updateQuantity={updateQuantity}
              className="w-full !bg-[#8B2525] hover:!bg-[#7A2020] text-white shadow-lg hover:shadow-xl !py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              disabled={!canOrder}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
