
import React from 'react';


interface PageHeaderProps {
    title: string;
    highlightedText?: string;
    description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, highlightedText, description }) => {
    return (
        <div className="text-center mb-12 sm:mb-14 relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#8B2525] mb-5 leading-tight tracking-tight">
                {title} {highlightedText && <span className="text-[#8B2525] inline-block relative">
                    {highlightedText}
                </span>}
            </h1>

            {description && (
                <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-4">
                    {description}
                </p>
            )}
        </div>
    );
};
