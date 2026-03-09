import React from 'react';
import { CartItem, PromoCode } from '@/core/domain/entities';

interface OrderSummaryProps {
    cart: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    promoInput: string;
    setPromoInput: (code: string) => void;
    appliedPromo: PromoCode | null;
    promoError: string;
    handleApplyPromo: () => void;
    handleRemovePromo: () => void;
    onPlaceOrder: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
    cart,
    subtotal,
    discount,
    total,
    promoInput,
    setPromoInput,
    appliedPromo,
    promoError,
    handleApplyPromo,
    handleRemovePromo,
    onPlaceOrder
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-black text-gray-900 mb-6 text-center border-b border-gray-100 pb-4">ملخص الطلب</h2>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar">
                {cart.map(item => (
                    <div key={item.id} className="flex gap-3 items-start">
                        <img src={item.image_url || 'https://via.placeholder.com/100x100?text=Product'} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-1">{item.name}</h4>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>الكمية: {item.quantity}</span>
                                <span className="font-bold text-gray-900">{item.price * item.quantity} ج.م</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{item.price} ج.م / قطعة</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Promo Code Input */}
            <div className="mb-6 pt-4 border-t border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-3">كوبون الخصم</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className={`flex-1 bg-gray-50 border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition font-medium ${promoError ? 'border-red-500' : 'border-gray-200 focus:border-[#8B2525]'}`}
                        placeholder="أدخل الكود هنا"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        disabled={!!appliedPromo}
                    />
                    {appliedPromo ? (
                        <button
                            type="button"
                            onClick={handleRemovePromo}
                            className="bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-red-200 transition shrink-0"
                        >
                            حذف
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition shrink-0"
                        >
                            تطبيق
                        </button>
                    )}
                </div>
                {promoError && <p className="text-red-500 text-xs mt-2 font-medium">{promoError}</p>}
                {appliedPromo && <p className="text-green-600 text-xs mt-2 font-bold">✓ تم تطبيق كود {appliedPromo.code} بنجاح!</p>}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-bold text-gray-900">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">مصاريف التوصيل</span>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">يحدد لاحقاً</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                        <span className="font-medium">الخصم ({appliedPromo?.code})</span>
                        <span className="font-bold">- {discount} ج.م</span>
                    </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 mt-3">
                    <span className="text-gray-700 font-bold">الإجمالي</span>
                    <span className="text-2xl font-black text-[#8B2525]">{total} ج.م</span>
                </div>
                <p className="text-xs text-gray-400 text-center">* بدون مصاريف التوصيل</p>
            </div>

            <button
                type="button"
                onClick={onPlaceOrder}
                className="w-full bg-[#8B2525] text-white py-4 rounded-xl font-black text-lg hover:bg-[#6b1c1c] transition-colors shadow-lg shadow-red-900/20 mt-6"
            >
                تأكيد الطلب ({total} ج.م)
            </button>
        </div>
    );
};
