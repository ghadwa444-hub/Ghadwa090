import React from 'react';

interface OrderTimelineProps {
    status: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
    const getStatusStep = (status: string) => {
        switch (status) {
            case 'pending': return 1;
            case 'preparing': return 2;
            case 'out_for_delivery': return 3;
            case 'delivered': return 4;
            default: return 0;
        }
    };

    const currentStep = getStatusStep(status);

    return (
        <div className="p-8">
            <div className="relative flex justify-between items-center mb-12 px-2">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
                <div
                    className="absolute top-1/2 right-0 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-1000"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {/* Step 1: Pending */}
                <StepItem
                    icon="fa-solid fa-check"
                    label="تم الطلب"
                    isActive={currentStep >= 1}
                    isCurrent={false} // Only animate if strictly current if we want, but logic here is simple active state
                />

                {/* Step 2: Preparing */}
                <StepItem
                    icon="fa-solid fa-fire-burner"
                    label="جاري التحضير"
                    isActive={currentStep >= 2}
                    isPulse={currentStep === 1}
                />

                {/* Step 3: Out For Delivery */}
                <StepItem
                    icon="fa-solid fa-motorcycle"
                    label="مع الطيار"
                    isActive={currentStep >= 3}
                    isPulse={currentStep === 2}
                />

                {/* Step 4: Delivered */}
                <StepItem
                    icon="fa-solid fa-house-chimney"
                    label="تم التوصيل"
                    isActive={currentStep >= 4}
                    isPulse={false}
                />
            </div>
        </div>
    );
};

interface StepItemProps {
    icon: string;
    label: string;
    isActive: boolean;
    isPulse?: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ icon, label, isActive, isPulse }) => (
    <div className="flex flex-col items-center gap-2 relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500 ${isActive ? 'bg-green-500 scale-110 shadow-lg shadow-green-200' : isPulse ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'}`}>
            <i className={icon}></i>
        </div>
        <span className={`text-[10px] sm:text-xs font-bold absolute -bottom-6 w-24 text-center ${isActive ? 'text-green-600' : isPulse ? 'text-orange-500' : 'text-gray-400'}`}>
            {label}
        </span>
    </div>
);
