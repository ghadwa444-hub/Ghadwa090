
import React from 'react';
import { CartItem, MenuItem } from '@/core/domain/entities';
import { optimizeImage } from '@/utils/imageUtils';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: CartItem[];
    updateQuantity: (id: string | number, qty: number, item?: MenuItem) => void;
    onCheckout: () => void;
    onClearCart: () => void; // Added Prop
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, updateQuantity, onCheckout, onClearCart }) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-slide-in-right">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <i className="fa-solid fa-basket-shopping text-[#8B2525]"></i>
                        سلة المشتريات
                        <span className="text-sm font-normal text-gray-500">({cart.length} منتج)</span>
                    </h2>
                    <div className="flex items-center gap-2">
                        {cart.length > 0 && (
                            <button
                                onClick={onClearCart}
                                className="w-8 h-8 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
                                title="إفراغ السلة"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        )}
                        <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                            <i className="fa-solid fa-xmark text-gray-500"></i>
                        </button>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                            <i className="fa-solid fa-cart-arrow-down text-6xl mb-4 opacity-20"></i>
                            <p className="font-bold text-lg">السلة فاضية!</p>
                            <p className="text-sm">اختار أكل بيتي يفتح النفس 😋</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm relative group">
                                <img src={optimizeImage(item.image_url, 200) || 'https://via.placeholder.com/100x100?text=Product'} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                                        <button onClick={() => updateQuantity(item.id, 0)} className="text-gray-300 hover:text-red-500 transition-colors">
                                            <i className="fa-solid fa-trash-can text-xs"></i>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-[#8B2525] font-bold text-sm">{item.price * item.quantity} ج.م</p>
                                        {item.quantity > 1 && <span className="text-xs text-gray-400">({item.price} ج.م للقطعة)</span>}
                                    </div>
                                    {item.chef && <p className="text-xs text-gray-400 mb-2">من مطبخ: {item.chef}</p>}
                                    <div className="flex items-center gap-3 bg-white shadow-sm w-fit rounded-lg border border-gray-200">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-7 flex items-center justify-center hover:bg-gray-50 rounded-r-lg transition-colors border-l border-gray-100">-</button>
                                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-7 flex items-center justify-center hover:bg-gray-50 rounded-l-lg transition-colors border-r border-gray-100">+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {cart.length > 0 && (
                    <div className="p-5 border-t border-gray-100 bg-gray-50">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>المجموع</span>
                                <span>{total} ج.م</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>التوصيل</span>
                                <span className="text-xs font-bold text-gray-500">يحدد من خدمة العملاء</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                                <span>الإجمالي (بدون توصيل)</span>
                                <span className="text-[#8B2525]">{total} ج.م</span>
                            </div>
                        </div>
                        <button onClick={onCheckout} className="w-full bg-[#8B2525] text-white py-3.5 rounded-xl font-bold hover:bg-[#6b1c1c] transition-colors shadow-lg active:transform active:scale-95">
                            إتمام الطلب
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
