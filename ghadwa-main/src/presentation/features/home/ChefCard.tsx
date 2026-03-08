import React from 'react';
import { Chef } from '@/core/domain/entities';

interface ChefCardProps {
  chef: Chef;
  onClick: () => void;
  ordersCount?: number; // Number of orders for this chef
}

export const ChefCard: React.FC<ChefCardProps> = ({ chef, onClick, ordersCount = 0 }) => {
  const handleClick = () => {
    if (chef.is_active) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 ${chef.is_active ? 'cursor-pointer' : 'cursor-not-allowed opacity-90 grayscale-[0.8]'
        }`}
    >
      {/* Cover Image */}
      <div className="h-48 overflow-hidden relative bg-gray-100">
        <img
          src={chef.cover_image_url || chef.image_url || 'https://via.placeholder.com/400x300?text=Chef'}
          alt={`${chef.chef_name} cover`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        {/* Status Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm border flex items-center gap-1.5 ${chef.is_active
          ? 'bg-white/95 text-green-700 border-green-200'
          : 'bg-gray-900/90 text-white border-gray-700'
          }`}>
          <span className={`w-2 h-2 rounded-full ${chef.is_active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          {chef.is_active ? 'مفتوح للطلب' : 'مغلق الآن'}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
          <i className="fa-solid fa-star text-yellow-400"></i>
          <span>{chef.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Avatar Container - Centered and Overlapping */}
      <div className="relative px-6 -mt-12 flex justify-center mb-2">
        <div className="w-24 h-24 rounded-full border-[5px] border-white shadow-lg overflow-hidden bg-white z-10 relative group-hover:scale-105 transition-transform duration-300">
          <img
            src={chef.image_url || 'https://via.placeholder.com/100x100?text=Chef'}
            alt={chef.chef_name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex-grow flex flex-col text-right">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8B2525] transition-colors">
          {chef.chef_name}
        </h3>

        <div className="flex justify-start mb-4">
          <span className="inline-block px-3 py-1 rounded-lg bg-[#8B2525]/5 text-[#8B2525] text-xs font-bold border border-[#8B2525]/10">
            {chef.specialty || 'أكل بيتي متنوع'}
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-6 min-h-[40px]">
          {chef.description || 'بقدم أحلى الأكلات البيتي بنفس ومذاق زمان. اطلب وجرب بنفسك!'}
        </p>

        <div className="mt-auto">
          {/* Stats Row */}
          <div className="flex items-center justify-center gap-6 mb-5 text-sm text-gray-400 font-medium py-3 border-t border-dashed border-gray-100">
            <div className="flex items-center gap-1.5" title="عدد الطلبات">
              <i className="fa-solid fa-receipt text-[#8B2525]/60"></i>
              <span>{ordersCount} طلب</span>
            </div>
            <div className="w-px h-4 bg-gray-200"></div>
            <div className="flex items-center gap-1.5" title="وقت التسليم">
              <i className="fa-solid fa-clock text-[#8B2525]/60"></i>
              <span>60 دقيقة</span>
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${chef.is_active
              ? 'bg-[#8B2525] text-white hover:bg-[#7A2020] hover:shadow-lg hover:-translate-y-0.5'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!chef.is_active}
          >
            {chef.is_active ? (
              <>
                <span>عرض المنيو</span>
                <i className="fa-solid fa-utensils"></i>
              </>
            ) : (
              <>
                <i className="fa-solid fa-lock"></i>
                <span>غير متاح</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

