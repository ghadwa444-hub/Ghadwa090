import React, { useEffect, useState } from 'react';

export const FloatingOrderButton = ({ onClick }: { onClick: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button after scrolling down 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 left-6 z-50 bg-[#8B2525] hover:bg-[#6b1c1c] text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 animate-bounce-subtle border-2 border-white"
        >
            <span>اطلب دلوقتي</span>
            <i className="fa-solid fa-utensils"></i>
        </button>
    );
};
