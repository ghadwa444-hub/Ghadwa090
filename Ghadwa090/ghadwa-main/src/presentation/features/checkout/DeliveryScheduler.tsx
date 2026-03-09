import React from 'react';

interface DeliverySchedulerProps {
    isScheduled: boolean;
    setIsScheduled: (value: boolean) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    availableTimeSlots: string[];
    dateError: string;
}

export const DeliveryScheduler: React.FC<DeliverySchedulerProps> = ({
    isScheduled,
    setIsScheduled,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    availableTimeSlots,
    dateError
}) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-regular fa-clock text-[#8B2525]"></i>
                وقت الاستلام
            </h2>

            <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition mb-4">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={isScheduled}
                        onChange={(e) => {
                            setIsScheduled(e.target.checked);
                            // Reset if unchecked
                            if (!e.target.checked) {
                                setSelectedDate('');
                                setSelectedTime('');
                            }
                        }}
                        className="w-5 h-5 accent-[#8B2525]"
                    />
                </div>
                <span className="font-bold text-gray-700">تحديد موعد للتوصيل (جدولة الطلب)</span>
            </label>

            {isScheduled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-down">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">تاريخ التوصيل</label>
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]} // Min is today
                            required={isScheduled}
                            className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] transition ${dateError ? 'border-red-500' : 'border-gray-200'}`}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        {dateError && <p className="text-red-500 text-xs mt-1 font-bold">{dateError}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">الوقت المفضل</label>
                        <select
                            required={isScheduled}
                            disabled={!selectedDate || !!dateError || availableTimeSlots.length === 0}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] transition disabled:opacity-50"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            <option value="">
                                {availableTimeSlots.length > 0 ? 'اختر الوقت' : (dateError ? '--' : 'لا توجد مواعيد متاحة')}
                            </option>
                            {availableTimeSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};
