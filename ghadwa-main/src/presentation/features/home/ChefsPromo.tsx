import React from 'react';

export const ChefsPromo = () => {
    return (
        <section className="pt-20 pb-0 bg-warm-50 overflow-visible relative z-20">
            <div className="absolute inset-0 pattern-dots opacity-5 text-[#8B2525] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24">

                    {/* Image Side (Left) */}
                    <div className="w-full lg:w-1/2 relative flex justify-center -mb-12 lg:-mb-24">
                        <img
                            src="/images/chafs2.png"
                            alt="Chefs"
                            className="w-full h-auto max-w-full lg:max-w-[130%] object-contain relative z-10 drop-shadow-2xl transform scale-110 lg:scale-125 origin-bottom"
                        />
                    </div>

                    {/* Content Side (Right) */}
                    <div className="w-full lg:w-1/2 text-right">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            شيفات محترفات.. <br />
                            <span className="text-[#8B2525]">أكل يشرّف</span>
                        </h2>

                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl ml-auto font-normal">
                            كل وجبة بتتحضر طازجة مخصوص عشانك، من إيد شيفاتنا اللي بيطبخوا بنفس وطعم البيت الأصلي. نظافة، جودة، وطعم يرجعك لزمان.
                        </p>

                        <button
                            onClick={() => {
                                const menuSection = document.getElementById('menu');
                                if (menuSection) menuSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-10 py-4 bg-[#8B2525] text-white font-bold rounded-2xl hover:bg-[#7a2020] transition-all duration-300 shadow-xl hover:shadow-[#8B2525]/20 hover:-translate-y-1 flex items-center gap-3 w-fit mr-auto lg:mr-0 text-lg"
                        >
                            <span>اختار شيف</span>
                            <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};
