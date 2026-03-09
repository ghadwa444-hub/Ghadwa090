import React from 'react';

interface OrderSearchSectionProps {
    searchType: 'id' | 'phone';
    setSearchType: (type: 'id' | 'phone') => void;
    searchId: string;
    setSearchId: (id: string) => void;
    searchPhone: string;
    setSearchPhone: (phone: string) => void;
    handleSearch: () => void;
    onReset: () => void;
}

export const OrderSearchSection: React.FC<OrderSearchSectionProps> = ({
    searchType,
    setSearchType,
    searchId,
    setSearchId,
    searchPhone,
    setSearchPhone,
    handleSearch,
    onReset
}) => {
    return (
        <>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">تتبع طلبك 🛵</h1>
                <p className="text-gray-500">ابحث برقم الطلب أو رقم الهاتف</p>
            </div>

            {/* Search Type Toggle */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-4 flex gap-2">
                <button
                    onClick={() => {
                        setSearchType('id');
                        onReset();
                    }}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold transition ${searchType === 'id'
                        ? 'bg-[#8B2525] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <i className="fa-solid fa-hashtag ml-2"></i>
                    رقم الطلب
                </button>
                <button
                    onClick={() => {
                        setSearchType('phone');
                        onReset();
                    }}
                    className={`flex-1 py-2 px-4 rounded-xl font-bold transition ${searchType === 'phone'
                        ? 'bg-[#8B2525] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <i className="fa-solid fa-phone ml-2"></i>
                    رقم الهاتف
                </button>
            </div>

            {/* Search Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
                {searchType === 'id' ? (
                    <input
                        type="text"
                        placeholder="رقم الطلب (مثال: 9543 أو GHD-123)"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] text-lg text-center md:text-right"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                ) : (
                    <input
                        type="tel"
                        placeholder="رقم الهاتف (مثال: 01xxxxxxxxx)"
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#8B2525] text-lg text-center md:text-right"
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                )}
                <button
                    onClick={handleSearch}
                    className="bg-[#8B2525] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6b1c1c] transition shadow-lg"
                >
                    <i className="fa-solid fa-magnifying-glass ml-2"></i>
                    بحث
                </button>
            </div>
        </>
    );
};
