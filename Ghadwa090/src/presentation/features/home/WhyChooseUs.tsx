import React from 'react';

// Why Choose Us Section - Features Grid
export const WhyChooseUs: React.FC = () => {
    const features = [
        {
            title: 'طعم رائع',
            description: 'وصفات على طريقة المطاعم، تم اختبارها للحصول على نكهة وطعم لا يقاومان',
            images: [
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
            ],
        },
        {
            title: 'وصفات وأطباق متنوعة',
            description: '39 وصفة أسبوعياً، وأكثر من 25 مطبخاً - لتنوع بخيارات لا حصر لها.',
            images: [
                'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1543826173-70651703c5a4?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
            ],
        },
        {
            title: 'طعام مناسب للعائلة',
            description: 'محبوب من قبل العائلات والأطفال الذين يصعب إرضاؤهم في الطعام، وجبات لجميع المناسبات',
            image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=400&fit=crop',
        },
        {
            title: 'مكونات طازجة وعالية الجودة',
            description: 'من موردين متميزين، منتجات طازجة ولحوم تُحضَّر يومياً',
            image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        ما الذي يميز <span className="text-[#8B2525]">غدوة</span>؟
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group">
                            {/* Image Container */}
                            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg aspect-square bg-gray-100">
                                {feature.images ? (
                                    // Grid of 6 images (3x2)
                                    <div className="grid grid-cols-3 grid-rows-2 h-full gap-1 p-1">
                                        {feature.images.map((img, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={img}
                                                alt={`${feature.title} ${imgIndex + 1}`}
                                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    // Single image
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="text-right">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// How It Works Section - 3 Steps
export const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: 1,
            title: 'اختار أكلك',
            description: 'تصفح المنيو واختار الأكلات اللي تناسبك من بيوت شطار.',
        },
        {
            number: 2,
            title: 'اطلب بسهولة',
            description: 'أضف للسلة واختار وقت التوصيل المناسب ليك.',
        },
        {
            number: 3,
            title: 'استلم طازج وسخن',
            description: 'يوصلك الأكل سخن من إيد ستات بيوت لحد بابك.',
        },
    ];

    return (
        <section className="py-20 bg-warm-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                                alt="طبخ منزلي"
                                className="w-full h-[500px] object-cover"
                            />
                            {/* Decorative overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#8B2525]/30 to-transparent"></div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#8B2525]/10 rounded-full blur-2xl"></div>
                        <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary-100/50 rounded-full blur-3xl"></div>
                    </div>

                    {/* Content Side */}
                    <div className="order-1 lg:order-2 text-right">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                            كيف يعمل؟
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            غدوة بتوصلك أكل بيتي طازج من إيد ستات بيوت شطار، بمكونات طازجة وتحضير يومي.
                        </p>

                        {/* Steps */}
                        <div className="space-y-8">
                            {steps.map((step) => (
                                <div key={step.number} className="flex items-start gap-6">
                                    {/* Step Number */}
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#8B2525] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                                        {step.number}
                                    </div>

                                    {/* Step Content */}
                                    <div className="pt-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="mt-12">
                            <button className="bg-[#8B2525] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#6b1c1c] transition-all duration-300 shadow-xl shadow-red-900/20 flex items-center gap-3 active:scale-95">
                                <span>ابدأ بتناول طعام أفضل</span>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
