import React from 'react';

export const Features = () => {
    return (
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pattern-dots opacity-5 text-[#8B2525] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                        إزاي تطلب <span className="text-[#8B2525] relative inline-block">
                            أكل بيتي؟
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" /></svg>
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed">
                        رحلة طلبك من مطبخ الشيف لحد سفرتك في 3 خطوات بس.. أسهل مما تتخيل!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Step 1 */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="relative mb-6">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="/images/step-1.png"
                                    alt="اختار أكلتك"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8B2525] text-white text-xl font-bold rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                                1
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">اختار أكلتك</h3>
                        <p className="text-gray-500 text-base leading-relaxed text-center px-4">
                            قلب في المنيو واختار من بين مئات الأصناف البيتي اللي بتطبخها أشطر ستات بيوت.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative mb-6">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="/images/step-2.png"
                                    alt="تتطبخ طازة ليك"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8B2525] text-white text-xl font-bold rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                                2
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">تتطبخ طازة ليك</h3>
                        <p className="text-gray-500 text-base leading-relaxed text-center px-4">
                            بمجرد ما تطلب، الشيف بتبدأ تجهز أكلك مخصوص ليك عشان يوصلك طازة وسخن.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="relative mb-6">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="/images/step-3.png"
                                    alt="استلم واستمتع"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#8B2525] text-white text-xl font-bold rounded-full flex items-center justify-center border-4 border-white shadow-lg z-10">
                                3
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">استلم واستمتع</h3>
                        <p className="text-gray-500 text-base leading-relaxed text-center px-4">
                            مندوبنا هيوصلك الطلب في أسرع وقت، سخن وجاهز على الأكل علطول.. وبالهنا والشفا!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}