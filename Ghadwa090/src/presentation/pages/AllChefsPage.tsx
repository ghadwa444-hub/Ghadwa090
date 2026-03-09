

import React, { useState, useMemo, useEffect } from 'react';
import { ChefCard } from '@/presentation/features/home/ChefCard';
import { useData } from '@/application/context/DataContext';
import { PageHeader } from '@/presentation/components/shared/PageHeader';
import { useNavigate } from 'react-router-dom';

export const AllChefsPage: React.FC = () => {
    const { chefs, orders } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper function to get order count for a chef
    const getChefOrdersCount = (chefId: string): number => {
        if (!orders || orders.length === 0) return 0;
        return orders.filter(order => {
            if (!order.chef_id || !chefId) return false;
            return String(order.chef_id).trim().toLowerCase() === String(chefId).trim().toLowerCase();
        }).length;
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState<boolean | null>(null);

    // Filter chefs based on search and status
    const filteredChefs = useMemo(() => {
        return chefs.filter(chef => {
            const matchesSearch =
                chef.chef_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (chef.specialty?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (chef.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());

            const matchesStatus =
                filterOpen === null ||
                chef.is_active === filterOpen;

            return matchesSearch && matchesStatus;
        });
    }, [chefs, searchTerm, filterOpen]);

    return (
        <div className="min-h-screen bg-warm-50 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-in relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <PageHeader
                    title="كل الشيفات "
                    highlightedText="المميزين"
                    description={`اختاري الشيف اللي يعجبك أكلها واستمتعي بأحلى أكل بيتي، نضيف، وصحي، ومطبوخ بكل حب. (${filteredChefs.length} شيف متاح لخدمتك)`}
                />

                {/* Search & Filter Section */}
                <div className="mb-12 flex flex-col lg:flex-row gap-5">
                    {/* Search Input */}
                    <div className="flex-1 relative group">
                        <input
                            type="text"
                            placeholder="دوري على اسم شيف، أكلة، أو تخصص..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#8B2525] focus:ring-4 focus:ring-[#8B2525]/10 transition-all text-base placeholder-gray-400 group-hover:border-[#8B2525]/30"
                        />
                        <i className="fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#8B2525] transition-colors"></i>
                    </div>

                    {/* Status Filter */}
                    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                        <button
                            onClick={() => setFilterOpen(null)}
                            className={`px-6 py-3.5 rounded-2xl font-bold transition-all text-sm whitespace-nowrap ${filterOpen === null
                                ? 'bg-[#8B2525] text-white shadow-lg shadow-[#8B2525]/20 transform -translate-y-1'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#8B2525] hover:bg-[#8B2525]/5'
                                }`}
                        >
                            الكل
                        </button>
                        <button
                            onClick={() => setFilterOpen(true)}
                            className={`px-6 py-3.5 rounded-2xl font-bold transition-all text-sm whitespace-nowrap flex items-center gap-2 ${filterOpen === true
                                ? 'bg-green-600 text-white shadow-lg shadow-green-900/20 transform -translate-y-1'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-green-200 hover:bg-green-50'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${filterOpen === true ? 'bg-green-300' : 'bg-green-500'}`}></span>
                            مفتوح للطلب
                        </button>
                        <button
                            onClick={() => setFilterOpen(false)}
                            className={`px-6 py-3.5 rounded-2xl font-bold transition-all text-sm whitespace-nowrap flex items-center gap-2 ${filterOpen === false
                                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20 transform -translate-y-1'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-red-200 hover:bg-red-50'
                                }`}
                        >
                            <span className={`w-2 h-2 rounded-full ${filterOpen === false ? 'bg-red-300' : 'bg-red-500'}`}></span>
                            مغلق حالياً
                        </button>
                    </div>
                </div>

                {/* Chefs Grid */}
                {filteredChefs.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
                        {filteredChefs.map((chef) => (
                            <div key={chef.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                                <ChefCard
                                    chef={chef}
                                    onClick={() => navigate(`/chef/${chef.id}`)}
                                    ordersCount={getChefOrdersCount(chef.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[2.5rem] bg-white/50 backdrop-blur-sm">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-face-frown-open text-4xl text-red-300"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            مفيش شيفات بالمواصفات دي
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            جربي تغيري كلمات البحث أو شيلي الفلاتر عشان تشوفي كل شيفاتنا المميزين
                        </p>
                        <button
                            onClick={() => { setSearchTerm(''); setFilterOpen(null); }}
                            className="mt-6 text-primary-700 font-bold hover:underline"
                        >
                            عرض كل الشيفات
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

