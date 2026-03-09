
import React, { useEffect } from 'react';
import { BoxCard } from '@/presentation/features/home/BoxCard';
import { useData } from '@/application/context/DataContext';
import { useCart } from '@/application/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/presentation/components/shared/PageHeader';
import { EmptyState } from '@/presentation/components/shared/EmptyState';

export const BoxesPage: React.FC = () => {
    const { boxes, chefs } = useData();
    const { cart, updateQuantity } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const getChefName = (chefId?: string): string => {
        if (!chefId) return 'مطبخ';
        const chef = chefs.find(c => c.id === chefId);
        return chef?.chef_name || 'مطبخ';
    };

    return (
        <div className="min-h-screen bg-warm-50 pt-24 sm:pt-28 pb-16 sm:pb-20 animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 pattern-dots opacity-5 text-primary-900 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <PageHeader
                    title="بوكسات"
                    highlightedText="بس"
                    description="جمعنالك أحلى الأكلات في بوكسات توفر عليك، تشبعك، وتحلي لمتك مع العيلة والأصحاب."
                />

                {/* Boxes Grid */}
                {boxes.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-300">
                            <i className="fa-solid fa-box-open"></i>
                        </div>
                        <p className="text-xl font-bold text-gray-500 mb-2">قريباً.. بوكسات جديدة</p>
                        <p className="text-sm text-gray-400">انتظروا أقوى العروض والبوكسات قريباً</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {boxes.map(box => {
                            // Use chef_is_open from database, default to true if not available
                            const isOpen = box.chef_is_open;
                            console.log(box);
                            return (
                                <BoxCard
                                    key={box.id}
                                    box={box}
                                    cart={cart}
                                    updateQuantity={updateQuantity}
                                    isOpen={isOpen}
                                    chefs={chefs}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

