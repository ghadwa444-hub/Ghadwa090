import React from 'react';
import { MenuItem, CartItem } from '@/core/domain/entities';
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers';
import { PriceDisplay } from '@/presentation/components/shared/PriceDisplay';

interface UnifiedProductCardProps {
    item: MenuItem;
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;

    // Customization Props
    badgeLabel?: string;
    badgeIcon?: string; // FontAwesome icon class
    badgeColor?: string; // Tailwind color class for badge bg (e.g. 'bg-green-600')
    themeColor?: string; // Hex color for hover text etc. (default: #8B2525)
    borderColor?: string; // Tailwind border class (default: border-gray-100)

    // Feature toggles
    showChef?: boolean;
    chefName?: string;
    showRating?: boolean;
    isChefOpen?: boolean; // Whether the chef's kitchen is accepting orders
}

export const UnifiedProductCard: React.FC<UnifiedProductCardProps> = ({
    item,
    cart,
    updateQuantity,
    badgeLabel,
    badgeIcon,
    badgeColor = 'bg-[#8B2525]',
    themeColor = '#8B2525',
    borderColor = 'border-gray-100',
    showChef = false,
    chefName,
    showRating = false,
    isChefOpen = true // Default to open if not specified
}) => {
    const isOpen = item.is_available;
    const isActive = item.is_active !== false;
    const canOrder = isOpen && isActive && isChefOpen;
    const isKitchenClosed = !isChefOpen;

    return (
        <div className={`group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border ${borderColor} overflow-hidden h-full hover:-translate-y-1 ${!canOrder ? 'grayscale opacity-80' : ''}`}>
            {/* Image Section */}
            <div className="h-56 overflow-hidden relative bg-gray-50">
                <img
                    src={item.image_url || 'https://via.placeholder.com/400x300?text=Ghadwa'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                {(badgeLabel || item.category) && (
                    <div className="absolute top-3 right-3 z-10">
                        <span className={`${badgeColor} backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5`}>
                            {badgeIcon && <i className={`${badgeIcon} text-[10px]`}></i>}
                            {badgeLabel || item.category}
                        </span>
                    </div>
                )}

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

            {/* Content Section */}
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    {/* Chef Info */}
                    {showChef && chefName && (
                        <div className="flex items-center gap-1.5 mb-2">
                            <i className="fa-solid fa-kitchen-set" style={{ color: themeColor }}></i>
                            <span className="text-xs font-medium text-gray-500">شيف {chefName}</span>
                        </div>
                    )}

                    {/* Title */}
                    <h3
                        className="font-bold text-lg text-gray-900 mb-2 truncate transition-colors duration-300"
                        style={{ color: undefined }} /* Let hover effect handle color via group-hover or inline style if needed, 
                                                       but standard styling is safer. Tailwind arbitrary values for hover colors can be tricky with dynamic props.
                                                       We'll stick to a standard hover class or Style properly. */
                    >
                        {/* We use a span to apply the dynamic color on hover effectively or just stick to brand color */}
                        <span className="group-hover:text-[#8B2525] transition-colors">{item.name}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5em]">
                        {item.description || "وجبة شهية ومعدة منزلياً بأعلى معايير الجودة"}
                    </p>

                    {/* Nutrition Information (optional) */}
                    {(item.calories || item.fats || item.protein || item.carbs) && (
                        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl px-3 py-2 mb-3">
                            <div className="flex items-center justify-center gap-2 text-xs flex-wrap">
                                {item.protein && (
                                    <>
                                        <span className="flex items-center gap-1 font-bold text-gray-700">
                                            <span>{item.protein}g</span>
                                            <span className="text-gray-600">البروتين</span>
                                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                        </span>
                                        {(item.carbs || item.fats || item.calories) && <span className="text-gray-300">|</span>}
                                    </>
                                )}
                                {item.carbs && (
                                    <>
                                        <span className="flex items-center gap-1 font-bold text-gray-700">
                                            <span>{item.carbs}g</span>
                                            <span className="text-gray-600">كالوريز</span>
                                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                        </span>
                                        {(item.fats || item.calories) && <span className="text-gray-300">|</span>}
                                    </>
                                )}
                                {item.fats && (
                                    <>
                                        <span className="flex items-center gap-1 font-bold text-gray-700">
                                            <span>{item.fats}g</span>
                                            <span className="text-gray-600">الدهون</span>
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        </span>
                                        {item.calories && <span className="text-gray-300">|</span>}
                                    </>
                                )}
                                {item.calories && (
                                    <span className="flex items-center gap-1 font-bold text-gray-700">
                                        <span>{item.calories}</span>
                                        <span className="text-gray-600">سعرة</span>
                                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Rating */}
                    {showRating && (
                        <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                            <i className="fa-solid fa-star"></i>
                            <span className="text-gray-400 font-medium">(4.8)</span>
                        </div>
                    )}
                </div>

                {/* Footer: Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100 mt-auto gap-3">
                    <PriceDisplay
                        price={item.price}
                        oldPrice={item.old_price}
                        size="md"
                        themeColor={themeColor}
                        className="flex-shrink-0"
                    />

                    <div className="flex-1 max-w-[140px]">
                        <AddToCartButton
                            item={item}
                            cart={cart}
                            updateQuantity={updateQuantity}
                            className={`w-full shadow-lg hover:shadow-xl !py-2.5 !rounded-xl text-xs font-bold transition-all duration-300 transform active:scale-95`}
                            // We will rely on the component's internal default styling which should be solid dark/brand
                            // But we can force background if needed. Ideally AddToCartButton handles it.
                            // Let's force brand color for consistency if the component allows className overrides efficiently.
                            disabled={!canOrder}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
