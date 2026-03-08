import React from 'react';

interface PriceDisplayProps {
    price: number | string;
    oldPrice?: number | string; // Original price before discount
    size?: 'sm' | 'md' | 'lg';
    themeColor?: string;
    showLabel?: boolean;
    className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
    price,
    oldPrice,
    size = 'md',
    themeColor = '#8B2525',
    showLabel = true,
    className = ''
}) => {

    // Size configurations
    const sizeConfig = {
        sm: {
            value: 'text-lg',
            oldPrice: 'text-sm',
            currency: 'text-xs',
            label: 'text-[10px]'
        },
        md: {
            value: 'text-xl', // Standard for product cards
            oldPrice: 'text-sm',
            currency: 'text-xs',
            label: 'text-[10px]'
        },
        lg: {
            value: 'text-2xl', // Standard for box cards/larger displays
            oldPrice: 'text-base',
            currency: 'text-sm',
            label: 'text-xs'
        }
    };

    const config = sizeConfig[size];

    return (
        <div className={`flex flex-col ${className}`}>
            {showLabel && (
                <span className={`${config.label} text-gray-400 font-bold uppercase tracking-wider mb-0.5`}>
                    السعر
                </span>
            )}
            <div className="flex items-baseline gap-2">
                {/* Old Price (crossed out) */}
                {oldPrice && Number(oldPrice) > Number(price) && (
                    <span className={`${config.oldPrice} text-gray-400 line-through font-medium`}>
                        {oldPrice}
                    </span>
                )}
                {/* Current Price */}
                <span
                    className={`font-black ${config.value} font-serif tracking-tight`}
                    style={{ color: themeColor }}
                >
                    {price}
                </span>
                <span className={`${config.currency} font-bold text-gray-400`}>
                    ج.م
                </span>
            </div>
        </div>
    );
};
