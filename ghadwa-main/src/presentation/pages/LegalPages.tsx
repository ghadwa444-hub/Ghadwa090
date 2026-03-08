import React, { useEffect } from 'react';

interface PageProps {
    onNavigate: (page: string) => void;
}

// FAQ Page
export const FAQPage: React.FC<PageProps> = ({ onNavigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqs = [
        {
            question: 'إيه هي غدوة؟',
            answer: 'غدوة هي منصة توصيل أكل بيتي من إيد ستات بيوت شطار. بنوصلك أكل طازج ونظيف زي أكل البيت بالظبط.'
        },
        {
            question: 'إزاي أطلب من غدوة؟',
            answer: 'تقدر تتصفح المنيو، تختار الأكلات اللي تحبها، تضيفها للسلة، وتكمل الطلب. هنوصلك في أسرع وقت.'
        },
        {
            question: 'إيه مواعيد التوصيل؟',
            answer: 'بنوصل يومياً من الساعة 10 الصبح لحد 10 بالليل. ممكن تختار الوقت المناسب ليك وقت الطلب.'
        },
        {
            question: 'إزاي أدفع؟',
            answer: 'حالياً الدفع عند الاستلام (كاش). قريباً هنضيف الدفع الإلكتروني.'
        },
        {
            question: 'لو الأكل وصل فيه مشكلة أعمل إيه؟',
            answer: 'تواصل معانا فوراً على الواتساب وهنحل المشكلة في أسرع وقت. رضاك أولويتنا.'
        },
        {
            question: 'هل الأكل طازج؟',
            answer: 'أيوه! كل الأكل بيتحضر طازج يوم بيوم من مطابخ الشيفات. مفيش أكل مخزن أو مجمد.'
        },
        {
            question: 'أقدر ألغي الطلب؟',
            answer: 'تقدر تلغي الطلب قبل ما يبدأ التحضير. بعد كده للأسف مش هينفع لأن الأكل بيتحضر طازج مخصوص ليك.'
        },
        {
            question: 'في حد أدنى للطلب؟',
            answer: 'لا، مفيش حد أدنى. تقدر تطلب أي حاجة تحبها.'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-[#8B2525] font-bold mb-8 hover:gap-3 transition-all"
                >
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>العودة للرئيسية</span>
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">الأسئلة الشائعة</h1>
                    <p className="text-gray-500 text-lg">كل اللي محتاج تعرفه عن غدوة</p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-gray-900 hover:bg-gray-50 transition-colors">
                                <span>{faq.question}</span>
                                <i className="fa-solid fa-chevron-down text-[#8B2525] group-open:rotate-180 transition-transform duration-300"></i>
                            </summary>
                            <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center bg-[#8B2525]/5 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">مش لاقي إجابة سؤالك؟</h3>
                    <p className="text-gray-500 mb-6">تواصل معانا وهنرد عليك في أسرع وقت</p>
                    <a
                        href="https://wa.me/201109318581"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#8B2525] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6b1c1c] transition-colors"
                    >
                        <i className="fa-brands fa-whatsapp text-lg"></i>
                        <span>تواصل على الواتساب</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

// Terms of Service Page
export const TermsPage: React.FC<PageProps> = ({ onNavigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-[#8B2525] font-bold mb-8 hover:gap-3 transition-all"
                >
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>العودة للرئيسية</span>
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">شروط الاستخدام</h1>
                    <p className="text-gray-500">آخر تحديث: يناير 2024</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. مقدمة</h2>
                        <p className="text-gray-600 leading-relaxed">
                            مرحباً بك في غدوة. باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام المنصة.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. الخدمات</h2>
                        <p className="text-gray-600 leading-relaxed">
                            غدوة هي منصة توصيل أكل بيتي. نحن نربط بين العملاء والطهاة المنزليين. نحن لسنا مسؤولين عن جودة الطعام بشكل مباشر، لكننا نسعى لضمان أعلى معايير الجودة من خلال اختيار الطهاة بعناية.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. الطلبات والدفع</h2>
                        <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                            <li>جميع الأسعار بالجنيه المصري وشاملة الضريبة</li>
                            <li>الدفع يتم عند الاستلام (كاش)</li>
                            <li>لا يمكن إلغاء الطلب بعد بدء التحضير</li>
                            <li>رسوم التوصيل يتم احتسابها حسب المنطقة</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. الإلغاء والاسترداد</h2>
                        <p className="text-gray-600 leading-relaxed">
                            يمكنك إلغاء طلبك قبل بدء التحضير فقط. في حالة وجود مشكلة في الطلب، يرجى التواصل معنا فوراً وسنعمل على حلها.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. حقوق الملكية</h2>
                        <p className="text-gray-600 leading-relaxed">
                            جميع المحتويات والعلامات التجارية والتصاميم في هذا الموقع مملوكة لغدوة ولا يجوز استخدامها دون إذن مسبق.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. التواصل</h2>
                        <p className="text-gray-600 leading-relaxed">
                            لأي استفسارات حول هذه الشروط، يمكنك التواصل معنا عبر الواتساب أو البريد الإلكتروني.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

// Privacy Policy Page
export const PrivacyPage: React.FC<PageProps> = ({ onNavigate }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-[#8B2525] font-bold mb-8 hover:gap-3 transition-all"
                >
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>العودة للرئيسية</span>
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">سياسة الخصوصية</h1>
                    <p className="text-gray-500">آخر تحديث: يناير 2024</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">1. جمع البيانات</h2>
                        <p className="text-gray-600 leading-relaxed">
                            نحن نجمع البيانات الضرورية لتقديم خدماتنا، بما في ذلك:
                        </p>
                        <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside mt-3">
                            <li>الاسم ورقم الهاتف</li>
                            <li>عنوان التوصيل</li>
                            <li>تفاصيل الطلبات السابقة</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">2. استخدام البيانات</h2>
                        <p className="text-gray-600 leading-relaxed">
                            نستخدم بياناتك لـ:
                        </p>
                        <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside mt-3">
                            <li>توصيل الطلبات</li>
                            <li>التواصل معك بخصوص طلباتك</li>
                            <li>تحسين خدماتنا</li>
                            <li>إرسال العروض والتحديثات (بموافقتك)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">3. حماية البيانات</h2>
                        <p className="text-gray-600 leading-relaxed">
                            نحن نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">4. مشاركة البيانات</h2>
                        <p className="text-gray-600 leading-relaxed">
                            لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
                        </p>
                        <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside mt-3">
                            <li>مع الطهاة لتحضير طلبك</li>
                            <li>مع خدمة التوصيل لإيصال طلبك</li>
                            <li>عند الاقتضاء القانوني</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">5. حقوقك</h2>
                        <p className="text-gray-600 leading-relaxed">
                            لديك الحق في الوصول إلى بياناتك أو تصحيحها أو حذفها. للقيام بذلك، يرجى التواصل معنا.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">6. التواصل</h2>
                        <p className="text-gray-600 leading-relaxed">
                            لأي استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: ghadwa444@gmail.com
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
