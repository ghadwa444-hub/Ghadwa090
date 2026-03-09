import React, { useState, useEffect } from 'react';
import { CartItem, CheckoutForm, PromoCode, Order, OrderItem } from '@/core/domain/entities';
import { DeliveryForm } from '../features/checkout/DeliveryForm';
import { DeliveryScheduler } from '../features/checkout/DeliveryScheduler';
import { OrderSummary } from '../features/checkout/OrderSummary';
import { useCart } from '@/application/context/CartContext';
import { useData } from '@/application/context/DataContext';
import { api } from '@/infrastructure/api/api';
import { sendOrderEmail } from '@/infrastructure/services/emailService';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage: React.FC = () => {
    const { cart, clearCart } = useCart();
    const { promoCodes } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Promo Code State
    const [promoInput, setPromoInput] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

    // Scheduling State
    const [isScheduled, setIsScheduled] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [dateError, setDateError] = useState('');

    // Total only includes food + promo, delivery is separate
    const total = subtotal - discount;
    const [formData, setFormData] = useState<CheckoutForm>({
        name: '',
        phone: '',
        address: '',
        notes: ''
    });

    const [phoneError, setPhoneError] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    // Generate time slots logic
    useEffect(() => {
        if (!selectedDate) {
            setAvailableTimeSlots([]);
            return;
        }

        const slots: string[] = [];
        const now = new Date();
        const isToday = new Date(selectedDate).toDateString() === now.toDateString();
        const startHour = 9; // 9 AM
        const endHour = 23; // 11 PM

        // Logic for Today
        if (isToday) {
            const cutOffTime = new Date();
            cutOffTime.setHours(18, 15, 0); // 6:15 PM

            if (now > cutOffTime) {
                setDateError('عذراً، انتهت مواعيد طلبات اليوم (بعد 6:15 م). يرجى اختيار يوم آخر.');
                setAvailableTimeSlots([]);
                return;
            }

            // Check if minimum time (now + 2h) exceeds last slot time
            const minTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Now + 2h
            const lastSlotTime = new Date();
            lastSlotTime.setHours(endHour, 30, 0); // 11:30 PM

            if (minTime > lastSlotTime) {
                setDateError('عذراً، لا توجد مواعيد متاحة اليوم. أقرب موعد يجب أن يكون بعد ساعتين على الأقل من الآن. يرجى اختيار يوم آخر.');
                setAvailableTimeSlots([]);
                return;
            }

            setDateError('');
        } else {
            setDateError('');
        }

        for (let hour = startHour; hour <= endHour; hour++) {
            // Create slots for hour:00 and hour:30
            const times = [
                { h: hour, m: 0 },
                { h: hour, m: 30 }
            ];

            times.forEach(t => {
                const timeString = `${t.h.toString().padStart(2, '0')}:${t.m.toString().padStart(2, '0')}`;

                if (isToday) {
                    const slotTime = new Date();
                    slotTime.setHours(t.h, t.m, 0);

                    // Must be at least 2 hours from now
                    const minTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // Now + 2h

                    if (slotTime > minTime) {
                        slots.push(timeString);
                    }
                } else {
                    // Logic for Future Dates (Start from 9 AM)
                    // Loop already starts at startHour (9), so just push
                    slots.push(timeString);
                }
            });
        }

        // Additional check: if today and no slots available after 2h filter
        if (isToday && slots.length === 0) {
            setDateError('عذراً، لا توجد مواعيد متاحة اليوم. أقرب موعد يجب أن يكون بعد ساعتين على الأقل. يرجى اختيار يوم آخر.');
        }

        setAvailableTimeSlots(slots);

        // Reset selected time if it's no longer valid
        if (selectedTime && !slots.includes(selectedTime)) {
            setSelectedTime('');
        }

    }, [selectedDate, selectedTime]);


    const handleApplyPromo = () => {
        setPromoError('');
        const code = promoCodes.find(p => p.code === promoInput.toUpperCase());

        if (!code) {
            setPromoError('الكود ده مش موجود أو منتهي الصلاحية');
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }

        if (!code.is_active) {
            setPromoError('الكود ده معطل حالياً');
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }

        const now = new Date();
        if (code.valid_from && new Date(code.valid_from) > now) {
            setPromoError('الكود ده لسه مبدأش');
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }
        if (code.valid_until && new Date(code.valid_until) < now) {
            setPromoError('الكود ده منتهي');
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }

        if (code.max_uses && code.current_uses >= code.max_uses) {
            setPromoError('الكود ده وصل للحد الأقصى من الاستخدام');
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }

        if (code.min_order_amount && subtotal < code.min_order_amount) {
            setPromoError(`الحد الأدنى للطلب ${code.min_order_amount} ج.م`);
            setDiscount(0);
            setAppliedPromo(null);
            return;
        }

        let calculatedDiscount = 0;
        if (code.discount_type === 'percentage') {
            calculatedDiscount = (subtotal * code.discount_value) / 100;
        } else if (code.discount_type === 'fixed') {
            calculatedDiscount = code.discount_value;
        }

        if (calculatedDiscount > subtotal) {
            calculatedDiscount = subtotal;
        }

        setDiscount(calculatedDiscount);
        setAppliedPromo(code);
    };

    const handleRemovePromo = () => {
        setPromoInput('');
        setDiscount(0);
        setAppliedPromo(null);
        setPromoError('');
    };

    const onPlaceOrder = async (data: CheckoutForm) => {
        try {
            // Now we only have items from a single chef (enforced in cart)
            const orderItems: any[] = cart.map(item => ({
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
                product_id: item.id,
                image_url: item.image_url,
                notes: ''
            }));

            // Get chef_id from first item (all items should have same chef)
            const chefId = cart[0]?.chef_id;

            const order: Order = {
                id: crypto.randomUUID(),
                chef_id: chefId,
                status: 'pending',
                subtotal: subtotal,
                discount_amount: discount,
                total_amount: total,
                customer_name: data.name,
                customer_phone: data.phone,
                delivery_address: data.address,
                notes: data.notes,
                payment_method: 'cash',
                items: orderItems,
                itemsDetails: cart, // Pass cart items for order_items insertion
                created_at: new Date().toISOString()
            };

            const success = await api.submitOrder(order);

            if (success) {
                // Send email notification to admin
                await sendOrderEmail({
                    customerName: data.name,
                    customerPhone: data.phone,
                    deliveryAddress: data.address,
                    orderItems: cart.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    subtotal: subtotal,
                    discount: discount,
                    total: total,
                    notes: data.notes,
                    deliveryDate: data.deliveryDate,
                    deliveryTime: data.deliveryTime
                });

                alert('تم استلام طلبك بنجاح! سيتم التواصل معك قريباً.');
                clearCart();
                navigate('/');
            } else {
                alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('حدث خطأ غير متوقع');
        }
    };

    const handleSubmit = () => {
        // Strict Phone Validation
        const phoneRegex = /^01[0125][0-9]{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            setPhoneError('يرجى إدخال رقم هاتف صحيح مكون من 11 رقم (مثال: 010xxxxxxxx)');
            return;
        }

        // Scheduling Validation
        if (isScheduled) {
            if (!selectedDate) {
                alert('يرجى اختيار تاريخ التوصيل');
                return;
            }
            if (dateError) {
                alert(dateError);
                return;
            }
            if (!selectedTime) {
                alert('يرجى اختيار وقت التوصيل');
                return;
            }
        }

        onPlaceOrder({
            ...formData,
            promoCode: appliedPromo?.code,
            discountApplied: discount,
            deliveryDate: isScheduled ? selectedDate : undefined,
            deliveryTime: isScheduled ? selectedTime : undefined
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-[#8B2525] font-bold transition">
                    <i className="fa-solid fa-arrow-right"></i> رجوع للسلة
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Right Side: Form */}
                    <div className="lg:w-2/3">
                        <DeliveryForm
                            formData={formData}
                            setFormData={setFormData}
                            phoneError={phoneError}
                            setPhoneError={setPhoneError}
                        />

                        {/* Scheduling Section */}
                        <DeliveryScheduler
                            isScheduled={isScheduled}
                            setIsScheduled={setIsScheduled}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            availableTimeSlots={availableTimeSlots}
                            dateError={dateError}
                        />

                        {/* Payment Method - Can be extracted too if needed, but it's small */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-wallet text-[#8B2525]"></i>
                                طريقة الدفع
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${paymentMethod === 'cash' ? 'border-[#8B2525] bg-red-50 text-[#8B2525]' : 'border-gray-100 hover:border-gray-200'}`}
                                >
                                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                                        {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-current"></div>}
                                    </div>
                                    <span className="font-bold">الدفع عند الاستلام</span>
                                    <i className="fa-solid fa-money-bill-wave mr-auto"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Left Side: Summary */}
                    <div className="lg:w-1/3">
                        <OrderSummary
                            cart={cart}
                            subtotal={subtotal}
                            discount={discount}
                            total={total}
                            promoInput={promoInput}
                            setPromoInput={setPromoInput}
                            appliedPromo={appliedPromo}
                            promoError={promoError}
                            handleApplyPromo={handleApplyPromo}
                            handleRemovePromo={handleRemovePromo}
                            onPlaceOrder={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
