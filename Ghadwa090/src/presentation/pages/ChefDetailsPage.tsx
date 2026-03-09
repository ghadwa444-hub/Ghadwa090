
import React, { useState, useEffect } from 'react';
import { Chef, CartItem, MenuItem } from '@/core/domain/entities';
import { AddToCartButton } from '@/presentation/components/ui/UIHelpers';

interface ChefDetailsPageProps {
    chef: Chef;
    onBack: () => void;
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    meals: MenuItem[]; // New prop for dynamic meals
}

export const ChefDetailsPage: React.FC<ChefDetailsPageProps> = ({ chef, onBack, cart, updateQuantity, meals }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Filter meals for this chef if not already filtered by parent, 
    // though parent (App.tsx) usually handles this.
    // We assume 'meals' passed here are already specific or we filter them to be safe.
    // Since App.tsx will pass filtered list, we can use it directly.
    const chefMeals = meals;

    const [activeTab, setActiveTab] = useState('menu'); // 'menu', 'reviews', 'info'

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 animate-fade-in">
            {/* Header Image (Cover) */}
            <div className="h-64 md:h-80 w-full relative">
                <img src={chef.cover_image_url || chef.image_url || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'} alt={`${chef.chef_name} cover`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <button onClick={onBack} className="absolute top-8 right-8 bg-white/20 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition z-10 border border-white/30">
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32">
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white shadow-lg -mt-16 md:-mt-20 bg-white overflow-hidden shrink-0">
                            <img src={chef.image_url || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80'} alt={chef.chef_name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                        {chef.chef_name}
                                        <i className="fa-solid fa-circle-check text-blue-500 text-xl" title="شيف موثق"></i>
                                    </h1>
                                    <p className="text-[#8B2525] font-bold text-lg mt-1">{chef.specialty || 'شيف محترف'}</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="text-center bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                                        <div className="font-bold text-green-700 text-lg">{chef.is_active ? 'مفتوح' : 'مغلق'}</div>
                                        <div className="text-xs text-green-600">الحالة</div>
                                    </div>
                                    <div className="text-center bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                                        <div className="font-bold text-yellow-700 text-lg flex items-center justify-center gap-1">
                                            {chef.rating || 5.0} <i className="fa-solid fa-star text-sm"></i>
                                        </div>
                                        <div className="text-xs text-yellow-600">التقييم</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed max-w-3xl">{chef.description || 'شيف متخصص في تقديم أشهى الأطباق بجودة عالية'}</p>

                            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"><i className="fa-regular fa-clock"></i> يوميًا 10ص - 10م</span>
                                <span className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-lg"><i className="fa-solid fa-truck-fast"></i> توصيل خلال 30-45 دقيقة</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center justify-center gap-8 mt-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`pb-4 font-bold text-lg transition relative ${activeTab === 'menu' ? 'text-[#8B2525]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        قائمة الطعام
                        {activeTab === 'menu' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B2525] rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`pb-4 font-bold text-lg transition relative ${activeTab === 'reviews' ? 'text-[#8B2525]' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        آراء العملاء
                        {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8B2525] rounded-t-full"></div>}
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === 'menu' ? (
                        <>
                            {chefMeals.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                    {chefMeals.map(meal => (
                                        <div key={meal.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition group h-full">
                                            <div className="w-32 h-32 shrink-0 rounded-xl overflow-hidden relative">
                                                <img src={meal.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'} alt={meal.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-bold text-gray-900 text-lg">{meal.name}</h3>
                                                        <span className="font-bold text-[#8B2525] text-lg">{meal.price} ج.م</span>
                                                    </div>
                                                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{meal.description}</p>
                                                </div>
                                                <div className="flex items-end justify-between">
                                                    <div className="text-xs text-gray-400">
                                                        <div className="flex items-center gap-1 mb-1"><i className="fa-regular fa-clock"></i> {meal.time || "45 د"}</div>
                                                    </div>
                                                    <AddToCartButton item={{ ...meal, chef: chef.chef_name }} cart={cart} updateQuantity={updateQuantity} className="h-10 px-6" disabled={!chef.is_active} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                                        <i className="fa-solid fa-utensils"></i>
                                    </div>
                                    <p className="text-gray-500 font-bold">الشيف لسه مضافش وجبات</p>
                                    <p className="text-sm text-gray-400">تابعونا قريبًا</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm animate-fade-in">
                            <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">تقييم ممتاز {chef.rating || 5.0}</h3>
                            <p className="text-gray-500 mt-2">قريبًا هنعرض آراء العملاء</p>

                            {/* Reviews will be dynamically loaded from database in future */}
                            <div className="mt-8 text-gray-400">
                                <i className="fa-regular fa-comment-dots text-4xl mb-3"></i>
                                <p>لا توجد تقييمات بعد</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
