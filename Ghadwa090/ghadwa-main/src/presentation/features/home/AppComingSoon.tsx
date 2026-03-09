import React from 'react';

export const AppComingSoon: React.FC = () => {
    return (
        <section className="bg-[#fff0f5] py-24 overflow-hidden relative" dir="rtl">
            {/* Background Pattern - Repeated Text */}
            <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none select-none overflow-hidden flex items-center justify-center">
                <div className="transform -rotate-12 scale-150 whitespace-nowrap">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="text-[80px] md:text-[120px] font-black text-[#8B2525] leading-none tracking-widest uppercase" style={{ fontFamily: 'Impact, sans-serif' }}>
                            COMING SOON COMING SOON COMING SOON
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 font-bold text-sm mb-6 border border-rose-100/50">
                            <span>🔥</span>
                            <span>قريباً جداً</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                            تطبيق غدوة.. <br />
                            <span className="text-[#8B2525]">في جيبك</span>
                        </h2>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                            قريباً.. اطلب أكلك المفضل بلمسة واحدة. حمل التطبيق واستمتع بتجربة أسهل وأسرع، وعروض خاصة للتطبيق فقط.
                        </p>

                        {/* Store Buttons (Images) */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <button className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden opacity-80 hover:opacity-100">
                                <img src="/assets/hero/Mobile app store badge.png" alt="Download on the App Store" className="h-[48px] w-auto object-contain" />
                            </button>
                            <button className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden opacity-80 hover:opacity-100">
                                <img src="/assets/hero/Mobile app store badge-1.png" alt="Get it on Google Play" className="h-[48px] w-auto object-contain" />
                            </button>
                            <button className="transition-transform hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden opacity-80 hover:opacity-100">
                                <img src="/assets/hero/Mobile app store badge-2.png" alt="Explore it on AppGallery" className="h-[48px] w-auto object-contain" />
                            </button>
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end order-1 lg:order-2">
                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#fbcfe8] to-transparent rounded-full opacity-30 filter blur-3xl animate-pulse-slow"></div>

                        {/* Phone Mockup */}
                        <div className="relative z-10 w-[260px] sm:w-[300px] lg:w-[340px]">
                            <img
                                src="/Screen 17pro.png"
                                alt="تطبيق غدوة"
                                className="w-full h-auto drop-shadow-2xl"
                            />

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                        <i className="fa-solid fa-check text-green-600 text-lg"></i>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500 font-bold">سهولة في الطلب</div>
                                        <div className="text-sm font-black text-gray-800">100%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
