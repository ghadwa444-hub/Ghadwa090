import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: 'هل أنا ملتزم بعقد؟',
            answer: 'لا، في غدوة مفيش أي عقود طويلة الأمد. تقدر تطلب أي وقت وتحب أي عدد وجبات، والدفع عند الاستلام.'
        },
        {
            question: 'هل يمكنني استبعاد المكونات؟',
            answer: 'طبعاً! لأن كل الأكل بيتحضر طازج مخصوص ليك، تقدر تطلب من الشيف استبعاد أي مكونات بتسببلك حساسية أو مش بتحبها في الملاحظات.'
        },
        {
            question: 'ماذا لو لم تعجبني وجبة في المنيو؟',
            answer: 'المنيو عندنا متنوع جداً وبيجدد كل أسبوع. أكيد هتلاقي حاجات تعجبك، ولو عندك اقتراحات لوصفات جديدة، قولنا وهنحاول نوفرها!'
        },
        {
            question: 'هل يمكنني إدخال معادلات الماكروز الخاصة بي؟',
            answer: 'حالياً بنوفر المعلومات الغذائية الأساسية لكل وجبة. وقريباً هنضيف ميزة تخصيص الوجبات بناءً على السعرات والماكروز الخاصة بيك.'
        },
        {
            question: 'إلى أي مدى يمكنني إجراء تغييرات على طلبي؟',
            answer: 'تقدر تعدل أو تلغي طلبك في أي وقت قبل ما "الشيف يبدأ التحضير" (بيوصلك إشعار بكده). بعد البدء، للأسف مش هينفع نعدل عشان الأكل بيتعمل مخصوص.'
        },
        {
            question: 'إلى متى تبقى الوجبات صالحة للأكل؟',
            answer: 'بما إننا مابنستخدمش مواد حافظة، بننصح بأكل الوجبات في نفس اليوم أو حفظها في التلاجة لمدة 24 ساعة بالكتير لضمان أحلى طعم.'
        },
        {
            question: 'ما هي الزيوت التي تطبخون بها؟',
            answer: 'صحك تهمنا! بنستخدم زيوت نباتية صحية وسمنة بلدي طبيعية حسب نوع الأكل. وبنبعد تماماً عن الزيوت المهدرجة.'
        },
        {
            question: 'ما نوع العبوات التي تأتي بها طعامكم؟',
            answer: 'بنهتم بالبيئة وصحتك، عشان كده بنستخدم عبوات صحية وآمنة للغذاء، وبنحاول نقلل البلاستيك قدر الإمكان.'
        },
        {
            question: 'كيف يمكنني إيقاف اشتراكي مؤقتاً؟',
            answer: 'لو مشترك في باقة أسبوعية أو شهرية، تقدر توقفها مؤقتاً من إعدادات حسابك في أي وقت وتكمل لما تحب.'
        },
    ];

    return (
        <section className="py-24 bg-white font-sans" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left Side (Help Card) - In Arabic RTL this appears on Left visually if flex-row is used, typical RTL puts first bold item on Right */}
                    {/* The design shows FAQ on Right and Card on Left. So in generic RTL layout: 
                        [Right: FAQ] [Left: Card]
                    */}

                    {/* Help Card Section */}
                    <div className="hidden lg:block w-full lg:w-1/3 order-2 lg:order-2">
                        {/* Using order-2 for LTR logic makes it right, but for RTL:
                            flex-row: [Item 1 (Right)] [Item 2 (Left)]
                            We want Content on Right (Item 1) and Card on Left (Item 2).
                         */}
                        <div className="bg-[#FFF5F5] rounded-3xl p-8 text-center sticky top-24">
                            <h3 className="text-xl font-extrabold text-[#8B2525] mb-4">لديك المزيد من الأسئلة؟</h3>
                            <p className="text-gray-600 text-base mb-8 leading-relaxed">
                                ابدأ محادثة مباشرة معنا أو ابحث في الأسئلة للمساعدة
                            </p>

                            {/* Avatars */}
                            <div className="flex justify-center -space-x-4 space-x-reverse mb-8">
                                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="Support" />
                                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="Support" />
                                <img className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" alt="Support" />
                            </div>

                            <button className="bg-[#8B2525] text-white px-8 py-3 rounded-full font-bold hover:bg-[#6b1c1c] transition-colors w-full shadow-lg shadow-red-900/10">
                                تحدث معنا
                            </button>
                        </div>
                    </div>

                    {/* FAQ Content Section */}
                    <div className="w-full lg:w-2/3 order-1 lg:order-1">
                        <div className="mb-12 text-right">
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">ما زلت جائعاً؟</h2>
                            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">راجع الأسئلة الشائعة لدينا</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-[#F8F9FA] rounded-[20px] overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between p-6 text-right cursor-pointer hover:bg-gray-100 transition-colors"
                                    >
                                        <span className="text-base lg:text-lg font-bold text-gray-800 ml-4">
                                            {faq.question}
                                        </span>
                                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#8B2525] text-2xl font-light transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                                            +
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-transparent">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
