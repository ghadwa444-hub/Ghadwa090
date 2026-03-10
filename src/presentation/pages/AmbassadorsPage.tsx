import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/presentation/components/shared/PageHeader';
import { supabaseDataService } from '@/infrastructure/api/supabaseDataService';

export const AmbassadorsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        socialLink: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ambassadorsList, setAmbassadorsList] = useState<any[]>([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchAmbassadors = async () => {
            const list = await supabaseDataService.getApprovedAmbassadors();
            setAmbassadorsList(list);
        };
        fetchAmbassadors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await supabaseDataService.submitAmbassadorRequest({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                city: formData.city,
                socialLink: formData.socialLink,
                message: formData.message,
                status: 'pending'
            });

            if (success) {
                alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
                setFormData({ name: '', phone: '', email: '', city: '', socialLink: '', message: '' });
            } else {
                alert('حدث مشكلة أثناء الإرسال. الرجاء المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error(error);
            alert('حدث مشكلة أثناء الإرسال. الرجاء المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white min-h-screen pt-28 pb-20 font-sans" dir="rtl">

            <PageHeader
                title="سفراء غدوة"
                description="انضم لفريقنا وكن جزءاً من قصة نجاحنا، شارك الشغف وحقق أرباحك"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-12">

                {/* 1. أبرز مميزات التعاون مع غدوة */}
                <section className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    <div className="w-full md:w-1/2 relative">
                        {/* Decorative background shape */}
                        <div className="absolute inset-0 bg-primary-100 rounded-3xl transform rotate-3 scale-105 z-0"></div>
                        <img
                            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                            alt="مميزات التعاون"
                            className="relative z-10 w-full rounded-2xl shadow-xl object-cover h-[450px]"
                        />
                        {/* Fake Tag/Badge like in reference */}
                        <div className="absolute top-6 right-6 z-20 bg-green-500 text-white p-3 rounded-xl shadow-lg transform rotate-12">
                            <i className="fa-solid fa-heart text-2xl"></i>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-right">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-10 leading-tight">أبرز مميزات التعاون مع<br /><span className="text-primary-600">غدوة</span></h2>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start group">
                                <div className="text-xl text-primary-600 mt-1 bg-primary-50 p-3 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm"><i className="fa-solid fa-chart-line"></i></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">تحقيق الدخل</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">نقدم عمولات مجزية على كل طلب يتم عبر كود الخصم الخاص بك، مما يساهم في زيادة دخلك بشكل مستمر ومستدام.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start group">
                                <div className="text-xl text-primary-600 mt-1 bg-primary-50 p-3 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm"><i className="fa-solid fa-briefcase"></i></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">نمو الحساب</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">توفير وجبات مجانية وهدايا لتجربتها ومشاركتها مع متابعينك لزيادة الثقة والمصداقية، بالإضافة إلى مشاركة محتواك عبر منصاتنا لدعم انتشارك.</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start group">
                                <div className="text-xl text-primary-600 mt-1 bg-primary-50 p-3 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm"><i className="fa-solid fa-headset"></i></div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">دعم إضافي</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">فريق دعم مخصص لتوجيهك ومساعدتك في تطوير محتواك، وتزويدك بأحدث العروض والحملات التسويقية.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <a href="#join-form" className="inline-block px-10 py-4 bg-white border-2 border-primary-600 text-primary-600 font-bold rounded-full hover:bg-primary-600 hover:text-white transition-all shadow-sm text-lg">
                                انضم الان
                            </a>
                            <span className="block text-xs font-normal text-gray-400 mt-3 mr-4">*تطبق الشروط والأحكام</span>
                        </div>
                    </div>
                </section>

                {/* 2. طريقة عمل البرنامج */}
                <section className="bg-white rounded-3xl p-8 md:p-14 shadow-lg border border-gray-100 relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50/50 rounded-full blur-3xl -mr-32 -mt-32 opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -ml-20 -mb-20 opacity-70"></div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-16 text-center relative z-10">طريقة عمل البرنامج</h2>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Vertical Progress Line for Desktop */}
                        <div className="hidden md:block absolute right-[1.6rem] top-8 bottom-12 w-1 bg-gray-100/80 rounded-full"></div>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group relative">
                                <div className="flex-shrink-0 w-14 h-14 bg-white border-4 border-gray-100 group-hover:border-primary-200 rounded-full flex items-center justify-center text-xl text-gray-400 group-hover:text-primary-600 shadow-sm z-20 mx-auto md:mx-0 transition-all duration-300">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </div>
                                <div className="text-center md:text-right flex-1 pt-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">عب النموذج</h3>
                                    <p className="text-gray-500 text-base leading-relaxed">بخطوات بسيطة وسريعة، أدخل بياناتك من خلال النموذج المتاح بالأسفل وسيقوم فريق المراجعة بدراسة طلبك.</p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group relative">
                                <div className="flex-shrink-0 w-14 h-14 bg-white border-4 border-gray-100 group-hover:border-yellow-200 rounded-full flex items-center justify-center text-xl text-gray-400 group-hover:text-yellow-500 shadow-sm z-20 mx-auto md:mx-0 transition-all duration-300">
                                    <i className="fa-solid fa-bullhorn transform -rotate-12 group-hover:scale-110"></i>
                                </div>
                                <div className="text-center md:text-right flex-1 pt-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">راح نتواصل معاك</h3>
                                    <p className="text-gray-500 text-base leading-relaxed">بعد دراسة ملفك وقبوله، سيقوم أحد أعضاء فريق الدعم في التسويق المتخصص بالتواصل المباشر معك لتنسيق كافة التفاصيل وخطة البدء.</p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group relative">
                                <div className="flex-shrink-0 w-14 h-14 bg-white border-4 border-gray-100 group-hover:border-green-200 rounded-full flex items-center justify-center text-xl text-gray-400 group-hover:text-green-500 shadow-sm z-20 mx-auto md:mx-0 transition-all duration-300">
                                    <i className="fa-solid fa-percent group-hover:scale-110"></i>
                                </div>
                                <div className="text-center md:text-right flex-1 pt-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">شارك الكود</h3>
                                    <p className="text-gray-500 text-base leading-relaxed">ابدأ بمشاركة كود الخصم المخصص لك مع متابعينك على شبكات التواصل الاجتماعي وفي محتواك الإبداعي.</p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group relative">
                                <div className="flex-shrink-0 w-14 h-14 bg-white border-4 border-gray-100 group-hover:border-blue-200 rounded-full flex items-center justify-center text-xl text-gray-400 group-hover:text-blue-500 shadow-sm z-20 mx-auto md:mx-0 transition-all duration-300">
                                    <i className="fa-solid fa-gift group-hover:scale-110 group-hover:animate-bounce-slow"></i>
                                </div>
                                <div className="text-center md:text-right flex-1 pt-3">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">مكافآت</h3>
                                    <p className="text-gray-500 text-base leading-relaxed">مع كل طلب يستخدم فيه الكود الخاص بك، ستحصد عمولات ومكافآت مالية وعينية، وتزيد فرصك في الحصول على مزايا حصرية.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. كون جزء من فريقنا (Gallery) */}
                <section>
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-700 text-sm font-bold tracking-wider rounded-full mb-3 shadow-sm border border-primary-100">السفراء</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">كون جزء من فريقنا</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
                        {(showAll ? ambassadorsList : ambassadorsList.slice(0, 4)).map((ambassador, index) => {
                            const link = ambassador.socialLink || '';
                            let iconClass = "fa-link text-blue-500 bg-white p-1 rounded-md text-xs";
                            let handle = link.split('/').pop() || ambassador.name;

                            if (link.includes('instagram.com')) {
                                iconClass = "fa-brands fa-instagram text-pink-500 bg-white p-1 rounded-md text-xs";
                                handle = `@${link.split('instagram.com/')[1]?.split('/')[0] || ambassador.name}`;
                            } else if (link.includes('tiktok.com')) {
                                iconClass = "fa-brands fa-tiktok text-black bg-white p-1 rounded-md text-xs";
                                handle = `${link.split('tiktok.com/')[1]?.split('/')[0] || ambassador.name}`;
                            } else if (link.includes('snapchat.com')) {
                                iconClass = "fa-brands fa-snapchat text-yellow-400 bg-white p-1 rounded-md text-xs";
                                handle = `@${link.split('snapchat.com/add/')[1]?.split('/')[0] || ambassador.name}`;
                            } else if (link.includes('youtube.com') || link.includes('youtu.be')) {
                                iconClass = "fa-brands fa-youtube text-red-600 bg-white p-1 rounded-md text-xs";
                                handle = `${ambassador.name}`;
                            }

                            return (
                                <div key={ambassador.id || index} className={`relative group overflow-hidden rounded-3xl h-64 md:h-[350px] shadow-sm hover:shadow-xl transition-all duration-300 ${index % 2 !== 0 ? 'md:mt-12' : ''}`}>
                                    <img src={ambassador.image_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80"} alt={ambassador.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-5 cursor-pointer">
                                        <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 w-full">
                                            <div className="font-bold text-sm mb-1">{ambassador.name}</div>
                                            <div className="flex items-center gap-2 font-medium text-xs md:text-sm truncate">
                                                <i className={iconClass}></i> <span className="truncate" dir="ltr">{handle}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}

                        {ambassadorsList.length === 0 && (
                            <div className="col-span-2 md:col-span-4 text-center py-20 text-gray-500 bg-gray-50 rounded-3xl border border-gray-100">
                                <i className="fa-solid fa-users text-5xl mb-4 text-gray-300"></i>
                                <h3 className="text-xl font-bold mb-2">قريباً جداً</h3>
                                <p>سيتم الإعلان عن سفرائنا المميزين قريباً.</p>
                            </div>
                        )}
                    </div>

                    {ambassadorsList.length > 4 && !showAll && (
                        <div className="text-center mt-12">
                            <button onClick={() => setShowAll(true)} className="inline-block px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 hover:text-primary-600 transition-all shadow-sm text-sm">
                                عرض جميع السفراء
                            </button>
                        </div>
                    )}
                </section>

                {/* 4. نموذج الانضمام */}
                <section id="join-form" className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-14 shadow-xl border border-gray-100 relative mt-16">
                    <div className="absolute top-0 w-full left-0 h-2 bg-gradient-to-r from-primary-400 via-green-500 to-primary-600 rounded-t-3xl"></div>

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">انضم لسفراء غدوة</h2>
                        <p className="text-gray-500 text-lg">ودك تنضم لفريقنا وتكون السفير لعلامتنا التجارية؟<br />سجل اهتمامك وراح نتواصل معاك في أقرب وقت.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="order-2 md:order-1">
                                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">الاسم <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white text-right shadow-sm"
                                    placeholder="الاسم الكامل"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">رقم الجوال <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-sans" dir="ltr">+20</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white text-left shadow-sm"
                                        placeholder="1000000000"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 text-right">البريد الإلكتروني <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white text-left shadow-sm"
                                placeholder="email@example.com"
                                dir="ltr"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            <div className="order-2 md:order-1">
                                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">المدينة <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white text-right shadow-sm appearance-none"
                                    >
                                        <option value="" disabled>اختر مدينتك</option>
                                        <option value="tanta">طنطا</option>
                                        <option value="cairo">القاهرة</option>
                                        <option value="alex">الإسكندرية</option>
                                        <option value="mansoura">المنصورة</option>
                                        <option value="other">أخرى</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2 text-right">رابط منصتك الرئيسية <span className="text-red-500">*</span></label>
                                <input
                                    type="url"
                                    name="socialLink"
                                    required
                                    value={formData.socialLink}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white text-left shadow-sm"
                                    placeholder="https://instagram.com/..."
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 text-right">نبذة عنك ولماذا تود الانضمام؟</label>
                            <textarea
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-gray-50/50 hover:bg-white resize-none text-right shadow-sm"
                                placeholder="أخبرنا عن نفسك ونوع المحتوى الذي تقدمه..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-4 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(34,197,94,0.5)] text-lg transform ${isSubmitting ? 'bg-gray-400 cursor-not-allowed hidden-shadow' : 'bg-green-500 hover:bg-green-600 hover:shadow-[0_12px_25px_-6px_rgba(34,197,94,0.6)] hover:-translate-y-1'}`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-spinner animate-spin"></i> جاري الإرسال...
                                </div>
                            ) : (
                                "إرسال الطلب"
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-400 mt-6 mt-4">
                            <i className="fa-solid fa-lock ml-1"></i> معلوماتك آمنة ولن يتم مشاركتها مع أطراف خارجية.
                        </p>
                    </form>
                </section>

            </div>
        </div>
    );
};
