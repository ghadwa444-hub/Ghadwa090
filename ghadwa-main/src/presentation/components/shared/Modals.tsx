import React, { useState } from "react";
import { MENU_CATEGORIES } from '@/core/constants';
import { MenuItem } from '@/core/domain/entities';
import { logger } from '@/infrastructure/logging/logger';

// --- Auth Modal ---
// AuthModal Removed

// --- Menu Modal ---
interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = (type: string) => {
    // For now using the same image for both as only one was provided
    // In production, these should point to actual PDF/Image files
    const fileUrl = "/menu-preview.png";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `منيو-غدوة-${type}.png`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const menuItems = [
    {
      id: 1,
      name: 'فلافل برو ماكس',
      description: '4 ساندوتشات.. بوكس الفلافل اللي بيجمع بين نكهة الحمص الأصلية والبطاطس',
      price: 99,
      imageIcon: '🥙' // Placeholder icon or small image
    },
    {
      id: 2,
      name: 'بطاطس اكسترم',
      description: '5 ساندوتشات.. بوكس البطاطس المخصص لعشاق الفطار الخفيف اللي ليه شخصية',
      price: 99,
      imageIcon: '🍟'
    },
    {
      id: 3,
      name: 'الميكس',
      description: '3 ساندوتشات.. بوكس الميكس المتكامل، فلافل + بطاطس + كبدة. اختيار مناسب للي بيزهق وعايز يمكس',
      price: 99,
      imageIcon: '🥪'
    },
    {
      id: 4,
      name: 'كبدة الفراخ',
      description: '2 ساندوتشات.. بوكس الكبدة المخصص لعشاق الطعم التقيل. كبدة فراخ متشوحة على النار',
      price: 99,
      imageIcon: '🥘'
    }
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>

      <div className="bg-[#FFF8F0] w-full max-w-6xl rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl animate-fade-in flex flex-col md:flex-row-reverse h-[85vh]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 z-30 w-10 h-10 bg-white/80 hover:bg-white text-[#8B2525] rounded-full flex items-center justify-center transition-all shadow-sm font-bold"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* Content Side (Left in RTL - Main Menu Items) */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#8B2525]/10 -z-10"></div>
            <div className="inline-block bg-[#FFF8F0] px-6 relative z-10">
              <h2 className="text-5xl font-thin tracking-widest text-[#2c3e35] uppercase mb-1" style={{ fontFamily: 'serif' }}>MENU</h2>
              <p className="text-[#d87c4f] font-handwriting text-2xl -rotate-2 transform">بوكسات الفطار</p>
            </div>
          </div>

          {/* Grid Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {menuItems.map((item) => (
              <div key={item.id} className="relative group">
                {/* Decorative shape */}
                <div className="hidden absolute -bottom-4 -left-4 w-12 h-12 bg-[#c17a46] rounded-tl-[2rem] rounded-br-[1rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex gap-4 items-start">

                  {/* Price Badge */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 rounded-full bg-[#9e3939] text-white flex flex-col items-center justify-center border-4 border-[#FFF8F0] shadow-md z-20 relative">
                      <span className="font-bold text-xl leading-none">{item.price}</span>
                      <span className="text-[10px] leading-none">جنيه</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#1f2937] group-hover:text-[#8B2525] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed pl-4">
                      {item.description}
                    </p>
                    <div className="w-12 h-1 bg-[#d87c4f]/30 rounded-full mt-2 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Decoration */}
          <div className="mt-16 text-center opacity-40">
            <img src="/ghadwa-logo.png" alt="Decoration" className="w-16 mx-auto filter grayscale" />
          </div>
        </div>

        {/* Sidebar (Right in RTL - Download Options) */}
        <div className="w-full md:w-[320px] bg-transparent h-full md:border-l-2 border-[#8B2525]/20 p-8 pt-12 flex flex-col items-center justify-start shrink-0 relative">

          <div className="w-24 mb-6">
            <img src="/ghadwa-logo.png" alt="Ghadwa" className="w-full" />
          </div>

          <h3 className="text-xl font-bold text-[#2c3e35] mb-2">تحميل المنيو</h3>
          <p className="text-[#8B2525]/80 text-sm mb-8 flex items-center gap-2 font-medium">
            اختاري المنيو اللي يناسبك
            <span className="animate-bounce">👇</span>
          </p>

          <div className="space-y-4 w-full">
            <button
              onClick={() => handleDownload("الفطار")}
              className="w-full bg-white border-2 border-transparent hover:border-[#8B2525]/20 text-gray-800 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fff4e6] rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🥐
                </div>
                <span className="font-bold text-sm">منيو الفطار</span>
              </div>
              <i className="fa-solid fa-download text-gray-300 group-hover:text-[#8B2525]"></i>
            </button>

            <button
              onClick={() => handleDownload("الغداء")}
              className="w-full bg-white border-2 border-transparent hover:border-[#8B2525]/20 text-gray-800 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ffe8e8] rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  🍗
                </div>
                <span className="font-bold text-sm">منيو الغداء</span>
              </div>
              <i className="fa-solid fa-download text-gray-300 group-hover:text-[#8B2525]"></i>
            </button>
          </div>

          {/* Badge at bottom */}
          <div className="mt-12 opacity-80">
            <div className="bg-[#8B2525] text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-wider shadow-md">
              من البيت لبيتك
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// --- Review Modal ---
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  itemName: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, itemName }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setComment("");
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative z-10 shadow-2xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">قيم وجبتك 🍲</h3>
          <p className="text-gray-500 text-sm text-center mb-6">رأيك في "{itemName}" يهمنا!</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-colors ${rating >= star ? "text-yellow-400" : "text-gray-200"}`}
                >
                  ★
                </button>
              ))}
            </div>

            <div>
              <textarea
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:outline-none focus:border-[#8B2525] transition resize-none h-32"
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8B2525] text-white py-3.5 rounded-xl font-bold hover:bg-[#6b1c1c] transition-colors shadow-lg"
            >
              إرسال التقييم
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Chef Conflict Modal ---
interface ChefConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentChef: string | null;
  newChef?: string;
}

export const ChefConflictModal: React.FC<ChefConflictModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentChef,
  newChef,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-xl animate-fade-in text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ⚠️
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">تغيير الشيف؟</h3>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
          سلتك فيها أكل من <strong className="text-gray-900">{currentChef}</strong>. عشان تطلب من{" "}
          <strong className="text-gray-900">{newChef}</strong> لازم نفضي السلة الأول.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#8B2525] text-white py-3 rounded-xl font-bold hover:bg-[#6b1c1c] transition shadow-lg shadow-red-900/20"
          >
            ابدأ سلة جديدة
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            خلي سلتك زي ما هي
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Clear Cart Modal ---
interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ClearCartModal: React.FC<ClearCartModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-xl animate-fade-in text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-red-600">
          <i className="fa-solid fa-trash-can"></i>
        </div>
        <h3 className="font-bold text-xl text-gray-900 mb-2">إفراغ السلة؟</h3>
        <p className="text-gray-500 mb-6 text-sm">
          هل أنت متأكد أنك تريد حذف جميع المنتجات من السلة؟ لا يمكن التراجع عن هذا الإجراء.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-900/20"
          >
            نعم، إفراغ السلة
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Order Success Modal ---
interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number | null;
  onTrack: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose, orderId, onTrack }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full max-w-sm rounded-[2rem] p-8 relative z-10 shadow-2xl animate-fade-in-up text-center transform transition-all border border-white/20">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-sm relative">
          <i className="fa-solid fa-check relative z-10"></i>
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
        </div>

        <h3 className="font-black text-2xl text-gray-900 mb-3">تم الطلب بنجاح! 🥳</h3>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          شكراً لثقتك في غدوة ❤️
          <br />
          طلبك رقم <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded mx-1">#{orderId}</span> وصل
          للشيف.
          <br />
          تقدر تتابع حالة الطلب دلوقتي.
        </p>

        <div className="flex flex-col gap-3">
          {/* <button
            onClick={onTrack}
            className="w-full bg-[#8B2525] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#6b1c1c] transition-all active:scale-95"
          >
            تتبع الطلب 🛵
          </button> */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
          >
            متابعة التسوق
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Admin Form Modal ---
// AdminFormModal Removed
