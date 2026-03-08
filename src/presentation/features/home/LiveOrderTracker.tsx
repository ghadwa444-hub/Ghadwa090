
import React, { useEffect, useState } from 'react';
import { Order } from '@/core/domain/entities';

interface LiveOrderTrackerProps {
    order: Order;
    onTrackClick: () => void;
}

export const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({ order, onTrackClick }) => {
    const [timeLeft, setTimeLeft] = useState(45); // Default minutes
    const [progress, setProgress] = useState(0);

    // Mock Driver Info
    const driverName = "كابتن أحمد مصطفى";
    const driverPhone = "01xxxxxxxxx";

    useEffect(() => {
        // Update visual state based on status
        switch (order.status) {
            case 'pending':
                setProgress(10);
                setTimeLeft(60);
                break;
            case 'confirmed':
                setProgress(20);
                setTimeLeft(55);
                break;
            case 'preparing':
                setProgress(40);
                setTimeLeft(45);
                break;
            case 'out_for_delivery':
                setProgress(80);
                setTimeLeft(15);
                break;
            case 'delivered':
                setProgress(100);
                setTimeLeft(0);
                break;
            default:
                setProgress(0);
        }
    }, [order.status]);

    if (order.status === 'delivered') return null;

    return (
        <section className="py-8 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden animate-fade-in-up">
                    
                    {/* Background Pattern */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <i className="fa-solid fa-motorcycle text-9xl absolute -bottom-4 -left-4 transform rotate-12"></i>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        
                        {/* Right: Status & Timer */}
                        <div className="flex-1 w-full text-center md:text-right">
                            <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                                <span className="bg-red-500/20 border border-red-500/50 text-red-100 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                    ● بث حي
                                </span>
                                <span className="text-gray-400 text-sm">طلب رقم #{order.id}</span>
                            </div>
                            
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                {order.status === 'pending' && 'طلبك قيد المراجعة 🕒'}
                                {order.status === 'confirmed' && 'تم تأكيد طلبك ✅'}
                                {order.status === 'preparing' && 'الشيف بيجهز طلبك 🔥'}
                                {order.status === 'out_for_delivery' && 'طلبك في الطريق ليك 🛵'}
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">
                                {order.status === 'out_for_delivery' 
                                    ? `الوصول المتوقع خلال ${timeLeft} دقيقة` 
                                    : 'جاري تحضير أشهى الأكلات البيتي عشانك'}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                                <div 
                                    className="bg-[#8B2525] h-3 rounded-full transition-all duration-1000 relative"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 font-bold">
                                <span>تم الطلب</span>
                                <span>التحضير</span>
                                <span>في الطريق</span>
                                <span>الوصول</span>
                            </div>
                        </div>

                        {/* Left: Driver & Actions */}
                        <div className="w-full md:w-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[280px]">
                            {order.status === 'out_for_delivery' ? (
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 text-xl">
                                        <i className="fa-solid fa-user-helmet-safety"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">مندوب التوصيل</p>
                                        <p className="font-bold">{driverName}</p>
                                        <div className="flex text-yellow-400 text-xs gap-1">
                                            <i className="fa-solid fa-star"></i> 4.9
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl animate-spin-slow">
                                        <i className="fa-solid fa-spinner"></i>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">جاري تعيين المندوب</p>
                                        <p className="font-bold">سيظهر قريباً...</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button 
                                    onClick={onTrackClick}
                                    className="flex-1 bg-white text-gray-900 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition shadow-lg"
                                >
                                    التفاصيل الكاملة
                                </button>
                                {order.status === 'out_for_delivery' && (
                                    <a 
                                        href={`tel:${driverPhone}`}
                                        className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-xl text-white hover:bg-green-600 transition shadow-lg"
                                    >
                                        <i className="fa-solid fa-phone"></i>
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
