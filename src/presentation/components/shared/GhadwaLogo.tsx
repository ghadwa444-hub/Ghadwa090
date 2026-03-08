import React from 'react';

interface GhadwaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showText?: boolean;
  textPosition?: 'below' | 'right';
  animated?: boolean;
}

export const GhadwaLogo: React.FC<GhadwaLogoProps> = ({
  size = 'md',
  showText = false,
  textPosition = 'below',
  animated = false,
}) => {
  const sizeClasses = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
    '3xl': 'w-32 h-32',
  };

  const animationClass = animated ? 'animate-bounce' : '';

  const logo = (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-lg overflow-hidden ${animationClass}`}
    >
      <img src="/favicon/android-chrome-512x512.png" alt="شعار غدوة" className="w-full h-full object-contain" />
    </div>
  );

  if (!showText) {
    return logo;
  }

  if (textPosition === 'below') {
    return (
      <div className="flex flex-col items-center gap-2">
        {logo}
        <div className="text-center">
          <h3 className="font-bold text-gray-900">غدوة</h3>
          <p className="text-sm text-gray-600">أكل بيتي</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {logo}
      <div>
        <h3 className="font-bold text-gray-900">غدوة</h3>
        <p className="text-sm text-gray-600">أكل بيتي يوصلك لحد بابك</p>
      </div>
    </div>
  );
};
