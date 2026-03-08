import React, { useState, useEffect } from 'react';

const FEEDBACK_IMAGES = [
    '/assets/WhatsApp Image 2026-01-17 at 23.05.29 (1).jpeg',
    '/assets/WhatsApp Image 2026-01-17 at 23.05.30.jpeg',
    '/assets/WhatsApp Image 2026-01-17 at 23.05.29 (2).jpeg',
    '/assets/WhatsApp Image 2026-01-17 at 23.05.29.jpeg',
];

export const CustomerFeedback: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % FEEDBACK_IMAGES.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-[#fefce8] py-24 relative overflow-hidden" dir="rtl">
            {/* Background Pattern - Topographic-like lines */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 Q50,50 100,0 V100 H0 Z" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    <path d="M0,20 Q50,70 100,20" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    <path d="M0,40 Q50,90 100,40" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    <path d="M0,60 Q50,110 100,60" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                    <path d="M0,80 Q50,130 100,80" fill="none" stroke="#ca8a04" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

                    {/* Visual Side (Carousel) */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">

                        <div className="relative w-[300px] md:w-[350px] h-[600px] mt-8">
                            {FEEDBACK_IMAGES.map((src, index) => {
                                // Calculate position relative to active index
                                let position = 'opacity-0 translate-x-32 scale-75 z-0'; // Default hidden to right

                                if (index === activeIndex) {
                                    // Active Slide
                                    position = 'opacity-100 translate-x-0 scale-100 z-20';
                                } else if (index === (activeIndex - 1 + FEEDBACK_IMAGES.length) % FEEDBACK_IMAGES.length) {
                                    // Previous Slide (Left bg)
                                    position = 'opacity-40 -translate-x-12 scale-90 z-10 -rotate-3 grayscale';
                                } else if (index === (activeIndex + 1) % FEEDBACK_IMAGES.length) {
                                    // Next Slide (Right bg)
                                    position = 'opacity-40 translate-x-12 scale-90 z-10 rotate-3 grayscale';
                                }

                                return (
                                    <div
                                        key={index}
                                        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center ${position}`}
                                    >
                                        <div className="relative w-full h-full flex items-center justify-center transform transition-transform duration-500 hover:scale-[1.02]">
                                            <img
                                                src={src}
                                                alt={`رأي عميلنا ${index + 1}`}
                                                className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>


                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2 text-center lg:text-right">
                        <span className="text-[#8B2525] font-extrabold tracking-widest text-base uppercase mb-4 block">
                            آراء عملائنا
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
                            ثقة<br />
                            <span className="text-[#8B2525]">نعتز بيها</span>
                        </h2>

                        <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
                            ثقة عملائنا هي أكبر مكسب لينا. كل تعليق بيوصلنا بيفرحنا وبيشجعنا نقدم أحلى وأجود أكل بيتي، معمـول بحب ونظـافة.
                        </p>

                        <button className="inline-flex items-center gap-3 bg-[#8B2525] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-[#7a2020] hover:-translate-y-1 transition-all duration-300 group">
                            <span>شوف باقي الآراء</span>
                            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};
