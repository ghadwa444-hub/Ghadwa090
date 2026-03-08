import React, { useState } from 'react';

export const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: 'سارة محمد',
            role: 'ربة منزل',
            comment: 'الأكل تحفة بجد! كأني أنا اللي طبخاه بالظبط، المحشي واخد حقه والبط مستوي ودايب. تسلم إيديكم بجد أنقذتم عزومتي.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 2,
            name: 'أحمد علي',
            role: 'مهندس',
            comment: 'أول مرة أجرب أكل بيتي أونلاين وكنت قلقان، بس بجد النظافة والتغليف ممتازين. الأكل وصل سخن وفي ميعاده بالظبط.',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
        },
        {
            id: 3,
            name: 'منى محمود',
            role: 'موظفة بنك',
            comment: 'فكرة ممتازة وبتوفر وقتي جداً بعد الشغل. المنيو متنوع والشيفات ممتازين. شكراً غدوة على التجربة الجميلة دي.',
            rating: 4,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-[#FFF9F5] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">

                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-6 leading-tight">
                        ناس جربت غاوتنا <span className="text-[#8B2525]">وحبتها ❤️</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-xl">
                        رأي الناس اللي جربت الأكل البيتي من شيفاتنا.. كلامهم هو سر نجاحنا!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {reviews.map((review, index) => (
                        <div key={review.id} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/40 border border-white hover:border-red-50 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-300 transform hover:-translate-y-2 group relative">
                            <div className="absolute top-8 left-8 text-6xl text-gray-100 font-serif opacity-50 group-hover:text-red-50 transition-colors">"</div>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-white shadow-md ring-2 ring-gray-50 group-hover:ring-red-100 transition-all">
                                    <img src={review.image} alt={review.name} className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">{review.name}</h4>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{review.role}</p>
                                </div>
                            </div>

                            <div className="mb-6 relative z-10">
                                <div className="flex text-yellow-400 text-sm mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <i key={i} className="fa-solid fa-star"></i>
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};
