import React from 'react';

interface CategoryCardProps {
    title: string;
    subtitle: string;
    imageSrc: string; // Background image or illustration
    logoSrc?: string; // Optional logo like talabat mart
    actionText: string;
    href: string;
    colSpan?: string; // e.g., 'col-span-1' or 'col-span-2'
    onNavigate: (page: string) => void;
    brandColor?: string; // Provide a specific hex color or tailwind class
}

const CategoryCard: React.FC<CategoryCardProps> = ({
    title,
    subtitle,
    imageSrc,
    logoSrc,
    actionText,
    href,
    colSpan = 'col-span-1',
    onNavigate,
    brandColor = 'bg-[#E55928]', // A single, vibrant food orange matching Talabat/Ghadwa vibe
}) => {
    return (
        <div
            className={`relative rounded-2xl overflow-hidden flex flex-col group cursor-pointer ${colSpan} shadow-sm hover:shadow-xl transition-all duration-300 min-h-[220px] sm:min-h-[240px] md:min-h-[260px]`}
            onClick={() => onNavigate(href)}
        >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${imageSrc}')` }}
                />

                {/* Top dark gradient overlay so the title is visible */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent" />
            </div>

            {/* Title at top right (RTL logic) */}
            <div className="absolute top-4 right-5 z-10 lg:top-5 lg:right-6">
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-black tracking-tight drop-shadow-md">
                    {title}
                </h3>
            </div>

            {/* Bottom wavy block */}
            <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col">
                <svg viewBox="0 0 500 40" preserveAspectRatio="none" className={`w-full h-6 sm:h-8 ${brandColor} text-current`} style={{ display: 'block' }}>
                    {/* A gentle asymmetrical wave resembling the reference image */}
                    <path d="M0,40 C150,0 350,40 500,10 L500,40 L0,40 Z" fill="currentColor" />
                </svg>
                <div className={`w-full ${brandColor} px-5 pb-5 pt-1 text-white flex flex-col justify-end xl:px-6 xl:pb-6`}>
                    <h4 className="text-sm sm:text-base font-medium mb-3 sm:mb-4 leading-snug line-clamp-2">
                        {subtitle}
                    </h4>

                    <button className="bg-[#2D2D2D] text-white w-fit px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-black transition-colors shadow-sm">
                        {actionText}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface CategoriesGridProps {
    onNavigate: (page: string) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onNavigate }) => {
    const categories = [
        {
            title: 'المنيو',
            subtitle: 'تصفح أكلاتنا المتنوعة اللي ترضي كل الأذواق، محضرة بعناية من شيفاتنا.',
            imageSrc: 'https://images.unsplash.com/photo-1544025162-8111142144dd?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'تصفح المنيو',
            href: 'menu',
            colSpan: 'md:col-span-2 lg:col-span-2',
        },
        {
            title: 'عروض غدوة',
            subtitle: 'اكتشف أقوى العروض والخصومات على وجباتك المفضلة والمزيد.',
            imageSrc: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'قائمة العروض',
            href: 'offers',
            colSpan: 'md:col-span-1 lg:col-span-1',
        },
        {
            title: 'بوكسات',
            subtitle: 'جمعنالك أحلى الأكلات في بوكسات توفر عليك وتحلي لمتك مع العيلة أو الأصحاب.',
            imageSrc: 'https://images.unsplash.com/photo-1596649299486-4cdea56fd59d?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'اطلب بوكس',
            href: 'boxes',
            colSpan: 'md:col-span-1 lg:col-span-1',
        },
        {
            title: 'أكل صحي',
            subtitle: 'دايت أو مهتم بصحتك؟ وجباتنا الصحية لذيذة ومحسوبة السعرات.',
            imageSrc: 'https://images.unsplash.com/photo-1490645935967-10de6ba88061?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'اكتشف الصحي',
            href: 'healthy',
            colSpan: 'md:col-span-1 lg:col-span-1',
        },
        {
            title: 'مجمدات',
            subtitle: 'خلي ثلاجتك جاهزة دايماً مع مجمدات غدوة، سهلة التحضير وطعمها بيتي.',
            imageSrc: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'تسوق المجمدات',
            href: 'frozen',
            colSpan: 'md:col-span-2 lg:col-span-2',
        },
        {
            title: 'الطهاة',
            subtitle: 'تعرف على نخبة طهاة غدوة واطلب من شيفك المفضل مباشرة.',
            imageSrc: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=3000&h=2000&auto=format&fit=crop',
            actionText: 'عرض الطهاة',
            href: 'all-chefs',
            colSpan: 'md:col-span-1 lg:col-span-1',
        }
    ];

    return (
        <section className="py-16 sm:py-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Optional Title for the whole section */}
                <div className="mb-10 text-center md:text-right">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        أقسام <span className="text-[#8B2525]">غدوة</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                        كل اللي تحتاجه من وجبات يومية، عزايم، دايت أو حتى تخزين.. كله موجود في غدوة.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <CategoryCard
                            key={idx}
                            {...cat}
                            onNavigate={onNavigate}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};
