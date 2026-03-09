
import React from 'react';
import { CartItem, MenuItem } from '@/core/domain/entities';

interface AddToCartButtonProps {
    item: MenuItem;
    cart: CartItem[];
    updateQuantity: (id: string | number, qty: number, item?: MenuItem) => void;
    className?: string;
    disabled?: boolean;
    isLarge?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, cart, updateQuantity, className = "", disabled = false, isLarge = false }) => {
    // Normalize IDs for comparison (handle both string and number IDs)
    const cartItem = cart.find(i => String(i.id) === String(item.id));
    const count = cartItem ? cartItem.quantity : 0;

    if (disabled) {
        return (
            <button
                disabled
                className={`bg-gray-100 text-gray-400 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2 border border-gray-200 ${className}`}
            >
                المطبخ مغلق
                <i className="fa-solid fa-lock text-xs"></i>
            </button>
        );
    }

    if (count === 0) {
        return (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, 1, item);
                }}
                className={`bg-gray-900 text-white rounded-xl font-bold hover:bg-[#8B2525] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-red-900/20 active:scale-95 ${className}`}
            >
                أضف للسلة
                <i className="fa-solid fa-cart-shopping"></i>
            </button>
        );
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-between bg-[#8B2525] text-white rounded-xl overflow-hidden font-bold shadow-lg animate-fade-in ${className} ${isLarge ? 'text-lg' : ''}`}
            style={{ padding: 0, minHeight: '44px' }}
        >
            <button
                onClick={() => updateQuantity(item.id, count + 1, item)}
                className={`w-1/3 h-full flex items-center justify-center hover:bg-[#6b1c1c] transition-colors active:bg-[#4a1313] py-2 ${isLarge ? 'text-xl' : 'text-base'}`}
                type="button"
            >
                <i className="fa-solid fa-plus"></i>
            </button>
            <span className={`w-1/3 text-center flex items-center justify-center ${isLarge ? 'text-2xl font-black' : 'text-base font-bold'}`} style={{ minHeight: '44px' }}>
                {count}
            </span>
            <button
                onClick={() => updateQuantity(item.id, count - 1, item)}
                className={`w-1/3 h-full flex items-center justify-center hover:bg-[#6b1c1c] transition-colors active:bg-[#4a1313] py-2 ${isLarge ? 'text-xl' : 'text-base'}`}
                type="button"
            >
                <i className={count === 1 ? 'fa-solid fa-trash' : 'fa-solid fa-minus'} ></i>
            </button>
        </div>
    );
};

interface AdminStatsCardProps {
    title: string;
    value: string;
    icon?: string;
    color?: string;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-between group cursor-default">
        <div className='flex flex-col gap-1'>
            <p className="text-gray-500 text-sm font-bold transition-colors">{title}</p>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
        </div>
        {icon && (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110 ${color || 'bg-gray-50 text-gray-500'}`}>
                <i className={icon}></i>
            </div>
        )}
    </div>
);

export const LoadingScreen = () => (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center animate-fade-in">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-2xl animate-bounce bg-white border border-gray-100">
            <img src="/favicon/android-chrome-512x512.png" alt="شعار غدوة" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">غدوة</h2>
        <p className="text-gray-600 font-semibold mb-2">أكل بيتي يوصلك لحد بابك</p>
        <p className="text-gray-500 animate-pulse">جاري تحضير السفرة...</p>
    </div>
);
