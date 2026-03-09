import React, { useState, useEffect } from 'react';
import { Order, MenuItem } from '@/core/domain/entities';
import { OrderSearchSection } from '../features/track-order/OrderSearchSection';
import { OrderTimeline } from '../features/track-order/OrderTimeline';
import { OrderReceipt } from '../features/track-order/OrderReceipt';

interface TrackOrderPageProps {
    orders: Order[];
    initialOrderId?: number | null;
    onBack: () => void;
    onRateItem?: (item: MenuItem) => void;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ orders, initialOrderId, onBack, onRateItem }) => {
    const [searchId, setSearchId] = useState(initialOrderId ? String(initialOrderId) : '');
    const [searchPhone, setSearchPhone] = useState('');
    const [searchType, setSearchType] = useState<'id' | 'phone'>('id'); // 'id' or 'phone'
    const [foundOrder, setFoundOrder] = useState<Order | null>(null);
    const [foundOrders, setFoundOrders] = useState<Order[]>([]); // For phone search - multiple orders
    const [searched, setSearched] = useState(false);

    // Get current user ID from localStorage or session
    const getCurrentUserId = (): string | null => {
        try {
            const userStr = localStorage.getItem('ghadwa_user');
            if (userStr) {
                const user = JSON.parse(userStr);
                return user.id || null;
            }
        } catch (e) {
            console.error('Error getting current user:', e);
        }
        return null;
    };

    const currentUserId = getCurrentUserId();

    // Filter orders to show only current user's orders (security fix)
    const userOrders = currentUserId
        ? orders.filter(o => o.customer_id === currentUserId)
        : [];

    useEffect(() => {
        if (initialOrderId) {
            setSearchType('id');
            handleSearchById(String(initialOrderId));
        }
    }, [initialOrderId]);

    const handleSearchById = (id: string) => {
        if (!id) return;
        setSearched(true);
        setFoundOrders([]);
        // Only search in user's orders (security fix)
        const order = userOrders.find(o => String(o.id) === id.trim() || o.order_number === id.trim());
        setFoundOrder(order || null);
    };

    const handleSearchByPhone = (phone: string) => {
        if (!phone) return;
        setSearched(true);
        setFoundOrder(null);
        // Normalize phone number (remove spaces, dashes, etc.)
        const normalizedPhone = phone.trim().replace(/[\s\-\(\)]/g, '');

        // Search only in user's orders (security fix)
        const matchingOrders = userOrders.filter(o => {
            const deliveryPhone = o.delivery_phone?.replace(/[\s\-\(\)]/g, '') || '';
            const customerPhone = o.customer_phone?.replace(/[\s\-\(\)]/g, '') || '';
            const legacyPhone = o.phone?.replace(/[\s\-\(\)]/g, '') || '';

            return deliveryPhone.includes(normalizedPhone) ||
                customerPhone.includes(normalizedPhone) ||
                legacyPhone.includes(normalizedPhone);
        });

        setFoundOrders(matchingOrders);

        // If only one order found, show it directly
        if (matchingOrders.length === 1) {
            setFoundOrder(matchingOrders[0]);
            setFoundOrders([]);
        }
    };

    const handleSearch = () => {
        if (searchType === 'id') {
            handleSearchById(searchId);
        } else {
            handleSearchByPhone(searchPhone);
        }
    };

    const handleReset = () => {
        setSearchPhone('');
        setSearchId('');
        setFoundOrder(null);
        setFoundOrders([]);
        setSearched(false);
    };

    const clearSearch = () => {
        setFoundOrder(null);
        setFoundOrders([]);
        setSearched(false);
        setSearchId('');
        setSearchPhone('');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4">
                <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#8B2525] font-bold transition">
                    <i className="fa-solid fa-arrow-right"></i> رجوع للرئيسية
                </button>

                {!foundOrder ? (
                    /* Search and History View */
                    <>
                        <OrderSearchSection
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchId={searchId}
                            setSearchId={setSearchId}
                            searchPhone={searchPhone}
                            setSearchPhone={setSearchPhone}
                            handleSearch={handleSearch}
                            onReset={handleReset}
                        />

                        {searched && !foundOrder && foundOrders.length === 0 && (
                            <div className="text-center py-8 bg-red-50 rounded-2xl border border-red-100 mb-8 animate-fade-in">
                                <p className="text-red-600 font-bold">
                                    {searchType === 'id'
                                        ? 'ملقناش طلب بالرقم ده، اتأكد من الرقم وحاول تاني.'
                                        : 'ملقناش طلبات برقم الهاتف ده، اتأكد من الرقم وحاول تاني.'}
                                </p>
                            </div>
                        )}

                        {/* Multiple Orders Found (Phone Search) */}
                        {foundOrders.length > 1 && (
                            <div className="mb-8 animate-fade-in">
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
                                    <p className="text-blue-700 font-bold text-center">
                                        <i className="fa-solid fa-info-circle ml-2"></i>
                                        تم العثور على {foundOrders.length} طلب برقم الهاتف هذا
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    {foundOrders.map(order => (
                                        <div
                                            key={order.id}
                                            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group"
                                            onClick={() => {
                                                setFoundOrder(order);
                                                setFoundOrders([]);
                                            }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#8B2525] font-bold text-sm group-hover:bg-[#8B2525] group-hover:text-white transition-colors">
                                                        {order.order_number ? `#${order.order_number.split('-').pop()}` : `#${String(order.id).slice(0, 8)}`}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 mb-1">{order.total_amount || order.total || 0} ج.م</p>
                                                        <p className="text-xs text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleDateString('ar-EG') : '-'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold block mb-1 w-fit ml-auto ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'preparing' ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status === 'delivered' ? 'مكتمل' :
                                                            order.status === 'out_for_delivery' ? 'مع الطيار' :
                                                                order.status === 'preparing' ? 'جاري التحضير' : 'قيد الانتظار'}
                                                    </span>
                                                    <button className="text-[#8B2525] text-sm font-bold hover:underline">
                                                        عرض التفاصيل →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Past Orders List */}
                        <div className="mt-8 border-t border-gray-100 pt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-clock-rotate-left text-[#8B2525]"></i>
                                طلباتك السابقة
                            </h3>

                            {userOrders.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <i className="fa-solid fa-clipboard-list text-4xl mb-3 opacity-20"></i>
                                    <p>لسه معملتش أي طلبات، اطلب دلوقتي واستمتع بأحلى أكل بيتي!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userOrders.map(order => (
                                        <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group">
                                            <div className="flex justify-between items-center mb-3" onClick={() => setFoundOrder(order)}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-[#8B2525] font-bold text-sm group-hover:bg-[#8B2525] group-hover:text-white transition-colors">
                                                        {order.order_number ? `#${order.order_number.split('-').pop()}` : `#${String(order.id).slice(0, 8)}`}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 mb-1 line-clamp-1">{order.total_amount || order.total || 0} ج.م</p>
                                                        <p className="text-xs text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleDateString('ar-EG') : '-'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold block mb-1 w-fit ml-auto ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'preparing' ? 'bg-orange-100 text-orange-700' :
                                                                    order.status === 'confirmed' ? 'bg-purple-100 text-purple-700' :
                                                                        'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {order.status === 'delivered' ? 'مكتمل' :
                                                            order.status === 'out_for_delivery' ? 'مع الطيار' :
                                                                order.status === 'preparing' ? 'جاري التحضير' :
                                                                    order.status === 'confirmed' ? 'مؤكد' :
                                                                        'قيد الانتظار'}
                                                    </span>
                                                    <span className="font-bold text-[#8B2525] text-sm">{order.total_amount || order.total || 0} ج.م</span>
                                                </div>
                                            </div>

                                            {/* Order Details & Review Buttons */}
                                            {order.status === 'delivered' && order.itemsDetails && order.itemsDetails.length > 0 && onRateItem && (
                                                <div className="border-t border-gray-50 pt-3 mt-3">
                                                    <p className="text-xs font-bold text-gray-500 mb-2">قيم وجباتك:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {order.itemsDetails.map((item, idx) => (
                                                            <button
                                                                key={`${order.id}-${idx}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onRateItem(item);
                                                                }}
                                                                className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-yellow-100 transition"
                                                            >
                                                                <i className="fa-regular fa-star"></i> قيم {item.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* Found Order Timeline View */
                    <div className="animate-fade-in-up">
                        <button
                            onClick={clearSearch}
                            className="mb-6 text-sm font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1"
                        >
                            <i className="fa-solid fa-arrow-right"></i> بحث عن طلب آخر
                        </button>

                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                            {/* Status Header */}
                            <div className={`text-white p-6 text-center ${foundOrder.status === 'delivered' ? 'bg-green-600' :
                                    foundOrder.status === 'out_for_delivery' ? 'bg-blue-600' :
                                        'bg-[#8B2525]'
                                }`}>
                                <p className="text-white/80 text-sm mb-1">
                                    {foundOrder.order_number ? `طلب رقم ${foundOrder.order_number}` : `طلب رقم #${String(foundOrder.id).slice(0, 8)}`}
                                </p>
                                <h2 className="text-2xl font-bold">
                                    {foundOrder.status === 'delivered' ? 'تم التوصيل بنجاح 🎉' :
                                        foundOrder.status === 'out_for_delivery' ? 'طلبك مع الطيار وفي الطريق ليك 🛵' :
                                            foundOrder.status === 'preparing' ? 'الشيف بيجهز طلبك 👩‍🍳' :
                                                'طلبك وصل وقيد المراجعة 🕒'}
                                </h2>
                            </div>

                            {/* Timeline Component */}
                            <OrderTimeline status={foundOrder.status} />

                            {/* Receipt Component */}
                            <OrderReceipt order={foundOrder} onRateItem={onRateItem} />

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

