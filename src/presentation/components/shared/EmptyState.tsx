import React from 'react';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    color?: string; // e.g., 'primary', 'blue', 'green'
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    actionLabel,
    onAction,
    color = 'gray'
}) => {
    // Map simplified color names to Tailwind classes
    const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
        primary: { bg: 'bg-primary-50', text: 'text-primary-400', border: 'border-primary-100' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-400', border: 'border-blue-100' },
        green: { bg: 'bg-green-50', text: 'text-green-400', border: 'border-green-100' },
        red: { bg: 'bg-red-50', text: 'text-red-300', border: 'border-red-200' },
        gray: { bg: 'bg-gray-50', text: 'text-gray-300', border: 'border-gray-200' },
    };

    const styles = colorClasses[color] || colorClasses.gray;

    return (
        <div className={`text-center py-16 sm:py-20 border-2 border-dashed ${styles.border} rounded-[2rem] bg-white/50 backdrop-blur-sm mx-auto max-w-2xl`}>
            <div className={`w-20 h-20 ${styles.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm`}>
                <i className={`${icon} text-3xl sm:text-4xl ${styles.text}`}></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {title}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto px-4">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="mt-6 text-primary-700 font-bold hover:underline transition-all"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
