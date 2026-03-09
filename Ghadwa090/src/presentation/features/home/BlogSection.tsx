import React from 'react';

const blogPosts = [
    {
        id: 1,
        title: "أسرار الأكل الصحي",
        excerpt: "نصائح بسيطة عشان تضمني وجبة متكاملة ومغذية لأسرتك كل يوم.",
        date: "١٥ يناير ٢٠٢٦",
        author: "سارة محمد",
        image: "/assets/hero-cover.jpg",
        category: "تغذية"
    },
    {
        id: 2,
        title: "قصص شيفاتنا",
        excerpt: "اعرفي أكتر عن ستات البيوت اللي بيطبخوالك بحب، وازاي بدأوا رحلتهم مع غدوة.",
        date: "١٠ يناير ٢٠٢٦",
        author: "منة الله",
        image: "/images/chafs2.jpg",
        category: "قصص نجاح"
    },
    {
        id: 3,
        title: "سفرة رمضان المميزة",
        excerpt: "أفكار جديدة لعزومات رمضان والمناسبات، عشان سفرتك دايماً تكون جاهزة.",
        date: "٠٥ يناير ٢٠٢٦",
        author: "الشيف فاطمة",
        image: "/assets/delivery-courier.png",
        category: "مطبخ غدوة"
    }
];

export const BlogSection: React.FC = () => {
    return (
        <section className="bg-[#fff7ed] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="flex items-center justify-start mb-12 group cursor-pointer">
                    <h2 className="text-3xl font-bold text-gray-900 ml-3 transition-colors">
                        من مطبخنا ليك
                    </h2>
                    <i className="fa-solid fa-arrow-left text-2xl text-[#8B2525] transition-transform group-hover:-translate-x-2"></i>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100/50">

                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#be123c] z-10 shadow-sm">
                                    {post.category}
                                </span>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#be123c] transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* Meta Data */}
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-1">
                                        <i className="fa-regular fa-user"></i>
                                        <span>بواسطة {post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <i className="fa-regular fa-calendar"></i>
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-end">
                                    <button className="text-[#be123c] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                                        اقرأ المزيد
                                        <i className="fa-solid fa-arrow-left text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-12 text-center lg:hidden">
                    <button className="px-8 py-3 rounded-xl border border-[#be123c] text-[#be123c] font-bold text-sm hover:bg-[#be123c] hover:text-white transition-all duration-300">
                        عرض كل المقالات
                    </button>
                </div>
            </div>
        </section>
    );
};
