import React from 'react';

export const CareersSection: React.FC = () => {
    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="flex items-center justify-start mb-12 group cursor-pointer">
                    <h2 className="text-3xl font-bold text-[#be123c] ml-3 transition-colors group-hover:text-[#9f1239]">
                        الوظائف
                    </h2>
                    <i className="fa-solid fa-arrow-left text-2xl text-[#be123c] transition-transform group-hover:-translate-x-2"></i>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Join Delivery Team Card */}
                    <div className="bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex-1 group">
                        <div className="flex flex-col lg:flex-row h-full">
                            {/* Text Content */}
                            <div className="flex-1 p-8 flex flex-col justify-center order-2 lg:order-1">
                                <h3 className="text-2xl font-bold text-[#be123c] mb-4">
                                    انضم إلى مندوبي التوصيل
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    هل أنت اجتماعي، سريع، وتجيد التنقّل؟ انضم إلى فريق مندوبي التوصيل وابدأ بالكسب الآن!
                                </p>
                                <button className="w-fit px-8 py-3 rounded-xl border-2 border-[#be123c] text-[#be123c] font-bold hover:bg-[#be123c] hover:text-white transition-all duration-300">
                                    تقديم الآن
                                </button>
                            </div>

                            {/* Image */}
                            <div className="w-full lg:w-[40%] h-64 lg:h-auto relative overflow-hidden order-1 lg:order-2">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 lg:hidden"></div>
                                <img
                                    src="/assets/delivery-courier.png"
                                    alt="مندوب توصيل"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Join Our Team Card */}
                    <div className="bg-white rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex-1 group">
                        <div className="flex flex-col lg:flex-row h-full">
                            {/* Text Content */}
                            <div className="flex-1 p-8 flex flex-col justify-center order-2 lg:order-1">
                                <h3 className="text-2xl font-bold text-[#be123c] mb-4">
                                    انضم إلى فريقنا
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    انضم إلى فريق شغوف، مبدع، وبيكبر بسرعة. قدّم الآن وابدأ رحلتك مع غدوة.
                                </p>
                                <button className="w-fit px-8 py-3 rounded-xl border-2 border-[#be123c] text-[#be123c] font-bold hover:bg-[#be123c] hover:text-white transition-all duration-300">
                                    الانتقال إلى صفحة الوظائف
                                </button>
                            </div>

                            {/* Image */}
                            <div className="w-full lg:w-[40%] h-64 lg:h-auto relative overflow-hidden order-1 lg:order-2">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 lg:hidden"></div>
                                <img
                                    src="/images/chafs2.jpg"
                                    alt="فريق العمل"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
