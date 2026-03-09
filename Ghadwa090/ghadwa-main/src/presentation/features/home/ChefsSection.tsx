
import React from 'react'
import { Chef, Order } from '@/core/domain/entities'
import { SectionTitle } from './SectionTitle'
import { ChefCard } from './ChefCard'

interface ChefsSectionProps {
    onNavigate: (page: string) => void;
    onChefClick: (chef: Chef) => void;
    chefs: Chef[];
    orders?: Order[]; // Optional orders to calculate order count
}

export const ChefsSection: React.FC<ChefsSectionProps> = ({ onNavigate, onChefClick, chefs, orders = [] }) => {
    // Helper function to get order count for a chef
    const getChefOrdersCount = (chefId: string): number => {
        if (!orders || orders.length === 0) return 0;
        return orders.filter(order => {
            if (!order.chef_id || !chefId) return false;
            return String(order.chef_id).trim().toLowerCase() === String(chefId).trim().toLowerCase();
        }).length;
    };
    return (
        <section className="py-16 sm:py-24 bg-warm-50 relative overflow-hidden" id="chefs">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-primary-100 to-transparent"></div>
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="أبطال المطبخ"
                    description="تعرف على أمهر الشيفات اللي بيطبخولك بحب، واختار الشيف اللي يعجبك."
                />

                {chefs.length === 0 ? (
                    <div className="text-center py-16 lg:py-20 border-2 border-dashed border-primary-100 rounded-[2.5rem] bg-white/50 backdrop-blur-sm max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <i className="fa-solid fa-kitchen-set text-4xl text-primary-300"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">لسه مفيش شيفات انضموا</h3>
                        <p className="text-gray-500">جاري تجهيز قائمة بأمهر شيفات مصر!</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
                        {chefs.slice(0, 3).map(chef => (
                            <div key={chef.id} className="w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)]">
                                <ChefCard
                                    chef={chef}
                                    onClick={() => onChefClick(chef)}
                                    ordersCount={getChefOrdersCount(chef.id)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 sm:mt-16">
                    <button
                        onClick={() => onNavigate('all-chefs')}
                        className="group inline-flex items-center gap-2 font-bold text-[#8B2525] bg-white border border-[#8B2525]/20 px-8 py-3 rounded-full hover:bg-[#8B2525]/5 transition-all shadow-sm hover:shadow-md"
                    >
                        <span>عرض كل الشيفات</span>
                        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};
