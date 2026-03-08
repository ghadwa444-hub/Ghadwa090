import React from 'react';

interface HeroProps {
  onNavigate: (page: string) => void;
  onOpenMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenMenu }) => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[90vh] bg-warm-50 flex items-center overflow-hidden pt-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply filter animate-blob"></div>
      <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-warm-200/40 rounded-full blur-3xl opacity-50 mix-blend-multiply filter animate-blob animation-delay-2000"></div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[100px] items-center">

          {/* Content Side */}
          <div className="text-center lg:text-right space-y-6 animate-fade-in-up order-2 lg:order-1 relative z-20">

            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 leading-[1.2] tracking-tight mb-6">
              أكل بيتي.. <br />
              <span className="text-[#8B2525]">زي ما تحبه</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
              مطبوخ بكل حب من بيوت شيفاتنا، يوصلك جاهز على السفرة.
            </p>

            <div className="pt-8">
              <p className="text-xl font-bold text-gray-800 mb-4">قريباً</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/assets/hero/Mobile app store badge-1.png" alt="AppGallery" className="h-10 sm:h-12" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/assets/hero/Mobile app store badge-2.png" alt="App Store" className="h-10 sm:h-12" />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img src="/assets/hero/Mobile app store badge.png" alt="Google Play" className="h-10 sm:h-12" />
                </a>
              </div>
            </div>

          </div>

          {/* Image Side */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center lg:h-auto overflow-visible">
            <div className="relative w-full lg:max-w-[600px] xl:max-w-[700px] flex items-center justify-center z-10">
              <img
                src="/assets/hero/Chefs.png"
                alt="Ghadwa Chefs"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};