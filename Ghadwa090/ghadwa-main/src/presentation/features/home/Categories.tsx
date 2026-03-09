import React from 'react';

interface CategoriesProps {
    onCategoryClick: (id: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
    const categories = [
        { id: 'breakfast', name: 'فطار', icon: 'fa-egg', color: 'bg-yellow-100 text-yellow-600' },
        { id: 'lunch', name: 'غداء', icon: 'fa-drumstick-bite', color: 'bg-orange-100 text-orange-600' },
        { id: 'desserts', name: 'حلويات', icon: 'fa-cookie', color: 'bg-pink-100 text-pink-600' },
        { id: 'frozen', name: 'مجمدات', icon: 'fa-snowflake', color: 'bg-blue-100 text-blue-600' },
    ];

    return (
        <section className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar justify-center">
                    {categories.map(cat => (
                        <button 
                            key={cat.id} 
                            onClick={() => onCategoryClick(cat.id)}
                            className="flex flex-col items-center gap-2 min-w-[80px] group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${cat.color}`}>
                                <i className={`fa-solid ${cat.icon}`}></i>
                            </div>
                            <span className="text-sm font-bold text-gray-700">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};