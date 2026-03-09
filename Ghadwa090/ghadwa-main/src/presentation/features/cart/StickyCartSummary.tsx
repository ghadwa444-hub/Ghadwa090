import React from 'react';
import { CartItem } from '@/core/domain/entities';
import { useNavigate } from 'react-router-dom';

interface StickyCartSummaryProps {
    cart: CartItem[];
    onOpenCart?: () => void; // Optional now, not used
}

export const StickyCartSummary: React.FC<StickyCartSummaryProps> = ({ cart }) => {
    const navigate = useNavigate();

    if (cart.length === 0) return null;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleClick = () => {
        navigate('/checkout');
    };

    return (
        <div
            onClick={handleClick}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 p-4 md:hidden cursor-pointer hover:bg-gray-50 transition-colors"
        >
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="bg-[#8B2525] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {totalItems}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">مجموع الطلبات</span>
                        <span className="font-bold text-gray-900">{totalPrice} ج.م</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[#8B2525] font-bold">
                    <span>عرض السلة</span>
                    <i className="fa-solid fa-chevron-left"></i>
                </div>
            </div>
        </div>
    );
};
