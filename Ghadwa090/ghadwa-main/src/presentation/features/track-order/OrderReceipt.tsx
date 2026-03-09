import React from 'react';
import { Order, MenuItem } from '@/core/domain/entities';

interface OrderReceiptProps {
    order: Order;
    onRateItem?: (item: MenuItem) => void;
}

export const OrderReceipt: React.FC<OrderReceiptProps> = ({ order, onRateItem }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mt-8">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">تفاصيل الفاتورة</h3>
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">العميل:</span>
                    <span className="font-bold">{order.customer_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">العنوان:</span>
                    <span className="font-bold">{order.delivery_address}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">رقم التليفون:</span>
                    <span className="font-bold" dir="ltr">{order.delivery_phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">التاريخ:</span>
                    <span className="font-bold">{new Date(order.created_at).toLocaleDateString('ar-EG')}</span>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 mb-2">الطلبات:</p>
                <div className="space-y-3">
                    {order.itemsDetails && order.itemsDetails.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                            <div>
                                <span className="font-bold text-gray-900">{item.name}</span>
                                <span className="text-gray-500 text-xs mr-2">x{item.quantity}</span>
                            </div>
                            {/* Rating button */}
                            {order.status === 'delivered' && onRateItem && (
                                <button
                                    onClick={() => onRateItem(item)}
                                    className="text-[10px] bg-yellow-50 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-100 transition"
                                >
                                    قيم الآن
                                </button>
                            )}
                        </div>
                    ))}
                    {!order.itemsDetails && <p className="font-bold text-gray-900 text-sm leading-relaxed">{order.items}</p>}
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900">الإجمالي</span>
                    <span className="text-[#8B2525] font-black text-lg">{order.total_amount || order.total} ج.م</span>
                </div>
            </div>
        </div>
    );
};
