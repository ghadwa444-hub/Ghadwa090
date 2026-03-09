import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/application/context/DataContext';
import { useCart } from '@/application/context/CartContext';
import { UnifiedProductCard } from '@/presentation/features/home/UnifiedProductCard';
import { MENU_CATEGORIES } from '@/core/constants';

export const ChefMenuPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { chefs, menuItems, boxes } = useData();
    const { cart, updateQuantity } = useCart();

    const [activeCategory, setActiveCategory] = useState("الكل");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Find the chef by ID
    const chef = chefs.find(c => String(c.id) === String(id));

    // Get chef's menu items - check by chef_id OR by chef name
    const chefMenuItems = menuItems.filter(item => {
        // Match by chef_id
        if (item.chef_id && String(item.chef_id) === String(id)) return true;
        // Match by chef name (for items that don't have chef_id)
        if (chef && item.chef && item.chef.toLowerCase() === chef.chef_name?.toLowerCase()) return true;
        return false;
    });

    // Get chef's boxes - check by chef_id OR by chef name
    const chefBoxes = boxes.filter(box => {
        // Match by chef_id
        if (box.chef_id && String(box.chef_id) === String(id)) return true;
        // Match by chef name (for boxes that don't have chef_id)
        if (chef && box.chef && box.chef.toLowerCase() === chef.chef_name?.toLowerCase()) return true;
        return false;
    });

    // Get unique categories from chef's items
    const chefCategories = ["الكل", ...new Set(chefMenuItems.map(item => item.category).filter(Boolean))];

    // Filter by category
    const filteredItems = activeCategory === "الكل"
        ? chefMenuItems
        : chefMenuItems.filter(item => item.category === activeCategory);

    if (!chef) {
        return (
            <div className="min-h-screen bg-warm-50 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fa-solid fa-user-slash text-4xl text-red-300"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">الشيف غير موجود</h2>
                    <p className="text-gray-500 mb-6">عذراً، لم نتمكن من العثور على هذا الشيف</p>
                    <button
                        onClick={() => navigate('/all-chefs')}
                        className="px-6 py-3 bg-[#8B2525] text-white rounded-xl font-bold hover:bg-[#722020] transition"
                    >
                        عرض كل الشيفات
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-warm-50 animate-fade-in">
            {/* Chef Cover Section */}
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                {/* Cover Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: chef.cover_image_url
                            ? `url(${chef.cover_image_url})`
                            : 'linear-gradient(135deg, #8B2525 0%, #5a1818 100%)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-24 right-4 sm:right-8 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition"
                >
                    <i className="fa-solid fa-arrow-right text-gray-700"></i>
                </button>

                {/* Chef Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto flex items-end gap-4 sm:gap-6">
                        {/* Chef Avatar */}
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0">
                            {chef.image_url ? (
                                <img src={chef.image_url} alt={chef.chef_name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#8B2525] flex items-center justify-center">
                                    <i className="fa-solid fa-user-chef text-3xl sm:text-4xl text-white"></i>
                                </div>
                            )}
                        </div>

                        {/* Chef Details */}
                        <div className="flex-1 text-white pb-2">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{chef.chef_name}</h1>
                                {chef.is_active !== false ? (
                                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                        مفتوح للطلب
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                        مغلق حالياً
                                    </span>
                                )}
                            </div>
                            {chef.specialty && (
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm mb-2">
                                    {chef.specialty}
                                </span>
                            )}
                            <div className="flex items-center gap-4 text-sm text-white/80">
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-star text-yellow-400"></i>
                                    {chef.rating?.toFixed(1) || '5.0'}
                                </span>
                                {chef.delivery_time && (
                                    <span className="flex items-center gap-1">
                                        <i className="fa-solid fa-clock"></i>
                                        {chef.delivery_time}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-utensils"></i>
                                    {chefMenuItems.length} طبق
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chef Description */}
            {chef.description && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{chef.description}</p>
                    </div>
                </div>
            )}

            {/* Menu Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <i className="fa-solid fa-utensils text-[#8B2525]"></i>
                    منيو {chef.chef_name}
                </h2>

                {/* Category Tabs */}
                {chefCategories.length > 1 && (
                    <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-3 mb-8">
                        {chefCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as string)}
                                className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all border ${activeCategory === cat
                                    ? 'bg-[#8B2525] text-white border-[#8B2525] shadow-lg shadow-[#8B2525]/20'
                                    : 'bg-white text-gray-500 border-gray-100 hover:border-[#8B2525]/30 hover:text-[#8B2525]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Menu Items Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <div key={item.id} className="h-full">
                                <UnifiedProductCard
                                    item={item}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    badgeLabel={item.category}
                                    badgeColor="bg-[#8B2525]"
                                    showChef={false}
                                    isChefOpen={chef.is_active !== false}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-utensils text-3xl text-gray-300"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد أطباق حالياً</h3>
                        <p className="text-gray-400">هذا الشيف لم يضف أطباق بعد</p>
                    </div>
                )}

                {/* Chef's Boxes Section */}
                {chefBoxes.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <i className="fa-solid fa-box text-[#8B2525]"></i>
                            بوكسات {chef.chef_name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {chefBoxes.map(box => (
                                <div key={box.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                                    <div className="flex items-center gap-4 mb-4">
                                        {box.img && (
                                            <img src={box.img} alt={box.name} className="w-20 h-20 rounded-xl object-cover" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-gray-900">{box.name}</h3>
                                            {box.serves && <p className="text-sm text-gray-500">يكفي {box.serves}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#8B2525]">{box.price} ج.م</span>
                                        <button
                                            onClick={() => updateQuantity(box.id, 1, {
                                                id: String(box.id),
                                                name: box.name,
                                                price: box.price,
                                                image_url: box.img,
                                                chef_id: box.chef_id,
                                                chef: box.chef,
                                                is_available: true,
                                                is_featured: false,
                                                is_offer: false
                                            })}
                                            className="px-4 py-2 bg-[#8B2525] text-white rounded-xl font-bold hover:bg-[#722020] transition flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                            أضف
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
