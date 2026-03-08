import React from 'react';
import { CheckoutForm } from '@/core/domain/entities';

interface DeliveryFormProps {
    formData: CheckoutForm;
    setFormData: (data: CheckoutForm) => void;
    phoneError: string;
    setPhoneError: (error: string) => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
    formData,
    setFormData,
    phoneError,
    setPhoneError
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-[#8B2525]"></i>
                بيانات التوصيل
            </h2>
            <form id="checkout-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">الاسم بالكامل</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] transition"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="أحمد محمد"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                        <input
                            type="tel"
                            required
                            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition ${phoneError ? 'border-red-500' : 'border-gray-200 focus:border-[#8B2525]'}`}
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                if (phoneError) setPhoneError('');
                            }}
                            placeholder="01xxxxxxxxx"
                        />
                        {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">العنوان بالتفصيل</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] transition"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="اسم الشارع، رقم العمارة، رقم الشقة"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">ملاحظات إضافية (اختياري)</label>
                    <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] transition h-24 resize-none"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="مثلاً: بوابة رقم 3، رن الجرس مرتين..."
                    ></textarea>
                </div>
            </form>
        </div>
    );
};
