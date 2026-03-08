import React, { useState } from 'react';

export const HelpWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'home' | 'messages' | 'help'>('home');

    // Team members (using chef avatars for branding)
    const teamMembers = [
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=100&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=100&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
    ];

    const helpCollections = [
        { title: 'الاشتراكات', subtitle: 'كيف يعمل اشتراك غدوة؟', count: 8 },
        { title: 'كيف نعمـل', subtitle: 'ماذا يوجد داخل الصندوق؟', count: 4 },
        { title: 'الدفـع', subtitle: 'طرق الدفع المقبولة', count: 6 },
        { title: 'التوصيـل', subtitle: 'أسئلة حول التوصيل', count: 8 },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans" dir="rtl">
            {/* Widget Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col transition-all duration-300 animate-fade-in-up h-[600px]">

                    {/* Header */}
                    <div className="bg-gradient-to-br from-[#8B2525] to-[#D64545] p-8 text-white relative overflow-hidden shrink-0">
                        {/* Background Shapes */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-2">
                                    <h2 className="font-bold text-2xl">أهلاً بك 👋</h2>
                                </div>
                                <div className="flex -space-x-3 space-x-reverse">
                                    {teamMembers.map((img, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#8B2525] overflow-hidden bg-white">
                                            <img src={img} alt="Team" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-3xl font-black mb-1">كيف يمكننا مساعدتك؟</h3>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors"
                        >
                            <i className="fa-solid fa-times text-xl"></i>
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto bg-gray-50/50 relative">
                        {activeTab === 'home' && (
                            <div className="p-4 space-y-4">
                                {/* Ask a question box */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">اسأل سؤالاً</h4>
                                            <p className="text-sm text-gray-500">فريقنا والذكاء الاصطناعي جاهزين</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-red-50 text-[#8B2525] flex items-center justify-center group-hover:bg-[#8B2525] group-hover:text-white transition-colors">
                                            <i className="fa-solid fa-paper-plane text-sm"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="ابحث عن مساعدة..."
                                        className="w-full pl-4 pr-10 py-3 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#8B2525] shadow-sm"
                                    />
                                    <i className="fa-solid fa-search absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                </div>

                                {/* Collections */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {helpCollections.map((item, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition cursor-pointer flex justify-between items-center group"
                                        >
                                            <div>
                                                <h5 className="font-bold text-gray-900 text-sm">{item.title}</h5>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                                            </div>
                                            <i className="fa-solid fa-chevron-left text-gray-300 text-xs group-hover:text-[#8B2525] transition-colors"></i>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-regular fa-comments text-2xl"></i>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-1">لا توجد محادثات</h4>
                                <p className="text-sm">رسائلك مع الفريق ستظهر هنا</p>
                                <button className="mt-6 bg-[#8B2525] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-900/20">
                                    ابدأ محادثة
                                </button>
                            </div>
                        )}

                        {activeTab === 'help' && (
                            <div className="p-4 space-y-4">
                                <h4 className="font-bold text-gray-900 px-2">جميع المقالات</h4>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <i className="fa-regular fa-file-lines text-gray-400"></i>
                                                <span className="text-sm font-medium text-gray-700">كيفية إعداد الوجبات؟</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Nav */}
                    <div className="bg-white border-t border-gray-100 p-2 flex justify-around items-center shrink-0">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-colors ${activeTab === 'home' ? 'text-[#8B2525]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <i className={`text-lg ${activeTab === 'home' ? 'fa-solid fa-house' : 'fa-solid fa-house'}`}></i>
                            <span className="text-[10px] font-bold">الرئيسية</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-colors relative ${activeTab === 'messages' ? 'text-[#8B2525]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <div className="relative">
                                <i className={`text-lg ${activeTab === 'messages' ? 'fa-solid fa-comment-dots' : 'fa-solid fa-comment-dots'}`}></i>
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </div>
                            <span className="text-[10px] font-bold">الرسائل</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('help')}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-colors ${activeTab === 'help' ? 'text-[#8B2525]' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <i className={`text-lg ${activeTab === 'help' ? 'fa-solid fa-circle-question' : 'fa-solid fa-circle-question'}`}></i>
                            <span className="text-[10px] font-bold">مساعدة</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Launcher Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative z-50 ${isOpen ? 'bg-white text-[#8B2525] rotate-90' : 'bg-[#8B2525] text-white'
                    }`}
            >
                {isOpen ? (
                    <i className="fa-solid fa-chevron-down text-xl"></i>
                ) : (
                    <>
                        <i className="fa-solid fa-comment-dots text-2xl"></i>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-[#fff9f5] flex items-center justify-center">
                            1
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};
