import React, { useEffect } from 'react';
import { MenuItem, CartItem } from '@/core/domain/entities';

interface FavoritesPageProps {
    favorites: MenuItem[];
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    onBack: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, cart, updateQuantity, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#8B2525] font-bold transition">
                    <i className="fa-solid fa-arrow-right"></i> رجوع للرئيسية
                </button>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">المفضلة ❤️</h1>
                {favorites.length === 0 ? (
                    <div className="text-center py-20">
                        <i className="fa-regular fa-heart text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 font-bold">لسه ماضفتش حاجة للمفضلة</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Favorites mapping would go here */}
                    </div>
                )}
            </div>
        </div>
    );
};