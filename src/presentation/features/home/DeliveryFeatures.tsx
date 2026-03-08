
import React from 'react';

export const DeliveryFeatures: React.FC = () => {
    return (
        <section className="bg-[#FFF9F0] py-20 lg:py-32 relative overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between relative">

                    {/* Visual Side (Right Side) */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mb-16 lg:mb-0 order-1">
                        <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px]">
                            {/* Spiral Dots Background - Concentric Circles effect */}
                            <div className="absolute inset-0 z-0">
                                <svg className="w-full h-full animate-spin-slow-reverse opacity-40" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="250" cy="250" r="160" stroke="#FFB800" strokeWidth="2" strokeDasharray="6 10" />
                                    <circle cx="250" cy="250" r="200" stroke="#FFB800" strokeWidth="2" strokeDasharray="6 10" opacity="0.6" />
                                    <circle cx="250" cy="250" r="240" stroke="#FFB800" strokeWidth="2" strokeDasharray="6 10" opacity="0.3" />
                                </svg>
                            </div>

                            {/* Main Background Circle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[#FCECD8] rounded-full z-10"></div>

                            {/* Image */}
                            <img
                                src="/assets/delivery-features-opt.png"
                                alt="توصيل غدوة"
                                className="relative z-20 w-full h-full object-contain drop-shadow-2xl scale-110 -translate-y-4"
                            />
                        </div>
                    </div>

                    {/* Features Side (Left Side) */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-8 relative order-2 z-30">
                        {/* Connecting Lines SVG Layer - Desktop Only */}
                        <div className="hidden lg:block absolute top-0 -right-[40%] text-transparent pointer-events-none w-full h-full z-0">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                {/* Top Line */}
                                <path d="M 120 40 Q 250 40 380 150" fill="none" stroke="#FDBA74" strokeWidth="2" strokeDasharray="6 6" />
                                {/* Middle Line */}
                                <path d="M 120 180 Q 250 180 360 220" fill="none" stroke="#FDBA74" strokeWidth="2" strokeDasharray="6 6" />
                                {/* Bottom Line */}
                                <path d="M 120 320 Q 250 320 380 290" fill="none" stroke="#FDBA74" strokeWidth="2" strokeDasharray="6 6" />
                            </svg>
                        </div>

                        {/* Feature 1: Fast Delivery -> Delivered Hot */}
                        <div className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 relative z-10 w-full lg:w-[90%] lg:mr-auto border border-gray-100/50">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-fire text-2xl text-orange-500"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">يوصلك سخن وطازة</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        أكلك بيوصلك سخن ومتحافظ عليه لحد باب بيتك، عشان تستمتع بأحلى طعم.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 2: Fresh Groceries -> Authentic Home Food */}
                        <div className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 relative z-10 w-full lg:w-[90%] lg:mr-auto border border-gray-100/50">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-leaf text-2xl text-green-500"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">مكونات طبيعية ١٠٠٪</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        بنختار أجود الخضروات واللحوم الطازجة يومياً، عشان نضمنلك الطعم والجودة.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature 3: Scheduled Delivery -> Order for Gatherings */}
                        <div className="bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 relative z-10 w-full lg:w-[90%] lg:mr-auto border border-gray-100/50">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-calendar-check text-2xl text-red-500"></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">عزومتك جاهزة في وقتها</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        اطلب وجباتك مسبقاً لعزوماتك ومناسباتك، وسيب الباقي علينا.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
